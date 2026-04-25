'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Button } from '@/components/ui';
import { FiSend, FiZap, FiRefreshCw, FiCpu } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { formatCurrency } from '@/utils/helpers';

type Role = 'user' | 'ai';
interface Msg { role: Role; content: string; ts: number }

const QUICK = [
  'Bagaimana kondisi keuangan bisnis saya?',
  'Kategori pengeluaran terbesar?',
  'Berapa laba bersih bulan ini?',
  'Ada item stok yang kritis?',
  'Rekomendasikan cara hemat biaya',
  'Analisis cashflow saya',
];

async function buildContext(businessId: string) {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

  const [{ data: txAll }, { data: txMonth }, { data: inv }, { data: debts }, { data: budgets }] = await Promise.all([
    supabase.from('transactions').select('type,amount,category,date').eq('business_id', businessId),
    supabase.from('transactions').select('type,amount,category').eq('business_id', businessId).gte('date', monthStart),
    supabase.from('inventory').select('name,quantity,reorder_level,unit_price').eq('business_id', businessId),
    supabase.from('debts').select('type,amount,status,customer_name,due_date').eq('business_id', businessId),
    supabase.from('budgets').select('category,limit_amount,period').eq('business_id', businessId),
  ]);

  const allTx = txAll || [];
  const monthTx = txMonth || [];

  const totalRevenue = allTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = allTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const monthRevenue = monthTx.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const monthExpense = monthTx.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const catMap: Record<string, number> = {};
  allTx.filter(t => t.type === 'expense').forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
  const topCats = Object.entries(catMap).sort(([, a], [, b]) => b - a).slice(0, 5);

  const lowStock = (inv || []).filter(i => i.quantity <= i.reorder_level);
  const overdueDebts = (debts || []).filter(d => d.status === 'overdue');
  const totalReceivable = (debts || []).filter(d => d.type === 'receivable' && d.status !== 'paid').reduce((s, d) => s + d.amount, 0);
  const totalPayable = (debts || []).filter(d => d.type === 'payable' && d.status !== 'paid').reduce((s, d) => s + d.amount, 0);

  return {
    totalRevenue, totalExpense, profit: totalRevenue - totalExpense,
    margin: totalRevenue > 0 ? ((totalRevenue - totalExpense) / totalRevenue * 100) : 0,
    monthRevenue, monthExpense, monthProfit: monthRevenue - monthExpense,
    txCount: allTx.length, topCats,
    lowStock, inventory: inv || [],
    overdueDebts, totalReceivable, totalPayable,
    budgets: budgets || [],
  };
}

