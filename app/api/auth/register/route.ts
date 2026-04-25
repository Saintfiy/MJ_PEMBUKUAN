import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generateToken } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, password, fullName } = await request.json();

    // Create user in Supabase Auth
    const admin = getSupabaseAdmin();
    const { data: authData, error: authError } = await admin.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name: fullName },
      email_confirm: true,
    });

    if (authError) throw authError;

    // Create user record in database
    const { data: userData, error: userError } = await admin
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role: 'owner',
      })
      .select()
      .single();

    if (userError) throw userError;

    const token = generateToken({ userId: authData.user.id, email });

    return NextResponse.json({
      user: userData,
      token,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
