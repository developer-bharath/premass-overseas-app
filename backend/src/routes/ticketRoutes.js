const express = require("express");
const router = express.Router();

const {
  createTicket,
  getAllTickets,
  updateTicketStatus,
  assignTicket,
} = require("../controllers/ticketController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

// Student creates ticket
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["student"]),
  createTicket
);

// Employee views tickets
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["employee"]),
  getAllTickets
);

// Employee updates ticket status
router.put(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["employee"]),
  updateTicketStatus
);

// Employee/Admin assigns ticket
router.put(
  "/:id/assign",
  authMiddleware,
  roleMiddleware(["employee", "admin"]),
  assignTicket
);

module.exports = router;
