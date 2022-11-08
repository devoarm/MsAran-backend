require("dotenv").config();
const db = require("knex")({
  client: "mysql2",
  connection: {
    host: "159.223.32.66",
    port: 3306,
    user: "dev",
    password: "aranFvg8",
    database: "msaran",
    // host: 'localhost',
    // port: 3306,
    // user: 'root',
    // password: '',
    // database: 'msaran',
  },
});

module.exports = db;
