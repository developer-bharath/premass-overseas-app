const Student = require("../models/Student");

exports.getProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      student = await Student.create({
        user: req.user.id,
        fullName: "",
        countryInterested: "",
        serviceType: "admission",
      });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch student profile" });
  }
};


exports.updateProfile = async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update student profile" });
  }
};
