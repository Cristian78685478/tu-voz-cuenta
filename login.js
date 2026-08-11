import crypto from 'node:crypto';
import { setAdminCookie, clearAdminCookie, json } from '../_auth.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const password = String(req.body?.password || '');
    const expected = process.env.ADMIN_PASSWORD || '';
    const a = Buffer.from(password);
    const b = Buffer.from(expected);
    if (!expected || a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return json(res, 401, { error: 'Clave incorrecta.' });
    }
    setAdminCookie(res);
    return json(res, 200, { ok: true });
  }
  if (req.method === 'DELETE') {
    clearAdminCookie(res);
    return json(res, 200, { ok: true });
  }
  res.setHeader('Allow', 'POST, DELETE');
  return json(res, 405, { error: 'Método no permitido.' });
}
