const JWT = require("jsonwebtoken");
const SellerUser = require("../models/sellerModels");

const sellerAuth = async (req, res, next) => {
  const { sellertoken } = req.cookies;
  if (!sellertoken) {
    return res.status(401).json({ message: "Please Login" });
  }
  const decodedID = await JWT.verify(sellertoken, process.env.JWT_SECRET_kEY);
  const { _id } = decodedID;

  const selleruser = await SellerUser.findById(_id).select(["name", "email"]);
  if (!selleruser) {
    return res.status(401).json({ message: " seller user not found" });
  }
  req.seller = selleruser;
  next();
};

module.exports = sellerAuth;
