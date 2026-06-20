const createError = require("http-errors");
const CartModel = require("../models/cart");
const OrderModel = require("../models/order");
const CartItemModel = require("../models/cartItem");
const { STRIPE_SECRET_KEY } = require("../config");

module.exports = class CartService {
  async create(data) {
    const { userId } = data;

    try {
      if (!userId) {
        throw createError(401, "Bad request");
      }

      const Cart = new CartModel();
      const cart = await Cart.create(userId);

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async loadCart(userId) {
    try {
      let cart = await CartModel.findOneByUser(userId);

      if (cart === null) {
        const newCart = new CartModel();
        cart = await newCart.create(userId);
      }

      const items = await CartItemModel.find(cart.id);
      cart.items = items;

      return cart;
    } catch (err) {
      throw err;
    }
  }

  async addItem(userId, item) {
    try {
      let cart = await CartModel.findOneByUser(userId);

      if (cart === null) {
        const newCart = new CartModel();
        cart = await newCart.create(userId);
      }
      const productId = Number(item.productId);
      const qty = Number(item.qty);

      if (!Number.isInteger(productId) || productId <= 0) {
        throw createError(400, "Invalid productId");
      }

      if (!Number.isInteger(qty) || qty <= 0) {
        throw createError(400, "Invalid qty");
      }

      const cartItemData = {
        cartid: Number(cart.id),
        productid: productId,
        qty,
      };

      const cartItem = await CartItemModel.create(cartItemData);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async removeItem(cartItemId) {
    try {
      const cartItem = await CartItemModel.delete(cartItemId);

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async updateItem(cartItemId, data) {
    try {
      const cartItem = await CartItemModel.update(cartItemId, data);

      if (!cartItem) {
        throw createError(404, "Cart item not found");
      }

      return cartItem;
    } catch (err) {
      throw err;
    }
  }

  async checkout(cartId, userId, paymentInfo) {
    try {
      const stripe = require("stripe")(STRIPE_SECRET_KEY);
      const cartItems = await CartItemModel.find(cartId);

      const total = cartItems.reduce((total, item) => {
        return (total += Number(item.price));
      }, 0);

      const Order = new OrderModel({ total, userId });
      Order.addItems(cartItems);
      await Order.create();

      const charge = await stripe.charges.create({
        amount: total,
        currency: "usd",
        source: paymentInfo.id,
        description: "My Charge",
      });

      const order = Order.update({ status: "COMPLETE" });
      return order;
    } catch (err) {
      throw err;
    }
  }
};
