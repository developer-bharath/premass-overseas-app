const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // -------- BASIC INFO --------
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: String,
    profilePicture: String,

    // -------- ROLE & PERMISSIONS --------
    role: {
      type: String,
      enum: [
        "student",
        "employee",
        "counselor",
        "service_manager",
        "hr_manager",
        "department_head",
        "super_admin",
      ],
      required: true,
    },

    // -------- EMPLOYEE DETAILS (For employees only) --------
    employeeDetails: {
      employeeId: {
        type: String,
        unique: true,
        sparse: true,
      },

      department: {
        type: String,
        enum: [
          "overseas_education",
          "domestic_admission",
          "education_loan",
          "visa_immigration",
          "document_management",
          "career_support",
          "it_training",
          "student_support",
          "hr",
          "management",
        ],
      },

      designation: {
        type: String,
        enum: [
          "counselor",
          "senior_counselor",
          "service_officer",
          "manager",
          "senior_manager",
          "head",
          "director",
          "founder",
        ],
      },

      reportingManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      joiningDate: Date,

      salary: {
        baseSalary: Number,
        ctc: Number,
        currency: { type: String, default: "INR" },
      },

      // -------- ATTENDANCE & TIME TRACKING --------
      attendance: [
        {
          date: Date,
          checkInTime: String, // HH:MM format
          checkOutTime: String,
          workHours: Number,
          status: {
            type: String,
            enum: ["present", "absent", "half_day", "leave"],
            default: "absent",
          },
          remarks: String,
        },
      ],

      // -------- LOGIN HISTORY --------
      loginHistory: [
        {
          loginTime: { type: Date, default: Date.now },
          logoutTime: Date,
          ipAddress: String,
          device: String,
          sessionDuration: Number, // In minutes
        },
      ],

      // -------- PERFORMANCE METRICS --------
      performance: {
        tasksCompleted: { type: Number, default: 0 },
        tasksInProgress: { type: Number, default: 0 },
        averageResponseTime: Number, // In hours
        customerSatisfactionScore: Number, // 1-5
        performanceRating: {
          type: String,
          enum: ["excellent", "good", "average", "poor"],
        },
        lastReviewDate: Date,
        nextReviewDate: Date,
      },

      // -------- LEAVE MANAGEMENT --------
      leaveDetails: {
        totalLeaves: { type: Number, default: 20 },
        usedLeaves: { type: Number, default: 0 },
        pendingLeaves: { type: Number, default: 20 },
        leaveRequests: [
          {
            leaveType: String, // 'casual', 'sick', 'earned'
            fromDate: Date,
            toDate: Date,
            reason: String,
            status: {
              type: String,
              enum: ["pending", "approved", "rejected"],
              default: "pending",
            },
            approvedBy: mongoose.Schema.Types.ObjectId,
            approvedDate: Date,
          },
        ],
      },

      // -------- ASSIGNED SERVICES --------
      assignedServices: [
        {
          serviceType: String, // 'overseas_education', 'visa_immigration'
          serviceLeads: Number,
          activeLeads: Number,
        },
      ],

      // -------- ASSIGNED TASKS --------
      assignedTasks: [
        {
          taskId: mongoose.Schema.Types.ObjectId,
          taskTitle: String,
          assignedDate: Date,
          dueDate: Date,
          priority: { type: String, enum: ["low", "medium", "high", "urgent"] },
          status: {
            type: String,
            enum: ["assigned", "in_progress", "completed", "overdue"],
            default: "assigned",
          },
          completedDate: Date,
          assignedBy: mongoose.Schema.Types.ObjectId,
        },
      ],

      // -------- SKILLS --------
      skills: [String],

      // -------- CERTIFICATIONS --------
      certifications: [
        {
          certificationName: String,
          issuingOrganization: String,
          issueDate: Date,
          expiryDate: Date,
          certificateUrl: String,
        },
      ],

      // -------- ACTIVITY LOG --------
      activityLog: [
        {
          action: String,
          description: String,
          timestamp: { type: Date, default: Date.now },
          ipAddress: String,
        },
      ],
    },

    // -------- EMAIL VERIFICATION --------
    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    // -------- ACCOUNT STATUS --------
    isActive: {
      type: Boolean,
      default: true,
    },

    // -------- DEACTIVATION DETAILS --------
    deactivationDetails: {
      deactivatedDate: Date,
      deactivatedBy: mongoose.Schema.Types.ObjectId,
      reason: String,
    },

    // -------- TWO-FACTOR AUTHENTICATION --------
    twoFactorAuth: {
      enabled: { type: Boolean, default: false },
      method: String, // 'email', 'sms', 'authenticator'
    },

    // -------- TIMESTAMPS --------
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
