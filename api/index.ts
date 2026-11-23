import { handle } from 'hono/vercel';
import { app } from '../backend/app.js';

export default handle(app);
