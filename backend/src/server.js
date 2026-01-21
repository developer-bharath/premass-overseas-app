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

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// CONNECT DATABASE
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
