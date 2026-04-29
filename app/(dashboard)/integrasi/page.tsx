'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, Button } from '@/components/ui';
import { FiLink, FiCheckCircle, FiExternalLink, FiCode, FiCopy, FiZap, FiSettings, FiTrash2, FiPlus, FiLoader, FiSmartphone, FiCreditCard, FiShoppingBag, FiShoppingCart, FiBox } from 'react-icons/fi';
import { FaQrcode, FaUniversity, FaTiktok, FaWallet } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNotificationStore } from '@/store';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useAuth } from '@/hooks/useAuth';

const paymentMethods = [
  { id: 'qris', name: 'QRIS', desc: 'Scan QR untuk semua e-wallet & mobile banking', icon: <FaQrcode />, color: 'from-blue-500/20 to-blue-600/5 border-blue-500/30', status: 'Siap Diaktifkan' },
  { id: 'gojek', name: 'GoPay', desc: 'Terima pembayaran via GoJek', icon: <FaWallet />, color: 'from-green-500/20 to-green-600/5 border-green-500/30', status: 'Siap Diaktifkan' },
  { id: 'ovo', name: 'OVO', desc: 'Integrasi dengan OVO merchant', icon: <FiSmartphone />, color: 'from-purple-500/20 to-purple-600/5 border-purple-500/30', status: 'Siap Diaktifkan' },
  { id: 'bca', name: 'BCA Virtual Account', desc: 'Terima transfer via VA BCA', icon: <FaUniversity />, color: 'from-blue-400/20 to-blue-500/5 border-blue-400/30', status: 'Segera Hadir' },
  { id: 'mandiri', name: 'Mandiri VA', desc: 'Virtual Account Bank Mandiri', icon: <FaUniversity />, color: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/30', status: 'Segera Hadir' },
  { id: 'dana', name: 'DANA', desc: 'Terima pembayaran via DANA', icon: <FiCreditCard />, color: 'from-sky-500/20 to-sky-600/5 border-sky-500/30', status: 'Siap Diaktifkan' },
];

const ecommerceChannels = [
  { name: 'Tokopedia', icon: <FiShoppingBag />, color: 'bg-green-500/10 text-green-400', desc: 'Sinkronisasi pesanan & stok otomatis', badge: 'Populer' },
  { name: 'Shopee', icon: <FiShoppingCart />, color: 'bg-orange-500/10 text-orange-400', desc: 'Auto-import transaksi dari Shopee Seller', badge: 'Populer' },
  { name: 'Lazada', icon: <FiBox />, color: 'bg-blue-500/10 text-blue-400', desc: 'Kelola pesanan Lazada di satu tempat', badge: '' },
  { name: 'TikTok Shop', icon: <FaTiktok />, color: 'bg-white/5 text-white', desc: 'Integrasi dengan TikTok Shop seller center', badge: 'Baru' },
];

const apiEndpoints = [
  { method: 'GET', path: '/api/v1/transactions', desc: 'Ambil semua transaksi' },
  { method: 'POST', path: '/api/v1/transactions', desc: 'Buat transaksi baru' },
  { method: 'GET', path: '/api/v1/inventory', desc: 'Ambil data inventori' },
  { method: 'GET', path: '/api/v1/customers', desc: 'Ambil data pelanggan' },
  { method: 'GET', path: '/api/v1/reports/summary', desc: 'Laporan ringkasan keuangan' },
];

export default function IntegrasiPage() {
  const { addNotification } = useNotificationStore();
  const supabase = createClientComponentClient();
  const { user, business } = useAuth();
  const [activePayment, setActivePayment] = useState<Set<string>>(new Set(['qris']));
  const [activeChannel, setActiveChannel] = useState<Set<string>>(new Set());
  const [isSyncing, setIsSyncing] = useState<string | null>(null);

  const togglePayment = (id: string) => {
    const p = paymentMethods.find(p => p.id === id);
    if (p?.status === 'Segera Hadir') { addNotification('Fitur ini akan segera hadir!', 'info'); return; }
    setActivePayment(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      addNotification(next.has(id) ? 'Payment method diaktifkan ✓' : 'Payment method dinonaktifkan', next.has(id) ? 'success' : 'info');
      return next;
    });
  };

  const simulateSync = async (channelName: string) => {
    if (!user || !business) return;
    setIsSyncing(channelName);
    
    try {
      // 1. Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 2. Insert 2 Mock Customers
      const mockCustomers = [
        { business_id: business.id, name: `Pelanggan ${channelName} 1`, phone: '08123456789' },
        { business_id: business.id, name: `Pelanggan ${channelName} 2`, phone: '08129876543' }
      ];
      
      const { data: insertedCustomers, error: custErr } = await supabase
        .from('customers')
        .insert(mockCustomers)
        .select('id');
        
      if (custErr) throw custErr;
      
      // 3. Insert 5 Mock Transactions
      const amounts = [150000, 250000, 75000, 320000, 110000];
      const mockTx = amounts.map(amt => ({
        business_id: business.id,
        created_by: user.id,
        type: 'income',
        category: 'Penjualan Online',
        amount: amt,
        description: `Pesanan dari ${channelName}`,
        date: new Date().toISOString(),
        payment_method: channelName
      }));
      
      const { error: txErr } = await supabase
        .from('transactions')
        .insert(mockTx);
        
      if (txErr) throw txErr;

      // Update UI state
      setActiveChannel(prev => {
        const next = new Set(prev);
        next.add(channelName);
        return next;
      });
      
      addNotification(`${channelName} berhasil terhubung! 5 transaksi & 2 pelanggan baru disinkronisasi ✓`, 'success');
    } catch (err: any) {
      console.error('Sync error:', err);
      addNotification(`Gagal sinkronisasi dengan ${channelName}`, 'error');
    } finally {
      setIsSyncing(null);
    }
  };

  const toggleChannel = (name: string) => {
    if (activeChannel.has(name)) {
      // Disconnect
      setActiveChannel(prev => {
        const next = new Set(prev);
        next.delete(name);
        return next;
      });
      addNotification(`${name} terputus`, 'info');
    } else {
      // Connect & Sync
      simulateSync(name);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText('dt_live_sk_••••••••••••••••••••••••••••••••');
    addNotification('API Key disalin ke clipboard', 'success');
  };

  return (
    <DashboardLayout title="Integrasi & API">
      <div className="space-y-10">
        
        {/* Payment Methods */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
              <FiZap size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Metode Pembayaran</h2>
              <p className="text-sm text-white/50">Aktifkan payment gateway untuk otomatisasi pembayaran pelanggan</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {paymentMethods.map((pm, idx) => {
              const isActive = activePayment.has(pm.id);
              return (
                <motion.div key={pm.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Card hover={false} className={`relative overflow-hidden border transition-all duration-300 ${isActive ? `bg-gradient-to-br ${pm.color} ring-1 ring-primary/40 shadow-lg shadow-primary/10` : 'border-white/10 glass hover:bg-white/5'}`}>
                    {isActive && <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/20 blur-2xl rounded-full" />}
                    <div className="flex items-start justify-between mb-3 relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl drop-shadow-md">{pm.icon}</span>
                        <div>
                          <p className="font-semibold text-sm">{pm.name}</p>
                          {pm.status === 'Segera Hadir' && <span className="text-[10px] uppercase tracking-wider font-semibold text-accent">{pm.status}</span>}
                        </div>
                      </div>
                      {isActive && <FiCheckCircle size={18} className="text-primary flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-white/60 mb-4 h-8 relative z-10">{pm.desc}</p>
                    <motion.button 
                      whileTap={{ scale: 0.97 }}
                      onClick={() => togglePayment(pm.id)}
                      className={`w-full py-2 rounded-lg text-xs font-bold tracking-wide transition-smooth relative z-10 ${isActive ? 'bg-black/20 text-primary hover:bg-black/40' : pm.status === 'Segera Hadir' ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'}`}
                    >
                      {isActive ? 'Nonaktifkan' : pm.status}
                    </motion.button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* E-Commerce */}
        <section>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center text-secondary">
              <FiLink size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Integrasi Marketplace</h2>
              <p className="text-sm text-white/50">Sinkronkan stok dan tarik transaksi otomatis dari toko online Anda</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {ecommerceChannels.map((ch, idx) => {
              const isConnected = activeChannel.has(ch.name);
              return (
                <motion.div key={ch.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Card hover={false} className={`transition-smooth border ${isConnected ? 'bg-secondary/5 border-secondary/30 shadow-lg shadow-secondary/5' : 'glass border-white/10 hover:border-white/20'}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${ch.color} rounded-2xl flex items-center justify-center text-2xl shadow-inner`}>{ch.icon}</div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-bold text-sm">{ch.name}</p>
                            {ch.badge && <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${ch.badge === 'Populer' ? 'bg-orange-500/20 text-orange-400' : 'bg-accent/20 text-accent'}`}>{ch.badge}</span>}
                          </div>
                          <p className="text-xs text-white/50 leading-tight">{ch.desc}</p>
                        </div>
                      </div>
                      <motion.button 
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleChannel(ch.name)}
                        disabled={isSyncing === ch.name}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-smooth flex-shrink-0 ml-2 disabled:opacity-70 disabled:cursor-wait ${isConnected ? 'bg-secondary/20 text-secondary hover:bg-secondary/30' : 'bg-primary text-darker hover:shadow-lg hover:shadow-primary/20'}`}
                      >
                        {isSyncing === ch.name ? (
                          <span className="flex items-center gap-1.5"><FiLoader className="animate-spin" size={14} /> Sinkronisasi...</span>
                        ) : isConnected ? (
                          <span className="flex items-center gap-1.5"><FiCheckCircle size={14} /> Terhubung</span>
                        ) : (
                          'Hubungkan'
                        )}
                      </motion.button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* API & Webhooks */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Open API */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-accent">
                <FiCode size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold">API Terbuka</h2>
                <p className="text-sm text-white/50">Akses data DuitTrack dari aplikasi lain</p>
              </div>
            </div>
            <Card hover={false} className="glass border-white/10 h-[calc(100%-4rem)]">
              <div className="mb-5">
                <label className="block text-xs font-bold text-white/50 uppercase tracking-wider mb-2">API Key Autentikasi</label>
                <div className="flex gap-2 items-center bg-black/40 border border-white/10 rounded-xl p-1.5 pl-4">
                  <div className="flex-1 font-mono text-sm text-white/70 truncate">
                    dt_live_sk_••••••••••••••••••••••••••••
                  </div>
                  <Button variant="primary" size="sm" onClick={copyApiKey}><FiCopy size={14} /> Salin</Button>
                </div>
              </div>
              <div className="border-t border-white/10 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Endpoint Tersedia</p>
                  <button className="text-xs text-primary hover:underline font-semibold" onClick={() => addNotification('Dokumentasi lengkap akan dibuka di tab baru', 'info')}>Docs ↗</button>
                </div>
                <div className="space-y-2">
                  {apiEndpoints.slice(0, 4).map(ep => (
                    <div key={ep.path} className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-smooth rounded-xl font-mono text-[11px]">
                      <span className={`px-2 py-1 rounded font-bold tracking-wider ${ep.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{ep.method}</span>
                      <span className="text-white/80 font-medium truncate flex-1">{ep.path}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Webhooks */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <FiLink size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Webhooks</h2>
                <p className="text-sm text-white/50">Kirim notifikasi ke server Anda saat ada event</p>
              </div>
            </div>
            <Card hover={false} className="glass border-white/10 h-[calc(100%-4rem)] flex flex-col">
              <div className="flex-1 space-y-3">
                <div className="p-3 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-smooth">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
                      <p className="text-sm font-semibold">Transaksi Baru</p>
                    </div>
                    <p className="text-xs text-white/40 font-mono truncate max-w-[200px]">https://api.myweb.com/hook/tx</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white" onClick={() => addNotification('Edit webhook', 'info')}><FiSettings size={14} /></button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400" onClick={() => addNotification('Hapus webhook', 'info')}><FiTrash2 size={14} /></button>
                  </div>
                </div>
                
                <div className="p-3 border border-white/10 bg-white/5 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-smooth">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                      <p className="text-sm font-semibold">Stok Menipis</p>
                    </div>
                    <p className="text-xs text-white/40 font-mono truncate max-w-[200px]">https://api.myweb.com/hook/stock</p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-smooth">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/60 hover:text-white" onClick={() => addNotification('Edit webhook', 'info')}><FiSettings size={14} /></button>
                    <button className="p-2 hover:bg-red-500/20 rounded-lg text-red-400" onClick={() => addNotification('Hapus webhook', 'info')}><FiTrash2 size={14} /></button>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <Button variant="secondary" className="w-full border-dashed hover:border-solid text-sm" onClick={() => addNotification('Tambah Endpoint baru', 'info')}>
                  <FiPlus /> Tambah Endpoint Webhook
                </Button>
              </div>
            </Card>
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
