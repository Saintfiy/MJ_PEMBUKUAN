# 🔧 DuitTrack Troubleshooting Guide

## Setup Issues

### ❌ `npm install` Failed

**Symptoms**: Error during dependency installation

**Solution**:
```bash
# Option 1: Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Option 2: Use different npm version
npm install -g npm@latest
npm install

# Option 3: Check Node version
node --version  # Should be 18.x or higher
npm --version   # Should be 9.x or higher
```

---

### ❌ TypeScript Compilation Error

**Symptoms**: 
```
error TS2304: Cannot find name 'X'
error TS2307: Cannot find module 'X'
```

**Solution**:
```bash
# Rebuild type definitions
npm run type-check

# If still failing:
rm -rf .next
npm run build

# Check tsconfig.json paths
cat tsconfig.json | grep paths
```

---

### ❌ Port 3000 Already in Use

**Symptoms**: 
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solution**:
```bash
# Option 1: Use different port
npm run dev -- -p 3001

# Option 2: Kill process on port 3000
lsof -i :3000
kill -9 <PID>

# Option 3: Use Vercel CLI
npm install -g vercel
vercel env pull
vercel dev
```

---

## Environment & Configuration Issues

### ❌ Supabase Connection Error

**Symptoms**: 
```
Error: Unable to connect to Supabase
Failed to initialize Supabase client
```

**Checklist**:
```bash
# 1. Verify .env.local exists
ls -la .env.local

# 2. Check env vars are set
grep NEXT_PUBLIC_SUPABASE .env.local

# 3. Validate format
cat .env.local
# Should show:
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# 4. No trailing spaces or extra newlines
sed -i 's/[[:space:]]*$//' .env.local

# 5. Restart dev server
# Kill existing process (Ctrl+C) and run: npm run dev
```

**Advanced Debugging**:
```typescript
// Add to lib/supabase.ts temporarily
console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
// Check browser console after npm run dev
```

---

### ❌ Anon Key Missing Permissions

**Symptoms**:
```
Error: permission denied
row level security policy violation
```

**Solution**:
1. Go to Supabase Dashboard
2. SQL Editor
3. Run these queries:

```sql
-- Check if policies exist
SELECT * FROM pg_policies WHERE tablename = 'users';

-- If no results, policies not set up
-- Re-run db/schema.sql entirely
-- Or run individual RLS allows:

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  USING (auth.uid() = id);
```

---

### ❌ JWT Secret Not Set

**Symptoms**:
```
Error: JWT_SECRET is undefined
Token validation failed
```

**Solution**:
```bash
# Generate secure JWT secret
openssl rand -hex 32

# Output example: a7f3e9d2b1c4f6e8a0d3c5b7f9e1d2c4

# Add to .env.local
echo "JWT_SECRET=a7f3e9d2b1c4f6e8a0d3c5b7f9e1d2c4" >> .env.local

# Restart server
npm run dev
```

---

## Database Issues

### ❌ "Users" Table Not Found

**Symptoms**:
```
PostgreSQL error: relation "users" does not exist
```

**Solution**:
1. Verify database schema created:

```bash
# Login to Supabase SQL Editor
# Run:
SELECT * FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_type = 'BASE TABLE';
```

2. If no tables shown, execute full schema:
   - Go to SQL Editor
   - Create new query
   - Copy entire `db/schema.sql`
   - Execute

3. Verify tables created:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';
-- Should list 14+ tables
```

---

### ❌ Row Level Security Blocked Access

**Symptoms**:
```
Error: new row violates row-level security policy
```

**Debugging**:
```sql
-- Check which policies exist
SELECT * FROM pg_policies WHERE tablename = 'transactions';

-- Temporarily disable RLS for debugging
ALTER TABLE transactions DISABLE ROW LEVEL SECURITY;

-- If it works, RLS is too restrictive
-- Re-enable and fix policy:
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
DROP POLICY "Transactions select policy" ON transactions;
CREATE POLICY "Users can read own transactions"
  ON transactions FOR SELECT
  USING (business_id IN (
    SELECT id FROM businesses WHERE owner_id = auth.uid()
  ));
```

---

### ❌ Database Query Timeout

**Symptoms**:
```
Error: operation timed out
Query execution took longer than expected
```

**Solution**:
```sql
-- Check if indexes exist
SELECT * FROM pg_indexes WHERE table_name = 'transactions';

-- Create missing indexes
CREATE INDEX idx_transactions_business_id 
ON transactions(business_id);

