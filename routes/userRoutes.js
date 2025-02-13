const express = require("express");
const router = express.Router();

const { getUserDetails } = require("../controller/userController");

const { auth } = require("../middleware/auth");

//GET User Details
router.get("/user", auth, getUserDetails);

module.exports = router;
