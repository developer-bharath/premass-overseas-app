const express = require("express");
const router = express.Router();

const {
  register,
  verifyOtp,
  login,
  getOtpForTesting
} = require("../controllers/authController");

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.get("/get-otp", getOtpForTesting);

module.exports = router;
