const express = require("express");
const router = express.Router();

const {
  register,
  verifyOtp,
  login,
  resendOtp
} = require("../controllers/authController");

// Real-time production routes only
router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/resend-otp", resendOtp);

// Remove test-only route
// router.get("/get-otp", getOtpForTesting);

module.exports = router;
