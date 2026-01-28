const User = require("../models/User");
const bcrypt = require("bcryptjs");
const axios = require("axios");

// ================= REGISTER =================

// Verify Google reCAPTCHA token
const verifyRecaptcha = async (token) => {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    console.warn("⚠️ RECAPTCHA_SECRET_KEY not set - skipping verification");
    return true; // Allow registration in development if reCAPTCHA not configured
  }

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: token,
        },
      }
    );

    return response.data.success === true;
  } catch (error) {
    console.error("❌ reCAPTCHA verification error:", error.message);
    return false;
  }
};

exports.register = async (req, res) => {
  try {
    let { name, email, password, role, recaptchaToken } = req.body;
    
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        message: "All fields are required: name, email, password, role",
        code: "MISSING_FIELDS"
      });
    }

    // Verify reCAPTCHA
    if (process.env.RECAPTCHA_SECRET_KEY && !recaptchaToken) {
      return res.status(400).json({
        message: "reCAPTCHA verification required",
        code: "RECAPTCHA_MISSING"
      });
    }

    if (recaptchaToken) {
      const isValidRecaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidRecaptcha) {
        return res.status(400).json({
          message: "reCAPTCHA verification failed. Please try again.",
          code: "RECAPTCHA_FAILED"
        });
      }
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

    // Create user with email verified (no OTP needed)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      isEmailVerified: true, // Auto-verify since we're using reCAPTCHA
    });

    console.log("✅ User created:", { id: user._id, email: user.email, role: user.role });

    res.status(201).json({
      message: "Registered successfully. You can now login.",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
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

const jwt = require("jsonwebtoken");

// ================= LOGIN =================


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Email verification no longer required (using reCAPTCHA instead)
    // if (!user.isEmailVerified) {
    //   return res.status(400).json({ message: "Email not verified" });
    // }

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

// Add refresh and logout stubs for completeness
exports.refreshToken = async (req, res) => {
  // Implement your refresh logic here
  res.json({ message: "Token refreshed (stub)" });
};

exports.logout = async (req, res) => {
  // Implement your logout logic here
  res.json({ message: "Logged out (stub)" });
};
