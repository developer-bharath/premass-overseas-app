// ====================================================================
// SERVICE 8: STUDENT SUPPORT & SETTLEMENT MODEL
// ====================================================================
// Purpose: Manage post-admission and settlement support

const mongoose = require('mongoose');

const studentSupportSettlementSchema = new mongoose.Schema(
  {
    // -------- STUDENT INFO --------
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: String,
    email: String,
    phone: String,

    // -------- DESTINATION INFO --------
    destination: {
      country: String,
      city: String,
      institution: String,
      courseStartDate: Date,
    },

    // -------- PRE-DEPARTURE CHECKLIST --------
    preDepartureChecklist: [
      {
        task: String,
        category: {
          type: String,
          enum: ['documents', 'financial', 'health', 'travel', 'accommodation'],
        },
        status: {
          type: String,
          enum: ['pending', 'completed'],
          default: 'pending',
        },
        completedDate: Date,
        notes: String,
      },
    ],

    // -------- FINANCIAL ARRANGEMENTS --------
    financialArrangements: {
      tuitionFeeStatus: {
        type: String,
        enum: ['pending', 'submitted', 'approved'],
        default: 'pending',
      },

      accommodationCost: Number,
      transportCost: Number,
      livingExpenses: Number,
      totalBudget: Number,
      currencyType: String,

      bankDetails: {
        bankName: String,
        accountNumber: String,
        accountType: String,
        ifscCode: String,
      },

      forexArrangements: {
        forexAmount: Number,
        forexRate: Number,
        forexCompany: String,
        arrangedDate: Date,
      },
    },

    // -------- ACCOMMODATION SUPPORT --------
    accommodationSupport: {
      accommodationType: {
        type: String,
        enum: ['on_campus', 'off_campus_shared', 'off_campus_private', 'homestay'],
      },

      accommodationDetails: {
        landlordName: String,
        landlordContact: String,
        address: String,
        monthlyRent: Number,
        leaseStartDate: Date,
        leaseEndDate: Date,
      },

      roommates: [String],
      accommodationProblems: [
        {
          problem: String,
          reportedDate: Date,
          resolution: String,
          resolvedDate: Date,
        },
      ],
    },

    // -------- TRAVEL ASSISTANCE --------
    travelAssistance: {
      flightBookingRequired: Boolean,
      flightDetails: {
        airline: String,
        flightNumber: String,
        departureDate: Date,
        departureCity: String,
        arrivalCity: String,
        bookingReference: String,
      },

      visaStampReceived: Boolean,
      visaStampDate: Date,

      travelInsurance: {
        insuranceProvider: String,
        policyNumber: String,
        coverageAmount: Number,
        policyStartDate: Date,
        policyEndDate: Date,
      },
    },

    // -------- HEALTH & INSURANCE --------
    healthInsurance: {
      healthInsuranceProvider: String,
      policyNumber: String,
      coverageAmount: Number,
      policyStartDate: Date,
      policyEndDate: Date,

      medicalRequirements: [
        {
          requirement: String,
          completed: Boolean,
          completedDate: Date,
          certificateUrl: String,
        },
      ],
    },

    // -------- ARRIVAL & SETTLEMENT --------
    arrivalSettlement: {
      actualArrivalDate: Date,
      orientationAttended: Boolean,
      orientationDate: Date,

      bankAccountOpened: Boolean,
      bankAccountOpenedDate: Date,
      bankName: String,
      accountNumber: String,

      ssnNumber: String, // For USA
      tinNumber: String, // For India
      localPhoneNumber: String,
      localAddress: String,

      settlementChallenges: [
        {
          challenge: String,
          reportedDate: Date,
          supportProvided: String,
          resolvedDate: Date,
        },
      ],
    },

    // -------- POST-ARRIVAL SUPPORT --------
    postArrivalSupport: [
      {
        supportType: String,
        description: String,
        requestedDate: Date,
        resolvedDate: Date,
        resolution: String,
      },
    ],

    // -------- STATUS --------
    status: {
      type: String,
      enum: [
        'pre_departure',
        'in_transit',
        'arrived',
        'settled',
        'ongoing_support',
      ],
      default: 'pre_departure',
    },

    // -------- ASSIGNMENT --------
    assignedSupportOfficer: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('StudentSupportSettlement', studentSupportSettlementSchema);
