'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiTag, FiPenTool, FiImage, FiCheckCircle } from 'react-icons/fi';
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
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-slate-800 selection:text-white overflow-hidden">
      
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] bg-slate-900/50 border border-slate-800 backdrop-blur-md p-8 md:p-10 flex flex-col justify-end min-h-[300px] transition-all duration-500 hover:-translate-y-2 ${feature.borderGlow} ${feature.colSpan}`}
            >
              {/* Dynamic Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              {/* Abstract Visuals */}
              {feature.visual}

              {/* Glassmorphism Icon Container */}
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700/50 flex items-center justify-center text-slate-300 mb-8 group-hover:scale-110 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-500 backdrop-blur-xl">
                {feature.icon}
              </div>

              {/* Content */}
              <div className="relative z-10 mt-auto">
                <h4 className="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                  {feature.title}
                </h4>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner Accent */}
              <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <FiArrowRight className="text-slate-600 -rotate-45" size={24} />
              </div>
            </motion.div>
          ))}
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
