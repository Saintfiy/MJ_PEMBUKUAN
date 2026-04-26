'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import {
  FiArrowRight, FiTrendingUp, FiCpu, FiShield,
  FiZap, FiBarChart2, FiUsers, FiStar
} from 'react-icons/fi';

const features = [
  {
    icon: <FiCpu size={26} />,
    color: 'from-violet-500/30 to-violet-500/0 text-violet-400 border-violet-500/20',
    title: 'Asisten Keuangan AI',
    description: 'Dapatkan rekomendasi cerdas dan wawasan tentang arus kas Anda secara instan.',
  },
  {
    icon: <FiBarChart2 size={26} />,
    color: 'from-pink-500/30 to-pink-500/0 text-pink-400 border-pink-500/20',
    title: 'Analitik Real-time',
    description: 'Dashboard interaktif dengan grafik premium dan prediksi berbasis data.',
  },
  {
    icon: <FiZap size={26} />,
    color: 'from-cyan-500/30 to-cyan-500/0 text-cyan-400 border-cyan-500/20',
    title: 'Scan Struk (OCR)',
    description: 'Ambil foto struk, AI langsung ekstrak dan catat transaksi otomatis.',
  },
  {
    icon: <FiShield size={26} />,
    color: 'from-green-500/30 to-green-500/0 text-green-400 border-green-500/20',
    title: 'Aman & Privat',
    description: 'Keamanan tingkat bank dengan enkripsi penuh dan Row-Level Security.',
  },
  {
    icon: <FiUsers size={26} />,
    color: 'from-amber-500/30 to-amber-500/0 text-amber-400 border-amber-500/20',
    title: 'CRM Pelanggan',
    description: 'Pantau pelanggan terbaik, riwayat pembelian, dan pola transaksi.',
  },
  {
    icon: <FiTrendingUp size={26} />,
    color: 'from-violet-500/30 to-violet-500/0 text-violet-400 border-violet-500/20',
    title: 'Integrasi Marketplace',
    description: 'Sinkronisasi otomatis dengan Tokopedia, Shopee, dan TikTok Shop.',
  },
];

