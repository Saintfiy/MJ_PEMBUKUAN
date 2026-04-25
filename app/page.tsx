'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiArrowRight, FiTrendingUp, FiCpu, FiShield, FiZap } from 'react-icons/fi';

export default function Home() {
  return (
    <div className="min-h-screen bg-darker">
      {/* Navbar */}
      <nav className="fixed top-0 w-full glass border-b border-white/10 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">DuitTrack</div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white/70 hover:text-white transition-smooth">
              Masuk
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primary text-darker rounded-lg hover:shadow-lg transition-smooth"
            >
              Daftar Gratis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Pembukuan Pintar untuk UMKM
          </h1>
          <p className="text-xl text-white/60 mb-8 leading-relaxed">
            DuitTrack menggabungkan analisis keuangan berbasis AI, dashboard real-time, dan
            wawasan cerdas untuk membantu bisnis Anda berkembang. Kelola keuangan, inventori, dan
            hubungan pelanggan dalam satu platform yang indah.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-darker rounded-lg hover:shadow-lg transition-smooth"
            >
              Mulai Gratis <FiArrowRight />
            </Link>
            <button className="px-8 py-4 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-smooth">
              Pelajari Lebih Lanjut
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">Fitur Unggulan</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiCpu className="text-4xl text-primary" />,
                title: 'Asisten Keuangan AI',
                description: 'Dapatkan rekomendasi cerdas dan wawasan tentang arus kas Anda',
              },
              {
                icon: <FiTrendingUp className="text-4xl text-secondary" />,
                title: 'Analitik Real-time',
                description: 'Dashboard interaktif dengan analitik drill-down dan prediksi',
              },
              {
                icon: <FiZap className="text-4xl text-accent" />,
                title: 'OCR Pintar',
                description: 'Pindai struk dan otomatis rekam transaksi',
              },
              {
                icon: <FiShield className="text-4xl text-primary" />,
                title: 'Aman & Privat',
                description: 'Keamanan tingkat bank dengan enkripsi dan 2FA',
              },
              {
                icon: <FiTrendingUp className="text-4xl text-secondary" />,
                title: 'Multi-Bisnis',
                description: 'Kelola berbagai bisnis dan cabang dari satu akun',
              },
              {
                icon: <FiZap className="text-4xl text-accent" />,
                title: 'Offline Support',
                description: 'Bekerja offline, sinkron otomatis saat online kembali',
              },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="card group hover:border-primary/50"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto card text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap mengubah bisnis Anda?</h2>
          <p className="text-white/60 mb-8">
            Bergabung dengan ribuan UMKM yang menggunakan DuitTrack untuk mengelola keuangan lebih baik.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 bg-primary text-darker rounded-lg hover:shadow-lg transition-smooth"
          >
            Mulai Gratis Sekarang
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6 text-center text-white/50">
        <p>&copy; {new Date().getFullYear()} DuitTrack. Hak cipta dilindungi undang-undang.</p>
      </footer>
    </div>
  );
}
