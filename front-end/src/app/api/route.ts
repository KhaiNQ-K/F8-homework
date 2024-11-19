import { getSession } from '@/app/lib/session-iron';
import { NextResponse } from 'next/server';

export default async function handler(req: Request, res: Response) {
  try {
    const session = await getSession(req, res);
    const cookeValue = session.jwt || 'No Cookie Stored!';
    res.headers.set('Authorization', `Bearer ${session.jwt}`);
    return NextResponse.json({ cookieInStorage: cookeValue });
  } catch (error: unknown) {
    console.error((error as Error).message);
    return new Response(JSON.stringify({ message: (error as Error).message }), { status: 500 });
  }
}
