const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getProfile } = require("../controllers/employeeController");
const { getEmployeeTickets } = require("../controllers/ticketController");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["employee", "admin"]),
  getProfile
);

// Employee Tickets
router.get(
  "/tickets",
  authMiddleware,
  roleMiddleware(["employee", "admin"]),
  getEmployeeTickets
);

module.exports = router;
