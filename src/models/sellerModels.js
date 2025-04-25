const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
 

const sellerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password Should strong");
        }
      },
    },
  },
  { timestamps: true }
);

sellerSchema.methods.getSellerJWt = async function () {
  const user = this;
  const usertoken = await JWT.sign(
    { _id: user._id },
    process.env.JWT_SECRET_kEY,
    { expiresIn: "2d" }
  );
  return usertoken;
};

const SellerUser = mongoose.model("SellerUsers", sellerSchema);

module.exports = SellerUser;
