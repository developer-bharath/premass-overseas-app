// ====================================================================
// DOCUMENT MANAGEMENT CONTROLLER
// ====================================================================

const DocumentManagement = require('../models/DocumentManagement');

// ===== UPLOAD DOCUMENT =====
exports.uploadDocument = async (req, res) => {
  try {
    const {
      documentName,
      documentType,
      category,
      expiryDate,
      remarks,
    } = req.body;
    const file = req.file;

    const document = await DocumentManagement.create({
      owner: req.user.id,
      documentName: documentName || file?.originalname || "Document",
      documentType: documentType || "other",
      category: category || "personal",
      documentDetails: {
        expiryDate: expiryDate ? new Date(expiryDate) : null,
      },
      fileInfo: file
        ? {
            fileName: file.originalname,
            fileSize: file.size,
            fileType: file.mimetype,
            uploadedDate: new Date(),
          }
        : undefined,
      verification: {
        status: "pending",
      },
      notes: remarks
        ? [
            {
              note: remarks,
              createdBy: req.user.id,
            },
          ]
        : [],
      auditLog: [
        {
          action: "Document uploaded",
          performedBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Document uploaded successfully',
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading document',
      error: error.message,
    });
  }
};

// ===== GET ALL DOCUMENTS (WITH FILTERS) =====
exports.getAllDocuments = async (req, res) => {
  try {
    const { category, verificationStatus, studentId } = req.query;

    let filter = {};
    if (category) filter.category = category;
    if (verificationStatus) filter["verification.status"] = verificationStatus;
    if (studentId) filter.owner = studentId;
    if (req.user.role === "student") {
      filter.owner = req.user.id;
    }

    const documents = await DocumentManagement.find(filter)
      .populate('owner', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Documents retrieved successfully',
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving documents',
      error: error.message,
    });
  }
};

// ===== GET DOCUMENT BY ID =====
exports.getDocumentById = async (req, res) => {
  try {
    const document = await DocumentManagement.findById(req.params.id)
      .populate('owner', 'name email');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    if (req.user.role === "student" && String(document.owner) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({
      message: 'Document retrieved successfully',
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving document',
      error: error.message,
    });
  }
};

// ===== VERIFY DOCUMENT =====
exports.verifyDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { verificationStatus, verificationNotes } = req.body;

    const document = await DocumentManagement.findByIdAndUpdate(
      id,
      {
        "verification.status": verificationStatus,
        "verification.verifiedBy": req.user.id,
        "verification.verificationDate": new Date(),
        "verification.rejectionReason": verificationNotes,
        $push: {
          auditLog: {
            action: `Document ${verificationStatus}`,
            performedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({
      message: 'Document verified successfully',
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error verifying document',
      error: error.message,
    });
  }
};

// ===== GRANT ACCESS TO DOCUMENT =====
exports.grantAccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, accessType, expiryDate } = req.body; // accessType: 'view', 'download', 'edit'

    const document = await DocumentManagement.findByIdAndUpdate(
      id,
      {
        $push: {
          "accessControl.accessibleBy": {
            userId,
            accessLevel: accessType,
            role: "staff",
          },
          auditLog: {
            action: `Access granted to user`,
            performedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({
      message: 'Access granted successfully',
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error granting access',
      error: error.message,
    });
  }
};

// ===== CHECK EXPIRING DOCUMENTS =====
exports.getExpiringDocuments = async (req, res) => {
  try {
    const { daysFromNow = 30 } = req.query;

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(daysFromNow));

    const documents = await DocumentManagement.find({
      "documentDetails.expiryDate": {
        $lte: expiryDate,
        $gte: new Date(),
      },
    })
      .populate('owner', 'name email')
      .sort({ "documentDetails.expiryDate": 1 });

    res.json({
      message: 'Expiring documents retrieved successfully',
      expiringInDays: daysFromNow,
      count: documents.length,
      documents,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving expiring documents',
      error: error.message,
    });
  }
};

// ===== DELETE DOCUMENT =====
exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await DocumentManagement.findByIdAndDelete(id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.json({
      message: 'Document deleted successfully',
      document,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting document',
      error: error.message,
    });
  }
};

// ===== GET DOCUMENT ANALYTICS =====
exports.getDocumentAnalytics = async (req, res) => {
  try {
    const totalDocuments = await DocumentManagement.countDocuments();
    const verifiedDocuments = await DocumentManagement.countDocuments({
      "verification.status": 'approved',
    });
    const pendingDocuments = await DocumentManagement.countDocuments({
      "verification.status": 'pending',
    });
    const rejectedDocuments = await DocumentManagement.countDocuments({
      "verification.status": 'rejected',
    });

    // Documents by category
    const documentsByCategory = await DocumentManagement.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      message: 'Document analytics retrieved successfully',
      analytics: {
        totalDocuments,
        verifiedDocuments,
        pendingDocuments,
        rejectedDocuments,
        verificationRate:
          ((verifiedDocuments / totalDocuments) * 100).toFixed(2) + '%',
        documentsByCategory,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
