import { list, put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { isAdminRequest } from '../../lib/admin-auth';

const allowed = new Set(['image/jpeg', 'image/png', 'image/webp']);
const extension: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' };
const titleToCode = (title: string) => Buffer.from(title.slice(0, 100), 'utf8').toString('base64url') || 'sem-titulo';
const codeToTitle = (pathname: string) => {
  const match = pathname.match(/^gallery\/(\d+)-(.+)\.(jpg|png|webp)$/);
  if (!match || match[2] === 'sem-titulo') return '';
  try { return Buffer.from(match[2], 'base64url').toString('utf8'); } catch { return ''; }
};

export async function GET() {
  const { blobs } = await list({ prefix: 'gallery/', limit: 100 });
  return NextResponse.json(blobs.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime()).map(blob => ({
    pathname: blob.pathname,
    title: codeToTitle(blob.pathname),
    uploadedAt: blob.uploadedAt.toISOString(),
    image: `/api/gallery/image?pathname=${encodeURIComponent(blob.pathname)}`,
  })), { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=120' } });
}

export async function POST(request: Request) {
  if (!await isAdminRequest()) return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: 'Origem inválida.' }, { status: 403 });
  const form = await request.formData();
  const file = form.get('file');
  const title = String(form.get('title') || '').trim();
  if (!(file instanceof File) || !allowed.has(file.type)) return NextResponse.json({ error: 'Envie uma imagem JPG, PNG ou WebP.' }, { status: 400 });
  if (file.size > 3_800_000) return NextResponse.json({ error: 'A imagem deve ter no máximo 3,8 MB.' }, { status: 400 });
  const pathname = `gallery/${Date.now()}-${titleToCode(title)}.${extension[file.type]}`;
  await put(pathname, file, { access: 'private', addRandomSuffix: false });
  return NextResponse.json({ ok: true, pathname });
}

export async function DELETE(request: Request) {
  if (!await isAdminRequest()) return NextResponse.json({ error: 'Acesso não autorizado.' }, { status: 401 });
  const pathname = new URL(request.url).searchParams.get('pathname');
  if (!pathname?.startsWith('gallery/')) return NextResponse.json({ error: 'Arquivo inválido.' }, { status: 400 });
  const { del } = await import('@vercel/blob');
  await del(pathname);
  return NextResponse.json({ ok: true });
}
