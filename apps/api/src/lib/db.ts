import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({ connectionString })
  : null;

export async function query<T>(text: string, params: Array<string | number | boolean | null> = []) {
  if (!pool) {
    throw new Error('DATABASE_URL is not configured');
  }
  return pool.query(text, params) as Promise<{ rows: T[] }>;
}
