'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, Button } from '@/components/ui';
import { FiAward, FiStar, FiRefreshCw, FiTarget, FiBriefcase, FiDollarSign, FiTrendingUp, FiActivity, FiBox, FiCheckCircle, FiShield } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/utils/helpers';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

interface Badge {
  id: string;
  icon: any;
  title: string;
  desc: string;
  unlocked: boolean;
  unlockedAt?: string;
  condition: string;
}

const BADGE_DEFINITIONS = [
  { id: 'badge_first_tx',    icon: FiTarget,      title: 'Awal yang Baik',     desc: 'Transaksi pertama dicatat',              condition: '1 transaksi' },
  { id: 'badge_10_tx',       icon: FiBriefcase,   title: 'Pebisnis Aktif',     desc: '10 transaksi berhasil dicatat',          condition: '10 transaksi' },
  { id: 'badge_1m_revenue',  icon: FiDollarSign,  title: 'Jutawan Pertama',    desc: 'Pendapatan mencapai Rp 1 juta',          condition: 'Rp 1 juta pendapatan' },
  { id: 'badge_margin_20',   icon: FiTrendingUp,  title: 'Margin Sehat',       desc: 'Margin keuntungan di atas 20%',          condition: 'Margin > 20%' },
  { id: 'badge_10m_revenue', icon: FiActivity,    title: 'Penjualan 10 Juta',  desc: 'Total pendapatan Rp 10 juta',            condition: 'Rp 10 juta pendapatan' },
  { id: 'badge_no_lowstock', icon: FiBox,         title: 'Stok Terjaga',       desc: 'Tidak ada item stok kritis',             condition: 'Tidak ada low stock' },
  { id: 'badge_50_tx',       icon: FiCheckCircle, title: 'Pengusaha Handal',   desc: '50 transaksi berhasil dicatat',          condition: '50 transaksi' },
  { id: 'badge_score_90',    icon: FiShield,      title: 'Raja Bisnis',        desc: 'Skor kesehatan bisnis di atas 90',       condition: 'Skor > 90' },
];

function calcScore(stats: { revenue: number; expense: number; txCount: number; lowStock: number; pendingDebt: number }): number {
  const { revenue, expense, txCount, lowStock, pendingDebt } = stats;
  let score = 100;
  if (txCount === 0) return 30;
  const margin = revenue > 0 ? (revenue - expense) / revenue : 0;
  if (margin < 0) score -= 30;
  else if (margin < 0.1) score -= 15;
  else if (margin >= 0.3) score += 10;
  if (lowStock > 3) score -= 10;
  if (pendingDebt > revenue * 0.5) score -= 15;
  if (txCount >= 10) score += 10;
  return Math.max(0, Math.min(100, score));
}

function checkBadgeEarned(badgeId: string, stats: { revenue: number; expense: number; txCount: number; lowStock: number; pendingDebt: number; margin: number }): boolean {
  const { revenue, txCount, margin, lowStock } = stats;
  const score = calcScore(stats);
  switch (badgeId) {
    case 'badge_first_tx':    return txCount >= 1;
    case 'badge_10_tx':       return txCount >= 10;
    case 'badge_1m_revenue':  return revenue >= 1000000;
    case 'badge_margin_20':   return margin >= 0.2;
    case 'badge_10m_revenue': return revenue >= 10000000;
    case 'badge_no_lowstock': return lowStock === 0 && txCount > 0;
    case 'badge_50_tx':       return txCount >= 50;
    case 'badge_score_90':    return score >= 90;
    default: return false;
  }
}

