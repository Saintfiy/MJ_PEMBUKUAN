'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { Button } from '@/components/ui';
import { supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (authError) throw authError;
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials'
        ? 'Email atau kata sandi salah.'
        : err.message || 'Login gagal');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 hero-gradient">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8 md:p-10 shadow-elevated border border-slate-100">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block text-3xl font-black gradient-text mb-2 tracking-tight">
              MJ Print
            </Link>
            <p className="text-slate-500 font-medium">Masuk ke Dasbor Admin</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input-field !pl-12 !py-3 w-full"
                  placeholder="admin@mjprint.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kata Sandi</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input-field !pl-12 !py-3 w-full"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
                {error}
              </div>
            )}

            <div className="pt-4">
              <Button type="submit" variant="primary" size="lg" className="w-full justify-center !py-3.5 !rounded-xl" disabled={loading}>
                {loading ? 'Sedang masuk...' : 'Masuk'} <FiArrowRight className="ml-2" />
              </Button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
