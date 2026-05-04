'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowRight, FiZap, FiTag, FiPenTool, FiImage, FiCheckCircle, FiClock, FiStar, FiShield } from 'react-icons/fi';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { LampContainer } from '@/components/ui/lamp';

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
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-950" />
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white">
              MJ<span className="text-slate-400 font-medium"> Print</span>
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
          Cetak Masa Depan <br /> Bisnis Anda
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-slate-400 text-lg md:text-xl mt-4 mb-8 max-w-lg mx-auto text-center"
        >
          Platform pemesanan dan manajemen cetak berstandar industri dengan kualitas premium. Dirancang untuk efisiensi.
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
        className="relative overflow-hidden z-10"
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
              src="/dashboard-mjprint.jpg" 
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
      <section id="fitur" className="py-24 px-6 relative max-w-6xl mx-auto z-20">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse" />
            <span className="text-slate-300 text-xs font-bold tracking-widest uppercase">Keunggulan Sistem</span>
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="font-display font-black text-4xl md:text-6xl text-white mb-6 tracking-tight leading-tight"
          >
            Inovasi dalam Setiap <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600">Proses Cetak</span>
          </motion.h3>
        </div>
        
        {/* Complex Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
          {/* Card 1: Kualitas (Big) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-2 p-8 md:p-12 rounded-[2.5rem] bg-slate-900/50 border border-white/5 relative overflow-hidden group cursor-default shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-white text-slate-950 flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
                <FiImage size={28} />
              </div>
              <h4 className="text-3xl font-black text-white mb-4 tracking-tight">Kualitas Tanpa <br/>Kompromi</h4>
              <p className="text-slate-400 text-lg leading-relaxed max-w-sm mb-8">Hasil cetak tajam, warna presisi, dan menggunakan bahan baku premium untuk hasil yang tahan lama.</p>
              <div className="flex flex-wrap gap-2">
                {['300 DPI+', 'CMYK Proof', 'Vibrant Color'].map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-widest text-slate-300">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Card 2: Proses Cepat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2 p-8 rounded-[2.5rem] bg-slate-900/50 border border-white/5 relative overflow-hidden group cursor-default"
          >
            <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:bg-white group-hover:text-slate-950 transition-all duration-500">
                <FiClock size={28} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white mb-2">Pengerjaan Ekspres</h4>
                <p className="text-slate-400 text-sm">Selesai tepat waktu untuk kebutuhan mendesak Anda.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Harga */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1 p-8 rounded-[2.5rem] bg-slate-900/50 border border-white/5 group cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
              <FiTag size={24} />
            </div>
            <h4 className="text-lg font-bold text-white mb-2">Transparan</h4>
            <p className="text-slate-400 text-xs">Harga jujur tanpa biaya tambahan tersembunyi.</p>
          </motion.div>

          {/* Card 4: Desain */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-1 p-8 rounded-[2.5rem] bg-slate-900/50 border border-white/5 group cursor-default overflow-hidden relative"
          >
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                <FiPenTool size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">Custom Desain</h4>
              <p className="text-slate-400 text-xs">Layanan desain grafis profesional siap bantu.</p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-rose-500/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>

      {/* ── MINIMALIST CTA ── */}
      <section className="py-32 px-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[200px] bg-slate-600/20 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-700 shadow-inner">
            <FiCheckCircle size={28} className="text-slate-300" />
          </div>
          
          <h2 className="font-display font-black text-3xl md:text-5xl text-white mb-6 tracking-tight relative z-10">
            Tingkatkan Standar Cetak Anda
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-lg mx-auto relative z-10">
            Platform modern untuk segala kebutuhan operasional percetakan. Bebas ribet, hasil maksimal.
          </p>
          <Link href="/login" className="bg-white text-slate-950 font-bold rounded-full py-4 px-10 text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)] inline-flex items-center gap-2 relative z-10">
            Akses Dashboard <FiArrowRight />
          </Link>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950 relative z-20">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-lg">
               <div className="w-3 h-3 rounded-full bg-slate-950" />
            </div>
            <span className="font-display font-black text-xl text-white tracking-tight">MJ Print</span>
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
            <Link href="#" className="hover:text-white transition-colors">Privasi</Link>
          </div>
          <p className="text-slate-600 text-sm">© {new Date().getFullYear()} MJ Print. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
