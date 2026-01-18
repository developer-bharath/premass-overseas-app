// ====================================================================
// SERVICE 3: EDUCATION LOAN MODEL
// ====================================================================
// Purpose: Manage education loan leads and applications

const mongoose = require('mongoose');

const educationLoanSchema = new mongoose.Schema(
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

    // -------- LOAN TYPE --------
    loanType: {
      type: String,
      enum: ['abroad_education', 'domestic_education', 'skill_development'],
      required: true,
    },

    // -------- EDUCATION DETAILS --------
    educationDetails: {
      institution: String,
      course: String,
      country: String,
      courseDuration: Number, // In months
      expectedCost: Number,
      currency: { type: String, default: 'USD' },
    },

    // -------- FINANCIAL PROFILE --------
    financialProfile: {
      annualIncome: Number,
      existingLiabilities: Number,
      sourceOfIncome: String,
      parentOccupation: String,
      collateralAvailable: {
        type: Boolean,
        default: false,
      },
      collateralValue: Number,
    },

    // -------- LOAN REQUIREMENTS --------
    loanRequirements: {
      securedType: {
        type: String,
        enum: ['secured', 'unsecured', 'both'],
        required: true,
      },

      amountRequired: Number,
      repaymentTenure: Number, // In years
      preferredRepaymentStructure: String, // 'moratorium', 'during_course', 'fixed'
    },

    // -------- ELIGIBILITY ASSESSMENT --------
    eligibilityAssessment: {
      assessedBy: mongoose.Schema.Types.ObjectId,
      assessmentDate: Date,
      eligibilityScore: Number,
      recommendation: {
        type: String,
        enum: ['highly_eligible', 'eligible', 'borderline', 'not_eligible'],
      },
      notes: String,
    },

    // -------- BANK/NBFC PARTNER DETAILS --------
    selectedPartner: {
      partnerId: mongoose.Schema.Types.ObjectId,
      partnerName: String,
      partnerType: String, // 'bank', 'nbfc'
      interestRate: Number,
      processingFee: Number,
    },

    // -------- APPLICATION TRACKING --------
    applicationStatus: {
      status: {
        type: String,
        enum: [
          'inquiry',
          'eligibility_check',
          'application_submitted',
          'document_verification',
          'under_process',
          'approved',
          'disbursed',
          'rejected',
        ],
        default: 'inquiry',
      },

      submittedDate: Date,
      approvedDate: Date,
      disbursedDate: Date,
      disbursedAmount: Number,
      rejectionReason: String,
    },

    // -------- DOCUMENTS --------
    documents: [
      {
        documentType: String,
        fileUrl: String,
        uploadedDate: Date,
        verificationStatus: {
          type: String,
          enum: ['pending', 'verified', 'rejected'],
          default: 'pending',
        },
      },
    ],

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

module.exports = mongoose.model('EducationLoan', educationLoanSchema);
