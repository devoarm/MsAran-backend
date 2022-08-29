require("dotenv").config();
const db = require("knex")({
  client: "mysql",
  connection: {
    host: process.env.DB2_HOST,
    port: 3306,
    user: process.env.DB2_USER,
    password: process.env.DB2_PASS,
    database: process.env.DB2_NAME,
  },
});

module.exports = db;
