const User = require("../models/User");


exports.getUserDetails = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const userDetails = await User.findById(userId);
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized!",
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
