const studentRoutes = require("./routes/studentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const roleTestRoutes = require("./routes/roleTestRoutes");

const protectedRoutes = require("./routes/protectedRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const ticketCommentRoutes = require("./routes/ticketCommentRoutes");

// NEW SERVICE ROUTES
const taskRoutes = require("./routes/taskRoutes");
const overseasEducationRoutes = require("./routes/overseasEducationRoutes");
const domesticAdmissionRoutes = require("./routes/domesticAdmissionRoutes");
const educationLoanRoutes = require("./routes/educationLoanRoutes");
const visaImmigrationRoutes = require("./routes/visaImmigrationRoutes");
const documentManagementRoutes = require("./routes/documentManagementRoutes");
const careerJobSupportRoutes = require("./routes/careerJobSupportRoutes");
const itTrainingRoutes = require("./routes/itTrainingRoutes");
const studentSupportSettlementRoutes = require("./routes/studentSupportSettlementRoutes");
const employeeManagementRoutes = require("./routes/employeeManagementRoutes");
const contactRoutes = require("./routes/contactRoutes");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// LOAD ENV FIRST
dotenv.config();

// Log environment check (without sensitive data)
console.log("🔧 Environment Check:");
console.log("  - NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("  - PORT:", process.env.PORT || "4000 (default)");
console.log("  - MongoDB URI:", process.env.MONGODB_URI || process.env.MONGO_URI ? "✅ Set" : "❌ Missing");
console.log("  - JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Missing");
console.log("  - Email User:", process.env.EMAIL_USER ? "✅ Set" : "❌ Missing");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// CONNECT DATABASE
connectDB();

const app = express();

// Middleware
// CORS configuration - allow Vercel domains and localhost for development
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://premass-overseas-*.vercel.app',
  'https://*.vercel.app',
  'https://www.premassoverseas.com',
  'https://premassoverseas.com'
];

// Add CORS_ORIGIN from environment if set
if (process.env.CORS_ORIGIN) {
  allowedOrigins.push(process.env.CORS_ORIGIN);
}

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed.includes('*')) {
        const pattern = allowed.replace(/\*/g, '.*');
        return new RegExp(`^${pattern}$`).test(origin);
      }
      return origin === allowed;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      // For development, allow all origins
      if (process.env.NODE_ENV !== 'production') {
        callback(null, true);
      } else {
        console.warn(`⚠️ CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/test", roleTestRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/employees", employeeManagementRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets", ticketCommentRoutes);

// NEW SERVICE ROUTES
app.use("/api/tasks", taskRoutes);
app.use("/api/services/overseas-education", overseasEducationRoutes);
app.use("/api/services/domestic-admission", domesticAdmissionRoutes);
app.use("/api/services/education-loan", educationLoanRoutes);
app.use("/api/services/visa-immigration", visaImmigrationRoutes);
app.use("/api/documents", documentManagementRoutes);
app.use("/api/services/career-support", careerJobSupportRoutes);
app.use("/api/services/it-training", itTrainingRoutes);
app.use("/api/services/student-support", studentSupportSettlementRoutes);

// CONTACT FORM ROUTE (PUBLIC - NO AUTH REQUIRED)
app.use("/api", contactRoutes);





// Test route
app.get("/", (req, res) => {
  res.send("Premass Overseas Backend Running");
});

const PORT = process.env.PORT || 4000;

// Error handling for server startup
// Railway will handle host binding automatically, so we don't specify HOST
const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📚 API available at /api`);
  console.log(`🔐 Auth endpoints: /api/auth`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err) => {
  if (err.code === 'EPERM') {
    console.error('\n❌ PERMISSION ERROR: macOS is blocking port binding.');
    console.error('📋 SOLUTIONS:');
    console.error('   1. Check System Settings → Network → Firewall');
    console.error('   2. Grant Terminal Full Disk Access in Privacy & Security');
    console.error('   3. Try running from a different terminal application');
    console.error('   4. Try a different port (update .env PORT=3001)');
    console.error(`\n   Current attempt: ${HOST}:${PORT}`);
    console.error(`   Error: ${err.message}\n`);
  } else if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ PORT ${PORT} is already in use.`);
    console.error(`   Try: lsof -ti:${PORT} | xargs kill -9`);
    console.error(`   Or change PORT in .env file\n`);
  } else {
    console.error('\n❌ Server error:', err);
  }
  process.exit(1);
});
