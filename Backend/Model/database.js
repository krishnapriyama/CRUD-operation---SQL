const sqlite3 = require('sqlite3').verbose();
const dbPath = '../DataBase/users.db';
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connection Successfully Implemented');
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY,
        first_name TEXT,
        last_name TEXT,
        dob TEXT,
        address TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error:', err.message);
      } else {
        console.log('Table Created');
      }
    });
  }
});

module.exports = db;