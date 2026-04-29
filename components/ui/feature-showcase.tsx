"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string; // Used for text highlight
  baseColor: string; // Used for glows, e.g. "bg-violet-500"
  preview?: React.ReactNode; // Custom preview UI
}

interface FeatureShowcaseProps {
  features: Feature[];
}

export function FeatureShowcase({ features }: FeatureShowcaseProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-8 lg:gap-20 max-w-6xl mx-auto w-full items-start">
      {/* Left Panel: Feature List */}
      <div className="w-full md:w-1/2 flex flex-col justify-center space-y-3 md:space-y-4">
        {features.map((feature, idx) => {
          const isActive = activeIndex === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`cursor-pointer group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 ${
                isActive ? "bg-white/10 border-white/20 shadow-lg" : "hover:bg-white/5 border-transparent"
              } border`}
            >
              {/* Active Indicator Line */}
              {isActive && (
                <motion.div
                  layoutId="activeFeatureLine"
                  className={`absolute left-0 top-0 bottom-0 w-1.5 opacity-80`}
                  style={{ background: 'linear-gradient(to bottom, currentColor, transparent)' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              
              <div className="flex items-start gap-5">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    isActive ? `bg-white/10 text-white scale-110 shadow-lg` : "bg-white/5 text-white/50 group-hover:text-white/80"
                  }`}
                >
                  <div className="text-2xl">{feature.icon}</div>
                </div>
                <div>
                  <h3 className={`text-lg md:text-xl font-bold transition-colors duration-500 ${isActive ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
                    {feature.title}
                  </h3>
                  {/* Smooth height animation for description */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/60 text-sm md:text-base leading-relaxed mt-2 md:mt-3 pb-2 pr-4">
                          {feature.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Right Panel: Visualizer Canvas (Sticky) */}
      <div className="w-full md:w-1/2 h-[300px] md:h-[650px] sticky top-24 flex items-center justify-center z-10">
        <div className="relative w-full h-full rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden flex items-center justify-center shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              {/* Dynamic Glow Background */}
              <div
                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 blur-[100px] rounded-full ${features[activeIndex].baseColor} opacity-20`}
              />
              
              {features[activeIndex].preview ? (
                <div className="relative z-10 w-full h-full p-4 md:p-8 flex items-center justify-center">
                  {features[activeIndex].preview}
                </div>
              ) : (
                <>
                  {/* Central Floating Icon Wrapper */}
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 w-24 h-24 md:w-56 md:h-56 rounded-full flex items-center justify-center"
                  >
                    {/* Glowing Aura */}
                    <div className={`absolute inset-0 rounded-full blur-[30px] md:blur-[40px] opacity-40 ${features[activeIndex].baseColor}`} />
                    
                    {/* Glassmorphism Icon Frame */}
                    <div className="absolute inset-1 md:inset-2 bg-gradient-to-br from-white/10 to-transparent border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md shadow-[inset_0_2px_20px_rgba(255,255,255,0.1)]">
                       <div className="text-4xl md:text-[6rem] text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all duration-500">
                         {features[activeIndex].icon}
                       </div>
                    </div>
                  </motion.div>
                </>
              )}
              
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>
      </div>
    </div>
  );
}
