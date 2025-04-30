const SellerUser = require("../models/sellerModels");
const signupValidation = require("../utils/signupValidation");

const SellerSignUpControllers = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    signupValidation(req);
    const existUser = await SellerUser.findOne({ email });

    if (existUser) {
      throw new Error(" alreday exist");
    }

    const data = {
      name,
      email,
      password,
    };

    const user = new SellerUser(data);
    const response = await user.save();
    const token = await response.getSellerJWt();
    res.cookie("sellertoken", token);

    res.status(200).json({
      message: `${response.name} signup successfully`,
      data: response,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const SellerloginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "email and password required" });
    }

    const existingUser = await SellerUser.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ message: "InValid Credentials" });
    }

    if (existingUser.password !== password) {
      return res.status(401).json({ message: "InValid Credentials" });
    }

    const token = await existingUser.getSellerJWt();
    res.cookie("sellertoken", token);

    res
      .status(200)
      .json({ message: `${existingUser.name} logged`, data: existingUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const SellerProfile = async (req, res) => {
  try {
    const seller = req.seller;
    res.status(200).json({ data: seller });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const SellerLogOut = async (req, res) => {
  try {
    res.cookie("sellertoken", null, {
      expires: new Date(Date.now()),
    });

    res.status(200).json({ message: "Seller logged out successfully" });
  } catch (errror) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  SellerSignUpControllers,
  SellerloginControllers,
  SellerProfile,
  SellerLogOut,
};
