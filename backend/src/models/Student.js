const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    personalDetails: {
      fullName: { type: String, default: "" },
      gender: { type: String, default: "" },
      dateOfBirth: { type: String, default: "" },
      nationality: { type: String, default: "" },
      maritalStatus: { type: String, default: "" },
      passportNumber: { type: String, default: "" },
      passportExpiryDate: { type: String, default: "" },
    },
    contactDetails: {
      primaryMobile: { type: String, default: "" },
      alternateMobile: { type: String, default: "" },
      email: { type: String, default: "" },
      currentAddress: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      postalCode: { type: String, default: "" },
    },
    studyLevel: {
      applyingFor: { type: String, default: "" },
    },
    academicHistory: {
      tenth: {
        schoolName: { type: String, default: "" },
        board: { type: String, default: "" },
        yearOfCompletion: { type: String, default: "" },
        percentage: { type: String, default: "" },
      },
      twelfth: {
        collegeName: { type: String, default: "" },
        board: { type: String, default: "" },
        stream: { type: String, default: "" },
        yearOfCompletion: { type: String, default: "" },
        percentage: { type: String, default: "" },
      },
      bachelorDegree: {
        degreeName: { type: String, default: "" },
        specialization: { type: String, default: "" },
        university: { type: String, default: "" },
        yearOfCompletion: { type: String, default: "" },
        percentage: { type: String, default: "" },
      },
    },
    testScores: {
      ielts: { type: String, default: "" },
      toefl: { type: String, default: "" },
      pte: { type: String, default: "" },
      duolingo: { type: String, default: "" },
      neet: { type: String, default: "" },
      gre: { type: String, default: "" },
      gmat: { type: String, default: "" },
    },
    workExperience: {
      currentlyWorking: { type: Boolean, default: false },
      companyName: { type: String, default: "" },
      jobRole: { type: String, default: "" },
      fromDate: { type: String, default: "" },
      toDate: { type: String, default: "" },
      totalExperience: { type: String, default: "" },
    },
    studyPreferences: {
      preferredCountry: { type: [String], default: [] },
      preferredIntake: { type: String, default: "" },
      preferredCourse: { type: String, default: "" },
      budgetRange: { type: String, default: "" },
      accommodationRequired: { type: Boolean, default: false },
    },
    visaHistory: {
      previousRefusal: { type: Boolean, default: false },
      country: { type: String, default: "" },
      year: { type: String, default: "" },
      reason: { type: String, default: "" },
    },
    referralDetails: {
      referredBy: { type: String, default: "" },
      referralName: { type: String, default: "" },
      referralMobile: { type: String, default: "" },
      referralEmail: { type: String, default: "" },
      relationship: { type: String, default: "" },
    },
    documents: {
      passport: { type: Boolean, default: false },
      academicCertificates: { type: Boolean, default: false },
      transcripts: { type: Boolean, default: false },
      testScores: { type: Boolean, default: false },
      resume: { type: Boolean, default: false },
    },
    declaration: {
      confirmed: { type: Boolean, default: false },
      submittedDate: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
