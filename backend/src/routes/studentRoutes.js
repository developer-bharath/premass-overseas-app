const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { getProfile, updateProfile } = require("../controllers/studentController");
const { getStudentTickets } = require("../controllers/ticketController");

const router = express.Router();

// Student Profile
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware(["student"]),
  getProfile
);

router.put(
  "/profile",
  authMiddleware,
  roleMiddleware(["student"]),
  updateProfile
);

// Student Tickets
router.get(
  "/tickets",
  authMiddleware,
  roleMiddleware(["student"]),
  getStudentTickets
);

module.exports = router;
