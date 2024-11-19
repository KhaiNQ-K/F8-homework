import fs from 'fs';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { accessToken, user } = await request.json();
  if (accessToken) {
    const path = `${process.cwd()}/session/${accessToken}`;
    fs.writeFileSync(path, JSON.stringify(user));
  }
  return NextResponse.json({
    success: true,
  });
}

export async function GET(request: Request) {
  const token = request.headers.get('access-token');
  if (token) {
    const path = `${process.cwd()}/session/${token}`;
    const user = JSON.parse(fs.readFileSync(path).toString());
    return NextResponse.json({
      user,
    });
  }
  return NextResponse.json({
    user: null,
  });
}
