// seed.mjs — Seed data untuk akun almanzilrestu@gmail.com
// Jalankan: node seed.mjs

const SUPABASE_URL = 'https://fhekehwjlkwrcjpcjwqe.supabase.co';
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZWtlaHdqbGt3cmNqcGNqd3FlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY3NzUyNSwiZXhwIjoyMDkyMjUzNTI1fQ.98UAOxtciquyTfaKuYcCrFc8Doa1WvX-umqMVMO9s7w';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZWtlaHdqbGt3cmNqcGNqd3FlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY2Nzc1MjUsImV4cCI6MjA5MjI1MzUyNX0.6eYAAdPrUOGo9vJeFYI_rQ8xTD8icSjgEcFgcZ8Fjhc';

const headers = (useService = true) => ({
  'Content-Type': 'application/json',
  'apikey': useService ? SERVICE_ROLE_KEY : ANON_KEY,
  'Authorization': `Bearer ${useService ? SERVICE_ROLE_KEY : ANON_KEY}`,
  'Prefer': 'return=representation',
});

const db = async (table, method = 'GET', body = null, query = '') => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
    method,
    headers: headers(true),
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok && method !== 'DELETE') {
    const err = await res.text();
    throw new Error(`${method} ${table}: ${err}`);
  }
  if (method === 'DELETE') return null;
  const text = await res.text();
  return text ? JSON.parse(text) : null;
};

// Login untuk dapat user ID
async function loginUser() {
  const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'apikey': ANON_KEY },
    body: JSON.stringify({ email: 'almanzilrestu@gmail.com', password: '123456' }),
  });
  const data = await res.json();
  if (!data.user) throw new Error('Login gagal: ' + JSON.stringify(data));
  console.log('✓ Login sukses, user ID:', data.user.id);
  return data.user.id;
}

// Cari atau buat business
async function getOrCreateBusiness(userId) {
  // Cari dari tabel users
  const users = await db('users', 'GET', null, `?select=*&id=eq.${userId}`);
  const user = users?.[0];
  console.log('User record:', user?.id, 'business_id:', user?.business_id);

  if (user?.business_id) {
    const bizList = await db('businesses', 'GET', null, `?select=*&id=eq.${user.business_id}`);
    if (bizList?.[0]) {
      console.log('✓ Bisnis ditemukan:', bizList[0].name, '| ID:', bizList[0].id);
      return bizList[0];
    }
  }

  // Cari bisnis yang dimiliki user
  const owned = await db('businesses', 'GET', null, `?select=*&owner_id=eq.${userId}&limit=1`);
  if (owned?.[0]) {
    console.log('✓ Bisnis owned:', owned[0].name, '| ID:', owned[0].id);
    // Update users.business_id
    await db('users', 'PATCH', { business_id: owned[0].id }, `?id=eq.${userId}`);
    return owned[0];
  }

  // Buat bisnis baru
  console.log('→ Membuat bisnis baru...');
  const newBiz = await db('businesses', 'POST', {
    owner_id: userId, name: 'Toko Makmur Jaya', industry: 'retail',
    currency: 'IDR', country: 'ID', phone: '0812-3456-7890',
    address: 'Jl. Pahlawan No. 15, Jakarta Selatan',
  });
  const biz = Array.isArray(newBiz) ? newBiz[0] : newBiz;
  await db('users', 'PATCH', { business_id: biz.id }, `?id=eq.${userId}`);
  console.log('✓ Bisnis dibuat:', biz.name, '| ID:', biz.id);
  return biz;
}

// Generate date N bulan lalu dengan tanggal random
function randomDate(monthsAgo, dayOffset = 0) {
  const d = new Date();
  d.setMonth(d.getMonth() - monthsAgo);
  d.setDate(Math.floor(Math.random() * 25) + 1 + dayOffset);
  return d.toISOString();
}

function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

