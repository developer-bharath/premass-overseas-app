// ====================================================================
// SERVICE 4: VISA & IMMIGRATION MODEL
// ====================================================================
// Purpose: Manage visa applications and tracking

const mongoose = require('mongoose');

const visaImmigrationSchema = new mongoose.Schema(
  {
    // -------- APPLICANT INFO --------
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: String,
    email: String,
    phone: String,
    passportNumber: String,

    // -------- VISA TYPE --------
    visaType: {
      type: String,
      enum: ['student_visa', 'visit_visa', 'dependent_visa', 'work_visa'],
      required: true,
    },

    // -------- DESTINATION --------
    destination: {
      country: {
        type: String,
        required: true,
      },
      institution: String, // For student visa
      sponsorName: String, // For dependent visa
    },

    // -------- PERSONAL DETAILS --------
    personalDetails: {
      dateOfBirth: Date,
      nationality: String,
      maritalStatus: String,
      dependents: Number,
    },

    // -------- VISA RULES & REQUIREMENTS --------
    visaRequirements: {
      countryRules: {
        minFunds: Number,
        financialDocuments: [String],
        healthRequirements: [String],
        pcc: Boolean, // Police Clearance Certificate
        medicalTests: [String],
      },

      documentChecklist: [
        {
          documentName: String,
          isRequired: Boolean,
          status: {
            type: String,
            enum: ['pending', 'submitted', 'verified'],
            default: 'pending',
          },
          submittedDate: Date,
        },
      ],
    },

    // -------- DOCUMENTS --------
    documents: [
      {
        documentType: String,
        fileUrl: String,
        uploadedDate: Date,
        verificationStatus: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
    ],

    // -------- APPLICATION STATUS --------
    applicationStatus: {
      status: {
        type: String,
        enum: [
          'inquiry',
          'document_collection',
          'application_prepared',
          'submitted',
          'biometric_appointment',
          'interview_scheduled',
          'visa_approved',
          'visa_rejected',
          'stamp_received',
        ],
        default: 'inquiry',
      },

      submittedDate: Date,
      submissionNumber: String,
      expectedDecisionDate: Date,
      approvedDate: Date,
      visaValidityFrom: Date,
      visaValidityTo: Date,
    },

    // -------- INTERVIEW --------
    interview: {
      scheduledDate: Date,
      location: String,
      interviewOfficer: String,
      interviewOutcome: {
        type: String,
        enum: ['passed', 'failed', 'rescheduled'],
      },
      remarks: String,
    },

    // -------- ASSIGNMENT --------
    assignedOfficer: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('VisaImmigration', visaImmigrationSchema);
