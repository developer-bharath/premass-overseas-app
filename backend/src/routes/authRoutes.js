const express = require("express");
const router = express.Router();

const {
  register,
  verifyOtp,
  login,
  resendOtp,
  refreshToken,
  logout,
} = require("../controllers/authController");

// Auth routes (no /v1 anywhere)
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);

module.exports = router;
