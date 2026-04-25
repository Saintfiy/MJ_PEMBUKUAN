require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function check() {
  const email = 'almanzilrestu@gmail.com';
  console.log('Checking user:', email);
  
  // 1. Auth User
  const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
  if (authError) {
    console.error('Error listing users:', authError);
    return;
  }
  
  const user = authData.users.find(u => u.email === email);
  if (!user) {
    console.log('User not found in auth.users!');
    return;
  }
  
  console.log('Found in auth.users:', user.id, 'Email Confirmed at:', user.email_confirmed_at);
  
  // 2. Public Users table
  const { data: dbUser, error: dbUserError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (dbUserError) {
    console.log('Error finding user in public.users:', dbUserError.message);
  } else {
    console.log('Found in public.users:', dbUser.business_id ? 'Has Business ID' : 'NO Business ID');
  }
  
  // 3. Try to login (test password)
  const { data: loginData, error: loginError } = await createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ).auth.signInWithPassword({
    email,
    password: '123456'
  });
  
  if (loginError) {
    console.log('Login Test Failed:', loginError.message);
  } else {
    console.log('Login Test Succeeded!');
  }
}

check();
