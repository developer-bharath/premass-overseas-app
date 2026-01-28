const Student = require("../models/Student");
const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    let student = await Student.findOne({ user: req.user.id });

    if (!student) {
      const user = await User.findById(req.user.id);
      student = await Student.create({
        user: req.user.id,
        personalDetails: {
          fullName: user?.name || "",
        },
        contactDetails: {
          email: user?.email || "",
        },
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
      { new: true, upsert: true }
    );
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: "Failed to update student profile" });
  }
};
