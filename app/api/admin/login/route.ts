import { NextResponse } from 'next/server';
import { adminCookie, createAdminSession } from '../../../lib/admin-auth';

export async function POST(request: Request) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  const body = await request.json().catch(() => ({})) as { username?: string; password?: string };
  if (body.username !== 'gabrielinsaner' || !process.env.ADMIN_PASSWORD || body.password !== process.env.ADMIN_PASSWORD) {
    await new Promise(resolve => setTimeout(resolve, 550));
    return NextResponse.json({ error: 'Usuário ou senha incorretos.' }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set(adminCookie.name, await createAdminSession(), { httpOnly: true, secure: true, sameSite: 'strict', path: '/', maxAge: adminCookie.maxAge });
  return response;
}
