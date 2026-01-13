const studentRoutes = require("./routes/studentRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

const roleTestRoutes = require("./routes/roleTestRoutes");

const protectedRoutes = require("./routes/protectedRoutes");
const ticketRoutes = require("./routes/ticketRoutes");
const ticketCommentRoutes = require("./routes/ticketCommentRoutes");

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
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/test", roleTestRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets", ticketCommentRoutes);





// Test route
app.get("/", (req, res) => {
  res.send("Premass Overseas Backend Running");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
