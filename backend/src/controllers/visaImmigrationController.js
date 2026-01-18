// ====================================================================
// VISA & IMMIGRATION CONTROLLER
// ====================================================================

const VisaImmigration = require('../models/VisaImmigration');

// ===== CREATE NEW VISA APPLICATION =====
exports.createApplication = async (req, res) => {
  try {
    const { name, email, phone, visaType, destination, purpose } = req.body;

    const application = await VisaImmigration.create({
      student: req.user.id,
      name,
      email,
      phone,
      visaType,
      destination,
      purpose,
      status: 'documentation',
      timeline: [
        {
          event: 'Visa application started',
          date: new Date(),
          updatedBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Visa application created successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating visa application',
      error: error.message,
    });
  }
};

// ===== GET ALL APPLICATIONS =====
exports.getAllApplications = async (req, res) => {
  try {
    const { status, visaType, destination } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (visaType) filter.visaType = visaType;
    if (destination) filter.destination = destination;

    const applications = await VisaImmigration.find(filter)
      .populate('assignedOfficer', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Applications retrieved successfully',
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving applications',
      error: error.message,
    });
  }
};

// ===== UPDATE APPLICATION STATUS =====
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    const application = await VisaImmigration.findByIdAndUpdate(
      id,
      {
        status: newStatus,
        $push: {
          timeline: {
            event: `Status changed to ${newStatus}`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application status updated successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating application status',
      error: error.message,
    });
  }
};

// ===== ADD DOCUMENT =====
exports.addDocument = async (req, res) => {
  try {
    const { id } = req.params;
    const { documentType, fileUrl, verificationStatus } = req.body;

    const application = await VisaImmigration.findByIdAndUpdate(
      id,
      {
        $push: {
          documents: {
            documentType,
            fileUrl,
            uploadedDate: new Date(),
            verificationStatus: verificationStatus || 'pending',
          },
          timeline: {
            event: `${documentType} document uploaded`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Document added successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding document',
      error: error.message,
    });
  }
};

// ===== SCHEDULE INTERVIEW =====
exports.scheduleInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const { interviewDate, interviewTime, location, type, notes } = req.body;

    const application = await VisaImmigration.findByIdAndUpdate(
      id,
      {
        interview: {
          scheduledDate: new Date(interviewDate),
          scheduledTime: interviewTime,
          location,
          type,
          notes,
          status: 'scheduled',
        },
        status: 'interview_scheduled',
        $push: {
          timeline: {
            event: `Interview scheduled for ${interviewDate}`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Interview scheduled successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error scheduling interview',
      error: error.message,
    });
  }
};

// ===== UPDATE INTERVIEW OUTCOME =====
exports.updateInterviewOutcome = async (req, res) => {
  try {
    const { id } = req.params;
    const { outcome, interviewerNotes, scheduledDecisionDate } = req.body;

    const application = await VisaImmigration.findByIdAndUpdate(
      id,
      {
        'interview.outcome': outcome,
        'interview.interviewerNotes': interviewerNotes,
        'interview.completedDate': new Date(),
        'interview.status': 'completed',
        status: 'decision_awaited',
        $push: {
          timeline: {
            event: `Interview completed - ${outcome}`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Interview outcome recorded successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating interview outcome',
      error: error.message,
    });
  }
};

// ===== UPDATE VISA DECISION =====
exports.updateVisaDecision = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, passportNumber, visaValidityStart, visaValidityEnd } =
      req.body;

    const application = await VisaImmigration.findByIdAndUpdate(
      id,
      {
        approval: {
          decision,
          decisionDate: new Date(),
          passportNumber,
          visaNumber: `VISA-${Date.now()}`,
          validityStart: new Date(visaValidityStart),
          validityEnd: new Date(visaValidityEnd),
          approvedBy: req.user.id,
        },
        status: decision === 'approved' ? 'approved' : 'rejected',
        $push: {
          timeline: {
            event: `Visa application ${decision}`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: `Visa application ${decision} successfully`,
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating visa decision',
      error: error.message,
    });
  }
};

// ===== GET VISA ANALYTICS =====
exports.getVisaAnalytics = async (req, res) => {
  try {
    const totalApplications = await VisaImmigration.countDocuments();
    const approvedApplications = await VisaImmigration.countDocuments({
      status: 'approved',
    });
    const rejectedApplications = await VisaImmigration.countDocuments({
      status: 'rejected',
    });
    const pendingApplications = await VisaImmigration.countDocuments({
      status: { $in: ['documentation', 'interview_scheduled', 'decision_awaited'] },
    });

    const approvalRate =
      ((approvedApplications / totalApplications) * 100).toFixed(2);

    // Applications by destination
    const applicationsByDestination = await VisaImmigration.aggregate([
      {
        $group: {
          _id: '$destination',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      message: 'Visa analytics retrieved successfully',
      analytics: {
        totalApplications,
        approvedApplications,
        rejectedApplications,
        pendingApplications,
        approvalRate: approvalRate + '%',
        applicationsByDestination,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
