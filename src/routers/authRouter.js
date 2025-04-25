const express = require("express");
const { signUpControllers, loginControllers } = require("../controllers/userControllers");

const authRouter = express.Router();

authRouter.post("/auth/signup",signUpControllers)
authRouter.post("/auth/login",loginControllers)




module.exports=authRouter