function smartReply(msg: string, ctx: ReturnType<typeof buildContext> extends Promise<infer T> ? T : never): string {
  const q = msg.toLowerCase();
  const { totalRevenue, totalExpense, profit, margin, monthRevenue, monthExpense, monthProfit, txCount, topCats, lowStock, overdueDebts, totalReceivable, totalPayable } = ctx;

  if (txCount === 0) return 'Belum ada data transaksi. Tambahkan transaksi di menu **Transaksi** atau coba **Scan Struk** untuk catat pengeluaran dari foto struk belanja.';

  // Kondisi / kesehatan umum
  if (q.match(/kondisi|kesehatan|gimana|bagaimana|sehat|overview/)) {
    const status = margin >= 25 ? '🟢 Sangat Sehat' : margin >= 10 ? '🟡 Cukup Sehat' : margin >= 0 ? '🟠 Perlu Perhatian' : '🔴 Kritis';
    const issues = [];
    if (margin < 10) issues.push(`margin keuntungan hanya ${margin.toFixed(1)}%`);
    if (lowStock.length > 0) issues.push(`${lowStock.length} item stok hampir habis`);
    if (overdueDebts.length > 0) issues.push(`${overdueDebts.length} tagihan jatuh tempo`);

    return `**Status Bisnis: ${status}**\n\n📊 Ringkasan Keseluruhan:\n• Total Pendapatan: ${formatCurrency(totalRevenue)}\n• Total Pengeluaran: ${formatCurrency(totalExpense)}\n• Laba Bersih: ${formatCurrency(profit)}\n• Margin: ${margin.toFixed(1)}%\n\n📅 Bulan Ini:\n• Pendapatan: ${formatCurrency(monthRevenue)}\n• Pengeluaran: ${formatCurrency(monthExpense)}\n• Laba: ${formatCurrency(monthProfit)}${issues.length > 0 ? '\n\n⚠️ Perhatikan:\n' + issues.map(i => '• ' + i).join('\n') : '\n\nSemua indikator dalam kondisi baik! ✓'}`;
  }

  // Laba
  if (q.match(/laba|profit|untung|keuntungan/)) {
    const advice = margin >= 25 ? 'Pertimbangkan reinvestasi ke ekspansi atau stok produk terlaris.' : margin >= 10 ? 'Margin masih bisa ditingkatkan dengan efisiensi biaya operasional.' : margin >= 0 ? 'Prioritaskan pengurangan biaya — review pengeluaran terbesar Anda.' : 'Bisnis sedang merugi. Segera evaluasi harga jual dan potong biaya tidak esensial.';
    return `**Analisis Laba Bisnis:**\n\n• Laba keseluruhan: ${formatCurrency(profit)}\n• Laba bulan ini: ${formatCurrency(monthProfit)}\n• Margin keuntungan: ${margin.toFixed(1)}%\n\n💡 ${advice}`;
  }

  // Pengeluaran / kategori terbesar
  if (q.match(/pengeluaran|biaya|expense|kategori terbesar|terbesar/)) {
    if (topCats.length === 0) return 'Belum ada data pengeluaran yang bisa dianalisis.';
    const list = topCats.map(([cat, amt], i) => `${i + 1}. ${cat}: ${formatCurrency(amt)} (${totalExpense > 0 ? ((amt / totalExpense) * 100).toFixed(0) : 0}%)`).join('\n');
    const top = topCats[0];
    return `**Top Kategori Pengeluaran:**\n\n${list}\n\n💡 Pengeluaran terbesar di kategori **${top[0]}** (${formatCurrency(top[1])}). Coba negosiasikan biaya dengan vendor atau cari alternatif yang lebih hemat.`;
  }

  // Pendapatan / revenue
  if (q.match(/pendapatan|pemasukan|revenue|omset/)) {
    return `**Analisis Pendapatan:**\n\n• Total pendapatan: ${formatCurrency(totalRevenue)}\n• Bulan ini: ${formatCurrency(monthRevenue)}\n• Rata-rata per transaksi: ${formatCurrency(totalRevenue / Math.max(txCount, 1))}\n\n💡 Untuk meningkatkan pendapatan, fokus pada pelanggan dengan nilai transaksi tertinggi dan produk yang paling laku. Cek halaman **Pelanggan** untuk melihat siapa customer terbaik Anda.`;
  }

  // Stok / inventori
  if (q.match(/stok|inventori|barang|produk|restock|kritis/)) {
    if (lowStock.length === 0) return '✅ Semua stok dalam kondisi aman. Tidak ada item yang perlu segera di-restock.';
    const list = lowStock.slice(0, 5).map(i => `• ${i.name}: sisa ${i.quantity} unit (min. ${i.reorder_level})`).join('\n');
    return `**⚠️ ${lowStock.length} Item Stok Kritis:**\n\n${list}\n\n💡 Segera lakukan pemesanan ulang untuk mencegah kehabisan stok dan kehilangan penjualan. Buka halaman **Inventori** untuk melihat detail.`;
  }

  // Hutang piutang
  if (q.match(/hutang|piutang|tagihan|jatuh tempo|overdue/)) {
    const overdueList = overdueDebts.slice(0, 3).map(d => `• ${d.customer_name}: ${formatCurrency(d.amount)}`).join('\n');
    return `**Ringkasan Hutang & Piutang:**\n\n💰 Piutang (uang masuk): ${formatCurrency(totalReceivable)}\n📤 Hutang (kewajiban): ${formatCurrency(totalPayable)}\n⚠️ Jatuh tempo: ${overdueDebts.length} item${overdueDebts.length > 0 ? '\n\n' + overdueList + '\n\n💡 Segera tagih piutang yang sudah jatuh tempo untuk menjaga cashflow.' : '\n\n✅ Tidak ada tagihan yang terlambat.'}`;
  }

  // Hemat biaya / rekomendasi
  if (q.match(/hemat|potong|efisiensi|rekomendasi|saran|tips/)) {
    const top3 = topCats.slice(0, 3).map(([c]) => c).join(', ');
    return `**💡 Rekomendasi Efisiensi Biaya:**\n\n1. **Review kategori terbesar** — ${top3 || 'Analisis pengeluaran terbesar'} adalah area terbesar. Cari peluang negosiasi.\n2. **Bandingkan vendor** — Minta penawaran dari minimal 3 pemasok untuk setiap kategori besar.\n3. **Pantau budget** — Aktifkan budget limit di halaman **Budgeting** untuk kontrol otomatis.\n4. **Tagih piutang** — Ada ${formatCurrency(totalReceivable)} piutang yang bisa segera dicairkan.\n5. **Optimalkan stok** — Hindari kelebihan stok yang mengikat modal tidak perlu.`;
  }

  // Cashflow
  if (q.match(/cashflow|arus kas|likuiditas|kas/)) {
    const net = totalRevenue - totalExpense;
    const status = net > 0 ? '✅ Positif' : '⚠️ Negatif';
    return `**Analisis Cashflow:**\n\n• Status: ${status}\n• Net cashflow: ${formatCurrency(net)}\n• Piutang belum tertagih: ${formatCurrency(totalReceivable)}\n• Hutang jatuh tempo: ${formatCurrency(totalPayable)}\n\n💡 Lihat halaman **Cashflow** untuk prediksi 3 bulan ke depan berbasis tren historis Anda.`;
  }

  return `Saya bisa membantu analisis **keuangan bisnis Anda** berdasarkan ${txCount} transaksi yang tercatat. Coba tanyakan:\n\n• Kondisi keuangan bisnis saya?\n• Kategori pengeluaran terbesar?\n• Bagaimana laba bulan ini?\n• Rekomendasikan cara hemat biaya\n• Status hutang & piutang saya`;
}

