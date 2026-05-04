'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMenu, FiLogOut, FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import { useUIStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';

export function Navbar() {
  const router = useRouter();
  const { sidebarOpen, toggleMobileSidebar } = useUIStore();
  const { user } = useAuth();

  const avatarUrl = (user as any)?.avatar_url ?? null;
  const initials = user?.full_name
    ? user.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : null;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 right-0 h-16 border-b border-white/[0.07] z-30 px-4 md:px-6 flex items-center justify-between transition-all duration-300 left-0 ${
        sidebarOpen ? 'lg:left-[260px]' : 'lg:left-[72px]'
      }`}
      style={{ backgroundColor: '#111318' }}
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
      <div className="flex items-center gap-1 md:gap-3" ref={dropdownRef}>
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 px-2 md:px-3 py-2 hover:bg-white/10 rounded-lg transition-smooth"
            aria-label="Profil pengguna"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-primary/20 flex items-center justify-center flex-shrink-0">
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" className="w-full h-full object-cover" />
              ) : initials ? (
                <span className="text-xs font-bold text-primary">{initials}</span>
              ) : (
                <FiUser size={16} className="text-primary" />
              )}
            </div>
            <span className="hidden md:block text-sm font-medium">
              {user?.full_name?.split(' ')[0] ?? 'Profil'}
            </span>
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-48 bg-darker border border-white/10 rounded-xl shadow-xl overflow-hidden py-1 z-50"
              >
                <div className="px-4 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs text-white/50 truncate">Masuk sebagai</p>
                  <p className="text-sm font-semibold truncate">{user?.email}</p>
                </div>
                
                <button
                  onClick={() => { setDropdownOpen(false); router.push('/settings'); }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-white/10 transition-colors"
                >
                  <FiSettings size={16} className="text-white/60" /> Pengaturan
                </button>
                
                <button
                  onClick={() => { setDropdownOpen(false); useAuth().logout(); }}
                  className="w-full text-left flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FiLogOut size={16} /> Keluar
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
