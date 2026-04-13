const createError = require("http-errors");
const ProductModel = require("../models/product");
const ProductModelInstance = new ProductModel();

module.exports = class UserService {
  async create(data) {
    const { name, price, description } = data;

    try {
      if (!name || !price || !description) {
        throw createError(401, "Bad request");
      }

      const product = await ProductModelInstance.findOneByName(name);

      if (product) {
        throw createError(409, "Name of Product already in use");
      }

      return await ProductModelInstance.create(data);
    } catch (err) {
      throw err;
    }
  }

  async update(data) {
    try {
      const product = await ProductModelInstance.update(data);

      return product;
    } catch (err) {
      throw err;
    }
  }

  async delete(data) {
    const { id } = data;
    try {
      const product = await ProductModelInstance.delete(id);

      return product;
    } catch (err) {
      throw err;
    }
  }

  async list() {
    try {
      const products = await ProductModelInstance.find();

      if (!products) {
        throw createError(404, "Products not found");
      }

      return products;
    } catch (err) {
      throw err;
    }
  }

  async get(data) {
    const { id } = data;
    try {
      const product = await ProductModelInstance.findOne(id);

      if (!product) {
        throw createError(404, "Products record not found");
      }

      return product;
    } catch (err) {
      throw err;
    }
  }
};
