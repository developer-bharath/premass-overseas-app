// ====================================================================
// CAREER & JOB SUPPORT CONTROLLER
// ====================================================================

const CareerJobSupport = require('../models/CareerJobSupport');

// ===== ENROLL IN CAREER SERVICES =====
exports.enrollStudentCareerSupport = async (req, res) => {
  try {
    const { name, email, phone, skills, experience, targetRole } = req.body;

    const enrollment = await CareerJobSupport.create({
      student: req.user.id,
      name,
      email,
      phone,
      skills,
      experience,
      targetRole,
      enrollmentDate: new Date(),
      status: 'enrolled',
      timeline: [
        {
          event: 'Student enrolled in career support',
          date: new Date(),
          actionBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Career support enrollment created successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating enrollment',
      error: error.message,
    });
  }
};

// ===== REQUEST RESUME SERVICE =====
exports.requestResumeService = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType, resumeFileUrl, comments } = req.body;

    const enrollment = await CareerJobSupport.findByIdAndUpdate(
      id,
      {
        $push: {
          resumeServices: {
            serviceType,
            originalResume: resumeFileUrl,
            requestedDate: new Date(),
            status: 'pending_review',
            comments,
          },
          timeline: {
            event: `Resume ${serviceType} requested`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({
      message: 'Resume service requested successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error requesting resume service',
      error: error.message,
    });
  }
};

// ===== SUBMIT REVISED RESUME =====
exports.submitRevisedResume = async (req, res) => {
  try {
    const { id, serviceIndex } = req.params;
    const { revisedResumeUrl, reviewerComments } = req.body;

    const enrollment = await CareerJobSupport.findById(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (serviceIndex >= 0 && serviceIndex < enrollment.resumeServices.length) {
      enrollment.resumeServices[serviceIndex].revisedResume = revisedResumeUrl;
      enrollment.resumeServices[serviceIndex].revisions.push({
        revisionNumber:
          enrollment.resumeServices[serviceIndex].revisions.length + 1,
        revisedDate: new Date(),
        reviewedBy: req.user.id,
        comments: reviewerComments,
      });
      enrollment.resumeServices[serviceIndex].status = 'revision_submitted';

      enrollment.timeline.push({
        event: 'Resume revision submitted',
        date: new Date(),
        actionBy: req.user.id,
      });

      await enrollment.save();
    }

    res.json({
      message: 'Revised resume submitted successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error submitting revised resume',
      error: error.message,
    });
  }
};

// ===== TRACK JOB APPLICATIONS =====
exports.addJobApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      position,
      applicationDate,
      applicationLink,
      currentStatus,
    } = req.body;

    const enrollment = await CareerJobSupport.findByIdAndUpdate(
      id,
      {
        $push: {
          jobApplications: {
            companyName,
            position,
            applicationDate: new Date(applicationDate),
            applicationLink,
            currentStatus,
            appliedDate: new Date(),
          },
          timeline: {
            event: `Job application at ${companyName} tracked`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({
      message: 'Job application tracked successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding job application',
      error: error.message,
    });
  }
};

// ===== UPDATE JOB APPLICATION STATUS =====
exports.updateJobApplicationStatus = async (req, res) => {
  try {
    const { id, appIndex } = req.params;
    const { newStatus, updateDetails } = req.body;

    const enrollment = await CareerJobSupport.findById(id);
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    if (appIndex >= 0 && appIndex < enrollment.jobApplications.length) {
      enrollment.jobApplications[appIndex].currentStatus = newStatus;
      if (updateDetails) {
        enrollment.jobApplications[appIndex].details = updateDetails;
      }

      enrollment.timeline.push({
        event: `Job application status updated to ${newStatus}`,
        date: new Date(),
        actionBy: req.user.id,
      });

      await enrollment.save();
    }

    res.json({
      message: 'Job application status updated successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating job application status',
      error: error.message,
    });
  }
};

// ===== RECORD JOB OFFER =====
exports.recordJobOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      companyName,
      position,
      salary,
      joinDate,
      offerLetter,
      acceptedStatus,
    } = req.body;

    const enrollment = await CareerJobSupport.findByIdAndUpdate(
      id,
      {
        jobOffers: {
          companyName,
          position,
          salary,
          joinDate: new Date(joinDate),
          offerLetterUrl: offerLetter,
          acceptedStatus,
          offerDate: new Date(),
        },
        status: 'job_offer_received',
        $push: {
          timeline: {
            event: `Job offer received from ${companyName}`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    res.json({
      message: 'Job offer recorded successfully',
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error recording job offer',
      error: error.message,
    });
  }
};

// ===== GET CAREER ANALYTICS =====
exports.getCareerAnalytics = async (req, res) => {
  try {
    const totalEnrollments = await CareerJobSupport.countDocuments();
    const enrolledStudents = await CareerJobSupport.countDocuments({
      status: 'enrolled',
    });
    const placedStudents = await CareerJobSupport.countDocuments({
      status: 'placed',
    });

    const jobApplications = await CareerJobSupport.aggregate([
      { $unwind: '$jobApplications' },
      {
        $group: {
          _id: '$jobApplications.currentStatus',
          count: { $sum: 1 },
        },
      },
    ]);

    const placementRate = ((placedStudents / totalEnrollments) * 100).toFixed(2);

    res.json({
      message: 'Career analytics retrieved successfully',
      analytics: {
        totalEnrollments,
        enrolledStudents,
        placedStudents,
        placementRate: placementRate + '%',
        jobApplicationStats: jobApplications,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
