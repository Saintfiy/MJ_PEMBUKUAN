'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { Button } from '@/components/ui';
import { isValidEmail } from '@/utils/helpers';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Mock password reset
      console.log('Reset password for:', email);
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card p-8 md:p-10">
          {!submitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <Link href="/" className="inline-block text-3xl font-bold gradient-text mb-2">
                  DuitTrack
                </Link>
                <p className="text-white/60">Reset your password</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <p className="text-white/70 text-sm mb-6">
                  Enter your email address and we'll send you a link to reset your password.
                </p>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
                  <div className="relative">
                    <FiMail className="absolute left-4 top-3 text-white/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-field !pl-11"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">{error}</div>}

                {/* Submit */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    disabled={loading}
                  >
                    {loading ? 'Sending...' : 'Send Reset Email'}
                  </Button>
                </div>

                {/* Back to login */}
                <Link
                  href="/auth/login"
                  className="flex items-center justify-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm"
                >
                  <FiArrowLeft /> Back to login
                </Link>
              </form>
            </>
          ) : (
            // Success Screen
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <FiCheck className="text-3xl text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Check your email</h2>
              <p className="text-white/60 mb-6">
                We've sent a password reset link to <span className="font-semibold text-white">{email}</span>. Check your inbox and click the link to reset your password.
              </p>
              <p className="text-white/40 text-sm mb-6">
                If you don't see the email, check your spam folder.
              </p>
              <Link
                href="/auth/login"
                className="inline-block px-6 py-2 bg-primary text-darker rounded-lg hover:shadow-lg transition-smooth"
              >
                Back to login
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
