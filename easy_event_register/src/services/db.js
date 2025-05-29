//
// SQLite database service: sets up the DB, provides convenient query/run/transaction methods
//
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const dbPath = path.join(__dirname, '../../easy_event_register.sqlite');
const db = new sqlite3.Database(dbPath);

// Run DB migrations if needed
function initializeDb() {
  db.serialize(() => {
    // Create events table
    db.run(`
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT
      )
    `);

    // Create registrations table
    db.run(`
      CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        event_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        registered_at TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
      )
    `);

    // Optionally, add some sample events if table is empty
    db.get('SELECT COUNT(*) as count FROM events', (err, row) => {
      if (row.count === 0) {
        // Insert demo data
        const stmt = db.prepare('INSERT INTO events (name, date, location, description) VALUES (?, ?, ?, ?)');
        stmt.run('Tech Conference', '2024-08-11', 'Main Hall', 'Annual technology conference for professionals');
        stmt.run('Art Expo', '2024-09-20', 'Art Center', 'Showcasing modern artwork and installations');
        stmt.run('Startup Pitch Night', '2024-07-18', 'Startup Hub', 'Pitch your startup idea in front of judges!');
        stmt.finalize();
      }
    });
  });
}
// 
// Exec wrappers for promise-based DB access
//
function run(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
}

function get(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, function (err, row) {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

function all(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, function (err, rows) {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

initializeDb();

module.exports = {
  db,
  run,
  get,
  all,
};
