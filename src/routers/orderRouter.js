const express = require("express");
const { PlacePurchaseOrder } = require("../controllers/orderControllers");
const userAuth = require("../middleware/userauth");

const orderRouter = express.Router();

orderRouter.post("/auth/order",userAuth,PlacePurchaseOrder)


module.exports= orderRouter;