const Ticket = require("../models/Ticket");
const TicketComment = require("../models/TicketComment");

/*
  ADD COMMENT
  - Student: only own ticket
  - Employee: only assigned ticket
*/
exports.addComment = async (req, res) => {
  try {
    const { message } = req.body;
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // STUDENT ACCESS CHECK
    if (
      req.user.role === "student" &&
      ticket.student.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // EMPLOYEE ACCESS CHECK
    if (
      req.user.role === "employee" &&
      ticket.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Ticket not assigned to you" });
    }

    const comment = await TicketComment.create({
      ticket: ticketId,
      user: req.user.id,
      role: req.user.role,
      message,
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

/*
  GET COMMENTS
  - Same access rules as above
*/
exports.getCommentsByTicket = async (req, res) => {
  try {
    const ticketId = req.params.ticketId;

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // STUDENT ACCESS CHECK
    if (
      req.user.role === "student" &&
      ticket.student.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // EMPLOYEE ACCESS CHECK
    if (
      req.user.role === "employee" &&
      ticket.assignedTo?.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Ticket not assigned to you" });
    }

    const comments = await TicketComment.find({ ticket: ticketId })
      .populate("user", "name role email")
      .sort({ createdAt: 1 });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};
