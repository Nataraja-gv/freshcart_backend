const Address = require("../models/addressModel");

const addAddressController = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      city,
      addressLine1,
      addressLine2,
      state,
      country,
      zipCode,
    } = req.body;

    const user = req.user;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !city ||
      !addressLine1 ||
      !state ||
      !country ||
      !zipCode
    ) {
      return res.staus(400).json({
        message: "please fill all the fields",
      });
    }
    const address = await Address.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      addressLine1,
      addressLine2,
      city,
      state,
      country,
      zipCode,
    });
    await address.save();
    res.status(200).json({
      message: "Address added successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAddressController = async (req, res) => {
  try {
    const user = req.user;
    const address = await Address.find({ userId: user._id });
    if (!address) {
      return res.status(404).json({
        message: "Address not found",
      });
    }
    res.status(200).json({
      message: "Address fetched successfully",
      data: address,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { addAddressController, getAddressController };
