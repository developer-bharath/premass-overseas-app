// ====================================================================
// SERVICE 1: OVERSEAS EDUCATION MODEL
// ====================================================================
// Purpose: Manage study abroad leads from counseling to offer letter

const mongoose = require('mongoose');

const overseasEducationSchema = new mongoose.Schema(
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
    
    email: {
      type: String,
      required: true,
    },
    
    phone: {
      type: String,
      required: true,
    },

    // -------- ACADEMIC PROFILE --------
    academicProfile: {
      qualification: {
        type: String,
        enum: ['12th Pass', 'Bachelors', 'Masters', 'PhD'],
        required: true,
      },
      
      percentage: {
        type: Number,
        min: 0,
        max: 100,
        required: true,
      },
      
      stream: String, // Engineering, Commerce, Science, etc.
      
      specialization: String, // CSE, ECE, etc.
      
      yearOfPassing: {
        type: Number,
        required: true,
      },
    },

    // -------- STUDY ABROAD PREFERENCES --------
    studyAbroad: {
      targetCountries: [String], // ['UK', 'USA', 'Canada']
      
      targetCourses: [String], // ['Masters in CS', 'MBA']
      
      intakePeriod: String, // 'Fall 2024', 'Spring 2025'
      
      budget: {
        min: Number,
        max: Number,
        currency: { type: String, default: 'USD' },
      },
    },

    // -------- SHORTLISTED UNIVERSITIES --------
    shortlistedUniversities: [
      {
        universityId: mongoose.Schema.Types.ObjectId,
        universityName: String,
        country: String,
        course: String,
        addedDate: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ['shortlisted', 'applied', 'rejected', 'offer_received'],
          default: 'shortlisted',
        },
      },
    ],

    // -------- APPLICATION TRACKING --------
    applications: [
      {
        universityId: mongoose.Schema.Types.ObjectId,
        universityName: String,
        course: String,
        submittedDate: Date,
        status: {
          type: String,
          enum: ['pending', 'under_review', 'rejected', 'offer_received'],
          default: 'pending',
        },
        estimatedDecisionDate: Date,
      },
    ],

    // -------- OFFER LETTER --------
    offerLetter: {
      universityName: String,
      course: String,
      receivedDate: Date,
      fileUrl: String,
      tuitionFee: Number,
      scholarship: {
        percentage: Number,
        amount: Number,
      },
      status: {
        type: String,
        enum: ['received', 'accepted', 'rejected'],
      },
    },

    // -------- ASSIGNMENT & TRACKING --------
    assignedCounselor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    
    serviceManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },

    // -------- STATUS LIFECYCLE --------
    status: {
      type: String,
      enum: [
        'inquiry',
        'counseling',
        'profile_evaluation',
        'university_shortlisting',
        'application_submitted',
        'awaiting_decision',
        'offer_received',
        'visa_processing',
        'completed',
      ],
      default: 'inquiry',
    },

    // -------- TIMELINE --------
    timeline: [
      {
        event: String,
        description: String,
        date: { type: Date, default: Date.now },
        updatedBy: mongoose.Schema.Types.ObjectId,
      },
    ],

    // -------- DOCUMENTS --------
    documents: [
      {
        documentType: String, // 'passport', 'transcripts', 'test_scores'
        fileUrl: String,
        uploadedDate: Date,
        verificationStatus: {
          type: String,
          enum: ['pending', 'approved', 'rejected'],
          default: 'pending',
        },
      },
    ],

    // -------- NOTES & COMMUNICATION --------
    notes: [
      {
        note: String,
        createdBy: mongoose.Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // -------- ACTIVITY LOG --------
    activityLog: [
      {
        action: String,
        changedBy: mongoose.Schema.Types.ObjectId,
        changedAt: { type: Date, default: Date.now },
        details: mongoose.Schema.Types.Mixed,
      },
    ],

    // -------- METADATA --------
    leadSource: String, // 'website', 'referral', 'social_media'
    leadValue: String, // 'hot', 'warm', 'cold'
    nextFollowUp: Date,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OverseasEducation', overseasEducationSchema);
