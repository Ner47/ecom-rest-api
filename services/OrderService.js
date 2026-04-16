const createError = require("http-errors");
const OrderModel = require("../models/order");

module.exports = class UserService {
  async list(userId) {
    try {
      const order = await OrderModel.findByUser({ userId });

      if (!order) {
        throw createError(404, "Order not found");
      }

      return order;
    } catch (err) {
      throw err;
    }
  }

  async get(orderId) {
    try {
      const order = await OrderModel.findById(orderId);

      if (!order) {
        throw createError(404, "Order record not found");
      }

      return order;
    } catch (err) {
      throw err;
    }
  }
};
