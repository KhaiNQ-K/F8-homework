import { getServerActionSession } from '@/app/lib/session';
import { NextResponse } from 'next/server';

export async function POST() {
  const session = await getServerActionSession();
  session.destroy();
  return NextResponse.json({
    success: true,
  });
}
