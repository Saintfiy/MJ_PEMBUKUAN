"use client";

import { motion, useInView } from "framer-motion";
import { FiArrowRight, FiTrendingUp, FiUsers, FiZap } from "react-icons/fi";
import { useRef } from "react";
import Link from "next/link";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({ text, className = "", showAsterisk = false, style }: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- Mini Stat Card ---------------- */
const MiniStat = ({ value, label, delay }: { value: string; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className="flex flex-col"
  >
    <span className="text-2xl font-bold text-indigo-600 font-display">{value}</span>
    <span className="text-xs text-slate-500 font-medium mt-0.5">{label}</span>
  </motion.div>
);

/* ---------------- Floating Badge ---------------- */
const FloatingBadge = ({
  icon,
  label,
  sub,
  color,
  className,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
  color: string;
  className: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    className={`absolute ${className} bg-white rounded-2xl shadow-elevated border border-slate-100/80 px-4 py-3 flex items-center gap-3 z-20 backdrop-blur-sm`}
  >
    <div className={`w-9 h-9 rounded-xl ${color} flex items-center justify-center text-white flex-shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-slate-900 font-bold text-sm leading-none">{label}</p>
      <p className="text-slate-400 text-[11px] mt-1">{sub}</p>
    </div>
  </motion.div>
);

/* ---------------- PrismaHero ---------------- */
export const PrismaHero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden hero-gradient flex items-center">
      {/* Decorative orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-indigo-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-violet-500/6 blur-[100px] pointer-events-none" />
      <div className="absolute top-[30%] left-[40%] w-[300px] h-[300px] rounded-full bg-amber-400/5 blur-[80px] pointer-events-none" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── LEFT: Copy ── */}
          <div className="flex flex-col gap-8">
            {/* Badge pill */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-semibold"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              Layanan Cetak Digital #1 Indonesia
            </motion.div>

            {/* Headline */}
            <div>
              <h1
                className="font-display font-black tracking-tight leading-[1.08]"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.5rem)", color: "#0f172a" }}
              >
                <WordsPullUp text="Cetak Kebutuhan" />
                <br />
                <span className="gradient-text">
                  <WordsPullUp text="Bisnis Anda," />
                </span>
                <br />
                <WordsPullUp text="Cepat & Premium" style={{ color: "#0f172a" }} />
              </h1>
            </div>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-500 text-lg leading-relaxed max-w-lg"
            >
              Dari cetak dokumen, banner, stiker, hingga desain custom. Kualitas cetak premium, proses cepat, dan harga bersahabat.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="https://maps.app.goo.gl/oDD4wcXpnfUzknNm7"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-indigo-600 text-white text-sm font-bold
                           hover:bg-indigo-500 active:scale-95 transition-all duration-200
                           shadow-lg shadow-indigo-500/30"
              >
                Kesana Sekarang
                <FiArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex items-center gap-8 pt-4 border-t border-slate-100"
            >
              <MiniStat value="5K+" label="Pelanggan puas" delay={0.85} />
              <div className="w-px h-8 bg-slate-200" />
              <MiniStat value="100K+" label="Proyek cetak selesai" delay={0.9} />
              <div className="w-px h-8 bg-slate-200" />
              <MiniStat value="4.6★" label="Rating layanan" delay={0.95} />
            </motion.div>
          </div>

          {/* ── RIGHT: Dashboard Mockup ── */}
          <div className="relative flex items-center justify-center">
            {/* Main dashboard photo */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md rounded-3xl shadow-elevated border border-slate-100 overflow-hidden animate-float"
            >
              <img src="/dashboard-mjprint.jpg" alt="MJ Print Dashboard" className="w-full h-auto object-cover" />
            </motion.div>

            {/* Floating badges */}
            <FloatingBadge
              icon={<FiZap size={16} />}
              label="Buka 24 Jam"
              sub="Siap kapan saja"
              color="bg-amber-500"
              className="-top-4 -left-4 md:-left-12"
              delay={0.8}
            />
            <FloatingBadge
              icon={<FiUsers size={16} />}
              label="5000+ Klien"
              sub="Telah Percaya Kami"
              color="bg-indigo-600"
              className="-bottom-4 -right-4 md:-right-10"
              delay={1.0}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
