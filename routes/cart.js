const express = require("express");
const { ensureAuthenticated } = require("../middlewares/auth");

const CartService = require("../services/CartService");
const CartServiceInstance = new CartService();

module.exports = (passport) => {
  const router = express.Router();

  router.get("/", ensureAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.user;

      const response = await CartServiceInstance.loadCart(id);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/", ensureAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.user;
      const response = await CartServiceInstance.create({ userId: id });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/items", ensureAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.user;
      const data = req.body;

      const response = await CartServiceInstance.addItem(id, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/items/:itemId", async (req, res, next) => {
    try {
      const { itemId } = req.params;
      const data = req.body;

      const response = await CartServiceInstance.update(itemId, data);
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/items/:itemId", async (req, res, next) => {
    try {
      const { itemId } = req.params;

      const response = await CartServiceInstance.removeItem(itemId);

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post("/checkout", ensureAuthenticated, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { cartId, paymentInfo } = req.body;

      const response = await CartServiceInstance.checkout(
        cartId,
        id,
        paymentInfo,
      );
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  return router;
};
