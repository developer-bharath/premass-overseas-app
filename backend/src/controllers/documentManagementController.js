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
      fileUrl,
      expiryDate,
      remarks,
    } = req.body;

    const document = await DocumentManagement.create({
      studentId: req.user.id,
      documentName,
      documentType,
      category,
      fileUrl,
      expiryDate: expiryDate ? new Date(expiryDate) : null,
      uploadedDate: new Date(),
      verificationStatus: 'pending',
      remarks,
      timeline: [
        {
          event: 'Document uploaded',
          date: new Date(),
          actionBy: req.user.id,
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
    if (verificationStatus) filter.verificationStatus = verificationStatus;
    if (studentId) filter.studentId = studentId;

    const documents = await DocumentManagement.find(filter)
      .populate('studentId', 'name email')
      .sort({ uploadedDate: -1 });

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
      .populate('studentId', 'name email')
      .populate('verifiedBy', 'name email');

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
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
        verificationStatus,
        verifiedBy: req.user.id,
        verificationDate: new Date(),
        verificationNotes,
        $push: {
          timeline: {
            event: `Document ${verificationStatus}`,
            date: new Date(),
            actionBy: req.user.id,
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
          accessControl: {
            grantedTo: userId,
            accessType,
            grantedDate: new Date(),
            expiryDate: expiryDate ? new Date(expiryDate) : null,
            grantedBy: req.user.id,
          },
          timeline: {
            event: `Access granted to user`,
            date: new Date(),
            actionBy: req.user.id,
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
      expiryDate: {
        $lte: expiryDate,
        $gte: new Date(),
      },
    })
      .populate('studentId', 'name email')
      .sort({ expiryDate: 1 });

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
      verificationStatus: 'verified',
    });
    const pendingDocuments = await DocumentManagement.countDocuments({
      verificationStatus: 'pending',
    });
    const rejectedDocuments = await DocumentManagement.countDocuments({
      verificationStatus: 'rejected',
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
