import { Hono } from 'hono';
import { readFileSync } from 'node:fs';
import { db, ensureSchema } from './db.js';

/** 등록된 현장 슬러그 목록(sites.json)만 신청을 받는다. */
const sites: { slug: string }[] = JSON.parse(readFileSync(new URL('../sites.json', import.meta.url), 'utf8')).sites;
const slugs = new Set(sites.map((s) => s.slug));

export const app = new Hono().basePath('/api');
let ready: Promise<void> | null = null;
app.use('*', async (c, next) => {
  ready ??= ensureSchema();
  await ready;
  await next();
  c.header('Cache-Control', 'no-store');
});

const PHONE = /^01[016789]-?\d{3,4}-?\d{4}$/;

app.post('/apply', async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: '잘못된 요청입니다.' }, 400);
  const site = String(body.site ?? '');
  const name = String(body.name ?? '').trim();
  const phone = String(body.phone ?? '').trim();
  if (!slugs.has(site)) return c.json({ error: '알 수 없는 현장입니다.' }, 400);
  if (name.length < 2 || name.length > 30) return c.json({ error: '이름을 확인해 주세요.' }, 400);
  if (!PHONE.test(phone)) return c.json({ error: '휴대폰 번호를 확인해 주세요.' }, 400);
  if (body.consent !== true) return c.json({ error: '개인정보 수집·이용에 동의해 주세요.' }, 400);
  const interest = String(body.interest ?? '').slice(0, 100);
  const detail = JSON.stringify(body.detail ?? {}).slice(0, 4000);
  await db().execute({
    sql: 'INSERT INTO applications (site, name, phone, interest, detail, consent) VALUES (?,?,?,?,?,1)',
    args: [site, name, phone, interest, detail],
  });
  return c.json({ ok: true });
});

app.notFound((c) => c.json({ error: 'Not Found' }, 404));
app.onError((err, c) => {
  console.error('[api]', err);
  return c.json({ error: '서버 오류가 발생했습니다.' }, 500);
});
