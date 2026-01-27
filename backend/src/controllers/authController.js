const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const { sendOtpEmail, sendWelcomeEmail } = require("../utils/emailService");

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// ================= REGISTER =================
// 
// 📚 WHAT'S NEW:
// 1. Import email service functions
// 2. Call sendOtpEmail() after generating OTP
// 3. Handle email success/failure gracefully
// 4. Keep console.log as fallback for development

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const otp = generateOtp();

    await Otp.create({
      email,
      otp: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // ==========================================
    // SEND OTP EMAIL
    // ==========================================
    // Try to send email, but don't fail registration if email fails
    // This is called "graceful degradation"

    const emailResult = await sendOtpEmail(email, otp, name);

    if (emailResult.success) {
      console.log("✅ OTP email sent successfully");
    } else {
      console.warn("⚠️ Email failed, but registration succeeded. OTP:", otp);
    }

    // Always log OTP to console for development/testing
    console.log("OTP for", email, ":", otp);

    res.status(201).json({
      message: "Registered successfully. Check your email for OTP.",
      emailSent: emailResult.success, // Tell frontend if email was sent
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};

// ================= VERIFY OTP =================
// 
// 📚 WHAT'S NEW:
// 1. After successful verification, get user details
// 2. Send welcome email with user's name and role
// 3. Continue even if welcome email fails (graceful degradation)

exports.verifyOtp = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const otp = req.body.otp.trim();

    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Update user's email verification status
    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true } // Return the updated user document
    );

    await Otp.deleteMany({ email });

    // ==========================================
    // SEND WELCOME EMAIL
    // ==========================================
    // Send a welcome email after successful verification
    if (user) {
      const welcomeResult = await sendWelcomeEmail(email, user.name, user.role);
      if (welcomeResult.success) {
        console.log("✅ Welcome email sent to", email);
      } else {
        console.warn("⚠️ Welcome email failed, but verification succeeded");
      }
    }

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};
const jwt = require("jsonwebtoken");

// ================= LOGIN =================


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.isEmailVerified) {
      return res.status(400).json({ message: "Email not verified" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// ================= RESEND OTP =================
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    // Delete old OTPs
    await Otp.deleteMany({ email: email.toLowerCase() });

    // Generate new OTP
    const otpCode = generateOtp();

    await Otp.create({
      email: email.toLowerCase(),
      otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Send OTP email
    const emailResult = await sendOtpEmail(email, otpCode, user.name);

    if (emailResult.success) {
      console.log("✅ OTP resent successfully to", email);
    } else {
      console.warn("⚠️ Email failed, but OTP created. OTP:", otpCode);
    }

    console.log("OTP for", email, ":", otpCode);

    res.json({
      message: "OTP resent successfully. Check your email.",
      emailSent: emailResult.success,
    });
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    res.status(500).json({ message: "Failed to resend OTP" });
  }
};

// Add refresh and logout stubs for completeness
exports.refreshToken = async (req, res) => {
  // Implement your refresh logic here
  res.json({ message: "Token refreshed (stub)" });
};

exports.logout = async (req, res) => {
  // Implement your logout logic here
  res.json({ message: "Logged out (stub)" });
};
