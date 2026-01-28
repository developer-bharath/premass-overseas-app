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
    let { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        message: "All fields are required: name, email, password, role",
        code: "MISSING_FIELDS"
      });
    }
    name = String(name).trim();
    email = String(email).trim().toLowerCase();
    role = String(role).trim().toLowerCase();
    if (role === "staff") role = "employee";

    const validRoles = ["student", "employee", "counselor", "service_manager", "hr_manager", "department_head", "super_admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        message: `Invalid role. Use "student" or "employee".`,
        code: "INVALID_ROLE"
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        message: "User already exists. Try logging in or use a different email.",
        code: "USER_EXISTS"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const otp = generateOtp();
    await Otp.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // Log OTP to Railway logs immediately (user can check logs if email fails)
    console.log("📧 OTP CODE FOR", email, ":", otp);
    console.log("✅ User created:", { id: user._id, email: user.email, role: user.role });

    // ==========================================
    // SEND OTP EMAIL IN BACKGROUND (do not block response)
    // ==========================================
    setImmediate(() => {
      sendOtpEmail(email, otp, name)
        .then((r) => {
          if (r.success) console.log("✅ OTP email sent to", email);
          else console.warn("⚠️ OTP email failed:", r.error, "| OTP:", otp);
        })
        .catch((err) => console.error("⚠️ OTP email error:", err.message, "| OTP:", otp));
    });

    res.status(201).json({
      message: "Registered successfully. Check your email for OTP.",
      emailSent: true,
    });
  } catch (error) {
    console.error("❌ REGISTER ERROR:", error);
    console.error("Error stack:", error.stack);
    
    // More specific error messages
    let errorMessage = "Registration failed";
    if (error.name === 'ValidationError') {
      errorMessage = Object.values(error.errors).map(e => e.message).join(', ');
    } else if (error.code === 11000) {
      errorMessage = "Email already exists";
    } else if (error.message) {
      errorMessage = error.message;
    }

    res.status(500).json({
      message: errorMessage,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
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
    const email = (req.body.email || "").trim().toLowerCase();
    const otp = (req.body.otp || "").trim();
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const otpRecord = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!otpRecord) {
      return res.status(400).json({ message: "OTP not found. Please register again or resend OTP." });
    }
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    if (otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired. Please resend OTP." });
    }

    const user = await User.findOneAndUpdate(
      { email },
      { isEmailVerified: true },
      { new: true }
    );
    await Otp.deleteMany({ email });

    if (user) {
      setImmediate(() => {
        sendWelcomeEmail(email, user.name, user.role)
          .then((r) => {
            if (r.success) console.log("✅ Welcome email sent to", email);
            else console.warn("⚠️ Welcome email failed");
          })
          .catch((e) => console.warn("⚠️ Welcome email error:", e.message));
      });
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

    const user = await User.findOne({ email: (email || "").trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found. Please register first." });
    }

    const em = email.trim().toLowerCase();
    await Otp.deleteMany({ email: em });

    const otpCode = generateOtp();
    await Otp.create({
      email: em,
      otp: otpCode,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    console.log("📧 RESEND OTP CODE FOR", em, ":", otpCode);

    setImmediate(() => {
      sendOtpEmail(email, otpCode, user.name)
        .then((r) => {
          if (r.success) console.log("✅ OTP resent to", email);
          else console.warn("⚠️ Resend failed:", r.error, "| OTP:", otpCode);
        })
        .catch((err) => console.error("⚠️ Resend error:", err.message, "| OTP:", otpCode));
    });

    res.json({
      message: "OTP resent successfully. Check your email.",
      emailSent: true,
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
