const express = require("express");
const {
  SellerSignUpControllers,
  SellerloginControllers,
  SellerProfile,
  SellerLogOut,
} = require("../controllers/sellerControllers");
const sellerAuth = require("../middleware/sellerauth");

const sellerAuthRouter = express.Router();

sellerAuthRouter.post("/seller/signup", SellerSignUpControllers);
sellerAuthRouter.post("/seller/login", SellerloginControllers);
sellerAuthRouter.get("/seller/profile", sellerAuth, SellerProfile);
sellerAuthRouter.post("/seller/logout", SellerLogOut);

module.exports = sellerAuthRouter;
