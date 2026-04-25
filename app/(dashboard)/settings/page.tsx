'use client';

import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Card, Button } from '@/components/ui';
import { FiSave, FiUserCheck, FiLock, FiBell, FiGlobe, FiToggleLeft, FiToggleRight, FiShield } from 'react-icons/fi';
import { useNotificationStore } from '@/store';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const SettingsPage = () => {
  const { user, business } = useAuth({ requireAuth: true });
  const { addNotification } = useNotificationStore();

  const [profileData, setProfileData] = useState({ full_name: '', email: '', phone: '' });
  const [businessData, setBusinessData] = useState({ name: '', industry: '', currency: 'IDR', country: 'ID', phone: '', address: '' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [notifStates, setNotifStates] = useState([true, true, false]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingBusiness, setSavingBusiness] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  // Populate fields from loaded user/business data
  useEffect(() => {
    if (user) {
      setProfileData({
        full_name: user.full_name || '',
        email: user.email || '',
        phone: (user as any).phone || '',
      });
    }
  }, [user]);

  useEffect(() => {
    if (business) {
      setBusinessData({
        name: business.name || '',
        industry: business.industry || 'retail',
        currency: business.currency || 'IDR',
        country: business.country || 'ID',
        phone: business.phone || '',
        address: business.address || '',
      });
    }
  }, [business]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingProfile(true);
    try {
      const { error } = await supabase.from('users').update({
        full_name: profileData.full_name,
      }).eq('id', user.id);
      if (error) throw error;
      addNotification('Profil berhasil disimpan!', 'success');
    } catch (err: any) {
      addNotification(err.message || 'Gagal menyimpan profil', 'error');
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSaveBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!business) return;
    setSavingBusiness(true);
    try {
      const { error } = await supabase.from('businesses').update({
        name: businessData.name,
        industry: businessData.industry,
        currency: businessData.currency,
        country: businessData.country,
        phone: businessData.phone || null,
        address: businessData.address || null,
      }).eq('id', business.id);
      if (error) throw error;
      addNotification('Pengaturan bisnis disimpan!', 'success');
    } catch (err: any) {
      addNotification(err.message || 'Gagal menyimpan bisnis', 'error');
    } finally {
      setSavingBusiness(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      addNotification('Kata sandi baru tidak cocok', 'error');
      return;
    }
    if (passwords.newPass.length < 6) {
      addNotification('Kata sandi minimal 6 karakter', 'error');
      return;
    }
    setSavingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: passwords.newPass });
      if (error) throw error;
      addNotification('Kata sandi berhasil diubah!', 'success');
      setPasswords({ current: '', newPass: '', confirm: '' });
    } catch (err: any) {
      addNotification(err.message || 'Gagal mengubah kata sandi', 'error');
    } finally {
      setSavingPassword(false);
    }
  };

  const toggleNotif = (idx: number) => {
    setNotifStates(prev => prev.map((v, i) => i === idx ? !v : v));
  };

  return (
    <DashboardLayout title="Pengaturan">
      <div className="max-w-2xl space-y-6">

        {/* Profil */}
        <Card>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiUserCheck /> Pengaturan Profil
          </h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Nama Lengkap</label>
              <input type="text" className="input-field" value={profileData.full_name}
                onChange={e => setProfileData({ ...profileData, full_name: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
              <input type="email" className="input-field opacity-60 cursor-not-allowed" value={profileData.email} readOnly />
              <p className="text-xs text-white/40 mt-1">Email tidak dapat diubah langsung.</p>
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={savingProfile}>
              <FiSave /> {savingProfile ? 'Menyimpan...' : 'Simpan Profil'}
            </Button>
          </form>
        </Card>

        {/* Bisnis */}
        <Card>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiGlobe /> Pengaturan Bisnis
          </h3>
          <form onSubmit={handleSaveBusiness} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Nama Bisnis</label>
              <input type="text" className="input-field" value={businessData.name}
                onChange={e => setBusinessData({ ...businessData, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Industri</label>
                <select className="input-field" value={businessData.industry}
                  onChange={e => setBusinessData({ ...businessData, industry: e.target.value })}>
                  <option value="retail">Retail</option>
                  <option value="food">Food & Beverage</option>
                  <option value="services">Jasa</option>
                  <option value="manufacturing">Manufaktur</option>
                  <option value="other">Lainnya</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Mata Uang</label>
                <select className="input-field" value={businessData.currency}
                  onChange={e => setBusinessData({ ...businessData, currency: e.target.value })}>
                  <option value="IDR">IDR — Rupiah</option>
                  <option value="USD">USD — Dolar AS</option>
                  <option value="SGD">SGD — Dolar Singapura</option>
                  <option value="MYR">MYR — Ringgit</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Telepon Bisnis</label>
                <input type="tel" className="input-field" value={businessData.phone}
                  onChange={e => setBusinessData({ ...businessData, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">Alamat</label>
                <input type="text" className="input-field" value={businessData.address}
                  onChange={e => setBusinessData({ ...businessData, address: e.target.value })} />
              </div>
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={savingBusiness}>
              <FiSave /> {savingBusiness ? 'Menyimpan...' : 'Simpan Bisnis'}
            </Button>
          </form>
        </Card>

        {/* Keamanan */}
        <Card>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiShield /> Keamanan
          </h3>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Kata Sandi Baru</label>
              <input type="password" className="input-field" value={passwords.newPass}
                onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                placeholder="Min. 6 karakter" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">Konfirmasi Kata Sandi</label>
              <input type="password" className="input-field" value={passwords.confirm}
                onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} />
            </div>
            <Button type="submit" variant="primary" size="sm" disabled={savingPassword}>
              <FiLock /> {savingPassword ? 'Mengubah...' : 'Ubah Kata Sandi'}
            </Button>
          </form>
        </Card>

        {/* Notifikasi */}
        <Card>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <FiBell /> Preferensi Notifikasi
          </h3>
          <div className="space-y-3">
            {[
              { title: 'Peringatan Stok Rendah', desc: 'Notifikasi saat item hampir habis' },
              { title: 'Pengingat Transaksi', desc: 'Ringkasan transaksi harian' },
              { title: 'Laporan Bulanan', desc: 'Laporan keuangan bulanan otomatis' },
            ].map((notif, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-white/10 rounded-xl">
                <div>
                  <p className="font-semibold">{notif.title}</p>
                  <p className="text-sm text-white/60">{notif.desc}</p>
                </div>
                <button onClick={() => toggleNotif(idx)}
                  className={`text-2xl transition-smooth ${notifStates[idx] ? 'text-accent' : 'text-white/30'}`}
                  type="button">
                  {notifStates[idx] ? <FiToggleRight /> : <FiToggleLeft />}
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
