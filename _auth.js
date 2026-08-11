import crypto from 'node:crypto';

const COOKIE = 'tvc_admin';

function sessionToken(password) {
  return crypto.createHmac('sha256', password).update('tu-voz-cuenta-admin-v1').digest('base64url');
}

export function setAdminCookie(res) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) throw new Error('Falta ADMIN_PASSWORD en las variables de entorno.');
  const token = sessionToken(password);
  res.setHeader('Set-Cookie', `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=28800`);
}

export function clearAdminCookie(res) {
  res.setHeader('Set-Cookie', `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);
}

export function isAdmin(req) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const header = req.headers.cookie || '';
  const match = header.match(new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`));
  if (!match) return false;
  const expected = Buffer.from(sessionToken(password));
  const received = Buffer.from(match[1]);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

export function json(res, status, body) {
  res.status(status).json(body);
}
