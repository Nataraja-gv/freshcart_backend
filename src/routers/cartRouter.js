const express= require("express");
const userAuth = require("../middleware/userauth");
const updateCart = require("../controllers/cartControllers");


const cartRouter= express.Router();

cartRouter.post("/auth/cart/update",userAuth,updateCart)

module.exports=cartRouter