const stats = [
  { value: '10K+', label: 'Pengguna Aktif' },
  { value: '99.9%', label: 'Uptime' },
  { value: 'Rp 50M+', label: 'Transaksi Tercatat' },
  { value: '4.9 ⭐', label: 'Rating Pengguna' },
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-darker overflow-x-hidden">

      {/* ── SPLINE ROBOT — FIXED FULL-SCREEN BACKGROUND ── */}
      <div className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <iframe
          src="https://my.spline.design/nexbotrobotcharacterconcept-FNsuGhtZ8mqBi4nYmcAU0QP3/"
          frameBorder="0"
          width="100%"
          height="100%"
          title="DuitTrack AI Robot Background"
          className="w-full h-full"
        />
        {/* Dark overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(9,9,11,0.45) 0%, rgba(9,9,11,0.3) 40%, rgba(9,9,11,0.7) 100%)' }}
        />
      </div>

      {/* ── ALL PAGE CONTENT sits on top of the robot ── */}
      <div className="relative z-10">

        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed top-0 w-full z-50 px-6 py-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(9,9,11,0.6)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-black tracking-tight">
              <span className="gradient-text">Duit</span>
              <span className="text-white">Track</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-white/70 hover:text-white text-sm font-medium transition-colors px-3 py-1.5">
                Masuk
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-xl bg-primary text-darker hover:brightness-110 transition-all shadow-lg shadow-primary/30">
                Daftar Gratis <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* ── HERO ── Full viewport, content centered ── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-3xl mx-auto">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/15 text-primary text-sm font-semibold backdrop-blur-md"
            >
              <FiStar size={12} />
              Platform Keuangan UMKM #1 Indonesia
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight drop-shadow-2xl"
            >
              <span className="gradient-text">Pembukuan Pintar</span>
              <br />
              <span className="text-white">untuk UMKM Indonesia</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-lg"
            >
              AI + Analitik + OCR dalam satu platform. Kelola keuangan bisnis Anda seperti CEO kelas dunia — tanpa kerumitan.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-darker font-bold rounded-2xl text-lg hover:brightness-110 transition-all shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95">
                Mulai Gratis Sekarang
                <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-2xl text-lg border border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 backdrop-blur-md">
                Login ke Akun
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 bg-white/50 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── WHY DUITTRACK ── */}
        <section
          className="border-y border-white/10 py-20 px-6"
          style={{ background: 'rgba(9,9,11,0.72)', backdropFilter: 'blur(24px)' }}
        >
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <p className="text-secondary text-sm font-bold uppercase tracking-widest mb-3">Mengapa DuitTrack?</p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Bukan sekadar aplikasi catatan keuangan
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                {
                  emoji: '🤖',
                  title: 'AI yang Benar-benar Bekerja',
                  desc: 'Asisten AI DuitTrack bukan chatbot biasa. Ia membaca data transaksi Anda, mendeteksi pola pengeluaran, dan memberi rekomendasi nyata — bukan saran generik.',
                },
                {
                  emoji: '⚡',
                  title: 'Satu Platform, Semua Kebutuhan',
                  desc: 'Dari pembukuan harian, laporan keuangan, manajemen inventori, CRM pelanggan, hingga integrasi marketplace — semua ada di satu tempat. Tidak perlu berpindah-pindah aplikasi.',
                },
                {
                  emoji: '🔒',
                  title: 'Keamanan Tingkat Enterprise',
                  desc: 'Data Anda dilindungi dengan enkripsi penuh, Row-Level Security Supabase, dan autentikasi aman. Hanya Anda yang bisa mengakses data bisnis Anda sendiri.',
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
                  style={{ background: 'rgba(255,255,255,0.04)' }}
                  whileHover={{ y: -4, borderColor: 'rgba(139,92,246,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className="text-4xl mb-4">{item.emoji}</div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-28 px-6" style={{ background: 'rgba(9,9,11,0.75)', backdropFilter: 'blur(20px)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-primary text-sm font-bold uppercase tracking-widest mb-3">Fitur Unggulan</p>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Semua yang kamu butuhkan,<br />
                <span className="gradient-text">dalam satu tempat</span>
              </h2>
              <p className="text-white/50 text-lg max-w-xl mx-auto">Dirancang khusus untuk pelaku UMKM Indonesia yang ingin tumbuh lebih cepat.</p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              className="grid md:grid-cols-3 gap-5"
            >
              {features.map((f, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative overflow-hidden rounded-2xl border p-6 cursor-default backdrop-blur-xl ${f.color.split(' ')[3] || 'border-white/10'}`}
                  style={{ background: 'rgba(15,15,20,0.6)' }}
                >
                  <div className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${f.color.split(' ').slice(0, 2).join(' ')} opacity-40 rounded-bl-full pointer-events-none`} />
                  <div className={`relative z-10 w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-white/5 ${f.color.split(' ')[2]}`}>
                    {f.icon}
                  </div>
                  <h3 className="relative z-10 text-lg font-bold mb-2 text-white">{f.title}</h3>
                  <p className="relative z-10 text-white/50 text-sm leading-relaxed">{f.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── COMPARISON: DUITTRACK vs KONVENSIONAL ── */}
        <section className="py-20 px-6" style={{ background: 'rgba(9,9,11,0.8)', backdropFilter: 'blur(20px)' }}>
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
                <p className="text-red-400 font-bold text-sm uppercase tracking-widest mb-5">❌ Cara Konvensional</p>
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
                      <span className="text-red-400 mt-0.5 flex-shrink-0">✗</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* DuitTrack */}
              <div className="p-7 rounded-2xl border border-primary/30" style={{ background: 'rgba(139,92,246,0.08)' }}>
                <p className="text-primary font-bold text-sm uppercase tracking-widest mb-5">✅ Dengan DuitTrack</p>
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
                      <span className="text-primary mt-0.5 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/10 py-10 px-6" style={{ background: 'rgba(9,9,11,0.85)', backdropFilter: 'blur(20px)' }}>
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-xl font-black">
              <span className="gradient-text">Duit</span><span className="text-white">Track</span>
            </div>
            <p className="text-white/30 text-sm">© {new Date().getFullYear()} DuitTrack. Hak cipta dilindungi undang-undang.</p>
            <div className="flex items-center gap-6 text-sm text-white/40">
              <Link href="/login" className="hover:text-white transition-colors">Masuk</Link>
              <Link href="/register" className="hover:text-white transition-colors">Daftar</Link>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
