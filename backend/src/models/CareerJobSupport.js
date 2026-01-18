// ====================================================================
// SERVICE 6: CAREER & JOB SUPPORT MODEL
// ====================================================================
// Purpose: Manage career services and job support

const mongoose = require('mongoose');

const careerJobSupportSchema = new mongoose.Schema(
  {
    // -------- SERVICE RECIPIENT --------
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: String,
    email: String,
    phone: String,

    // -------- SERVICE TYPE --------
    serviceType: {
      type: String,
      enum: [
        'resume_services',
        'cv_marketing',
        'linkedin_optimization',
        'job_assistance',
        'interview_preparation',
        'internship_guidance',
        'certification_guidance',
      ],
      required: true,
    },

    // -------- RESUME SERVICES --------
    resumeServices: {
      currentResume: {
        fileUrl: String,
        uploadedDate: Date,
      },

      improvementSuggestions: [String],

      revisions: [
        {
          version: Number,
          fileUrl: String,
          revisionDate: Date,
          changes: String,
        },
      ],

      finalResume: {
        fileUrl: String,
        approvedDate: Date,
      },
    },

    // -------- CV MARKETING --------
    cvMarketing: {
      targetCompanies: [String],
      submissionTrack: [
        {
          company: String,
          submittedDate: Date,
          response: {
            type: String,
            enum: ['no_response', 'rejected', 'interview_call'],
          },
          responseDate: Date,
        },
      ],
      callsReceived: Number,
    },

    // -------- LINKEDIN OPTIMIZATION --------
    linkedinOptimization: {
      currentProfile: {
        profileUrl: String,
        lastOptimized: Date,
      },

      improvements: [
        {
          improvement: String,
          status: {
            type: String,
            enum: ['suggested', 'implemented'],
          },
          implementedDate: Date,
        },
      ],

      profileScore: {
        rating: Number, // 1-10
        ratedDate: Date,
      },
    },

    // -------- JOB APPLICATIONS --------
    jobApplications: [
      {
        company: String,
        position: String,
        appliedDate: Date,
        source: String, // 'linkedin', 'naukri', 'company_website'
        status: {
          type: String,
          enum: ['applied', 'screening', 'interview', 'offer', 'rejected'],
          default: 'applied',
        },
        applicationNumber: String,
      },
    ],

    // -------- INTERVIEW PREPARATION --------
    interviewPreparation: {
      sessionsBooked: [
        {
          scheduledDate: Date,
          interviewerName: String,
          sessionType: String, // 'technical', 'hr', 'behavioral'
          completedDate: Date,
          feedback: String,
        },
      ],

      mockInterviewsCompleted: Number,
      topicsToWork: [String],
    },

    // -------- JOB OFFERS --------
    jobOffers: [
      {
        company: String,
        position: String,
        offeredDate: Date,
        salary: {
          base: Number,
          currency: String,
        },
        offerLetter: String, // URL
        acceptanceStatus: {
          type: String,
          enum: ['pending', 'accepted', 'rejected'],
        },
        joiningDate: Date,
      },
    ],

    // -------- STATUS --------
    status: {
      type: String,
      enum: [
        'inquiry',
        'profile_assessment',
        'resume_preparation',
        'job_search',
        'interview_stage',
        'offer_received',
        'placement_confirmed',
      ],
      default: 'inquiry',
    },

    // -------- ASSIGNMENT --------
    assignedCareerCounselor: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('CareerJobSupport', careerJobSupportSchema);
