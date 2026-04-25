import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) throw new Error('Unauthorized');

    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .or(`owner_id.eq.${userId},id.in.(select business_id from users where id = ${userId})`);

    if (error) throw error;

    return NextResponse.json({ businesses: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const userId = request.headers.get('x-user-id');
    if (!userId) throw new Error('Unauthorized');

    const body = await request.json();

    const { data, error } = await supabase
      .from('businesses')
      .insert({
        owner_id: userId,
        ...body,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ business: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
