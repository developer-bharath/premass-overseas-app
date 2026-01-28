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

    // Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ 
        message: "All fields are required: name, email, password, role" 
      });
    }

    // Validate role
    const validRoles = ["student", "employee", "counselor", "service_manager", "hr_manager", "department_head", "super_admin"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ 
        message: `Invalid role. Must be one of: ${validRoles.join(", ")}` 
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: role.toLowerCase(),
    });

    // Generate OTP
    const otp = generateOtp();

    // Create OTP record
    await Otp.create({
      email: email.toLowerCase().trim(),
      otp: otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    // ==========================================
    // SEND OTP EMAIL (REQUIRED - with retry logic)
    // ==========================================
    let emailSent = false;
    let emailError = null;
    
    // Try sending email with retry
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`📧 Attempting to send OTP email (attempt ${attempt}/2)...`);
        const emailResult = await sendOtpEmail(email, otp, name);
        emailSent = emailResult.success;
        
        if (emailResult.success) {
          console.log("✅ OTP email sent successfully to", email);
          break; // Success, exit retry loop
        } else {
          emailError = emailResult.error || "Unknown email error";
          console.warn(`⚠️ Email attempt ${attempt} failed:`, emailError);
          if (attempt === 2) {
            console.error("❌ All email attempts failed. OTP:", otp);
          }
        }
      } catch (emailErr) {
        emailError = emailErr.message;
        console.error(`⚠️ Email service error (attempt ${attempt}):`, emailErr.message);
        if (attempt === 2) {
          console.error("❌ Email sending failed after retries. OTP:", otp);
        }
      }
      
      // Wait 2 seconds before retry (if not last attempt)
      if (attempt < 2 && !emailSent) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Log OTP to Railway logs as backup (always available)
    console.log("📧 OTP CODE FOR", email, ":", otp, "(Also check Railway logs if email not received)");

    // Always log OTP to Railway logs (for debugging if email fails)
    console.log("📧 OTP generated for", email, ":", otp);
    console.log("✅ User created successfully:", { id: user._id, email: user.email, role: user.role });
    console.log("📬 Email sent status:", emailSent ? "✅ Sent" : "❌ Failed");

    res.status(201).json({
      message: emailSent 
        ? "Registered successfully. Check your email for OTP." 
        : "Registered successfully. OTP sent (check email or contact support if not received).",
      emailSent: emailSent,
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

    // Send OTP email with retry
    let emailSent = false;
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`📧 Resending OTP email (attempt ${attempt}/2)...`);
        const emailResult = await sendOtpEmail(email, otpCode, user.name);
        emailSent = emailResult.success;
        
        if (emailResult.success) {
          console.log("✅ OTP resent successfully to", email);
          break;
        } else {
          console.warn(`⚠️ Resend attempt ${attempt} failed:`, emailResult.error);
        }
      } catch (emailErr) {
        console.error(`⚠️ Resend email error (attempt ${attempt}):`, emailErr.message);
      }
      
      if (attempt < 2 && !emailSent) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
    
    // Always log OTP to Railway logs
    console.log("📧 RESEND OTP CODE FOR", email, ":", otpCode);

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
