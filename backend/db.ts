import { createClient, type Client } from '@libsql/client';

let client: Client | null = null;

/** 로컬은 local.db 파일, 배포는 TURSO_DATABASE_URL 을 사용한다. */
export function db(): Client {
  if (!client) {
    client = createClient({
      url: process.env.TURSO_DATABASE_URL ?? 'file:local.db',
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return client;
}

export async function ensureSchema() {
  await db().execute(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    site TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    interest TEXT,
    detail TEXT,
    consent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now','localtime'))
  )`);
}
