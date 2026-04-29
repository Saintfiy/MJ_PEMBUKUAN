'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FiArrowRight, FiTrendingUp, FiCpu, FiShield,
  FiZap, FiBarChart2, FiUsers, FiX, FiCheck, FiStar, FiSend, FiFileText, FiLock, FiGlobe, FiPieChart, FiImage
} from 'react-icons/fi';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { FeatureShowcase } from '@/components/ui/feature-showcase';
import Image from 'next/image';

const AIAssistantPreview = () => (
  <div className="w-full max-w-lg aspect-[1.4/1] rounded-3xl bg-[#121214] border border-white/10 flex flex-col p-6 shadow-2xl relative overflow-hidden group">
    <div className="flex flex-col items-center justify-center flex-grow text-center space-y-4 pt-10">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-2 shadow-inner">
        <FiCpu size={32} />
      </div>
      <h3 className="text-xl font-bold text-white tracking-tight">Asisten Keuangan AI</h3>
      <p className="text-white/40 text-sm max-w-xs">Tanyakan apa saja tentang keuangan Anda</p>
    </div>
    <div className="mt-auto space-y-5">
      <div className="flex gap-2 overflow-hidden opacity-60">
        {["Kondisi keuangan?", "Pengeluaran bulan ini?", "Laba bersih?"].map((chip, i) => (
          <div key={i} className="whitespace-nowrap px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] text-white/80">
            {chip}
          </div>
        ))}
      </div>
      <div className="relative">
        <div className="w-full h-11 rounded-xl bg-[#1c1c1f] border border-white/10 px-4 flex items-center">
          <span className="text-white/20 text-xs italic">Tanya tentang keuangan Anda...</span>
        </div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
          <FiSend size={12} />
        </div>
      </div>
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-500/10 blur-[80px] pointer-events-none" />
  </div>
);

