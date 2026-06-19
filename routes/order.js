const express = require("express");

const OrderService = require("../services/OrderService");
const OrderServiceInstance = new OrderService();

module.exports = (passport) => {
  const router = express.Router();

  router.get("/", async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await OrderService.list(id);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:orderId", async (req, res, next) => {
    try {
      const { orderId } = req.params;

      const response = await OrderServiceInstance.get(orderId);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
