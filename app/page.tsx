'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiTag, FiPenTool, FiImage } from 'react-icons/fi';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';
import { LampContainer } from '@/components/ui/lamp';

const features = [
  {
    icon: <FiImage size={24} />,
    title: 'Kualitas Premium',
    description: 'Hasil cetak tajam, warna presisi, dan menggunakan bahan baku berkualitas terbaik yang awet.',
    colSpan: "md:col-span-2",
  },
  {
    icon: <FiZap size={24} />,
    title: 'Proses Cepat',
    description: 'Waktu produksi efisien. Siap melayani kebutuhan cetak mendesak Anda.',
    colSpan: "md:col-span-1",
  },
  {
    icon: <FiTag size={24} />,
    title: 'Harga Transparan',
    description: 'Harga kompetitif dan transparan sejak awal, tanpa biaya tersembunyi.',
    colSpan: "md:col-span-1",
  },
  {
    icon: <FiPenTool size={24} />,
    title: 'Layanan Desain',
    description: 'Belum punya desain? Tim desain grafis kami siap mewujudkan ide kreatif Anda menjadi nyata.',
    colSpan: "md:col-span-2",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-200 selection:bg-slate-800 selection:text-white">
      
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-slate-400 text-lg md:text-xl mt-4 mb-8 max-w-lg mx-auto text-center"
        >
          Platform pemesanan dan manajemen cetak berstandar industri dengan kualitas premium. Dirancang untuk efisiensi.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 z-50 relative"
        >
          <a href="https://maps.app.goo.gl/oDD4wcXpnfUzknNm7" target="_blank" rel="noopener noreferrer" className="bg-white text-slate-900 font-bold rounded-full shadow-lg shadow-white/10 hover:scale-105 transition-transform text-sm px-8 py-4 inline-flex items-center gap-2">
            Mulai Pesan <FiArrowRight />
          </a>
          <a href="https://wa.me/6289683751701" target="_blank" rel="noopener noreferrer" className="px-8 py-4 text-white text-sm font-bold border border-white/10 rounded-full hover:bg-white/5 transition-colors inline-flex items-center gap-2">
            Hubungi WhatsApp
          </a>
        </motion.div>
      </LampContainer>

      {/* ── DASHBOARD PREVIEW SCROLL ── */}
      <section className="relative overflow-hidden -mt-40">
        <ContainerScroll
          titleComponent={
            <>
              <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4 tracking-tight">
                Kelola Pesanan <br />
                <span className="text-slate-500">Dalam Satu Layar</span>
              </h2>
            </>
          }
        >
          {/* Dashboard Mockup Image or UI */}
          <div className="w-full h-full bg-[#111318] rounded-xl overflow-hidden flex flex-col relative shadow-2xl">
            {/* Mockup Header */}
            <div className="h-14 border-b border-white/5 flex items-center px-6 justify-between shrink-0 bg-[#1c2030]/50 backdrop-blur-md">
              <div className="font-bold text-white/80 text-sm tracking-tight flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Dashboard
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-6 rounded-full bg-white/5" />
                <div className="w-8 h-8 rounded-full bg-white/10" />
              </div>
            </div>
            {/* Mockup Content */}
            <div className="p-6 flex-1 flex flex-col gap-6 bg-gradient-to-b from-transparent to-[#0a0a0f]">
              <div className="flex gap-4">
                <div className="flex-1 h-32 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center px-6">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 mb-3" />
                  <div className="w-16 h-3 bg-white/20 rounded-full mb-2" />
                  <div className="w-24 h-6 bg-white/80 rounded-full" />
                </div>
                <div className="flex-1 h-32 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center px-6">
                  <div className="w-8 h-8 rounded-full bg-rose-500/20 mb-3" />
                  <div className="w-16 h-3 bg-white/20 rounded-full mb-2" />
                  <div className="w-24 h-6 bg-white/80 rounded-full" />
                </div>
                <div className="flex-1 h-32 bg-white/5 rounded-2xl border border-white/5 flex flex-col justify-center px-6">
                  <div className="w-8 h-8 rounded-full bg-sky-500/20 mb-3" />
                  <div className="w-16 h-3 bg-white/20 rounded-full mb-2" />
                  <div className="w-24 h-6 bg-white/80 rounded-full" />
                </div>
              </div>
              <div className="flex-1 bg-white/5 rounded-2xl border border-white/5 relative overflow-hidden">
                {/* Empty state graphic representation */}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-40">
                  <div className="w-32 h-32 border-2 border-dashed border-white/20 rounded-full flex items-center justify-center mb-4">
                    <FiImage size={32} className="text-white/20" />
                  </div>
                  <div className="w-32 h-3 bg-white/20 rounded-full mb-2" />
                  <div className="w-48 h-2 bg-white/10 rounded-full" />
                </div>
              </div>
            </div>
            {/* Mockup Dock */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-64 h-16 bg-[#1c2030]/80 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-evenly shadow-2xl">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><FiZap size={16} className="text-white/50" /></div>
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)]"><FiPenTool size={16} className="text-slate-900" /></div>
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"><FiTag size={16} className="text-white/50" /></div>
            </div>
          </div>
        </ContainerScroll>
      </section>

      {/* ── FEATURES BENTO GRID ── */}
      <section id="fitur" className="py-24 px-6 relative max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-slate-400 font-bold text-xs tracking-widest uppercase mb-3">Keunggulan Sistem</h2>
          <h3 className="font-display font-black text-3xl md:text-5xl text-white mb-4 tracking-tight">
            Dirancang Untuk <br /> Kecepatan & Presisi
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-sm flex flex-col group hover:bg-slate-800/80 transition-all cursor-pointer ${feature.colSpan}`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-slate-300 mb-6 group-hover:bg-white group-hover:text-slate-900 group-hover:scale-110 transition-all shadow-sm">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{feature.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 border-t border-white/10 bg-slate-950 mt-12">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
               <div className="w-2 h-2 rounded-full bg-slate-950" />
            </div>
            <span className="font-display font-bold text-lg text-white">MJ Print</span>
          </div>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} MJ Print. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
