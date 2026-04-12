const { Client } = require("pg");
const { DB } = require("../config");

(async () => {
  const allTablesDrop = `
    DROP TABLE IF EXISTS users, products, orders, orderItems, carts, cartItems CASCADE;
  `;

  try {
    const db = new Client({
      user: DB.PG_USER,
      host: DB.PG_HOST,
      database: DB.PG_DATABASE,
      password: DB.PG_PASSWORD,
      port: DB.PG_PORT,
    });

    await db.connect();

    await db.query(allTablesDrop);

    await db.end();
  } catch (err) {
    console.log("ERROR DROPS ONE OR MORE TABLES: ", err);
  }
})();
