'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiTrendingUp, FiCpu, FiShield,
  FiZap, FiBarChart2, FiUsers, FiX, FiCheck, FiSend, FiImage, FiLock, FiGlobe, FiPieChart, FiTag, FiPenTool, FiTruck
} from 'react-icons/fi';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { FeatureShowcase } from '@/components/ui/feature-showcase';

// Premium Preview Components for Showcase
const QualityPreview = () => (
  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden group">
    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
        <FiImage size={20} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900">Resolusi Tinggi</h3>
        <p className="text-xs text-slate-500">Cetak Tajam & Jernih</p>
      </div>
    </div>
    <div className="flex-grow flex flex-col gap-3 justify-center">
      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
        <span className="text-xs font-bold text-slate-700">CMYK Color Profile</span>
        <span className="text-[10px] text-emerald-600 font-bold px-2 py-1 bg-emerald-100 rounded-md">Matched</span>
      </div>
      <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100">
        <span className="text-xs font-bold text-slate-700">Resolusi (DPI)</span>
        <span className="text-[10px] text-indigo-600 font-bold px-2 py-1 bg-indigo-100 rounded-md">300+ DPI</span>
      </div>
    </div>
  </div>
);

const SpeedPreview = () => (
  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h3 className="text-sm font-bold text-slate-900">Proses Cepat</h3>
        <p className="text-xs text-slate-500">Selesai tepat waktu</p>
      </div>
      <span className="px-2 py-1 rounded-md bg-rose-50 text-rose-600 text-[10px] font-bold border border-rose-100">
        Express
      </span>
    </div>
    <div className="flex-grow flex flex-col justify-center space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-sm">
          <FiCheck size={12} />
        </div>
        <div className="flex-grow h-1 bg-emerald-100 rounded-full" />
      </div>
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-sm animate-pulse">
          <FiZap size={12} />
        </div>
        <div className="flex-grow h-1 bg-slate-100 rounded-full" />
      </div>
      <p className="text-xs text-center text-slate-500 font-medium">Sedang diproses...</p>
    </div>
  </div>
);

const PricePreview = () => (
  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
    <div className="mb-4">
      <h3 className="text-sm font-bold text-slate-900">Harga Terbaik</h3>
      <p className="text-xs text-slate-500">Transparan tanpa biaya tersembunyi</p>
    </div>
    <div className="flex-grow bg-slate-50 rounded-xl p-4 border border-slate-100 flex flex-col gap-2">
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Cetak A3+ (100 lbr)</span>
        <span className="font-bold text-slate-900">Rp 150.000</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-slate-500">Banner 3x1m</span>
        <span className="font-bold text-slate-900">Rp 60.000</span>
      </div>
      <div className="border-t border-slate-200 my-1" />
      <div className="flex justify-between text-xs">
        <span className="font-bold text-slate-700">Total</span>
        <span className="font-bold text-indigo-600">Rp 210.000</span>
      </div>
    </div>
  </div>
);

const DesignPreview = () => (
  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
     <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
        <FiCpu size={20} />
      </div>
      <div>
        <h3 className="text-sm font-bold text-slate-900">Layanan Desain</h3>
        <p className="text-xs text-slate-500">Custom sesuai keinginan</p>
      </div>
    </div>
    <div className="flex-grow grid grid-cols-3 gap-2">
      {['bg-rose-400', 'bg-indigo-400', 'bg-emerald-400', 'bg-amber-400', 'bg-sky-400', 'bg-violet-400'].map((bg, i) => (
        <div key={i} className={`rounded-lg ${bg} opacity-80 hover:opacity-100 transition-opacity cursor-pointer`} />
      ))}
    </div>
  </div>
);

const OrderPreview = () => (
  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-bold text-slate-900">Pemesanan Online</h3>
      <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center">
        <FiSend size={14} />
      </div>
    </div>
    <div className="space-y-3">
      <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
        <p className="text-xs font-bold text-slate-700 mb-1">Upload File Anda</p>
        <div className="w-full py-2 bg-white border border-dashed border-slate-300 rounded-lg text-center">
          <span className="text-[10px] text-slate-400">PDF, JPG, PNG, CDR</span>
        </div>
      </div>
      <button className="w-full py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg shadow-sm">
        Kirim Pesanan
      </button>
    </div>
  </div>
);

const DeliveryPreview = () => (
  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col relative overflow-hidden">
    <div className="mb-6">
      <h3 className="text-sm font-bold text-slate-900">Layanan Antar</h3>
      <p className="text-xs text-slate-500">Terima beres di lokasi Anda</p>
    </div>
    <div className="flex-grow flex flex-col justify-center items-center gap-3">
      <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
        <FiGlobe size={24} />
      </div>
      <p className="text-xs text-center text-slate-600 font-medium">Pengiriman ke seluruh kota dengan kurir terpercaya.</p>
    </div>
  </div>
);

