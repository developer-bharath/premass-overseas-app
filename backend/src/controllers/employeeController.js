const Employee = require("../models/Employee");

// Get or auto-create employee profile
exports.getProfile = async (req, res) => {
  try {
    let employee = await Employee.findOne({ user: req.user.id });

    if (!employee) {
      employee = await Employee.create({
        user: req.user.id,
        department: "admissions",
        designation: "",
      });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employee profile" });
  }
};
