const express = require("express");
const { signUpControllers, loginControllers, userLogout } = require("../controllers/userControllers");

const authRouter = express.Router();

authRouter.post("/auth/signup",signUpControllers)
authRouter.post("/auth/login",loginControllers)
authRouter.post("/auth/logout",userLogout)





module.exports=authRouter