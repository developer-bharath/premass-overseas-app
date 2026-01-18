// ====================================================================
// SERVICE 7: IT TRAINING & SKILL DEVELOPMENT MODEL
// ====================================================================
// Purpose: Manage IT training courses and enrollments

const mongoose = require('mongoose');

const itTrainingSchema = new mongoose.Schema(
  {
    // -------- COURSE INFORMATION --------
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },

    courseName: {
      type: String,
      required: true,
    },

    courseDescription: String,

    // -------- COURSE DETAILS --------
    courseDetails: {
      category: {
        type: String,
        enum: ['web_development', 'mobile_app', 'data_science', 'cloud', 'devops', 'cybersecurity', 'ai_ml'],
        required: true,
      },

      skillLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        default: 'beginner',
      },

      durationInHours: {
        type: Number,
        required: true,
      },

      courseContent: [
        {
          moduleName: String,
          moduleDescription: String,
          hoursAllocated: Number,
        },
      ],

      prerequisitesRequired: [String],
    },

    // -------- COURSE COST --------
    courseCost: {
      trainingFee: Number,
      certificateFee: Number,
      totalCost: Number,
      currency: { type: String, default: 'INR' },
    },

    // -------- TRAINER INFORMATION --------
    trainer: {
      trainerId: mongoose.Schema.Types.ObjectId,
      trainerName: String,
      qualification: String,
      experience: Number, // In years
      expertise: [String],
    },

    // -------- BATCH SCHEDULING --------
    batches: [
      {
        batchId: mongoose.Schema.Types.ObjectId,
        batchCode: String,
        startDate: Date,
        endDate: Date,
        scheduleType: {
          type: String,
          enum: ['weekdays', 'weekends', 'full_time'],
        },
        sessionTiming: {
          startTime: String, // 'HH:MM'
          endTime: String,
        },
        capacity: Number,
        enrolledCount: Number,
        status: {
          type: String,
          enum: ['planning', 'open', 'in_progress', 'completed', 'cancelled'],
          default: 'open',
        },
      },
    ],

    // -------- STUDENT ENROLLMENTS --------
    enrollments: [
      {
        enrollmentId: mongoose.Schema.Types.ObjectId,
        studentId: mongoose.Schema.Types.ObjectId,
        batchId: mongoose.Schema.Types.ObjectId,
        enrollmentDate: { type: Date, default: Date.now },
        status: {
          type: String,
          enum: ['enrolled', 'in_progress', 'completed', 'dropped'],
          default: 'enrolled',
        },
        enrollmentFee: Number,
        paymentStatus: {
          type: String,
          enum: ['pending', 'completed'],
          default: 'pending',
        },
      },
    ],

    // -------- COURSE ASSESSMENT --------
    assessment: {
      assignmentCount: Number,
      projectCount: Number,
      quizzes: [
        {
          quizName: String,
          totalMarks: Number,
          passingMarks: Number,
        },
      ],
      finalProjectRequired: Boolean,
    },

    // -------- CERTIFICATE GENERATION --------
    certificateTemplate: {
      templateName: String,
        certificateLevel: {
          type: String,
          enum: ['completion', 'professional', 'advanced'],
          default: 'completion',
        },
      },

    // -------- PLACEMENTS --------
    placements: [
      {
        studentId: mongoose.Schema.Types.ObjectId,
        company: String,
        position: String,
        salary: Number,
        joiningDate: Date,
      },
    ],

    // -------- COURSE STATUS --------
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'archived'],
      default: 'active',
    },

    // -------- TIMESTAMPS --------
    createdBy: mongoose.Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model('ITTraining', itTrainingSchema);
