const db = require("../db");
const pgp = require("pg-promise")({ capSQL: true });

module.exports = class ProductModel {
  async create(data) {
    try {
      const statement =
        pgp.helpers.insert(data, null, "products") + "RETURNING *";

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async update(data) {
    try {
      const { id, ...params } = data;

      const condition = pgp.as.format("WHERE id = ${id} RETURNING *", { id });
      const statement =
        pgp.helpers.update(params, null, "products") + condition;

      const result = await db.query(statement);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(id) {
    try {
      const statement = `DELETE
                         From products
                         WHERE id = $1
                         `;

      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async find() {
    try {
      const statement = `Select * From products`;

      const values = [];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows;
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOne(id) {
    try {
      const statement = `Select *
                         From products
                         WHERE id = $1`;

      const values = [id];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }

  async findOneByName(name) {
    try {
      const statement = `Select *
                         From products
                         WHERE name = $1`;

      const values = [name];

      const result = await db.query(statement, values);

      if (result.rows?.length) {
        return result.rows[0];
      }

      return null;
    } catch (err) {
      throw new Error(err);
    }
  }
};