function ScoreRing({ score }: { score: number }) {
  const color = score >= 80 ? '#10B981' : score >= 60 ? '#F59E0B' : score >= 40 ? '#F97316' : '#EF4444';
  const r = 54, c = 2 * Math.PI * r, fill = (score / 100) * c;
  return (
    <div className="relative w-40 h-40 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
        <motion.circle cx="60" cy="60" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeLinecap="round" strokeDasharray={`${c}`} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c - fill }}
          transition={{ duration: 1.2, ease: 'easeOut' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="text-4xl font-black" style={{ color }}>{score}</motion.p>
        <p className="text-xs text-white/50">/ 100</p>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  const { businessId, user, loading: authLoading } = useAuth({ requireAuth: true });
  const [stats, setStats] = useState({ revenue: 0, expense: 0, txCount: 0, lowStock: 0, pendingDebt: 0, margin: 0 });
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  const syncBadges = useCallback(async (
    userId: string,
    currentStats: typeof stats,
    existingBadgeIds: Set<string>
  ) => {
    // Cek badge baru yang baru di-earn
    const newlyEarned = BADGE_DEFINITIONS.filter(
      (def) => !existingBadgeIds.has(def.id) && checkBadgeEarned(def.id, currentStats)
    );

    if (newlyEarned.length > 0) {
      const inserts = newlyEarned.map((def) => ({
        user_id: userId,
        badge: def.id,
        title: def.title,
        description: def.desc,
      }));
      await supabase.from('achievements').insert(inserts);
    }
  }, []);

  const loadStats = useCallback(async () => {
    if (!businessId || !user?.id) return;
    setLoading(true);
    setSyncing(true);

    try {
      // 1. Ambil data transaksi, inventori, hutang, dan achievements dari DB secara paralel
      const [
        { data: txData },
        { data: invData },
        { data: debtData },
        { data: achData },
      ] = await Promise.all([
        supabase.from('transactions').select('type,amount').eq('business_id', businessId),
        supabase.from('inventory').select('quantity,reorder_level').eq('business_id', businessId),
        supabase.from('debts').select('status').eq('business_id', businessId),
        supabase.from('achievements').select('badge,unlocked_at').eq('user_id', user.id),
      ]);

      // 2. Hitung statistik
      const transactions = txData || [];
      const revenue = transactions.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0);
      const expense = transactions.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0);
      const lowStock = (invData || []).filter((i: any) => i.quantity <= i.reorder_level).length;
      const pendingDebt = (debtData || []).filter((d: any) => d.status === 'pending' || d.status === 'overdue').length;
      const margin = revenue > 0 ? (revenue - expense) / revenue : 0;
      const currentStats = { revenue, expense, txCount: transactions.length, lowStock, pendingDebt, margin };
      setStats(currentStats);

      // 3. Buat set badge yang sudah tersimpan di DB
      const savedBadges = achData || [];
      const existingBadgeIds = new Set(savedBadges.map((a: any) => a.badge));
      const savedBadgeMap = new Map(savedBadges.map((a: any) => [a.badge, a.unlocked_at]));

      // 4. Sync badge baru ke DB
      await syncBadges(user.id, currentStats, existingBadgeIds);

      // 5. Reload achievements setelah sync (supaya unlocked_at baru juga ikut)
      const { data: freshAch } = await supabase
        .from('achievements')
        .select('badge,unlocked_at')
        .eq('user_id', user.id);

      const freshMap = new Map((freshAch || []).map((a: any) => [a.badge, a.unlocked_at]));

      // 6. Gabungkan badge definition dengan status DB
      const finalBadges: Badge[] = BADGE_DEFINITIONS.map((def) => ({
        ...def,
        unlocked: freshMap.has(def.id),
        unlockedAt: freshMap.get(def.id) ?? undefined,
      }));

      setBadges(finalBadges);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, [businessId, user?.id, syncBadges]);

  useEffect(() => {
    if (authLoading) return;
    if (!businessId || !user?.id) { setLoading(false); return; }
    loadStats();
  }, [authLoading, businessId, user?.id, loadStats]);

  const score = calcScore(stats);
  const unlocked = badges.filter(b => b.unlocked).length;
  const healthLabel = score >= 80 ? 'Sangat Sehat' : score >= 60 ? 'Cukup Sehat' : score >= 40 ? 'Perlu Perhatian' : 'Kritis';
  const healthColor = score >= 80 ? 'text-green-400' : score >= 60 ? 'text-yellow-400' : score >= 40 ? 'text-orange-400' : 'text-red-400';

  return (
    <DashboardLayout title="Prestasi & Skor Bisnis">
      <div className="space-y-6">
        {loading ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="w-8 h-8 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
            <p className="text-sm text-white/40">{syncing ? 'Menyinkronkan prestasi...' : 'Memuat data...'}</p>
          </div>
        ) : (
          <>
            {/* Health Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card hover={false}>
                <h3 className="text-lg font-bold mb-4 text-center">Skor Kesehatan Bisnis</h3>
                <ScoreRing score={score} />
                <p className={`text-center text-lg font-bold mt-4 ${healthColor}`}>{healthLabel}</p>
                <p className="text-center text-sm text-white/50 mt-1">Berdasarkan margin, stok, dan riwayat transaksi</p>
              </Card>

              <Card hover={false}>
                <h3 className="text-lg font-bold mb-4">Ringkasan Bisnis</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Total Transaksi', value: `${stats.txCount} transaksi` },
                    { label: 'Total Pendapatan', value: formatCurrency(stats.revenue) },
                    { label: 'Margin Keuntungan', value: `${(stats.margin * 100).toFixed(1)}%` },
                    { label: 'Item Stok Rendah', value: `${stats.lowStock} item` },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-sm text-white/60">{item.label}</span>
                      <span className="text-sm font-semibold">{item.value}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={loadStats}
                  disabled={syncing}
                  className="mt-4 flex items-center gap-2 text-xs text-white/40 hover:text-white transition-smooth disabled:opacity-50"
                >
                  <FiRefreshCw size={12} className={syncing ? 'animate-spin' : ''} />
                  {syncing ? 'Menyinkronkan...' : 'Refresh & sinkron data'}
                </button>
              </Card>
            </div>

            {/* Badges */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2"><FiAward /> Lencana Prestasi</h3>
                <span className="text-sm text-white/50">{unlocked}/{badges.length} terbuka</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge, idx) => (
                  <motion.div key={badge.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.06 }}>
                    <Card hover={false} className={`text-center transition-smooth ${!badge.unlocked ? 'opacity-40 grayscale' : ''}`}>
                      <div className={`text-4xl mb-3 flex justify-center text-primary ${badge.unlocked ? '' : 'filter grayscale opacity-50'}`}>
                        <badge.icon />
                      </div>
                      <p className="font-semibold text-sm">{badge.title}</p>
                      <p className="text-xs text-white/50 mt-1">{badge.desc}</p>
                      {badge.unlocked ? (
                        <div className="mt-2">
                          <span className="inline-flex items-center gap-1 text-xs text-green-400"><FiStar size={10} /> Terbuka</span>
                          {badge.unlockedAt && (
                            <p className="text-xs text-white/25 mt-0.5">
                              {new Date(badge.unlockedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="mt-2 block text-xs text-white/30">{badge.condition}</span>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
