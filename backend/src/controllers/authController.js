const User = require("../models/User");
const bcrypt = require("bcryptjs");
// ================= REGISTER =================

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
