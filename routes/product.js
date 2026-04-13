const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../middlewares/auth");

const ProductService = require("../services/ProductService");
const ProductServiceInstance = new ProductService();

module.exports = (app, passport) => {
  app.use("/products", router);

  router.post("/", async (req, res, next) => {
    try {
      const data = req.body;

      const response = await ProductServiceInstance.create(data);
      res.status(201).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.put("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;
      const data = req.body;

      const response = await ProductServiceInstance.update({
        id: productId,
        ...data,
      });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductServiceInstance.delete({ id: productId });

      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/", async (req, res, next) => {
    try {
      const response = await ProductServiceInstance.list();
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get("/:productId", async (req, res, next) => {
    try {
      const { productId } = req.params;

      const response = await ProductServiceInstance.get({ id: productId });
      res.status(200).send(response);
    } catch (err) {
      next(err);
    }
  });
};
