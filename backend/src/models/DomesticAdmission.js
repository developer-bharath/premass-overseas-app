// ====================================================================
// SERVICE 2: DOMESTIC ADMISSION MODEL
// ====================================================================
// Purpose: Manage India admission leads and tracking

const mongoose = require('mongoose');

const domesticAdmissionSchema = new mongoose.Schema(
  {
    // -------- STUDENT BASIC INFO --------
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    email: String,
    phone: String,

    // -------- ACADEMIC ELIGIBILITY --------
    academicProfile: {
      currentQualification: {
        type: String,
        enum: ['12th Pass', 'Bachelors', 'Masters'],
        required: true,
      },

      percentage: {
        type: Number,
        min: 0,
        max: 100,
      },

      board: String, // 'CBSE', 'ICSE', 'State Board'

      attemptNumber: {
        type: Number,
        default: 1,
      },
    },

    // -------- ADMISSION PREFERENCES --------
    admissionPreferences: {
      courseType: {
        type: String,
        enum: ['UG', 'PG'],
        required: true,
      },

      courses: [String], // ['BCA', 'B.Tech CSE']

      specializations: [String],

      preferredStates: [String],

      budget: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'INR' },
      },
    },

    // -------- ELIGIBILITY ASSESSMENT --------
    eligibilityAssessment: {
      assessedBy: mongoose.Schema.Types.ObjectId,
      assessmentDate: Date,
      isEligible: Boolean,
      reasonIfIneligible: String,
      recommendations: [String],
    },

    // -------- SHORTLISTED COLLEGES --------
    shortlistedColleges: [
      {
        collegeId: mongoose.Schema.Types.ObjectId,
        collegeName: String,
        state: String,
        course: String,
        tier: String, // 'Tier 1', 'Tier 2', 'Tier 3'
        addedDate: { type: Date, default: Date.now },
      },
    ],

    // -------- APPLICATION TRACKING --------
    applications: [
      {
        collegeId: mongoose.Schema.Types.ObjectId,
        collegeName: String,
        course: String,
        applicationNumber: String,
        submittedDate: Date,
        status: {
          type: String,
          enum: ['submitted', 'under_review', 'rejected', 'merit_list', 'seat_allotted'],
          default: 'submitted',
        },
        merit: Number, // Rank/percentile
      },
    ],

    // -------- SEAT CONFIRMATION --------
    seatConfirmation: {
      collegeId: mongoose.Schema.Types.ObjectId,
      collegeName: String,
      course: String,
      allottedDate: Date,
      confirmationDeadline: Date,
      status: {
        type: String,
        enum: ['allotted', 'confirmed', 'rejected'],
      },
      tuitionFee: Number,
    },

    // -------- STATUS LIFECYCLE --------
    status: {
      type: String,
      enum: [
        'inquiry',
        'eligibility_check',
        'college_shortlisting',
        'application_submitted',
        'merit_awaited',
        'seat_allotted',
        'admission_confirmed',
        'completed',
      ],
      default: 'inquiry',
    },

    // -------- ASSIGNMENT --------
    assignedCounselor: mongoose.Schema.Types.ObjectId,
    assignedManager: mongoose.Schema.Types.ObjectId,

    // -------- TIMELINE --------
    timeline: [
      {
        event: String,
        date: { type: Date, default: Date.now },
        updatedBy: mongoose.Schema.Types.ObjectId,
      },
    ],

    // -------- NOTES --------
    notes: [
      {
        note: String,
        createdBy: mongoose.Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DomesticAdmission', domesticAdmissionSchema);
