const express = require("express");
const userAuth = require("../middleware/userauth");
const {
  updateCart,
  getCartItems,
  deleteCartItem,
  clearCart,
} = require("../controllers/cartControllers");

const cartRouter = express.Router();

cartRouter.post("/auth/cart/update", userAuth, updateCart);
cartRouter.get("/auth/cart/Items", userAuth, getCartItems);
cartRouter.patch("/auth/cart/Items/delete", userAuth, deleteCartItem);
cartRouter.patch("/auth/cart/clear", userAuth, clearCart);

module.exports = cartRouter;