const features = [
  {
    icon: <FiImage />,
    color: 'text-indigo-600',
    baseColor: 'bg-indigo-600',
    accentBg: 'bg-indigo-50',
    title: 'Kualitas Premium',
    description: 'Hasil cetak tajam, warna presisi, dan menggunakan bahan baku berkualitas terbaik.',
    preview: <QualityPreview />
  },
  {
    icon: <FiZap />,
    color: 'text-rose-500',
    baseColor: 'bg-rose-500',
    accentBg: 'bg-rose-50',
    title: 'Proses Cepat',
    description: 'Waktu produksi efisien. Siap melayani kebutuhan cetak mendesak Anda tepat waktu.',
    preview: <SpeedPreview />
  },
  {
    icon: <FiTag />,
    color: 'text-amber-500',
    baseColor: 'bg-amber-500',
    accentBg: 'bg-amber-50',
    title: 'Harga Bersahabat',
    description: 'Dapatkan harga kompetitif dengan kualitas cetak profesional, tanpa biaya tersembunyi.',
    preview: <PricePreview />
  },
  {
    icon: <FiPenTool />,
    color: 'text-emerald-500',
    baseColor: 'bg-emerald-500',
    accentBg: 'bg-emerald-50',
    title: 'Layanan Desain',
    description: 'Belum punya desain? Tim desain grafis kami siap mewujudkan ide kreatif Anda.',
    preview: <DesignPreview />
  },
  {
    icon: <FiSend />,
    color: 'text-sky-500',
    baseColor: 'bg-sky-500',
    accentBg: 'bg-sky-50',
    title: 'Pemesanan Mudah',
    description: 'Kirim file dari rumah, lakukan pembayaran online, dan pesanan langsung diproses.',
    preview: <OrderPreview />
  },
  {
    icon: <FiTruck />,
    color: 'text-violet-500',
    baseColor: 'bg-violet-500',
    accentBg: 'bg-violet-50',
    title: 'Layanan Antar',
    description: 'Tidak sempat ambil? Kami menyediakan layanan pengantaran langsung ke lokasi Anda.',
    preview: <DeliveryPreview />
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900" style={{ backgroundColor: '#ffffff', color: '#0f172a' }}>
      
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3.5 bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-full shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-white" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-slate-900">
              MJ<span className="text-slate-400 font-medium"> Print</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#fitur" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Fitur</Link>
            <Link href="#keunggulan" className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">Keunggulan</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="btn-primary py-2 px-5 text-xs">Login Admin</Link>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO ── */}
      <PrismaHero />

      {/* ── FEATURES SHOWCASE ── */}
      <section id="fitur" className="py-24 px-6 relative bg-white border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-indigo-600 font-bold text-sm tracking-widest uppercase mb-3">Melayani</h2>
            <h3 className="font-display font-black text-3xl md:text-5xl text-slate-900 mb-4 tracking-tight">
              Solusi Cetak Cepat <br/>Kualitas Teratas
            </h3>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Dari kebutuhan kantor hingga alat promosi, MJ Print menghadirkan layanan cetak terbaik dengan harga transparan dan proses super cepat.
            </p>
          </div>
          <FeatureShowcase features={features} />
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section id="keunggulan" className="py-24 px-6 bg-slate-50 relative overflow-hidden">
        {/* Decorative BG element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-100/50 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h3 className="font-display font-black text-3xl md:text-4xl text-slate-900 mb-4 tracking-tight">
              Kenapa Memilih MJ Print?
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Old Way */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-rose-500" />
              <div className="flex items-center gap-2 text-rose-500 font-bold mb-6 text-sm uppercase tracking-wider">
                <FiX size={18} /> Tempat Print Biasa
              </div>
              <ul className="space-y-4">
                {[
                  'Antrean panjang dan membuang waktu',
                  'Hasil cetak kurang tajam / warna pudar',
                  'Harga seringkali tidak transparan',
                  'Proses produksi lama dan sering telat',
                  'Harus datang langsung bawa flashdisk'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600 text-sm">
                    <FiX className="text-rose-400 mt-0.5 flex-shrink-0" /> {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* MJ Print Way */}
            <div className="bg-indigo-600 rounded-3xl p-8 shadow-indigo relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="flex items-center gap-2 text-indigo-100 font-bold mb-6 text-sm uppercase tracking-wider">
                <FiCheck size={18} /> Bersama MJ Print
              </div>
              <ul className="space-y-4 relative z-10">
                {[
                  'Pesan online, tanpa perlu antre',
                  'Kualitas cetak premium resolusi tinggi',
                  'Harga bersahabat dan transparan',
                  'Pengerjaan super cepat & tepat waktu',
                  'File bisa dikirim dari mana saja'
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3 text-indigo-50 text-sm">
                    <FiCheck className="text-indigo-300 mt-0.5 flex-shrink-0" /> {text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-white border-t border-slate-100 text-center">
        <h2 className="font-display font-black text-3xl md:text-5xl text-slate-900 mb-6 tracking-tight">
          Siap Cetak Kebutuhan Anda?
        </h2>
        <p className="text-slate-500 text-lg mb-8 max-w-lg mx-auto">
          Hubungi kami sekarang untuk harga terbaik dan proses cetak yang super cepat.
        </p>
        <a href="https://maps.app.goo.gl/oDD4wcXpnfUzknNm7" target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-4 inline-flex items-center gap-2">
          Kesana Sekarang <FiArrowRight />
        </a>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-slate-200 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="font-display font-bold text-lg text-slate-900">MJ Print</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} MJ Print. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
