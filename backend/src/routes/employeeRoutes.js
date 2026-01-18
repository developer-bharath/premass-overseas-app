const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getEmployeeById } = require("../controllers/employeeController");
const { getEmployeeTickets } = require("../controllers/ticketController");

const router = express.Router();

router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["employee", "hr_manager", "department_head", "super_admin"]),
  getEmployeeById
);

// Employee Tickets
router.get(
  "/tickets",
  authMiddleware,
  roleMiddleware(["employee", "hr_manager", "department_head", "super_admin"]),
  getEmployeeTickets
);

module.exports = router;
