


const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./tasks.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    due_date INTEGER NOT NULL,
    status Text DEFAULT 'pending'
    )
    `)
});

module.exports = db;
