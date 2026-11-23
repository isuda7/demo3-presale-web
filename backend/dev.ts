import { serve } from '@hono/node-server';
import { app } from './app.js';

serve({ fetch: app.fetch, port: 8800 }, () => console.log('API http://localhost:8800'));