async function seedTransactions(businessId, userId) {
  console.log('\n→ Membuat transaksi...');
  await db('transactions', 'DELETE', null, `?business_id=eq.${businessId}`);

  const incomeCategories = ['Penjualan', 'Jasa', 'Komisi', 'Lainnya'];
  const expenseCategories = ['Operasional', 'Perlengkapan', 'Gaji', 'Sewa', 'Marketing', 'Lainnya'];
  const paymentMethods = ['cash', 'transfer', 'qris', 'kartu_debit'];

  const incomeDescs = ['Penjualan produk A', 'Penjualan produk B', 'Layanan jasa konsultasi', 'Penjualan grosir', 'Pendapatan langganan', 'Penjualan online Tokopedia', 'Penjualan Shopee', 'Komisi penjualan', 'Pendapatan event', 'Penjualan ritel'];
  const expenseDescs = ['Beli bahan baku', 'Bayar listrik & air', 'Gaji karyawan', 'Sewa tempat usaha', 'Biaya iklan Facebook', 'Beli perlengkapan kantor', 'Biaya pengiriman', 'Biaya maintenance', 'Pembelian peralatan', 'Biaya operasional lainnya'];

  const transactions = [];

  // 6 bulan data
  for (let m = 5; m >= 0; m--) {
    const incomeCount = randInt(6, 12);
    const expenseCount = randInt(8, 15);

    // Income transactions
    for (let i = 0; i < incomeCount; i++) {
      transactions.push({
        business_id: businessId,
        type: 'income',
        category: randItem(incomeCategories),
        amount: randInt(150000, 3500000),
        description: randItem(incomeDescs),
        date: randomDate(m),
        payment_method: randItem(paymentMethods),
        created_by: userId,
      });
    }

    // Expense transactions
    for (let i = 0; i < expenseCount; i++) {
      transactions.push({
        business_id: businessId,
        type: 'expense',
        category: randItem(expenseCategories),
        amount: randInt(50000, 1200000),
        description: randItem(expenseDescs),
        date: randomDate(m),
        payment_method: randItem(paymentMethods),
        created_by: userId,
      });
    }
  }

  // Insert in batches of 20
  for (let i = 0; i < transactions.length; i += 20) {
    await db('transactions', 'POST', transactions.slice(i, i + 20));
  }
  console.log(`✓ ${transactions.length} transaksi dibuat`);
}

async function seedInventory(businessId) {
  console.log('\n→ Membuat inventori...');
  await db('inventory', 'DELETE', null, `?business_id=eq.${businessId}`);

  const items = [
    { name: 'Laptop ASUS VivoBook', sku: 'ASUS-VB-001', quantity: 12, unit_price: 8500000, reorder_level: 3, supplier: 'PT Asus Indonesia' },
    { name: 'Mouse Wireless Logitech', sku: 'LOG-MW-002', quantity: 45, unit_price: 185000, reorder_level: 10, supplier: 'Logitech Distributor' },
    { name: 'Keyboard Mechanical RGB', sku: 'KB-RGB-003', quantity: 8, unit_price: 650000, reorder_level: 5, supplier: 'Tech Accessories Co' },
    { name: 'Monitor LED 24 inch', sku: 'MON-24-004', quantity: 2, unit_price: 2200000, reorder_level: 3, supplier: 'Samsung Reseller' },
    { name: 'Headset Gaming Rexus', sku: 'REX-HS-005', quantity: 25, unit_price: 320000, reorder_level: 8, supplier: 'Rexus Official' },
    { name: 'Kabel USB Type-C 2m', sku: 'USB-C-006', quantity: 3, unit_price: 45000, reorder_level: 15, supplier: 'Anker Distributor' },
    { name: 'Tas Laptop 15 inch', sku: 'BAG-15-007', quantity: 18, unit_price: 275000, reorder_level: 5, supplier: 'Targus Reseller' },
    { name: 'Flash Drive 64GB', sku: 'FD-64-008', quantity: 60, unit_price: 85000, reorder_level: 20, supplier: 'Sandisk Official' },
    { name: 'Webcam HD 1080p', sku: 'WC-HD-009', quantity: 1, unit_price: 450000, reorder_level: 3, supplier: 'Logitech Distributor' },
    { name: 'Printer Epson L3210', sku: 'EPS-L3-010', quantity: 5, unit_price: 2800000, reorder_level: 2, supplier: 'Epson Resmi' },
  ];

  const withBiz = items.map(i => ({ ...i, business_id: businessId, last_restock_date: randomDate(randInt(0, 2)) }));
  await db('inventory', 'POST', withBiz);
  console.log(`✓ ${items.length} item inventori dibuat`);
}

