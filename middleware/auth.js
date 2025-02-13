const User = require("../models/User");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.auth = async (req, res,next) => {
  try {
    //generate a token
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    //verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);

    const user = await User.findById(decode._id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not authorized",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
