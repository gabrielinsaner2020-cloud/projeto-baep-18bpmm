import { cookies } from 'next/headers';

const COOKIE_NAME = 'baep_admin_session';
const SESSION_SECONDS = 60 * 60 * 8;

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');
}

async function signature(timestamp: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return '';
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return bytesToHex(new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`baep-admin:${timestamp}`))));
}

export async function createAdminSession() {
  const timestamp = String(Date.now());
  return `${timestamp}.${await signature(timestamp)}`;
}

export async function isValidAdminToken(token?: string) {
  if (!token) return false;
  const [timestamp, supplied] = token.split('.');
  if (!timestamp || !supplied || Date.now() - Number(timestamp) > SESSION_SECONDS * 1000) return false;
  const expected = await signature(timestamp);
  if (!expected || expected.length !== supplied.length) return false;
  let difference = 0;
  for (let i = 0; i < expected.length; i++) difference |= expected.charCodeAt(i) ^ supplied.charCodeAt(i);
  return difference === 0;
}

export async function isAdminRequest() {
  return isValidAdminToken((await cookies()).get(COOKIE_NAME)?.value);
}

export const adminCookie = { name: COOKIE_NAME, maxAge: SESSION_SECONDS };
