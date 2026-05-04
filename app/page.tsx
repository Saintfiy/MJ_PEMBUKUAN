'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowRight, FiZap, FiTag, FiPenTool, FiImage, FiCheckCircle, FiClock, FiStar, FiShield } from 'react-icons/fi';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { LampContainer } from '@/components/ui/lamp';
import { BackgroundPaths } from '@/components/ui/background-paths';

const features = [
  {
    icon: <FiImage size={24} />,
    title: 'Kualitas Premium',
    description: 'Hasil cetak tajam, warna presisi, dan menggunakan bahan baku berkualitas terbaik yang awet.',
    colSpan: "md:col-span-2 md:row-span-2",
    gradient: "from-blue-500/20 to-purple-500/20",
    borderGlow: "group-hover:border-blue-500/50",
    visual: (
      <div className="absolute right-0 bottom-0 w-64 h-64 bg-gradient-to-tl from-blue-500/30 to-transparent rounded-tl-full blur-3xl" />
    )
  },
  {
    icon: <FiZap size={24} />,
    title: 'Proses Cepat',
    description: 'Waktu produksi efisien. Siap melayani kebutuhan cetak mendesak Anda.',
    colSpan: "md:col-span-1",
    gradient: "from-amber-500/20 to-orange-500/20",
    borderGlow: "group-hover:border-amber-500/50",
    visual: (
      <div className="absolute right-4 bottom-4 w-16 h-16 border-4 border-amber-500/20 rounded-full animate-pulse" />
    )
  },
  {
    icon: <FiTag size={24} />,
    title: 'Harga Transparan',
    description: 'Harga kompetitif dan transparan sejak awal, tanpa biaya tersembunyi.',
    colSpan: "md:col-span-1",
    gradient: "from-emerald-500/20 to-green-500/20",
    borderGlow: "group-hover:border-emerald-500/50",
    visual: (
      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2 opacity-20">
        <div className="h-2 w-12 bg-emerald-400 rounded-full" />
        <div className="h-2 w-8 bg-emerald-400 rounded-full" />
        <div className="h-2 w-16 bg-emerald-400 rounded-full" />
      </div>
    )
  },
  {
    icon: <FiPenTool size={24} />,
    title: 'Layanan Desain',
    description: 'Belum punya desain? Tim desain grafis kami siap mewujudkan ide kreatif Anda menjadi nyata.',
    colSpan: "md:col-span-2",
    gradient: "from-rose-500/20 to-pink-500/20",
    borderGlow: "group-hover:border-rose-500/50",
    visual: (
      <div className="absolute right-0 top-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-rose-500/10 via-transparent to-transparent pointer-events-none" />
    )
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-white selection:text-slate-950 overflow-x-hidden">
      
      {/* ── GLOBAL FLOATING PATHS BACKGROUND ── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundPaths />
      </div>
      
      {/* ── SCROLL PROGRESS ── */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex items-center justify-between w-full max-w-5xl px-6 py-3.5 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
          <div className="flex items-center gap-2">
            <span className="font-display font-black text-xl tracking-tight text-white">
              MJ<span className="text-slate-500 font-medium"> Print</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <Link href="#fitur" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Fitur</Link>
            <Link href="#keunggulan" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors">Keunggulan</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="bg-white text-slate-950 hover:bg-slate-200 transition-colors font-bold rounded-full py-2 px-5 text-xs">
              Masuk
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* ── HERO (LAMP) ── */}
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-white to-slate-400 py-4 bg-clip-text text-center text-5xl font-black tracking-tight text-transparent md:text-7xl"
        >
          Elevate Your <br /> Print Experience.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-slate-400 text-lg md:text-xl mt-4 mb-8 max-w-lg mx-auto text-center leading-relaxed"
        >
          Layanan cetak berstandar industri dengan kualitas presisi tinggi, dirancang untuk efisiensi tanpa kompromi.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 z-50 relative"
        >
          <a href="https://maps.app.goo.gl/oDD4wcXpnfUzknNm7" target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:scale-105 transition-all text-sm px-8 py-4 inline-flex items-center gap-2">
            Kesana Sekarang <FiArrowRight />
          </a>
          <a href="https://wa.me/6289683751701" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-white text-sm font-bold border border-white/20 rounded-full hover:bg-white/10 transition-colors inline-flex items-center gap-2">
            Hubungi WhatsApp
          </a>
        </motion.div>
      </LampContainer>

      {/* ── DASHBOARD PREVIEW SCROLL ── */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="relative overflow-hidden z-10 mt-8"
      >
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
                Cetak Cepat dan <br />
                <span className="text-slate-500">Berkualitas</span>
              </h2>
            </>
          }
        >
          {/* Actual Dashboard Image */}
          <div className="w-full h-full rounded-2xl overflow-hidden relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-800 bg-slate-900">
            <Image 
              src="/dashboard-mjprint1.jpg" 
              alt="MJ Print Dashboard" 
              fill 
              className="object-cover object-top"
              priority
            />
            {/* Elegant overlay gradient to make it blend with dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent pointer-events-none" />
          </div>
        </ContainerScroll>
      </motion.section>

      {/* ── FEATURES BENTO GRID ── */}
      <section id="fitur" className="py-32 px-6 relative z-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-slate-700/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-6xl mx-auto relative">
          {/* Header */}
          <div className="text-center mb-20">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-900 mb-6">
              <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-slate-300 text-xs font-bold tracking-[0.2em] uppercase">Keunggulan Kami</span>
            </motion.div>
            <motion.h3 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="font-display font-black text-5xl md:text-7xl text-white tracking-tight leading-[1.05] mb-4">
              Built for<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-600">Precision.</span>
            </motion.h3>
          </div>

          {/* Stats Row */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {[{ num: "300+", label: "DPI Resolusi" }, { num: "100%", label: "Warna CMYK" }, { num: "1 Hari", label: "Garansi Selesai" }].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 + i * 0.1 }} whileHover={{ y: -3 }} className="p-4 md:p-6 rounded-3xl bg-slate-900/60 border border-white/5 text-center relative overflow-hidden group">
                <motion.div animate={{ opacity: [0, 0.15, 0] }} transition={{ duration: 3, delay: i * 1, repeat: Infinity }} className="absolute inset-0 bg-white rounded-3xl" />
                <div className="text-3xl md:text-4xl font-black text-white mb-1">{s.num}</div>
                <div className="text-slate-500 text-[10px] md:text-xs font-semibold uppercase tracking-wider md:tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* BIG CARD */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} whileHover={{ scale: 1.015 }} className="md:col-span-7 min-h-[400px] p-10 rounded-[2.5rem] relative overflow-hidden group cursor-default" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} className="absolute inset-0 rounded-[2.5rem] opacity-20" style={{ background: 'conic-gradient(from 0deg, transparent 0deg, rgba(148,163,184,0.5) 60deg, transparent 120deg)' }} />
              <div className="absolute inset-[1px] rounded-[2.4rem] bg-[#0f172a]" />
              <motion.div animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} className="absolute top-8 right-12 w-40 h-40 bg-slate-400/10 rounded-full blur-3xl" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <motion.div whileHover={{ rotate: 12, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }} className="w-16 h-16 rounded-2xl bg-white text-slate-950 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                    <FiImage size={28} />
                  </motion.div>
                  <h4 className="text-4xl font-black text-white mb-4 tracking-tight leading-tight">Kualitas Tanpa<br />Kompromi</h4>
                  <p className="text-slate-400 leading-relaxed max-w-sm">Hasil cetak tajam, warna presisi, dan menggunakan bahan baku premium untuk hasil yang tahan lama dan memukau.</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-8">
                  {['300 DPI+', 'CMYK Proof', 'Premium Stock', 'Vibrant Color'].map((t, i) => (
                    <motion.span key={t} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 + i * 0.08 }} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300">{t}</motion.span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15, duration: 0.7 }} whileHover={{ y: -5 }} className="flex-1 p-8 rounded-[2rem] bg-slate-900/70 border border-white/5 relative overflow-hidden group cursor-default">
                <div className="absolute inset-0 overflow-hidden">
                  {[0,1,2,3,4].map(i => (
                    <motion.div key={i} animate={{ x: ['-120%', '220%'] }} transition={{ duration: 2, delay: i * 0.3, repeat: Infinity, ease: 'easeInOut' }} className="absolute h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent opacity-0 group-hover:opacity-100" style={{ top: `${15 + i * 16}%`, width: '50%' }} />
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <motion.div whileHover={{ rotate: -15, scale: 1.15 }} className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center"><FiClock size={22} /></motion.div>
                    <span className="text-amber-400/60 text-xs font-bold uppercase tracking-widest">Ekspres</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Pengerjaan Ekspres</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Selesai tepat waktu, setiap saat, tanpa kompromi kualitas.</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.25 }} whileHover={{ y: -5, scale: 1.03 }} className="p-6 rounded-[2rem] bg-slate-900/70 border border-white/5 group cursor-default relative overflow-hidden">
                  <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 w-20 h-20 bg-emerald-500 rounded-full blur-2xl" />
                  <motion.div whileHover={{ rotate: 20 }} className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4"><FiTag size={18} /></motion.div>
                  <h4 className="text-sm font-bold text-white mb-1">Transparan</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Harga jujur tanpa biaya tersembunyi.</p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.35 }} whileHover={{ y: -5, scale: 1.03 }} className="p-6 rounded-[2rem] bg-slate-900/70 border border-white/5 group cursor-default relative overflow-hidden">
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} className="absolute -bottom-6 -right-6 w-24 h-24 border border-rose-500/20 rounded-full" />
                  <motion.div animate={{ rotate: [0, -360] }} transition={{ duration: 25, repeat: Infinity, ease: 'linear' }} className="absolute -bottom-3 -right-3 w-14 h-14 border border-rose-500/10 rounded-full" />
                  <motion.div whileHover={{ rotate: -20 }} className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4"><FiPenTool size={18} /></motion.div>
                  <h4 className="text-sm font-bold text-white mb-1">Custom Desain</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">Tim desain siap bantu wujudkan ide Anda.</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── FOOTER ── */}
      <footer className="py-8 border-t border-slate-800/50 bg-transparent relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-center">
          <span className="font-display font-black text-xl text-white/60 tracking-tight">MJ Print</span>
        </div>
      </footer>

    </div>
  );
}
