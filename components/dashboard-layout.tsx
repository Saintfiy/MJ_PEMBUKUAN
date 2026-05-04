'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="pt-16 pb-28 print:pt-0 print:pb-0 transition-all duration-300 print:m-0"
    >
      <div className="p-4 md:p-6">
        {title && (
          <div className="mb-6 md:mb-8 print:hidden">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">{title}</h1>
          </div>
        )}
        {children}
      </div>
    </motion.main>
  );
}
