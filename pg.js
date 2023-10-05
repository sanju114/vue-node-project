const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "sanjyot",
  password: "Passw0rd",
  port: 5432
});

pool.query("SELECT NOW()", function (err, result) {
  if (err) {
    console.error("Error executing query:", err);
    return;
  } else console.log("Current timestamp from the database:", result.rows[0].now);
});

module.exports = { pool };