CREATE INDEX idx_transactions_date 
ON transactions(created_at DESC);

CREATE INDEX idx_businesses_owner_id 
ON businesses(owner_id);
```

---

## Authentication Issues

### ❌ "Invalid Email" Error on Register

**Symptoms**:
```
Error: Invalid email format
```

**Solution**:
```typescript
// Check email validation in utils/helpers.ts
const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Test:
console.log(isValidEmail('test@gmail.com')); // true
console.log(isValidEmail('test@valid.co.uk')); // true
console.log(isValidEmail('invalid.email')); // false
```

---

### ❌ "Password Too Short" Error

**Symptoms**:
```
Error: Password must be at least 8 characters
```

**Solution**: Use valid password format
- At least 8 characters
- Mix of letters, numbers, and symbols recommended
- Example: `Duittrack@123`

---

### ❌ Login Always Fails

**Symptoms**:
```
Invalid credentials
Authentication failed
```

**Debugging**:
1. Verify user exists in Supabase:
```sql
-- Check users table
SELECT id, email, created_at FROM auth.users;

-- If no users, test registration flow first
```

2. Check if user was created correctly:
```sql
SELECT id, user_id, email, created_at 
FROM public.users 
WHERE email = 'test@email.com';
```

3. Try resetting password:
   - Click "Forgot Password"
   - Check email for reset link
   - Create new password

---

### ❌ JWT Token Expired

**Symptoms**:
```
Error: Token has expired
Unauthorized
```

**Solution**:
```typescript
// Token expiration set in utils/auth.ts
// Default: 24 hours

// To extend:
export function generateToken(userId: string) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' } // Changed from '24h' to '7d'
  );
}

// After change, restart server
npm run dev
```

---

## UI/Frontend Issues

### ❌ Sidebar Not Animating

**Symptoms**:
- Sidebar doesn't collapse
- No smooth animations
- Jerky transitions

**Solution**:
```bash
# Verify Framer Motion installed
npm list framer-motion
# Should show version 10.16.0 or higher

# If missing:
npm install framer-motion@latest

# Restart dev server
npm run dev
```

---

### ❌ Dark Mode Not Working

**Symptoms**:
- Theme toggle doesn't change colors
- Dark mode not persisting

**Solution**:
```typescript
// Check if Tailwind dark mode enabled in tailwind.config.ts
// Should have: darkMode: 'class'

// Check store in store/index.ts
import { create } from 'zustand';

export const useUIStore = create((set) => ({
  darkMode: false,
  toggleDarkMode: () => set((state) => ({
    darkMode: !state.darkMode,
  })),
}));

// Verify navbar.tsx implements toggle
function Navbar() {
  const { darkMode, toggleDarkMode } = useUIStore();
  
  return (
    <button onClick={toggleDarkMode}>
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}
```

---

### ❌ Charts Not Displaying

**Symptoms**:
- Blank space where charts should be
- Console errors about Recharts

**Solution**:
```bash
# Verify Recharts installed
npm list recharts
# Should show 2.12.0 or higher

# If missing:
npm install recharts@latest

# Check chart dimensions
# Recharts needs fixed height and width

# Example fix:
<LineChart width={600} height={300} data={data}>
  <Line type="monotone" dataKey="value" stroke="#8B5CF6" />
</LineChart>

# Restart server
npm run dev
```

---

## API & Network Issues

### ❌ API Route Returns 404

**Symptoms**:
```
Error 404: Not found
POST /api/auth/login → 404
```

**Solution**:
1. Verify file exists in correct location:
```bash
# For POST /api/auth/login, file should be:
ls -la app/api/auth/login/route.ts
# Should exist

# For GET /api/transactions/[businessId]
ls -la app/api/transactions/[businessId]/route.ts
# Should exist
```

2. Check file exports POST/GET:
```typescript
// route.ts must export:
export async function POST(request: Request) { }
export async function GET(request: Request) { }

// NOT: function PostHandler(), or export default
```

3. Restart dev server:
```bash
npm run dev
```

---

### ❌ CORS Error

**Symptoms**:
```
Access to XMLHttpRequest denied by CORS policy
No 'Access-Control-Allow-Origin' header
```

**Solution**:
```typescript
// Add to API route
// File: app/api/auth/login/route.ts

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*', // Or specific domain
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function POST(request: Request) {
  try {
    // API logic
    return Response.json({ data }, { headers });
  } catch (error) {
    return Response.json({ error: String(error) }, 
      { status: 500, headers });
  }
}
```

---

### ❌ Request Timeout

**Symptoms**:
```
Error: Request timeout
Connection took too long
```

**Solution**:
```typescript
// Add timeout to fetch calls
// File: services/transaction.service.ts

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 10000); // 10 seconds

