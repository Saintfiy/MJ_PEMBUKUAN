'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export function Card({ children, className = '', hover = true, style }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -2, boxShadow: '0 16px 32px rgba(139, 92, 246, 0.15)' } : undefined}
      className={`card ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
  trend?: 'up' | 'down';
  compact?: string; // nilai ringkas untuk mobile
}

export function StatCard({ label, value, icon, change, trend, compact }: StatCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-white/60 text-xs font-medium mb-1.5 truncate">{label}</p>
          {/* Nilai ringkas di layar kecil, penuh di layar besar */}
          {compact ? (
            <>
              <p className="text-xl font-bold sm:hidden">{compact}</p>
              <p className="text-2xl font-bold hidden sm:block truncate">{value}</p>
            </>
          ) : (
            <p className="text-xl sm:text-2xl font-bold truncate">{value}</p>
          )}
          {change !== undefined && (
            <p className={`text-xs mt-1.5 font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
              {trend === 'up' ? '↑' : '↓'} {Math.abs(change)}% dari bulan lalu
            </p>
          )}
        </div>
        <div className="text-2xl opacity-70 flex-shrink-0 mt-0.5">{icon}</div>
      </div>
    </Card>
  );
}

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-smooth flex items-center gap-1.5 flex-shrink-0';

  const variants = {
    primary: 'bg-primary text-darker hover:shadow-lg hover:shadow-primary/20',
    secondary: 'border border-white/20 text-white hover:bg-white/10',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
}

// === MODAL COMPONENT ===
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-darker/80 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md card bg-dark p-0 overflow-hidden border border-white/10"
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-white/10">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-smooth">
            ✕
          </button>
        </div>
        <div className="p-4 md:p-6 max-h-[70vh] overflow-y-auto">
          {children}
        </div>
      </motion.div>
    </div>
  );
}

// === TOAST CONTAINER ===
import { useNotificationStore } from '@/store';
import { AnimatePresence } from 'framer-motion';

export function ToastContainer() {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {notifications.map((notif) => (
          <motion.div
            layout
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`pointer-events-auto px-4 py-3 rounded-xl shadow-lg border backdrop-blur-md flex items-center gap-3 ${
              notif.type === 'success' ? 'bg-green-500/20 border-green-500/30 text-green-100' :
              notif.type === 'error' ? 'bg-red-500/20 border-red-500/30 text-red-100' :
              notif.type === 'warning' ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-100' :
              'bg-blue-500/20 border-blue-500/30 text-blue-100'
            }`}
          >
            <span className="text-sm font-medium">{notif.message}</span>
            <button onClick={() => removeNotification(notif.id)} className="opacity-60 hover:opacity-100 transition-opacity">
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
