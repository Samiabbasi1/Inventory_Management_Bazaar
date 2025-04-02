// const sqlite3 = require("sqlite3").verbose();

// const db = new sqlite3.Database("./inventory.db", (err) => {
//     if (err) {
//         console.error("Database connection failed:", err.message);
//     } else {
//         console.log("Connected to SQLite database.");
//     }
// });


// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS products (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT NOT NULL,
//         category TEXT NOT NULL,
//         price REAL NOT NULL
//     )`);

//     db.run(`CREATE TABLE IF NOT EXISTS stock_movements (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         product_id INTEGER NOT NULL,
//         quantity INTEGER NOT NULL,
//         type TEXT CHECK(type IN ('stock-in', 'sold', 'removed')) NOT NULL,
//         timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
//         FOREIGN KEY (product_id) REFERENCES products(id)
//     )`);
// });

// module.exports = db;

const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
  user: 'postgres', // Ensure this is the correct username
  host: 'localhost',
  database: 'inventory_system', // Ensure this is the correct database name
  password: '1234', // Ensure you are passing the correct password as a string
  port: 5432, // Default PostgreSQL port
});

// Connect to the database
client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Connection error', err.stack));

  module.exports = client;