export default function AIAssistantPage() {
  const { businessId, loading: authLoading } = useAuth({ requireAuth: true });
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [ctx, setCtx] = useState<any>(null);
  const [loadingCtx, setLoadingCtx] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  const loadCtx = useCallback(async () => {
    if (!businessId) return;
    setLoadingCtx(true);
    const data = await buildContext(businessId);
    setCtx(data);
    setLoadingCtx(false);
  }, [businessId]);

  useEffect(() => {
    if (authLoading) return;
    if (!businessId) { setLoadingCtx(false); return; }
    loadCtx();
  }, [authLoading, businessId, loadCtx]);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, typing]);

  const send = useCallback((text?: string) => {
    const q = (text || input).trim();
    if (!q || typing || !ctx) return;
    setInput('');
    const userMsg: Msg = { role: 'user', content: q, ts: Date.now() };
    setMsgs(prev => [...prev, userMsg]);
    setTyping(true);
    setTimeout(() => {
      const reply = smartReply(q, ctx);
      setMsgs(prev => [...prev, { role: 'ai', content: reply, ts: Date.now() }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  }, [input, typing, ctx]);

  const renderContent = (text: string) =>
    text.split('\n').map((line, i) => {
      if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="font-bold text-primary mb-1">{line.slice(2, -2)}</p>;
      const boldLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <p key={i} className="leading-relaxed" dangerouslySetInnerHTML={{ __html: boldLine || '&nbsp;' }} />;
    });

  return (
    <DashboardLayout title="Asisten Keuangan AI">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 h-full">
        {/* Chat */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          <div className="card flex flex-col gap-3 overflow-y-auto" style={{ minHeight: 400, maxHeight: '60vh' }}>
            {msgs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-48 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-3">
                  <FiCpu size={28} className="text-primary" />
                </div>
                <p className="font-semibold">Asisten Keuangan AI</p>
                <p className="text-sm text-white/50 mt-1">{loadingCtx ? 'Memuat data bisnis...' : 'Tanyakan apa saja tentang keuangan Anda'}</p>
              </div>
            )}
            <AnimatePresence initial={false}>
              {msgs.map(m => (
                <motion.div key={m.ts} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm space-y-0.5 ${m.role === 'user' ? 'bg-primary text-darker rounded-br-sm font-medium' : 'bg-white/10 rounded-bl-sm'}`}>
                    {m.role === 'ai' ? renderContent(m.content) : <p>{m.content}</p>}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {typing && (
              <div className="flex justify-start">
                <div className="px-4 py-3 bg-white/10 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                  {[0,1,2].map(i => <motion.div key={i} className="w-1.5 h-1.5 bg-white/50 rounded-full" animate={{ y: [0,-4,0] }} transition={{ duration: 0.6, delay: i*0.15, repeat: Infinity }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick questions */}
          {msgs.length === 0 && !loadingCtx && (
            <div className="flex flex-wrap gap-2">
              {QUICK.map(q => (
                <button key={q} onClick={() => send(q)} className="text-xs px-3 py-2 border border-white/15 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-smooth text-left">{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="flex gap-2">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
              placeholder={loadingCtx ? 'Memuat data...' : 'Tanya tentang keuangan Anda...'}
              disabled={loadingCtx} className="input-field flex-1 text-sm" />
            <Button variant="primary" onClick={() => send()} disabled={!input.trim() || typing || loadingCtx}><FiSend size={16} /></Button>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><FiZap className="text-accent" /><h3 className="font-bold">Insight Cepat</h3></div>
            <button onClick={loadCtx} className="p-1.5 hover:bg-white/10 rounded-lg transition-smooth"><FiRefreshCw size={13} className={loadingCtx ? 'animate-spin' : ''} /></button>
          </div>

          {!loadingCtx && ctx ? (
            <>
              {[
                { label: 'Laba Bersih', val: formatCurrency(ctx.profit), color: ctx.profit >= 0 ? 'text-green-400' : 'text-red-400', sub: `Margin ${ctx.margin.toFixed(1)}%` },
                { label: 'Pendapatan Bulan Ini', val: formatCurrency(ctx.monthRevenue), color: 'text-primary', sub: `vs pengeluaran ${formatCurrency(ctx.monthExpense)}` },
                { label: 'Piutang Belum Tertagih', val: formatCurrency(ctx.totalReceivable), color: 'text-yellow-400', sub: `Hutang: ${formatCurrency(ctx.totalPayable)}` },
              ].map(item => (
                <div key={item.label} className="card">
                  <p className="text-xs text-white/50 mb-1">{item.label}</p>
                  <p className={`text-xl font-bold ${item.color}`}>{item.val}</p>
                  <p className="text-xs text-white/40 mt-0.5">{item.sub}</p>
                </div>
              ))}
              {ctx.lowStock.length > 0 && (
                <div className="card border border-red-500/30 bg-red-500/10">
                  <p className="text-xs font-semibold text-red-400 mb-1">⚠️ {ctx.lowStock.length} Item Stok Kritis</p>
                  {ctx.lowStock.slice(0, 3).map((i: any) => <p key={i.name} className="text-xs text-white/60 truncate">• {i.name} ({i.quantity} unit)</p>)}
                </div>
              )}
              {ctx.overdueDebts.length > 0 && (
                <div className="card border border-yellow-500/30 bg-yellow-500/10">
                  <p className="text-xs font-semibold text-yellow-400 mb-1">🕐 {ctx.overdueDebts.length} Tagihan Jatuh Tempo</p>
                  {ctx.overdueDebts.slice(0, 2).map((d: any) => <p key={d.customer_name} className="text-xs text-white/60 truncate">• {d.customer_name}</p>)}
                </div>
              )}
              {ctx.topCats[0] && (
                <div className="card">
                  <p className="text-xs text-white/50 mb-1">Pengeluaran Terbesar</p>
                  <p className="font-semibold text-sm">{ctx.topCats[0][0]}</p>
                  <p className="text-primary text-sm font-bold">{formatCurrency(ctx.topCats[0][1])}</p>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 rounded-xl bg-white/5 animate-pulse" />)}</div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
