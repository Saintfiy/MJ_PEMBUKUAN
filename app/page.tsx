'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import {
  FiArrowRight, FiTrendingUp, FiCpu, FiShield,
  FiZap, FiBarChart2, FiUsers, FiStar, FiChevronDown
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
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Spline intro: true = showing, false = fully gone from DOM
  const [showIntro, setShowIntro] = useState(true);

  const dismissIntro = useCallback(() => setShowIntro(false), []);

  // Auto-dismiss after 4 seconds
  useEffect(() => {
    const timer = setTimeout(dismissIntro, 4000);
    return () => clearTimeout(timer);
  }, [dismissIntro]);

  return (
    <div className="min-h-screen bg-darker overflow-x-hidden">

      {/* ── FULL-SCREEN SPLINE INTRO ── */}
      <AnimatePresence mode="wait">
        {showIntro && (
          <motion.div
            key="spline-intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[9999] bg-darker flex flex-col items-center justify-center overflow-hidden"
          >
            {/* Background blobs for depth */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-primary/25 rounded-full blur-[120px] pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none"
            />

            {/* Spline iframe — full screen, removed from DOM on exit */}
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src="https://my.spline.design/nexbotrobotcharacterconcept-FNsuGhtZ8mqBi4nYmcAU0QP3/"
                frameBorder="0"
                width="100%"
                height="100%"
                title="DuitTrack AI Assistant Robot"
                className="w-full h-full pointer-events-auto"
              />
            </div>

            {/* Bottom overlay with branding + skip button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-center gap-4"
              style={{ background: 'linear-gradient(to top, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.4) 60%, transparent 100%)' }}
            >
              {/* Brand name */}
              <div className="text-3xl font-black mb-1">
                <span className="gradient-text">Duit</span>
                <span className="text-white">Track</span>
              </div>
              <p className="text-white/50 text-sm text-center">Platform Keuangan Cerdas untuk UMKM Indonesia</p>

              {/* Progress bar auto-dismiss */}
              <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  className="h-full bg-primary rounded-full"
                />
              </div>

              {/* Skip / Continue button */}
              <button
                onClick={dismissIntro}
                className="flex items-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold rounded-2xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95"
              >
                Jelajahi DuitTrack <FiChevronDown size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT (only rendered after intro is fully gone) ── */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
        {/* ── NAVBAR ── */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="fixed top-0 w-full z-50 px-6 py-4"
          style={{ backdropFilter: 'blur(24px)', background: 'rgba(9,9,11,0.75)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="text-2xl font-black tracking-tight">
              <span className="gradient-text">Duit</span>
              <span className="text-white">Track</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-white/60 hover:text-white text-sm font-medium transition-colors px-3 py-1.5">
                Masuk
              </Link>
              <Link href="/register" className="inline-flex items-center gap-2 text-sm font-bold px-5 py-2 rounded-xl bg-primary text-darker hover:brightness-110 transition-all shadow-lg shadow-primary/20">
                Daftar Gratis <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.nav>

        {/* ── HERO ── */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden pt-24">
          {/* Animated BG blobs */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px]"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px]"
            />
          </div>

          {/* Grid mesh */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '50px 50px' }}
          />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold"
            >
              <FiStar size={12} />
              Platform Keuangan UMKM #1 Indonesia
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl md:text-7xl font-black mb-6 leading-[1.05] tracking-tight"
            >
              <span className="gradient-text">Pembukuan Pintar</span>
              <br />
              <span className="text-white/90">untuk UMKM Indonesia</span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed max-w-2xl mx-auto"
            >
              AI + Analitik + OCR dalam satu platform. Kelola keuangan bisnis Anda seperti CEO kelas dunia — tanpa kerumitan.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-darker font-bold rounded-2xl text-lg hover:brightness-110 transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95">
                Mulai Gratis Sekarang
                <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-2xl text-lg border border-white/10 hover:bg-white/10 transition-all hover:scale-105 active:scale-95">
                Login ke Akun
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 bg-white/40 rounded-full" />
            </motion.div>
          </motion.div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="border-y border-white/5 py-12 px-6" style={{ background: 'rgba(255,255,255,0.02)' }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {stats.map((s, i) => (
              <motion.div key={i} variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-white/40 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── FEATURES ── */}
        <section className="py-28 px-6">
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
              <p className="text-white/40 text-lg max-w-xl mx-auto">Dirancang khusus untuk pelaku UMKM Indonesia yang ingin tumbuh lebih cepat.</p>
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
                  className={`relative overflow-hidden rounded-2xl border p-6 cursor-default ${f.color.split(' ')[3] || 'border-white/10'}`}
                  style={{ background: 'rgba(255,255,255,0.03)' }}
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

        {/* ── CTA BOTTOM ── */}
        <section className="py-28 px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto relative overflow-hidden rounded-3xl p-12 text-center border border-primary/20"
            style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(236,72,153,0.1) 100%)' }}
          >
            <div className="absolute -top-16 -left-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Siap kelola bisnis<br /><span className="gradient-text">lebih cerdas?</span>
              </h2>
              <p className="text-white/50 text-lg mb-8">Gratis selamanya untuk fitur dasar. Upgrade kapan saja.</p>
              <Link href="/register" className="group inline-flex items-center gap-2 px-10 py-4 bg-primary text-darker font-black rounded-2xl text-lg hover:brightness-110 transition-all shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95">
                Mulai Gratis — Daftar Sekarang
                <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="border-t border-white/5 py-10 px-6">
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
        </motion.div>
      )}
    </div>
  );
}
