// db.js
const { PGlite } = require('@electric-sql/pglite');

const db = new PGlite('./groups.db');

async function initDB() {
  await db.exec(`
    CREATE TABLE IF NOT EXISTS groups (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL
    );
    CREATE TABLE IF NOT EXISTS scores (
      id SERIAL PRIMARY KEY,
      group_name TEXT NOT NULL,
      time INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

module.exports = { db, initDB };

