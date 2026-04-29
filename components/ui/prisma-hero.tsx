"use client";

import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
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
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
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

/* ---------------- PrismaHero ---------------- */
export const PrismaHero = () => {
  return (
    <section className="h-screen w-full relative pt-20 pointer-events-none">
      <div className="relative h-full w-full flex flex-col justify-end">
        
        {/* We remove the background video and noise overlay so the Spline robot stays visible behind it */}
        
        {/* Smooth gradient overlay for text readability at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

        {/* Hero content */}
        <div className="relative w-full px-4 pb-12 sm:pb-20 sm:px-6 md:px-10 z-20">
          <div className="grid grid-cols-12 items-end gap-4 max-w-7xl mx-auto">
            
            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-black leading-[0.85] tracking-tight text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] xl:text-[11vw]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="JUJUPLENGER" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-6 lg:col-span-4 lg:pb-10">
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base md:text-lg text-white/80 font-medium drop-shadow-md"
                style={{ lineHeight: 1.5 }}
              >
                AI + Analitik + OCR dalam satu platform. Kelola keuangan bisnis Anda seperti CEO kelas dunia — tanpa kerumitan.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto"
              >
                <Link
                  href="/register"
                  className="group inline-flex items-center gap-3 self-start rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-bold text-darker transition-all hover:gap-4 sm:text-base shadow-xl shadow-primary/30"
                >
                  Mulai Gratis Sekarang
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-darker transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                    <FiArrowRight className="h-5 w-5" style={{ color: "#E1E0CC" }} />
                  </span>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