try {
  const response = await fetch('/api/transactions', {
    signal: controller.signal,
  });
} finally {
  clearTimeout(timeout);
}

// Or use axios with timeout
import axios from 'axios';

const instance = axios.create({
  timeout: 15000, // 15 seconds
});
```

---

## Performance Issues

### ❌ Slow Page Load

**Symptoms**:
- Dashboard takes 5+ seconds to load
- Input lag

**Debugging**:
```bash
# Check build size
npm run build
# Check .next/static/chunks size

# Profile in browser DevTools
# 1. Open Chrome DevTools
# 2. Performance tab
# 3. Record interaction
# 4. Identify slowest components

# Typical issues:
# - Large dependency (use dynamic import)
# - Unoptimized image (use next/image)
# - Slow API call (add caching with React Query)
```

**Solutions**:
```typescript
// Dynamic import heavy component
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./charts/Report'), {
  loading: () => <div>Loading chart...</div>,
  ssr: false,
});

// Caching with React Query
import { useQuery } from '@tanstack/react-query';

export function Dashboard() {
  const { data } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboardData,
    staleTime: 1000 * 60 * 5, // Cache 5 minutes
  });
}

// Image optimization
import Image from 'next/image';

<Image 
  src="/logo.png" 
  width={200} 
  height={200} 
  alt="Logo"
  priority // Preload above fold
/>
```

---

### ❌ Memory Leak

**Symptoms**:
- App slows over time
- DevTools shows growing memory

**Solution**:
```typescript
// Cleanup subscriptions in useEffect
import { useEffect } from 'react';

export function TransactionList() {
  useEffect(() => {
    // Subscribe
    const subscription = supabase
      .from('transactions')
      .on('*', (payload) => { /* ... */ })
      .subscribe();

    // Cleanup
    return () => {
      subscription.unsubscribe();
    };
  }, []);
}

// Close database connections
export async function cleanup() {
  await supabase.removeAllSubscriptions();
  await supabase.auth.signOut();
}
```

---

## Deployment Issues

### ❌ Build Fails on Vercel

**Symptoms**:
```
Build failed
Error during next build
```

**Solution**:
1. Check build logs in Vercel dashboard
2. Run build locally first:
```bash
npm run build
# See errors before deploying
```

3. Common causes:
   - TypeScript errors: `npm run type-check`
   - Missing dependencies: `npm install`
   - Environment variables: Set in Vercel dashboard → Settings → Environment Variables

4. Rebuild on Vercel:
```bash
# After fixing, push to git
git add .
git commit -m "fix: build errors"
git push

# Vercel auto-deploys on push
# Or manually redeploy in dashboard
```

---

### ❌ Environment Variables Not Loading

**Symptoms**:
```
Error: NEXT_PUBLIC_SUPABASE_URL is undefined
```

**Solution**:
1. Variables must start with `NEXT_PUBLIC_` to be visible in browser
2. Set in Vercel:
   - Settings → Environment Variables
   - Add each variable:
     - Name: `NEXT_PUBLIC_SUPABASE_URL`
     - Value: `https://xxx.supabase.co`
   - Keep server-only for secret keys

3. Redeploy after adding variables:
```bash
# Push fresh commit to trigger redeployment
git commit --allow-empty -m "redeploy"
git push
```

---

## Getting Help

### 📚 Documentation Links
- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Support](https://supabase.io/docs)
- [TailwindCSS](https://tailwindcss.com/docs)

### 🐛 Debug Commands
```bash
# Check environment
npm run type-check
npm list

# Test specific file
npm run dev -- --inspect

# Check build errors
npm run build 2>&1 | tee build.log

# Database debugging
# Supabase SQL Editor → Run queries to inspect data
```

### 💬 Getting Support
1. Check this guide first
2. Review error message carefully
3. Search GitHub issues: [DuitTrack Issues]
4. Check Supabase/Next.js docs
5. Ask in community forums

---

**Still stuck?** Create detailed bug report with:
- Error message (full text)
- Steps to reproduce
- Environment (Node version, npm version, OS)
- Screenshots or logs
- What you already tried

---

**Last Updated**: 2024
**Status**: ✅ Complete & Ready for Production
