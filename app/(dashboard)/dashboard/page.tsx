'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar,
  PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { DashboardLayout } from '@/components/dashboard-layout';
import { StatCard, Button } from '@/components/ui';
import { FiTrendingUp, FiDollarSign, FiBox, FiBarChart2, FiArrowRight } from 'react-icons/fi';
import { formatCurrency, formatCurrencyCompact } from '@/utils/helpers';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

const MONTHS_ID = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const tooltipStyle = {
  contentStyle: { backgroundColor: '#18181B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '12px' },
  labelStyle: { color: 'rgba(255,255,255,0.8)' },
};

export default function DashboardPage() {
  const { businessId, business, loading: authLoading } = useAuth({ requireAuth: true });

  const [stats, setStats] = useState({ totalRevenue: 0, totalExpense: 0, profit: 0, inventoryValue: 0 });
  const [chartData, setChartData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topCustomers, setTopCustomers] = useState<any[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = useCallback(async () => {
    if (!businessId) return;
    setLoading(true);

    const now = new Date();
    const yearStart = new Date(now.getFullYear(), 0, 1).toISOString();

    // Fetch semua transaksi tahun ini
    const [{ data: txData }, { data: inventoryData }, { data: customersData }] = await Promise.all([
      supabase.from('transactions').select('*').eq('business_id', businessId).gte('date', yearStart),
      supabase.from('inventory').select('quantity, unit_price').eq('business_id', businessId),
      supabase.from('customers').select('name, total_purchased, total_transactions').eq('business_id', businessId).order('total_purchased', { ascending: false }).limit(5),
    ]);

    const transactions = txData || [];
    const inventory = inventoryData || [];
    const customers = customersData || [];

    // Stats ringkasan
    const totalRevenue = transactions.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0);
    const totalExpense = transactions.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0);
    const inventoryValue = inventory.reduce((s: number, i: any) => s + i.quantity * i.unit_price, 0);
    setStats({ totalRevenue, totalExpense, profit: totalRevenue - totalExpense, inventoryValue });

    // Chart data per bulan (6 bulan terakhir)
    const last6 = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
      return { month: d.getMonth(), year: d.getFullYear(), label: MONTHS_ID[d.getMonth()] };
    });

    const monthly = last6.map(({ month, year, label }) => {
      const inMonth = transactions.filter((t: any) => {
        const d = new Date(t.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });
      const pendapatan = inMonth.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0);
      const pengeluaran = inMonth.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0);
      return { bulan: label, pendapatan, pengeluaran, laba: pendapatan - pengeluaran };
    });
    setChartData(monthly);

    // Kategori pengeluaran
    const expenseTx = transactions.filter((t: any) => t.type === 'expense');
    const catMap: Record<string, number> = {};
    expenseTx.forEach((t: any) => { catMap[t.category] = (catMap[t.category] || 0) + t.amount; });
    const COLORS = ['#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B', '#10B981', '#F97316'];
    const catArr = Object.entries(catMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, value], i) => ({ name, value: Math.round((value / totalExpense) * 100) || 0, fill: COLORS[i] }));
    setCategoryData(catArr);

    setTopCustomers(customers);

    // Recent transactions
    const { data: recent } = await supabase
      .from('transactions')
      .select('*')
      .eq('business_id', businessId)
      .order('date', { ascending: false })
      .limit(5);
    setRecentTransactions(recent || []);

    setLoading(false);
  }, [businessId]);

  useEffect(() => { 
    if (authLoading) return;
    if (!businessId) {
      setLoading(false);
      return;
    }
    loadDashboardData(); 
  }, [authLoading, businessId, loadDashboardData]);

  const prevMonth = chartData[chartData.length - 2];
  const currMonth = chartData[chartData.length - 1];
  const revenueChange = prevMonth?.pendapatan > 0
    ? ((currMonth?.pendapatan - prevMonth?.pendapatan) / prevMonth?.pendapatan) * 100 : 0;

  if (loading) {
    return (
      <DashboardLayout title="Dashboard">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="card h-28 animate-pulse bg-white/5" />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={`Dashboard${business ? ' — ' + business.name : ''}`}>
      <div className="space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard
            label="Total Pendapatan"
            value={formatCurrency(stats.totalRevenue)}
            compact={formatCurrencyCompact(stats.totalRevenue)}
            icon={<FiDollarSign />}
            change={revenueChange}
            trend={revenueChange >= 0 ? 'up' : 'down'}
          />
          <StatCard
            label="Total Pengeluaran"
            value={formatCurrency(stats.totalExpense)}
            compact={formatCurrencyCompact(stats.totalExpense)}
            icon={<FiTrendingUp />}
          />
          <StatCard
            label="Laba Bersih"
            value={formatCurrency(stats.profit)}
            compact={formatCurrencyCompact(stats.profit)}
            icon={<FiBarChart2 />}
          />
          <StatCard
            label="Nilai Inventori"
            value={formatCurrency(stats.inventoryValue)}
            compact={formatCurrencyCompact(stats.inventoryValue)}
            icon={<FiBox />}
          />
        </div>

        {stats.totalRevenue === 0 && stats.totalExpense === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-bold mb-2">Belum ada data transaksi</h3>
            <p className="text-white/50 mb-4 text-sm">Mulai dengan menambahkan transaksi pertama Anda.</p>
            <Link href="/transactions">
              <Button variant="primary" size="sm">Tambah Transaksi <FiArrowRight /></Button>
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="lg:col-span-2 card">
                <h3 className="text-base md:text-xl font-bold mb-4 md:mb-6">Tren 6 Bulan Terakhir</h3>
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                    <XAxis dataKey="bulan" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(0)}jt`} />
                    <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="pendapatan" name="Pendapatan" stroke="#8B5CF6" strokeWidth={2} dot={{ r: 3 }} />
                    <Line type="monotone" dataKey="pengeluaran" name="Pengeluaran" stroke="#EC4899" strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
                <h3 className="text-base md:text-xl font-bold mb-4 md:mb-6">Kategori Pengeluaran</h3>
                {categoryData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value">
                          {categoryData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                        </Pie>
                        <Tooltip {...tooltipStyle} formatter={(v: number) => `${v}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="mt-3 space-y-1.5">
                      {categoryData.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: cat.fill }} />
                            <span className="text-white/70 truncate">{cat.name}</span>
                          </div>
                          <span className="font-semibold ml-2">{cat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-white/40 text-sm text-center py-8">Belum ada data pengeluaran.</p>
                )}
              </motion.div>
            </div>

            {/* Bar Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
              <h3 className="text-base md:text-xl font-bold mb-4 md:mb-6">Pendapatan vs Pengeluaran</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={chartData} barSize={20}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="bulan" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 12 }} />
                  <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11 }} tickFormatter={(v) => `${(v/1000000).toFixed(0)}jt`} />
                  <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="pendapatan" name="Pendapatan" fill="#8B5CF6" radius={[4,4,0,0]} />
                  <Bar dataKey="pengeluaran" name="Pengeluaran" fill="#EC4899" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Transaksi Terbaru */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base md:text-xl font-bold">Transaksi Terbaru</h3>
                  <Link href="/transactions"><Button variant="secondary" size="sm">Lihat Semua</Button></Link>
                </div>
                {recentTransactions.length === 0 ? (
                  <p className="text-white/40 text-sm py-4 text-center">Belum ada transaksi.</p>
                ) : (
                  <div className="space-y-2">
                    {recentTransactions.map(tx => (
                      <div key={tx.id} className="flex items-center justify-between p-3 border border-white/5 rounded-xl hover:bg-white/5">
                        <div>
                          <p className="text-sm font-medium">{tx.description}</p>
                          <p className="text-xs text-white/40">{tx.category}</p>
                        </div>
                        <p className={`text-sm font-semibold ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.type === 'income' ? '+' : '-'}{formatCurrencyCompact(tx.amount)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Pelanggan Teratas */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base md:text-xl font-bold">Pelanggan Teratas</h3>
                  <Link href="/crm"><Button variant="secondary" size="sm">Lihat Semua</Button></Link>
                </div>
                {topCustomers.length === 0 ? (
                  <p className="text-white/40 text-sm py-4 text-center">Belum ada data pelanggan.</p>
                ) : (
                  <div className="space-y-2">
                    {topCustomers.map((customer, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-white/5 rounded-xl hover:bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                            {customer.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{customer.name}</p>
                            <p className="text-xs text-white/40">{customer.total_transactions} transaksi</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-accent">{formatCurrencyCompact(customer.total_purchased)}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
