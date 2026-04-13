const { Pool } = require("pg");
const { DB } = require("../config");

const pool = new Pool({
  user: DB.PG_USER,
  host: DB.PG_HOST,
  database: DB.PG_DATABASE,
  password: DB.PG_PASSWORD,
  port: DB.PG_PORT,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
