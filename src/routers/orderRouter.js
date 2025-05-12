const express = require("express");
const {
  PlacePurchaseOrder,
  getAllOrder,
  getUserOrders,
  chanageOrderStatus,
} = require("../controllers/orderControllers");
const userAuth = require("../middleware/userauth");
const sellerAuth = require("../middleware/sellerauth");

const orderRouter = express.Router();

orderRouter.post("/auth/order", userAuth, PlacePurchaseOrder);
orderRouter.get("/auth/seller/all/orders", sellerAuth, getAllOrder);
orderRouter.get("/auth/users/all/orders", userAuth, getUserOrders);
orderRouter.patch("/auth/seller/order/update/:id", sellerAuth, chanageOrderStatus);

module.exports = orderRouter;
