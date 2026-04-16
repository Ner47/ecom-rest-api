const db = require("../db");
const moment = require("moment");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class OrderItemModel {
  constructor(data = {}) {
    this.created = data.created || moment.utc().toISOString();
    this.description = data.description;
    this.modified = moment.utc().toISOString();
    this.name = data.name;
    this.price = data.price || 0;
    this.productId = data.id;
    this.qty = data.qty || 1;
    this.orderId = data.orderId || null;
  }

  async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "orders") + "RETURNING *";

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  static async find(orderId) {
    try {
      const statement = `Select
                          oi.qty,
                          oi.id AS "cartItemId",
                          p.*
                         From "orderItems" oi
                         INNER JOIN products p ON p.id = oi."productId"
                         WHERE "orderId" = $1`;

      const values = [orderId];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return [];
    } catch (err) {
      throw new Error(err);
    }
  }
};
