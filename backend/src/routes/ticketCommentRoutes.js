const express = require("express");
const router = express.Router();

const {
  addComment,
  getCommentsByTicket,
} = require("../controllers/ticketCommentController");

const authMiddleware = require("../middleware/authMiddleware");

// Add comment (student / employee)
router.post(
  "/:ticketId/comments",
  authMiddleware,
  addComment
);

// Get comments
router.get(
  "/:ticketId/comments",
  authMiddleware,
  getCommentsByTicket
);

module.exports = router;
