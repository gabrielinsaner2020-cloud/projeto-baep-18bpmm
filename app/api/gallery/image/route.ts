import { get } from '@vercel/blob';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  const pathname = new URL(request.url).searchParams.get('pathname');
  if (!pathname?.startsWith('gallery/')) return new NextResponse('Imagem inválida', { status: 400 });
  const result = await get(pathname, { access: 'private' });
  if (!result || result.statusCode !== 200) return new NextResponse('Imagem não encontrada', { status: 404 });
  return new NextResponse(result.stream, { headers: { 'Content-Type': result.blob.contentType, 'Cache-Control': 'public, max-age=3600', 'X-Content-Type-Options': 'nosniff' } });
}