const AnalyticsPreview = () => (
  <div className="w-full max-w-lg aspect-[1.4/1] rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col shadow-2xl relative overflow-hidden">
    <div className="flex justify-between items-start mb-6">
      <div className="space-y-1">
        <h3 className="text-lg font-bold text-white">Arus Kas & Prediksi</h3>
        <p className="text-white/30 text-[10px]">6 bulan aktual + 3 bulan prediksi</p>
      </div>
      <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/50">
        AI Prediksi
      </div>
    </div>
    
    <div className="flex-grow relative mt-4">
      {/* Grid Lines */}
      <div className="absolute inset-0 flex flex-col justify-between opacity-10">
        {[1,2,3,4].map(i => <div key={i} className="w-full h-px bg-white border-t border-dashed" />)}
      </div>
      
      {/* Mock Chart Lines */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 400 150">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Purple Line */}
        <path d="M0,100 Q50,60 100,110 T200,50 T300,60 T400,30" fill="transparent" stroke="#8b5cf6" strokeWidth="3" />
        <path d="M0,100 Q50,60 100,110 T200,50 T300,60 T400,30 L400,150 L0,150 Z" fill="url(#chartGradient)" />
        {/* Pink Line */}
        <path d="M0,120 Q50,115 100,130 T200,115 T300,120 T400,118" fill="transparent" stroke="#ec4899" strokeWidth="2" />
        
        {/* Marker */}
        <line x1="250" y1="0" x2="250" y2="150" stroke="white" strokeOpacity="0.2" strokeDasharray="4 4" />
        <text x="230" y="80" fill="white" fillOpacity="0.4" fontSize="10">Sekarang</text>
      </svg>
    </div>
    
    <div className="flex justify-between text-[10px] text-white/20 mt-2 font-mono uppercase tracking-tighter">
      <span>Nov</span><span>Jan</span><span>Mar</span><span>Mei (est)</span><span>Jul (est)</span>
    </div>
  </div>
);

const OCRPreview = () => (
  <div className="w-full max-w-lg aspect-[1.4/1] rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col shadow-2xl relative overflow-hidden">
    <div className="flex items-center justify-between mb-8">
      <h3 className="text-xl font-bold text-white">Scan Struk — Smart OCR</h3>
      <div className="flex gap-4 opacity-40">
        {[1,2,3,4].map(n => <div key={n} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">{n}</div>)}
      </div>
    </div>
    
    <div className="flex-grow flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02] space-y-4">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
        <FiImage size={32} />
      </div>
      <div className="text-center">
        <p className="text-white font-bold">Upload Foto Struk</p>
        <p className="text-white/30 text-xs">Drag & drop atau klik untuk pilih foto</p>
      </div>
    </div>
    
    <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border border-white/10">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-amber-400">💡</span>
        <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Tips untuk hasil terbaik:</p>
      </div>
      <div className="space-y-1 ml-6">
        <div className="h-1.5 w-full bg-white/5 rounded-full" />
        <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
      </div>
    </div>
  </div>
);

const SecurityPreview = () => (
  <div className="w-full max-w-lg aspect-[1.4/1] rounded-3xl bg-[#121214] border border-white/10 p-8 flex flex-col shadow-2xl relative overflow-hidden">
    <div className="flex items-center gap-3 mb-10">
      <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
        <FiShield size={22} />
      </div>
      <h3 className="text-xl font-bold text-white">Keamanan</h3>
    </div>
    
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Kata Sandi Baru</label>
        <div className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 flex items-center">
          <div className="w-24 h-2 bg-white/10 rounded-full" />
        </div>
        <p className="text-[10px] text-white/20">Min. 6 karakter</p>
      </div>
      
      <div className="space-y-3">
        <label className="text-xs font-bold text-white/40 uppercase tracking-widest">Konfirmasi Kata Sandi</label>
        <div className="w-full h-12 rounded-xl bg-white/[0.03] border border-white/10 px-4 flex items-center" />
      </div>
      
      <div className="pt-4">
        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-sm font-bold shadow-lg">
          <FiLock size={14} />
          Ubah Kata Sandi
        </div>
      </div>
    </div>
  </div>
);

const IntegrationsPreview = () => (
  <div className="w-full max-w-lg aspect-[1.4/1] rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col gap-4 shadow-2xl relative overflow-hidden">
    <div className="mb-4">
      <h3 className="text-xl font-bold text-white">Integrasi Marketplace</h3>
      <p className="text-white/30 text-xs">Hubungkan semua channel penjualan Anda</p>
    </div>
    
    <div className="space-y-3 overflow-hidden">
      {[
        { name: 'QRIS', color: 'bg-indigo-500', icon: <FiGlobe /> },
        { name: 'GoPay', color: 'bg-emerald-500', icon: <FiPieChart /> },
        { name: 'OVO', color: 'bg-purple-500', icon: <FiZap /> }
      ].map((item, i) => (
        <div key={i} className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between group transition-all hover:bg-white/[0.06]">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl ${item.color}/20 flex items-center justify-center text-white shadow-lg`}>
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-black text-white">{item.name}</p>
              <p className="text-[10px] text-white/30">Terhubung secara otomatis</p>
            </div>
          </div>
          <div className="w-12 h-6 rounded-full bg-white/10 p-1 flex justify-end">
            <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CRMPreview = () => (
  <div className="w-full max-w-lg aspect-[1.4/1] rounded-3xl bg-[#121214] border border-white/10 p-6 flex flex-col shadow-2xl relative overflow-hidden">
    <div className="mb-6 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold text-white">CRM Pelanggan</h3>
        <p className="text-white/30 text-xs">Daftar transaksi pelanggan aktif</p>
      </div>
      <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
        <FiUsers size={20} />
      </div>
    </div>
    
    <div className="space-y-3">
      {[
        { name: 'Keperluan kantor', amount: '-Rp175.000', tag: 'Perlengkapan', color: 'bg-red-500' },
        { name: 'Gaji karyawan', amount: '-Rp690.000', tag: 'Operasional', color: 'bg-red-500' },
        { name: 'Penjualan ritel', amount: '+Rp3.066.403', tag: 'Penjualan', color: 'bg-emerald-500' }
      ].map((item, i) => (
        <div key={i} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-bold text-white">{item.name}</p>
            <div className={`inline-block px-2 py-0.5 rounded-full ${item.color}/10 text-[9px] font-bold text-white/80 border border-white/5`}>
              {item.tag}
            </div>
          </div>
          <p className={`text-sm font-black ${item.amount.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
            {item.amount}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const features = [
  {
    icon: <FiCpu size={26} />,
    color: 'from-violet-500/30 to-violet-500/0 text-violet-400 border-violet-500/20',
    baseColor: 'bg-violet-500',
    title: 'Asisten Keuangan AI',
    description: 'Dapatkan rekomendasi cerdas dan wawasan tentang arus kas Anda secara instan.',
    preview: <AIAssistantPreview />
  },
  {
    icon: <FiBarChart2 size={26} />,
    color: 'from-pink-500/30 to-pink-500/0 text-pink-400 border-pink-500/20',
    baseColor: 'bg-pink-500',
    title: 'Analitik Real-time',
    description: 'Dashboard interaktif dengan grafik premium dan prediksi berbasis data.',
    preview: <AnalyticsPreview />
  },
  {
    icon: <FiZap size={26} />,
    color: 'from-cyan-500/30 to-cyan-500/0 text-cyan-400 border-cyan-500/20',
    baseColor: 'bg-cyan-500',
    title: 'Scan Struk (OCR)',
    description: 'Ambil foto struk, AI langsung ekstrak dan catat transaksi otomatis.',
    preview: <OCRPreview />
  },
  {
    icon: <FiShield size={26} />,
    color: 'from-green-500/30 to-green-500/0 text-green-400 border-green-500/20',
    baseColor: 'bg-green-500',
    title: 'Aman & Privat',
    description: 'Keamanan tingkat bank dengan enkripsi penuh dan Row-Level Security.',
    preview: <SecurityPreview />
  },
  {
    icon: <FiUsers size={26} />,
    color: 'from-amber-500/30 to-amber-500/0 text-amber-400 border-amber-500/20',
    baseColor: 'bg-amber-500',
    title: 'CRM Pelanggan',
    description: 'Pantau pelanggan terbaik, riwayat pembelian, dan pola transaksi.',
    preview: <CRMPreview />
  },
  {
    icon: <FiTrendingUp size={26} />,
    color: 'from-indigo-500/30 to-indigo-500/0 text-indigo-400 border-indigo-500/20',
    baseColor: 'bg-indigo-500',
    title: 'Integrasi Marketplace',
    description: 'Sinkronisasi otomatis dengan Tokopedia, Shopee, dan TikTok Shop.',
    preview: <IntegrationsPreview />
  },
];

const stats = [
  { value: '10K+', label: 'Pengguna Aktif' },
  { value: '99.9%', label: 'Uptime' },
  { value: 'Rp 50M+', label: 'Transaksi Tercatat' },
  { value: '4.9/5', label: 'Rating Pengguna' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Home() {

  return (
    <div className="min-h-screen bg-darker overflow-x-hidden">

      {/* ── SPLINE ROBOT — FIXED FULL-SCREEN BACKGROUND ── */}
      {/* NO pointer-events-none here — so the robot can track cursor movement */}
      <div className="fixed inset-0 z-0 w-full h-full overflow-hidden">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-FNsuGhtZ8mqBi4nYmcAU0QP3/"
          frameBorder="0"
          width="100%"
          title="DuitTrack AI Robot Background"
          className="w-full h-[calc(100%+70px)] pointer-events-auto"
        />
        {/* Overlay is pointer-events-none so it doesn't block cursor to the iframe below */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(9,9,11,0.3) 0%, rgba(9,9,11,0.1) 40%, rgba(9,9,11,0.4) 100%)' }}
        />
      </div>

      {/* ── ALL PAGE CONTENT — pointer-events-none so cursor falls through to robot ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 3, ease: 'easeInOut' }}
        className="relative z-10 pointer-events-none"
      >

        {/* ── PREMIUM FLOATING NAVBAR ── */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full pointer-events-auto px-4"
        >
          <nav 
            className="flex items-center justify-between w-full max-w-5xl px-5 py-3 rounded-full"
            style={{ 
              background: 'rgba(15, 15, 18, 0.4)', 
              backdropFilter: 'blur(24px)', 
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-indigo-400 p-[1px] shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <div className="w-full h-full bg-darker rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white flex items-center">
                Duit<span className="text-white/50 font-normal">Track</span>
              </span>
            </div>

            {/* Centered Nav Links (Hidden on small screens) */}
            <div className="hidden md:flex items-center gap-8 px-4">
              <Link href="#dashboard" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                Dashboard
              </Link>
              <Link href="#keunggulan" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                Keunggulan
              </Link>
              <Link href="#fitur" className="text-sm font-medium text-white/50 hover:text-white transition-colors">
                Fitur
              </Link>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:flex items-center justify-center px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors">
                Masuk
              </Link>
              <Link href="/register" className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                {/* Button Background & Border Glow */}
                <div className="absolute inset-0 bg-primary/20 rounded-full" />
                <div className="absolute inset-0 border border-primary/50 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                
                <span className="relative z-10 flex items-center gap-2 text-primary group-hover:text-white transition-colors">
                  Daftar Gratis <FiArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </nav>
        </motion.div>

        {/* ── PRISMA HERO ── */}
        <PrismaHero />

        {/* ── SCROLL ANIMATION SHOWCASE ── */}
        <section id="dashboard" className="relative w-full pointer-events-auto z-20 pt-10" style={{ background: 'rgba(9,9,11,0.2)' }}>
          <div className="flex flex-col overflow-hidden">
            <ContainerScroll
              titleComponent={
                <>
                  <h1 className="text-3xl md:text-5xl font-semibold text-white mb-4">
                    Lihat Bagaimana DuitTrack <br />
                    <span className="text-4xl md:text-[5rem] font-bold mt-2 leading-none gradient-text drop-shadow-lg block">
                      Mengubah Bisnis Anda
                    </span>
                  </h1>
                </>
              }
            >
              <Image
                src="/dashboard-preview.png"
                alt="DuitTrack Dashboard Preview"
                height={720}
                width={1400}
                className="mx-auto rounded-2xl object-cover h-full object-left-top"
                draggable={false}
              />
            </ContainerScroll>
          </div>
        </section>

        {/* ── WHY DUITTRACK (BENTO GRID) ── */}
        <section
          id="keunggulan"
          className="py-24 px-6 relative overflow-hidden pointer-events-auto border-t border-white/5"
          style={{ background: 'rgba(9,9,11,0.6)', backdropFilter: 'blur(20px)' }}
        >
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Mengapa DuitTrack?</p>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                Standar baru pembukuan
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Feature 1 - Large Bento Box */}
              <motion.div variants={itemVariants} className="md:col-span-2 relative overflow-hidden rounded-3xl p-8 md:p-12 border border-white/10 bg-darker/60 backdrop-blur-xl group cursor-default">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 blur-[80px] rounded-full group-hover:bg-primary/30 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col h-full justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    <FiCpu size={32} className="text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">AI yang Memahami <br className="hidden md:block" /> Konteks Bisnis Anda</h3>
                  <p className="text-white/60 text-base md:text-lg max-w-md leading-relaxed">
                    Bukan sekadar chatbot biasa. Asisten AI kami membaca riwayat transaksi Anda, mendeteksi kebocoran pengeluaran, dan memberi rekomendasi proaktif selayaknya konsultan keuangan kelas dunia.
                  </p>
                </div>
              </motion.div>

              {/* Feature 2 - Small Bento Box */}
              <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl p-8 border border-white/10 bg-darker/60 backdrop-blur-xl group cursor-default">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full transition-all duration-700 group-hover:scale-150" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-500/20 transition-colors">
                    <FiZap size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 mt-auto">Sistem Terintegrasi</h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    Pembukuan, inventori, hingga CRM dalam satu layar. Tidak perlu lagi berpindah aplikasi untuk mengelola operasional.
                  </p>
                </div>
              </motion.div>

              {/* Feature 3 - Wide Bento Box */}
              <motion.div variants={itemVariants} className="md:col-span-3 relative overflow-hidden rounded-3xl p-8 md:p-10 border border-white/10 bg-darker/60 backdrop-blur-xl group cursor-default flex flex-col md:flex-row items-start md:items-center gap-8">
                <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-green-500/10 blur-[60px] rounded-full transition-all duration-700 group-hover:scale-150" />
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 group-hover:bg-green-500/20 transition-colors shadow-lg">
                    <FiShield size={32} />
                  </div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3">Keamanan Kelas Enterprise</h3>
                  <p className="text-white/60 text-base max-w-2xl leading-relaxed">
                    Data Anda dilindungi dengan enkripsi berlapis, Row-Level Security dari Supabase, dan autentikasi yang aman. Kami memastikan bahwa privasi bisnis Anda 100% terlindungi dari akses pihak ketiga.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES (INTERACTIVE SHOWCASE) ── */}
        <section id="fitur" className="py-28 px-6 relative overflow-hidden pointer-events-auto border-t border-white/5" style={{ background: 'rgba(9,9,11,0.3)', backdropFilter: 'blur(12px)' }}>
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Fitur Unggulan</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Semua yang kamu butuhkan,<br />
                <span className="gradient-text">dalam satu platform</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">Dirancang khusus untuk pelaku UMKM Indonesia yang ingin bekerja seefisien perusahaan multinasional.</p>
            </motion.div>

            <FeatureShowcase features={features} />
          </div>
        </section>

        {/* ── COMPARISON: DUITTRACK vs KONVENSIONAL ── */}
        <section className="py-20 px-6" style={{ background: 'rgba(9,9,11,0.45)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">Perbandingan</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                DuitTrack vs Cara Lama
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Old Way */}
              <div className="p-7 rounded-2xl border border-red-500/20" style={{ background: 'rgba(239,68,68,0.05)' }}>
                <p className="text-red-400 font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2"><FiX size={16} /> Cara Konvensional</p>
                <ul className="space-y-3 text-white/60 text-sm">
                  {[
                    'Catat manual di buku / Excel setiap hari',
                    'Rekap laporan mingguan yang memakan waktu berjam-jam',
                    'Tidak tahu kondisi keuangan bisnis secara real-time',
                    'Struk dan nota sering hilang atau rusak',
                    'Data pelanggan tersebar di banyak tempat',
                    'Tidak ada peringatan jika keuangan mulai bermasalah',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-red-400 mt-0.5 flex-shrink-0"><FiX /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DuitTrack */}
              <div className="p-7 rounded-2xl border border-primary/30" style={{ background: 'rgba(139,92,246,0.08)' }}>
                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-5 flex items-center gap-2"><FiCheck size={16} /> Dengan DuitTrack</p>
                <ul className="space-y-3 text-white/70 text-sm">
                  {[
                    'Catat transaksi dalam hitungan detik, atau scan struk otomatis',
                    'Laporan keuangan & grafik tersedia real-time tanpa effort',
                    'Dashboard live — tahu kondisi bisnis kapanpun, dimanapun',
                    'Semua struk tersimpan digital & aman di cloud',
                    'CRM terpusat: semua data pelanggan dalam satu tempat',
                    'AI aktif memantau dan memberi peringatan dini otomatis',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="text-primary mt-0.5 flex-shrink-0"><FiCheck /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/10 py-10 px-6" style={{ background: 'rgba(9,9,11,0.55)', backdropFilter: 'blur(16px)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-black">
              <span className="gradient-text">Duit</span><span className="text-white">Track</span>
            </div>
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} DuitTrack. Hak cipta dilindungi undang-undang.</p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/login" className="pointer-events-auto hover:text-white transition-colors">Masuk</Link>
              <Link href="/register" className="pointer-events-auto hover:text-white transition-colors">Daftar</Link>
            </div>
          </div>
        </footer>

      </motion.div>
    </div>
  );
}
