// 로컬 신청 목록 확인: npm run apps [-- <현장슬러그>]
import { db, ensureSchema } from '../backend/db.js';

await ensureSchema();
const site = process.argv[2];
const rs = await db().execute(
  site ? { sql: 'SELECT * FROM applications WHERE site=? ORDER BY id DESC', args: [site] } : 'SELECT * FROM applications ORDER BY id DESC',
);
console.table(rs.rows);
