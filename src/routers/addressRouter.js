const express = require("express");
const userAuth = require("../middleware/userauth");
const { addAddressController, getAddressController } = require("../controllers/addressRouter");

const addressRouter = express.Router();

addressRouter.post("/auth/addAddress", userAuth, addAddressController);
addressRouter.get("/auth/allAddress", userAuth, getAddressController);

module.exports = addressRouter;
