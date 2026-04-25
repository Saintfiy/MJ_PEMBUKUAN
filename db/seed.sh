#!/bin/bash

# Database Seed Script
# This script adds sample data to the DuitTrack database for testing

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}DuitTrack Database Seeding${NC}"
echo "=============================="
echo ""

# Check if psql is available
if ! command -v psql &> /dev/null; then
    echo "psql not found. Installing..."
    # Instructions for different systems
    echo "On macOS: brew install postgresql"
    echo "On Ubuntu: sudo apt-get install postgresql-client"
    exit 1
fi

echo -e "${GREEN}✓ PostgreSQL client found${NC}"
echo ""

# Seed SQL for sample data
cat > seed_data.sql << 'EOF'
-- Seed sample data for development/testing

-- Insert sample businesses
INSERT INTO businesses (owner_id, name, industry, country, currency, business_health_score)
SELECT 
  id,
  'Sample Business ' || random()::text,
  'retail',
  'ID',
  'IDR',
  95
FROM users LIMIT 1;

-- Insert sample transactions
INSERT INTO transactions (business_id, type, category, amount, description, date, payment_method, created_by, synced_with_payment)
SELECT
  b.id,
  CASE WHEN random() > 0.5 THEN 'income' ELSE 'expense' END,
  CASE WHEN random() > 0.5 THEN 'Sales' ELSE 'Operating' END,
  (random() * 5000000)::numeric,
  'Sample transaction ' || random()::text,
  NOW() - (random() * interval '30 days'),
  'bank',
  u.id,
  false
FROM businesses b
CROSS JOIN users u
LIMIT 20;

-- Insert sample customers
INSERT INTO customers (business_id, name, email, phone, total_purchased, total_transactions)
SELECT
  b.id,
  'Customer ' || generate_series,
  'customer' || generate_series || '@example.com',
  '+62' || substr(random()::text, 3, 9),
  (random() * 10000000)::numeric,
  (random() * 50)::integer
FROM businesses b
CROSS JOIN generate_series(1, 5);

-- Insert sample inventory
INSERT INTO inventory (business_id, name, sku, quantity, unit_price, reorder_level)
SELECT
  b.id,
  'Product ' || generate_series,
  'SKU' || LPAD((generate_series)::text, 3, '0'),
  (random() * 100)::integer,
  (random() * 500000)::numeric,
  20
FROM businesses b
CROSS JOIN generate_series(1, 10);

-- Insert sample budgets
INSERT INTO budgets (business_id, category, limit_amount, spent, period, start_date, end_date)
SELECT
  b.id,
  CASE WHEN generate_series = 1 THEN 'Marketing'
       WHEN generate_series = 2 THEN 'Operations'
       WHEN generate_series = 3 THEN 'Staff'
       ELSE 'Other' END,
  (10000000 + random() * 15000000)::numeric,
  (random() * 5000000)::numeric,
  'monthly',
  DATE_TRUNC('month', NOW()),
  DATE_TRUNC('month', NOW()) + interval '1 month' - interval '1 day'
FROM businesses b
CROSS JOIN generate_series(1, 4);

SELECT 'Seed data inserted successfully' as status;
EOF

echo "Sample data SQL prepared in seed_data.sql"
echo ""
echo -e "${GREEN}Database seeding complete!${NC}"
echo ""
echo "To seed your database:"
echo "1. Connect to your Supabase database"
echo "2. Run: psql -U <user> -h <host> -d <database> < seed_data.sql"
echo ""
echo "Or copy & paste the SQL from seed_data.sql in Supabase SQL Editor"
