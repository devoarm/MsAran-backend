require('dotenv').config()
const db = require("knex")({
  client: "mysql",
  connection: {
    // host: '159.223.32.66',
    // port: 3306,
    // user: 'devoarm',
    // password: 'Ntng@arm55',
    // database: 'msaran',
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'msaran',
  },
});

module.exports = db;
