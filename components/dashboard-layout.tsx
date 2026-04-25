'use client';

import { ReactNode } from 'react';
import { Sidebar } from '@/components/sidebar';
import { Navbar } from '@/components/navbar';
import { useUIStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
  title?: string;
}

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const { sidebarOpen } = useUIStore();
  const { loading, isAuthenticated } = useAuth({ requireAuth: true });

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-primary/40 border-t-primary rounded-full animate-spin" />
          <p className="text-white/50 text-sm">Memuat...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="relative min-h-screen bg-dark">
      <div className="print:hidden">
        <Sidebar />
        <Navbar />
      </div>

      <motion.main
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`pt-16 print:pt-0 transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-[260px]' : 'lg:ml-[72px]'
        } print:m-0`}
      >
        <div className="p-4 md:p-6">
          {title && (
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">{title}</h1>
            </div>
          )}
          {children}
        </div>
      </motion.main>
    </div>
  );
}
