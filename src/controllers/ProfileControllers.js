const User = require("../models/userModel");

const UserProfile = async (req, res) => {
  try {
    const user = req.user;
    const response = await User.findOne({email:user.email});

    res.status(200).json({
      message: "User profile fetched successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to get user profile",
    });
  }
};

module.exports={UserProfile}
