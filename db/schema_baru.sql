-- ============================================================
--  DuitTrack — Schema Baru (Fitur Inti Saja)
--  Tabel: users, businesses, transactions
-- ============================================================

-- ─── TABEL: users ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email        TEXT UNIQUE NOT NULL,
  full_name    TEXT,
  avatar_url   TEXT,
  role         TEXT NOT NULL DEFAULT 'owner' CHECK(role IN ('owner', 'admin', 'staff')),
  business_id  UUID,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── TABEL: businesses ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS businesses (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  logo_url     TEXT,
  industry     TEXT,
  currency     TEXT DEFAULT 'IDR',
  phone        TEXT,
  address      TEXT,
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- FK dari users ke businesses
ALTER TABLE users DROP CONSTRAINT IF EXISTS fk_users_business_id;
ALTER TABLE users ADD CONSTRAINT fk_users_business_id
  FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL;

-- ─── TABEL: transactions ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS transactions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id      UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  type             TEXT NOT NULL CHECK(type IN ('income', 'expense')),
  category         TEXT NOT NULL,
  amount           NUMERIC NOT NULL CHECK(amount > 0),
  description      TEXT,
  date             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  payment_method   TEXT DEFAULT 'cash',
  reference_number TEXT,
  receipt_url      TEXT,
  created_by       UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ─── INDEX performa ──────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_users_business        ON users(business_id);
CREATE INDEX IF NOT EXISTS idx_transactions_business ON transactions(business_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date     ON transactions(date DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_type     ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category ON transactions(category);

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
ALTER TABLE users        ENABLE ROW LEVEL SECURITY;
ALTER TABLE businesses   ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Helper function
CREATE OR REPLACE FUNCTION get_my_business_id()
RETURNS UUID AS $$
  SELECT business_id FROM users WHERE id = auth.uid() LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER;

-- ─── RLS: users ──────────────────────────────────────────────
DROP POLICY IF EXISTS "Users can read own data"   ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Users can insert own data" ON users;

CREATE POLICY "Users can read own data"   ON users FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (id = auth.uid());
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (id = auth.uid());

-- ─── RLS: businesses ─────────────────────────────────────────
DROP POLICY IF EXISTS "Owner can read own business"   ON businesses;
DROP POLICY IF EXISTS "Owner can insert business"     ON businesses;
DROP POLICY IF EXISTS "Owner can update own business" ON businesses;

CREATE POLICY "Owner can read own business" ON businesses
  FOR SELECT USING (owner_id = auth.uid() OR id = get_my_business_id());

CREATE POLICY "Owner can insert business" ON businesses
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owner can update own business" ON businesses
  FOR UPDATE USING (owner_id = auth.uid());

-- ─── RLS: transactions ───────────────────────────────────────
DROP POLICY IF EXISTS "Users can read transactions"   ON transactions;
DROP POLICY IF EXISTS "Users can insert transactions" ON transactions;
DROP POLICY IF EXISTS "Users can update transactions" ON transactions;
DROP POLICY IF EXISTS "Users can delete transactions" ON transactions;

CREATE POLICY "Users can read transactions" ON transactions
  FOR SELECT USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can insert transactions" ON transactions
  FOR INSERT WITH CHECK (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can update transactions" ON transactions
  FOR UPDATE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

CREATE POLICY "Users can delete transactions" ON transactions
  FOR DELETE USING (
    business_id = get_my_business_id()
    OR business_id IN (SELECT id FROM businesses WHERE owner_id = auth.uid())
  );

-- ─── TRIGGER: auto-create user profile saat register ─────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ─── TRIGGER: auto-update updated_at ─────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at_users        ON users;
DROP TRIGGER IF EXISTS set_updated_at_businesses   ON businesses;
DROP TRIGGER IF EXISTS set_updated_at_transactions ON transactions;

CREATE TRIGGER set_updated_at_users
  BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_businesses
  BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_transactions
  BEFORE UPDATE ON transactions FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─── STORAGE BUCKETS ─────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES
  ('logos',    'logos',    true),
  ('receipts', 'receipts', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public logo access"    ON storage.objects;
DROP POLICY IF EXISTS "Upload logos"          ON storage.objects;
DROP POLICY IF EXISTS "Public receipt access" ON storage.objects;
DROP POLICY IF EXISTS "Upload receipts"       ON storage.objects;

CREATE POLICY "Public logo access" ON storage.objects
  FOR SELECT USING (bucket_id = 'logos');

CREATE POLICY "Upload logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'logos' AND auth.uid() IS NOT NULL);

CREATE POLICY "Public receipt access" ON storage.objects
  FOR SELECT USING (bucket_id = 'receipts');

CREATE POLICY "Upload receipts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'receipts' AND auth.uid() IS NOT NULL);
