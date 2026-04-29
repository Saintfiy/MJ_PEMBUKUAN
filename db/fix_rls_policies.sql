-- ============================================================
-- FIX: Tambah RLS Policy UPDATE & DELETE yang hilang
-- Jalankan seluruh file ini di Supabase SQL Editor
-- ============================================================

-- ---- TRANSACTIONS ----
DROP POLICY IF EXISTS "Users can update transactions" ON transactions;
CREATE POLICY "Users can update transactions" ON transactions
  FOR UPDATE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete transactions" ON transactions;
CREATE POLICY "Users can delete transactions" ON transactions
  FOR DELETE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ---- CUSTOMERS ----
DROP POLICY IF EXISTS "Users can insert customers" ON customers;
CREATE POLICY "Users can insert customers" ON customers
  FOR INSERT WITH CHECK (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can update customers" ON customers;
CREATE POLICY "Users can update customers" ON customers
  FOR UPDATE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete customers" ON customers;
CREATE POLICY "Users can delete customers" ON customers
  FOR DELETE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ---- INVENTORY ----
DROP POLICY IF EXISTS "Users can insert inventory" ON inventory;
CREATE POLICY "Users can insert inventory" ON inventory
  FOR INSERT WITH CHECK (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can update inventory" ON inventory;
CREATE POLICY "Users can update inventory" ON inventory
  FOR UPDATE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete inventory" ON inventory;
CREATE POLICY "Users can delete inventory" ON inventory
  FOR DELETE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ---- DEBTS ----
DROP POLICY IF EXISTS "Users can read debts" ON debts;
CREATE POLICY "Users can read debts" ON debts
  FOR SELECT USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert debts" ON debts;
CREATE POLICY "Users can insert debts" ON debts
  FOR INSERT WITH CHECK (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can update debts" ON debts;
CREATE POLICY "Users can update debts" ON debts
  FOR UPDATE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete debts" ON debts;
CREATE POLICY "Users can delete debts" ON debts
  FOR DELETE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ---- BUDGETS ----
DROP POLICY IF EXISTS "Users can read budgets" ON budgets;
CREATE POLICY "Users can read budgets" ON budgets
  FOR SELECT USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can insert budgets" ON budgets;
CREATE POLICY "Users can insert budgets" ON budgets
  FOR INSERT WITH CHECK (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can update budgets" ON budgets;
CREATE POLICY "Users can update budgets" ON budgets
  FOR UPDATE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

DROP POLICY IF EXISTS "Users can delete budgets" ON budgets;
CREATE POLICY "Users can delete budgets" ON budgets
  FOR DELETE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ---- ACHIEVEMENTS ----
DROP POLICY IF EXISTS "Users can read own achievements" ON achievements;
CREATE POLICY "Users can read own achievements" ON achievements
  FOR SELECT USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert own achievements" ON achievements;
CREATE POLICY "Users can insert own achievements" ON achievements
  FOR INSERT WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own achievements" ON achievements;
CREATE POLICY "Users can delete own achievements" ON achievements
  FOR DELETE USING (user_id = auth.uid());

-- ---- STORAGE: LOGOS (avatar foto profil) ----
DROP POLICY IF EXISTS "Users can update logos" ON storage.objects;
CREATE POLICY "Users can update logos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'logos' AND auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Users can delete logos" ON storage.objects;
CREATE POLICY "Users can delete logos" ON storage.objects
  FOR DELETE USING (bucket_id = 'logos' AND auth.uid() IS NOT NULL);

-- ---- SETTINGS FIXES ----
-- 1. Tambah kolom untuk simpan preferensi notifikasi
ALTER TABLE users ADD COLUMN IF NOT EXISTS notification_preferences JSONB DEFAULT '[true, true, false]';

-- 2. Fix RLS agar pengguna bisa update pengaturan bisnis
DROP POLICY IF EXISTS "Owners can update business" ON businesses;
CREATE POLICY "Owners can update business" ON businesses
  FOR UPDATE USING (owner_id = auth.uid() OR id = get_my_business_id());


