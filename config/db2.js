// get the client
const mysql = require('mysql2');
require('dotenv').config()

// Create the connection pool. The pool-specific settings are the defaults
const db2 = mysql.createPool({
  host: process.env.DB2_HOST,
  user: process.env.DB2_USER,
  password: process.env.DB2_PASS,
  database: process.env.DB2_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = db2;