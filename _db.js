import { neon } from '@neondatabase/serverless';

export function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL || process.env.POSTGRES_URL_NON_POOLING;
  if (!url) throw new Error('Falta DATABASE_URL (o POSTGRES_URL) en las variables de entorno.');
  return neon(url);
}