async function seedCustomers(businessId) {
  console.log('\n→ Membuat pelanggan...');
  await db('customers', 'DELETE', null, `?business_id=eq.${businessId}`);

  const customers = [
    { name: 'PT Maju Bersama', email: 'procurement@majubersama.co.id', phone: '021-5551234', address: 'Jl. Sudirman No. 45, Jakarta', total_purchased: 15750000, total_transactions: 12 },
    { name: 'CV Sukses Mandiri', email: 'order@suksesmandiri.com', phone: '0812-9876-5432', address: 'Jl. Gatot Subroto 88, Bandung', total_purchased: 8900000, total_transactions: 7 },
    { name: 'Budi Santoso', email: 'budi.s@gmail.com', phone: '0857-1234-5678', address: 'Jl. Melati No. 12, Surabaya', total_purchased: 4200000, total_transactions: 5 },
    { name: 'Toko Elektronik Sinar', email: 'toko.sinar@yahoo.com', phone: '031-7654321', address: 'Pasar Atom Blok B No. 22, Surabaya', total_purchased: 22100000, total_transactions: 18 },
    { name: 'Rina Widiastuti', email: 'rina.w@hotmail.com', phone: '0878-5678-1234', address: 'Perumahan Griya Asri No. 5, Depok', total_purchased: 1850000, total_transactions: 3 },
    { name: 'PT Teknologi Nusantara', email: 'purchase@teknusa.id', phone: '021-8887766', address: 'Gedung Graha Teknologi Lantai 7, Jakarta Selatan', total_purchased: 35400000, total_transactions: 24 },
  ];

  const withBiz = customers.map(c => ({
    ...c, business_id: businessId,
    last_transaction_date: randomDate(randInt(0, 1)),
  }));
  await db('customers', 'POST', withBiz);
  console.log(`✓ ${customers.length} pelanggan dibuat`);
}

async function seedDebts(businessId) {
  console.log('\n→ Membuat hutang & piutang...');
  await db('debts', 'DELETE', null, `?business_id=eq.${businessId}`);

  const now = new Date();
  const future = (days) => { const d = new Date(now); d.setDate(d.getDate() + days); return d.toISOString(); };
  const past = (days) => { const d = new Date(now); d.setDate(d.getDate() - days); return d.toISOString(); };

  const debts = [
    { type: 'receivable', customer_name: 'PT Maju Bersama', amount: 5750000, due_date: future(15), status: 'pending', notes: 'Invoice #INV-2024-001 — Pembelian 3 unit laptop' },
    { type: 'receivable', customer_name: 'CV Sukses Mandiri', amount: 2200000, due_date: past(5), status: 'overdue', notes: 'Tagihan tertunggak dari bulan lalu' },
    { type: 'receivable', customer_name: 'Toko Elektronik Sinar', amount: 8100000, due_date: future(30), status: 'pending', notes: 'Invoice #INV-2024-002 — Grosir aksesoris' },
    { type: 'payable', customer_name: 'Logitech Distributor', amount: 3450000, due_date: future(7), status: 'pending', notes: 'Hutang pembelian stok mouse & headset' },
    { type: 'payable', customer_name: 'PT Asus Indonesia', amount: 17000000, due_date: future(21), status: 'pending', notes: 'Cicilan 2 dari pembelian 4 unit laptop' },
    { type: 'payable', customer_name: 'Sewa Ruko Pak Hendra', amount: 4500000, due_date: past(3), status: 'overdue', notes: 'Sewa bulan ini belum terbayar' },
  ];

  const withBiz = debts.map(d => ({ ...d, business_id: businessId }));
  await db('debts', 'POST', withBiz);
  console.log(`✓ ${debts.length} hutang/piutang dibuat`);
}

async function seedBudgets(businessId) {
  console.log('\n→ Membuat budget...');
  await db('budgets', 'DELETE', null, `?business_id=eq.${businessId}`);

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
  const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString();

  const budgets = [
    { category: 'Operasional', limit_amount: 5000000, period: 'monthly', start_date: monthStart, end_date: monthEnd, spent: 0 },
    { category: 'Marketing', limit_amount: 2000000, period: 'monthly', start_date: monthStart, end_date: monthEnd, spent: 0 },
    { category: 'Gaji', limit_amount: 8000000, period: 'monthly', start_date: monthStart, end_date: monthEnd, spent: 0 },
    { category: 'Perlengkapan', limit_amount: 1500000, period: 'monthly', start_date: monthStart, end_date: monthEnd, spent: 0 },
  ];

  const withBiz = budgets.map(b => ({ ...b, business_id: businessId }));
  await db('budgets', 'POST', withBiz);
  console.log(`✓ ${budgets.length} budget dibuat`);
}

// MAIN
async function main() {
  console.log('🌱 DuitTrack Seed Script');
  console.log('========================\n');
  try {
    const userId = await loginUser();
    const business = await getOrCreateBusiness(userId);
    const businessId = business.id;

    await seedTransactions(businessId, userId);
    await seedInventory(businessId);
    await seedCustomers(businessId);
    await seedDebts(businessId);
    await seedBudgets(businessId);

    console.log('\n✅ Seed selesai! Semua data berhasil dimasukkan.');
    console.log(`   Bisnis: ${business.name}`);
    console.log(`   Business ID: ${businessId}`);
  } catch (err) {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
  }
}

main();
