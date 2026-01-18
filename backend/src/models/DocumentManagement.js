// ====================================================================
// SERVICE 5: DOCUMENT MANAGEMENT MODEL
// ====================================================================
// Purpose: Centralized document storage and verification

const mongoose = require('mongoose');

const documentManagementSchema = new mongoose.Schema(
  {
    // -------- DOCUMENT INFO --------
    documentName: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // -------- DOCUMENT TYPE --------
    documentType: {
      type: String,
      enum: [
        'passport',
        'transcript',
        'degree_certificate',
        'test_scores',
        'bank_statement',
        'financial_documents',
        'medical_reports',
        'pcc',
        'recommendation_letter',
        'employment_letter',
        'resume',
        'birth_certificate',
        'other',
      ],
      required: true,
    },

    // -------- DOCUMENT DETAILS --------
    documentDetails: {
      issueDate: Date,
      expiryDate: Date,
      issuingAuthority: String,
      referenceNumber: String,
    },

    // -------- FILE INFORMATION --------
    fileInfo: {
      fileName: String,
      fileUrl: String,
      fileSize: Number, // In bytes
      fileType: String, // 'pdf', 'jpg', 'png'
      uploadedDate: { type: Date, default: Date.now },
      lastModified: Date,
    },

    // -------- CATEGORIZATION --------
    category: {
      type: String,
      enum: ['academic', 'financial', 'personal', 'medical', 'professional'],
      required: true,
    },

    // -------- VERIFICATION --------
    verification: {
      status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'expired'],
        default: 'pending',
      },

      verifiedBy: mongoose.Schema.Types.ObjectId,
      verificationDate: Date,
      rejectionReason: String,
    },

    // -------- EXPIRY TRACKING --------
    expiryAlert: {
      daysBeforeExpiry: { type: Number, default: 30 },
      alertSent: { type: Boolean, default: false },
      alertSentDate: Date,
    },

    // -------- ACCESS CONTROL --------
    accessControl: {
      accessibleBy: [
        {
          userId: mongoose.Schema.Types.ObjectId,
          role: String,
          accessLevel: {
            type: String,
            enum: ['view', 'download', 'edit'],
            default: 'view',
          },
        },
      ],
    },

    // -------- LINKED SERVICES --------
    linkedServices: [
      {
        serviceType: String, // 'overseasEducation', 'visa', 'loan'
        serviceId: mongoose.Schema.Types.ObjectId,
      },
    ],

    // -------- AUDIT LOG --------
    auditLog: [
      {
        action: String,
        performedBy: mongoose.Schema.Types.ObjectId,
        performedAt: { type: Date, default: Date.now },
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

module.exports = mongoose.model('DocumentManagement', documentManagementSchema);
