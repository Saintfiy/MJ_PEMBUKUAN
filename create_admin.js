const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://tcbymrmmzkhtikstgkpm.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjYnltcm1temtodGlrc3Rna3BtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Nzg5NzczMSwiZXhwIjoyMDkzNDczNzMxfQ.1xQv6niZ9dHxhDvDkqVhHMYTI0f-Pe6JTvzECVMek8U';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function createAdmin() {
  console.log('🔧 Mencoba membuat user admin MJ Print...');

  const { data, error } = await supabase.auth.admin.createUser({
    email: 'admin@mjprint.com',
    password: 'mjprint2024',
    email_confirm: true,
    user_metadata: { full_name: 'Admin MJ Print' }
  });

  if (error) {
    if (error.message && error.message.toLowerCase().includes('already')) {
      console.log('✅ User admin@mjprint.com sudah ada!');
      console.log('📧 Email   : admin@mjprint.com');
      console.log('🔑 Password: mjprint2024');
    } else {
      console.error('❌ Gagal membuat user:', error.message);
    }
    return;
  }

  const userId = data.user.id;
  console.log('✅ User admin berhasil dibuat! ID:', userId);

  // Insert ke tabel users jika ada
  const { error: userErr } = await supabase
    .from('users')
    .upsert({ id: userId, email: 'admin@mjprint.com', full_name: 'Admin MJ Print' }, { onConflict: 'id' });

  if (userErr) {
    console.log('⚠️  Upsert tabel users:', userErr.message);
  }

  // Buat data bisnis
  const { data: biz, error: bizErr } = await supabase
    .from('businesses')
    .insert({ owner_id: userId, name: 'Pembukuan MJ', industry: 'Printing', currency: 'IDR' })
    .select()
    .single();

  if (bizErr) {
    console.log('⚠️  Data bisnis:', bizErr.message);
  } else {
    // Update business_id di tabel users
    await supabase.from('users').update({ business_id: biz.id }).eq('id', userId);
    console.log('✅ Data bisnis berhasil dibuat.');
  }

  console.log('');
  console.log('🎉 Selesai! Silakan login dengan:');
  console.log('📧 Email   : admin@mjprint.com');
  console.log('🔑 Password: mjprint2024');
}

createAdmin();
