const express = require("express");
const { SellerSignUpControllers, SellerloginControllers } = require("../controllers/sellerControllers");
 

const sellerAuthRouter = express.Router();

sellerAuthRouter.post("/seller/signup",SellerSignUpControllers)
sellerAuthRouter.post("/seller/login",SellerloginControllers)




module.exports=sellerAuthRouter