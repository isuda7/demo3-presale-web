import { defineConfig } from 'vite';
import { readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

// 인트로(index.html) + 카탈로그 뷰어 + sites/<슬러그>/*.html 을 모두 멀티페이지 입력으로 등록한다.
const root = import.meta.dirname;
const input = { intro: resolve(root, 'index.html'), viewer: resolve(root, 'viewer.html') };
for (const slug of readdirSync(join(root, 'sites'))) {
  const dir = join(root, 'sites', slug);
  if (!statSync(dir).isDirectory()) continue;
  for (const f of readdirSync(dir)) {
    if (f.endsWith('.html')) input[`${slug}/${f.replace('.html', '')}`] = join(dir, f);
  }
}

export default defineConfig({
  server: { port: 5200, proxy: { '/api': 'http://localhost:8800' } },
  build: { rollupOptions: { input } },
});
