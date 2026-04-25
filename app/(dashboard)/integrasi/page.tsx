'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, Button } from '@/components/ui';
import { FiLink, FiCheckCircle, FiExternalLink, FiCode, FiCopy } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useNotificationStore } from '@/store';

const paymentMethods = [
  { id: 'qris', name: 'QRIS', desc: 'Scan QR untuk semua e-wallet & mobile banking', icon: '📱', color: 'bg-blue-500/20 border-blue-500/30', status: 'Siap Diaktifkan' },
  { id: 'gojek', name: 'GoPay', desc: 'Terima pembayaran via GoJek', icon: '🟢', color: 'bg-green-500/20 border-green-500/30', status: 'Siap Diaktifkan' },
  { id: 'ovo', name: 'OVO', desc: 'Integrasi dengan OVO merchant', icon: '💜', color: 'bg-purple-500/20 border-purple-500/30', status: 'Siap Diaktifkan' },
  { id: 'bca', name: 'BCA Virtual Account', desc: 'Terima transfer via VA BCA', icon: '🏦', color: 'bg-blue-400/20 border-blue-400/30', status: 'Segera Hadir' },
  { id: 'mandiri', name: 'Mandiri VA', desc: 'Virtual Account Bank Mandiri', icon: '🏦', color: 'bg-yellow-500/20 border-yellow-500/30', status: 'Segera Hadir' },
  { id: 'dana', name: 'DANA', desc: 'Terima pembayaran via DANA', icon: '💙', color: 'bg-sky-500/20 border-sky-500/30', status: 'Siap Diaktifkan' },
];

const ecommerceChannels = [
  { name: 'Tokopedia', icon: '🛒', color: 'bg-green-500/10', desc: 'Sinkronisasi pesanan & stok otomatis', badge: 'Populer' },
  { name: 'Shopee', icon: '🧡', color: 'bg-orange-500/10', desc: 'Auto-import transaksi dari Shopee Seller', badge: 'Populer' },
  { name: 'Lazada', icon: '🔵', color: 'bg-blue-500/10', desc: 'Kelola pesanan Lazada di satu tempat', badge: '' },
  { name: 'TikTok Shop', icon: '⚫', color: 'bg-white/5', desc: 'Integrasi dengan TikTok Shop seller center', badge: 'Baru' },
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
  const [activePayment, setActivePayment] = useState<Set<string>>(new Set());
  const [activeChannel, setActiveChannel] = useState<Set<string>>(new Set());

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

  const toggleChannel = (name: string) => {
    setActiveChannel(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name); else next.add(name);
      addNotification(next.has(name) ? `${name} berhasil terhubung ✓` : `${name} terputus`, next.has(name) ? 'success' : 'info');
      return next;
    });
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText('dt_live_sk_••••••••••••••••••••••••••••••••');
    addNotification('API Key disalin ke clipboard', 'success');
  };

  return (
    <DashboardLayout title="Integrasi & API">
      <div className="space-y-8">
        {/* Payment Methods */}
        <div>
          <h2 className="text-xl font-bold mb-1">Metode Pembayaran</h2>
          <p className="text-sm text-white/50 mb-5">Aktifkan payment gateway untuk terima pembayaran digital dari pelanggan</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paymentMethods.map((pm, idx) => {
              const isActive = activePayment.has(pm.id);
              return (
                <motion.div key={pm.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Card hover={false} className={`border transition-smooth ${pm.color} ${isActive ? 'ring-1 ring-primary/50' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{pm.icon}</span>
                        <div>
                          <p className="font-semibold text-sm">{pm.name}</p>
                          {pm.status === 'Segera Hadir' && <span className="text-xs text-white/40">{pm.status}</span>}
                        </div>
                      </div>
                      {isActive && <FiCheckCircle size={16} className="text-green-400 flex-shrink-0" />}
                    </div>
                    <p className="text-xs text-white/60 mb-3">{pm.desc}</p>
                    <button onClick={() => togglePayment(pm.id)}
                      className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-smooth ${isActive ? 'bg-primary/20 text-primary' : pm.status === 'Segera Hadir' ? 'bg-white/5 text-white/30 cursor-not-allowed' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                      {isActive ? 'Aktif — Klik untuk Nonaktifkan' : pm.status}
                    </button>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* E-Commerce */}
        <div>
          <h2 className="text-xl font-bold mb-1">Integrasi E-Commerce</h2>
          <p className="text-sm text-white/50 mb-5">Hubungkan toko online Anda untuk sinkronisasi transaksi dan stok otomatis</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ecommerceChannels.map((ch, idx) => {
              const isConnected = activeChannel.has(ch.name);
              return (
                <motion.div key={ch.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                  <Card hover={false} className={`${isConnected ? 'ring-1 ring-green-500/40' : ''}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${ch.color} rounded-xl flex items-center justify-center text-2xl`}>{ch.icon}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold">{ch.name}</p>
                            {ch.badge && <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent">{ch.badge}</span>}
                          </div>
                          <p className="text-xs text-white/50">{ch.desc}</p>
                        </div>
                      </div>
                      <button onClick={() => toggleChannel(ch.name)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth flex-shrink-0 ${isConnected ? 'bg-green-500/20 text-green-400' : 'bg-white/10 hover:bg-white/20'}`}>
                        {isConnected ? <span className="flex items-center gap-1"><FiCheckCircle size={12} /> Terhubung</span> : 'Hubungkan'}
                      </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Open API */}
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><FiCode /> API Terbuka</h2>
          <p className="text-sm text-white/50 mb-5">Integrasikan DuitTrack dengan sistem lain menggunakan REST API</p>
          <Card hover={false}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-2">API Key Anda</label>
              <div className="flex gap-2 items-center">
                <div className="flex-1 font-mono text-sm bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white/60 truncate">
                  dt_live_sk_••••••••••••••••••••••••••••••••
                </div>
                <Button variant="secondary" size="sm" onClick={copyApiKey}><FiCopy size={14} /> Salin</Button>
              </div>
              <p className="text-xs text-white/30 mt-1">Jaga kerahasiaan API Key Anda. Jangan bagikan ke pihak manapun.</p>
            </div>
            <div className="border-t border-white/10 pt-4">
              <p className="text-sm font-semibold mb-3 text-white/70">Endpoint Tersedia</p>
              <div className="space-y-2">
                {apiEndpoints.map(ep => (
                  <div key={ep.path} className="flex items-center gap-3 p-2.5 bg-white/5 rounded-lg font-mono text-xs">
                    <span className={`px-2 py-0.5 rounded font-bold ${ep.method === 'GET' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{ep.method}</span>
                    <span className="text-white/80">{ep.path}</span>
                    <span className="text-white/40 hidden sm:block">{ep.desc}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 flex items-center gap-2 text-sm text-primary hover:underline" onClick={() => addNotification('Dokumentasi API akan segera hadir', 'info')}>
                <FiExternalLink size={14} /> Lihat dokumentasi lengkap
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
