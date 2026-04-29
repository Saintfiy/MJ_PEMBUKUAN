'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FiArrowRight, FiTrendingUp, FiCpu, FiShield,
  FiZap, FiBarChart2, FiUsers, FiX, FiCheck, FiStar
} from 'react-icons/fi';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { PrismaHero } from '@/components/ui/prisma-hero';
import { SpotlightCard } from '@/components/ui/spotlight-card';
import { FeatureShowcase } from '@/components/ui/feature-showcase';
import Image from 'next/image';

const features = [
  {
    icon: <FiCpu size={26} />,
    color: 'from-violet-500/30 to-violet-500/0 text-violet-400 border-violet-500/20',
    baseColor: 'bg-violet-500',
    title: 'Asisten Keuangan AI',
    description: 'Dapatkan rekomendasi cerdas dan wawasan tentang arus kas Anda secara instan.',
  },
  {
    icon: <FiBarChart2 size={26} />,
    color: 'from-pink-500/30 to-pink-500/0 text-pink-400 border-pink-500/20',
    baseColor: 'bg-pink-500',
    title: 'Analitik Real-time',
    description: 'Dashboard interaktif dengan grafik premium dan prediksi berbasis data.',
  },
  {
    icon: <FiZap size={26} />,
    color: 'from-cyan-500/30 to-cyan-500/0 text-cyan-400 border-cyan-500/20',
    baseColor: 'bg-cyan-500',
    title: 'Scan Struk (OCR)',
    description: 'Ambil foto struk, AI langsung ekstrak dan catat transaksi otomatis.',
  },
  {
    icon: <FiShield size={26} />,
    color: 'from-green-500/30 to-green-500/0 text-green-400 border-green-500/20',
    baseColor: 'bg-green-500',
    title: 'Aman & Privat',
    description: 'Keamanan tingkat bank dengan enkripsi penuh dan Row-Level Security.',
  },
  {
    icon: <FiUsers size={26} />,
    color: 'from-amber-500/30 to-amber-500/0 text-amber-400 border-amber-500/20',
    baseColor: 'bg-amber-500',
    title: 'CRM Pelanggan',
    description: 'Pantau pelanggan terbaik, riwayat pembelian, dan pola transaksi.',
  },
  {
    icon: <FiTrendingUp size={26} />,
    color: 'from-indigo-500/30 to-indigo-500/0 text-indigo-400 border-indigo-500/20',
    baseColor: 'bg-indigo-500',
    title: 'Integrasi Marketplace',
    description: 'Sinkronisasi otomatis dengan Tokopedia, Shopee, dan TikTok Shop.',
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
                JUJU<span className="text-white/50 font-normal">PLENGER</span>
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
