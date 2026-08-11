import { getSql, json } from '../../_db.js';
import { isAdmin } from '../../_auth.js';

export default async function handler(req, res) {
  if (!isAdmin(req)) return json(res, 401, { error: 'No autorizado.' });
  try {
    const sql = getSql();
    if (req.method === 'GET') {
      const rows = await sql`
        SELECT id, titulo, categoria, ubicacion, historia, anonimo, estado, creado_en, revisado_en
        FROM casos
        WHERE estado = 'pendiente'
        ORDER BY creado_en ASC
        LIMIT 100
      `;
      return json(res, 200, { casos: rows });
    }

    res.setHeader('Allow', 'GET');
    return json(res, 405, { error: 'Método no permitido.' });
  } catch (error) {
    console.error(error);
    return json(res, 500, { error: 'Error del servidor.' });
  }
}
