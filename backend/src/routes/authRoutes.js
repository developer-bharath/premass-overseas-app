const express = require("express");
const router = express.Router();

const {
  register,
  verifyOtp,
  login,
  getOtpForTesting,
  resendOtp
} = require("../controllers/authController");

router.post("/register", register);
router.post("/verify-otp", verifyOtp);
router.post("/login", login);
router.post("/resend-otp", resendOtp);
router.get("/get-otp", getOtpForTesting);

module.exports = router;
