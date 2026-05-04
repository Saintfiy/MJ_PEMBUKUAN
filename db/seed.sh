#!/bin/bash

# Database Seed Script (Clean Schema)
# Script ini akan mengisi data dummy ke Supabase untuk testing

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' 

echo -e "${BLUE}DuitTrack Database Seeding${NC}"
echo "=============================="
echo ""

cat > seed_data.sql << 'EOF'
-- Seed sample data untuk development

-- 1. Pastikan ada user (opsional, karena user harusnya dari Supabase Auth)
-- Tapi kita bisa buat bisnis dummy untuk user yang sudah ada
-- NOTE: Anda harus mendaftar (sign up) setidaknya 1 user di Supabase Auth terlebih dahulu!

-- 2. Insert sample businesses
INSERT INTO businesses (owner_id, name, industry, currency)
SELECT 
  id,
  'Bisnis Dummy ' || substr(md5(random()::text), 1, 4),
  'Retail',
  'IDR'
FROM users 
WHERE NOT EXISTS (
  SELECT 1 FROM businesses WHERE owner_id = users.id
)
LIMIT 1;

-- Update user's business_id if it's null
UPDATE users 
SET business_id = b.id
FROM businesses b
WHERE users.id = b.owner_id AND users.business_id IS NULL;

-- 3. Insert sample transactions (Pemasukan)
INSERT INTO transactions (business_id, type, category, amount, description, date, payment_method, created_by)
SELECT
  b.id,
  'income',
  'Penjualan Produk',
  (random() * 5000000 + 100000)::numeric,
  'Penjualan ' || substr(md5(random()::text), 1, 6),
  NOW() - (random() * interval '30 days'),
  'Transfer Bank',
  u.id
FROM businesses b
CROSS JOIN users u
WHERE b.owner_id = u.id
LIMIT 10;

-- 4. Insert sample transactions (Pengeluaran)
INSERT INTO transactions (business_id, type, category, amount, description, date, payment_method, created_by)
SELECT
  b.id,
  'expense',
  'Operasional',
  (random() * 2000000 + 50000)::numeric,
  'Biaya ' || substr(md5(random()::text), 1, 6),
  NOW() - (random() * interval '30 days'),
  'Tunai',
  u.id
FROM businesses b
CROSS JOIN users u
WHERE b.owner_id = u.id
LIMIT 10;

SELECT 'Seed data inserted successfully' as status;
EOF

echo "File seed_data.sql berhasil dibuat!"
echo ""
echo -e "${GREEN}Langkah selanjutnya:${NC}"
echo "1. Buka Supabase SQL Editor"
echo "2. Copy isi file 'seed_data.sql' dan Run"
echo "Atau jalankan: psql -U postgres -h [DB_HOST] -d postgres < seed_data.sql"
