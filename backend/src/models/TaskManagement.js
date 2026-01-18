// ====================================================================
// TASK MANAGEMENT MODEL
// ====================================================================
// Purpose: Manage all tasks assigned to employees

const mongoose = require('mongoose');

const taskManagementSchema = new mongoose.Schema(
  {
    // -------- TASK BASIC INFO --------
    taskTitle: {
      type: String,
      required: true,
    },

    taskDescription: String,

    // -------- ASSIGNMENT --------
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // -------- TASK CLASSIFICATION --------
    taskCategory: {
      type: String,
      enum: [
        'lead_follow_up',
        'document_verification',
        'status_update',
        'client_communication',
        'report_generation',
        'admin',
        'training',
        'other',
      ],
      required: true,
    },

    relatedService: {
      serviceType: String, // 'overseas_education', 'visa_immigration'
      leadId: mongoose.Schema.Types.ObjectId,
    },

    // -------- PRIORITY & DEADLINES --------
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },

    assignedDate: { type: Date, default: Date.now },
    dueDate: { type: Date, required: true },
    estimatedDuration: Number, // In hours

    // -------- STATUS TRACKING --------
    status: {
      type: String,
      enum: ['assigned', 'in_progress', 'on_hold', 'completed', 'overdue', 'cancelled'],
      default: 'assigned',
    },

    statusHistory: [
      {
        previousStatus: String,
        newStatus: String,
        changedAt: { type: Date, default: Date.now },
        changedBy: mongoose.Schema.Types.ObjectId,
        reason: String,
      },
    ],

    // -------- COMPLETION DETAILS --------
    completedDate: Date,
    completionNotes: String,
    completionEvidence: {
      documentUrl: String,
      screenshotUrl: String,
    },

    // -------- REVIEWS & FEEDBACK --------
    review: {
      quality: {
        type: String,
        enum: ['excellent', 'good', 'satisfactory', 'needs_improvement'],
      },
      feedback: String,
      reviewedBy: mongoose.Schema.Types.ObjectId,
      reviewedDate: Date,
    },

    // -------- TIME TRACKING --------
    timeTracking: {
      estimatedHours: Number,
      actualHours: Number,
      timeSpent: [
        {
          date: Date,
          hoursSpent: Number,
          notes: String,
        },
      ],
      isOverTime: Boolean,
    },

    // -------- SUBTASKS --------
    subtasks: [
      {
        subtaskTitle: String,
        status: {
          type: String,
          enum: ['pending', 'in_progress', 'completed'],
          default: 'pending',
        },
        completedDate: Date,
      },
    ],

    // -------- ATTACHMENTS & COMMENTS --------
    attachments: [
      {
        fileName: String,
        fileUrl: String,
        uploadedDate: Date,
      },
    ],

    comments: [
      {
        comment: String,
        createdBy: mongoose.Schema.Types.ObjectId,
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // -------- ESCALATION --------
    escalation: {
      isEscalated: { type: Boolean, default: false },
      escalatedTo: mongoose.Schema.Types.ObjectId,
      escalationReason: String,
      escalatedDate: Date,
    },

    // -------- REMINDERS --------
    reminders: [
      {
        reminderDate: Date,
        reminderType: String, // 'due_date', 'overdue', 'custom'
        sent: { type: Boolean, default: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('TaskManagement', taskManagementSchema);
