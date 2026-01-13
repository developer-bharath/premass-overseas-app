const Ticket = require("../models/Ticket");

/**
 * STUDENT: Create a new ticket
 */
exports.createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;

    const ticket = await Ticket.create({
      student: req.user.id,
      title,
      description,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Ticket creation failed" });
  }
};

/**
 * STUDENT: Get their own tickets
 */
exports.getStudentTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ student: req.user.id })
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student tickets" });
  }
};

/**
 * EMPLOYEE: Get all tickets assigned to them
 */
exports.getEmployeeTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ assignedTo: req.user.id })
      .populate("student", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee tickets" });
  }
};

/**
 * EMPLOYEE: Get all tickets (if admin/lead)
 */
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find()
      .populate("student", "name email role")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
};

/**
 * EMPLOYEE: Update ticket status
 */
exports.updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to update ticket status" });
  }
};

/**
 * EMPLOYEE / ADMIN: Assign ticket to an employee
 */
exports.assignTicket = async (req, res) => {
  try {
    const { employeeId } = req.body;

    const ticket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { assignedTo: employeeId },
      { new: true }
    );

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Failed to assign ticket" });
  }
};
