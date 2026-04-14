import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

// File database akan tercipta otomatis dengan nama 'sqlite.db'
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite, { schema });