const authRouter = require("./auth");
const userRouter = require("./user");
const productRouter = require("./product");
const cartRouter = require("./cart");
const orderRouter = require("./order");
const express = require("express");

module.exports = (app, passport) => {
  const apiRouter = express.Router();

  apiRouter.use("/auth", authRouter(passport));
  apiRouter.use("/users", userRouter(passport));
  apiRouter.use("/products", productRouter(passport));
  apiRouter.use("/carts", cartRouter(passport));
  apiRouter.use("/orders", orderRouter(passport));

  app.use("/api", apiRouter);
};
