const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getEmployeeById } = require("../controllers/employeeController");
const { getEmployeeTickets } = require("../controllers/ticketController");

const router = express.Router();

// Dummy controller stubs
router.get("/", (req, res) => res.json([]));
router.post("/", (req, res) => res.json({ message: "Employee created" }));
router.get("/:id", (req, res) => res.json({}));
router.put("/:id", (req, res) => res.json({ message: "Employee updated" }));
router.delete("/:id", (req, res) => res.json({ message: "Employee deleted" }));

// Employee profile
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
