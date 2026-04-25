'use client';

import { useState, useEffect, useCallback } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card } from '@/components/ui';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { formatCurrency, formatCurrencyCompact } from '@/utils/helpers';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const MONTHS_ID = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];

function linearRegression(data: number[]) {
  const n = data.length;
  if (n === 0) return { slope: 0, intercept: 0 };
  const xMean = (n - 1) / 2;
  const yMean = data.reduce((a, b) => a + b, 0) / n;
  let num = 0, den = 0;
  data.forEach((y, x) => { num += (x - xMean) * (y - yMean); den += (x - xMean) ** 2; });
  const slope = den !== 0 ? num / den : 0;
  const intercept = yMean - slope * xMean;
  return { slope, intercept };
}

const tooltipStyle = {
  contentStyle: { backgroundColor: '#18181B', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontSize: '12px' },
  labelStyle: { color: 'rgba(255,255,255,0.8)' },
};

export default function CashflowPage() {
  const { businessId, loading: authLoading } = useAuth({ requireAuth: true });
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ avgIncome: 0, avgExpense: 0, trend: 'stable' as 'up' | 'down' | 'stable' });

  const loadData = useCallback(async () => {
    if (!businessId) return;
    setLoading(true);

    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString();
    const { data: txData } = await supabase.from('transactions').select('type,amount,date').eq('business_id', businessId).gte('date', start);

    const transactions = txData || [];

    // Build monthly history (6 bulan lalu)
    const history: any[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = d.getMonth();
      const year = d.getFullYear();
      const inMonth = transactions.filter((t: any) => {
        const td = new Date(t.date);
        return td.getMonth() === month && td.getFullYear() === year;
      });
      const income = inMonth.filter((t: any) => t.type === 'income').reduce((s: number, t: any) => s + t.amount, 0);
      const expense = inMonth.filter((t: any) => t.type === 'expense').reduce((s: number, t: any) => s + t.amount, 0);
      history.push({ label: MONTHS_ID[month], income, expense, net: income - expense, predicted: false });
    }

    // Predict next 3 months using linear regression
    const incomeHistory = history.map(h => h.income);
    const expenseHistory = history.map(h => h.expense);
    const incomeReg = linearRegression(incomeHistory);
    const expenseReg = linearRegression(expenseHistory);

    for (let i = 1; i <= 3; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const x = history.length + i - 1;
      const income = Math.max(0, Math.round(incomeReg.slope * x + incomeReg.intercept));
      const expense = Math.max(0, Math.round(expenseReg.slope * x + expenseReg.intercept));
      history.push({ label: MONTHS_ID[d.getMonth()] + ' (est)', income, expense, net: income - expense, predicted: true });
    }

    const avgIncome = incomeHistory.reduce((a, b) => a + b, 0) / (incomeHistory.filter(v => v > 0).length || 1);
    const avgExpense = expenseHistory.reduce((a, b) => a + b, 0) / (expenseHistory.filter(v => v > 0).length || 1);
    const lastTwo = incomeHistory.slice(-2);
    const trend = lastTwo.length < 2 ? 'stable' : lastTwo[1] > lastTwo[0] ? 'up' : lastTwo[1] < lastTwo[0] ? 'down' : 'stable';

    setChartData(history);
    setSummary({ avgIncome, avgExpense, trend: trend as any });
    setLoading(false);
  }, [businessId]);

  useEffect(() => {
    if (authLoading) return;
    if (!businessId) { setLoading(false); return; }
    loadData();
  }, [authLoading, businessId, loadData]);

  const TrendIcon = summary.trend === 'up' ? FiTrendingUp : summary.trend === 'down' ? FiTrendingDown : FiMinus;
  const trendColor = summary.trend === 'up' ? 'text-green-400' : summary.trend === 'down' ? 'text-red-400' : 'text-white/60';

  return (
    <DashboardLayout title="Prediksi Cashflow">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <p className="text-white/60 text-xs mb-1">Rata-rata Pendapatan / Bulan</p>
            <p className="text-2xl font-bold text-green-400">{formatCurrency(summary.avgIncome)}</p>
          </div>
          <div className="card">
            <p className="text-white/60 text-xs mb-1">Rata-rata Pengeluaran / Bulan</p>
            <p className="text-2xl font-bold text-red-400">{formatCurrency(summary.avgExpense)}</p>
          </div>
          <div className="card">
            <p className="text-white/60 text-xs mb-1">Tren Pendapatan</p>
            <div className={`flex items-center gap-2 text-2xl font-bold ${trendColor}`}>
              <TrendIcon size={24} />
              <span className="capitalize">{summary.trend === 'up' ? 'Meningkat' : summary.trend === 'down' ? 'Menurun' : 'Stabil'}</span>
            </div>
          </div>
        </div>

        {/* Main Chart */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-bold">Arus Kas & Prediksi</h3>
              <p className="text-sm text-white/50 mt-1">6 bulan aktual + 3 bulan prediksi menggunakan analisis tren</p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs bg-accent/20 text-accent border border-accent/30">AI Prediksi</span>
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><div className="w-8 h-8 border-2 border-primary/40 border-t-primary rounded-full animate-spin" /></div>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11 }} />
                <YAxis stroke="rgba(255,255,255,0.4)" tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000000).toFixed(0)}jt`} />
                <Tooltip {...tooltipStyle} formatter={(v: number) => formatCurrency(v)} />
                <ReferenceLine x={chartData[5]?.label} stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" label={{ value: 'Sekarang', fill: 'rgba(255,255,255,0.4)', fontSize: 11 }} />
                <Area type="monotone" dataKey="income" name="Pendapatan" stroke="#8B5CF6" strokeWidth={2} fill="url(#incomeGrad)" dot={(props: any) => props.payload.predicted ? <circle cx={props.cx} cy={props.cy} r={3} fill="#8B5CF6" fillOpacity={0.5} strokeDasharray="3 3" /> : <circle cx={props.cx} cy={props.cy} r={3} fill="#8B5CF6" />} />
                <Area type="monotone" dataKey="expense" name="Pengeluaran" stroke="#EC4899" strokeWidth={2} fill="url(#expenseGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </motion.div>

        {/* Net Cashflow Table */}
        {!loading && chartData.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 className="text-lg font-bold mb-4">Rincian Net Cashflow</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 text-xs">
                    <th className="text-left py-2 pr-4">Bulan</th>
                    <th className="text-right py-2 pr-4">Pendapatan</th>
                    <th className="text-right py-2 pr-4">Pengeluaran</th>
                    <th className="text-right py-2">Net</th>
                    <th className="text-right py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((row, i) => (
                    <tr key={i} className={`border-b border-white/5 ${row.predicted ? 'opacity-60' : ''}`}>
                      <td className="py-2.5 pr-4 font-medium">{row.label}</td>
                      <td className="py-2.5 pr-4 text-right text-green-400">{formatCurrencyCompact(row.income)}</td>
                      <td className="py-2.5 pr-4 text-right text-red-400">{formatCurrencyCompact(row.expense)}</td>
                      <td className={`py-2.5 text-right font-semibold ${row.net >= 0 ? 'text-green-400' : 'text-red-400'}`}>{formatCurrencyCompact(row.net)}</td>
                      <td className="py-2.5 text-right">
                        {row.predicted ? <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">Prediksi</span> : <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">Aktual</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
