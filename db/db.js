const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "masukpostgre",
  database: "data",
  port: 5432,
});

module.exports = pool;
