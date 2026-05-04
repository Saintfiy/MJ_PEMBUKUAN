'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiHome, FiRepeat, FiFileText } from 'react-icons/fi';

const navItems = [
  { href: '/dashboard', icon: FiHome, label: 'Dashboard' },
  { href: '/transactions', icon: FiRepeat, label: 'Transaksi' },
  { href: '/reports', icon: FiFileText, label: 'Laporan' },
];

export function Dock() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 print:hidden">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-3 px-6 py-3 bg-[#1c2030]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-3 rounded-full flex items-center justify-center transition-colors ${
                  isActive 
                    ? 'bg-white text-darker shadow-lg' 
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
                title={item.label}
              >
                <Icon size={20} />
              </motion.div>
            </Link>
          );
        })}
      </motion.div>
    </div>
  );
}
