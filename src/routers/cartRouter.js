const express = require("express");
const userAuth = require("../middleware/userauth");
const { updateCart, getCartItems } = require("../controllers/cartControllers");

const cartRouter = express.Router();

cartRouter.post("/auth/cart/update", userAuth, updateCart);
cartRouter.get("/auth/cart/Items", userAuth, getCartItems);

module.exports = cartRouter;
