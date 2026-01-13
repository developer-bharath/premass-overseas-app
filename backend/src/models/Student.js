const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
    },

    countryInterested: {
      type: String,
    },

    serviceType: {
      type: String,
      enum: ["admission", "cv", "career", "jobs"],
    },

    status: {
      type: String,
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
