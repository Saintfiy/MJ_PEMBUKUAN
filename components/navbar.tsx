'use client';

import { motion } from 'framer-motion';
import { FiUser, FiMenu } from 'react-icons/fi';
import { useUIStore } from '@/store';

export function Navbar() {
  const { sidebarOpen, toggleMobileSidebar } = useUIStore();

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 h-16 glass border-b border-white/10 z-30 px-4 md:px-6 flex items-center justify-between transition-all duration-300 left-0 ${
        sidebarOpen ? 'lg:left-[260px]' : 'lg:left-[72px]'
      }`}
    >

      {/* Left: Hamburger (mobile) */}
      <div className="flex items-center gap-3 flex-1">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleMobileSidebar}
          className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-smooth flex-shrink-0"
          aria-label="Buka menu"
        >
          <FiMenu size={20} />
        </motion.button>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 md:gap-3">
        {/* Profil */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-2 md:px-3 py-2 hover:bg-white/10 rounded-lg transition-smooth"
          aria-label="Profil pengguna"
        >
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 text-darker">
            <FiUser size={16} />
          </div>
          <span className="hidden md:block text-sm font-medium">Profil</span>
        </motion.button>
      </div>
    </motion.nav>
  );
}
