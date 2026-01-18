// ====================================================================
// OVERSEAS EDUCATION CONTROLLER
// ====================================================================

const OverseasEducation = require('../models/OverseasEducation');
const User = require('../models/User');

// ===== CREATE NEW LEAD =====
exports.createLead = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      academicProfile,
      studyAbroad,
      leadSource,
    } = req.body;

    const lead = await OverseasEducation.create({
      student: req.user.id,
      name,
      email,
      phone,
      academicProfile,
      studyAbroad,
      leadSource,
      status: 'inquiry',
      timeline: [
        {
          event: 'Lead created',
          date: new Date(),
          updatedBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Lead created successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating lead',
      error: error.message,
    });
  }
};

// ===== GET ALL LEADS =====
exports.getAllLeads = async (req, res) => {
  try {
    const { status, country, assignedCounselor } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (country) filter['studyAbroad.targetCountries'] = country;
    if (assignedCounselor) filter.assignedCounselor = assignedCounselor;

    const leads = await OverseasEducation.find(filter)
      .populate('assignedCounselor', 'name email')
      .populate('serviceManager', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Leads retrieved successfully',
      count: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving leads',
      error: error.message,
    });
  }
};

// ===== GET LEAD BY ID =====
exports.getLeadById = async (req, res) => {
  try {
    const lead = await OverseasEducation.findById(req.params.id)
      .populate('assignedCounselor', 'name email')
      .populate('serviceManager', 'name email')
      .populate('timeline.updatedBy', 'name');

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({
      message: 'Lead retrieved successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving lead',
      error: error.message,
    });
  }
};

// ===== UPDATE LEAD STATUS =====
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    const lead = await OverseasEducation.findByIdAndUpdate(
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

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({
      message: 'Lead status updated successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating lead status',
      error: error.message,
    });
  }
};

// ===== ASSIGN COUNSELOR =====
exports.assignCounselor = async (req, res) => {
  try {
    const { id } = req.params;
    const { counselorId } = req.body;

    const lead = await OverseasEducation.findByIdAndUpdate(
      id,
      {
        assignedCounselor: counselorId,
        $push: {
          timeline: {
            event: `Assigned to counselor`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({
      message: 'Counselor assigned successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error assigning counselor',
      error: error.message,
    });
  }
};

// ===== ADD SHORTLISTED UNIVERSITY =====
exports.addUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    const { universityId, universityName, country, course } = req.body;

    const lead = await OverseasEducation.findByIdAndUpdate(
      id,
      {
        $push: {
          shortlistedUniversities: {
            universityId,
            universityName,
            country,
            course,
            addedDate: new Date(),
          },
          timeline: {
            event: `${universityName} shortlisted`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({
      message: 'University added successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding university',
      error: error.message,
    });
  }
};

// ===== UPDATE APPLICATION STATUS =====
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationIndex, newStatus } = req.body;

    const lead = await OverseasEducation.findById(id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    if (applicationIndex >= 0 && applicationIndex < lead.applications.length) {
      lead.applications[applicationIndex].status = newStatus;
      lead.timeline.push({
        event: `Application status updated to ${newStatus}`,
        date: new Date(),
        updatedBy: req.user.id,
      });

      await lead.save();
    }

    res.json({
      message: 'Application status updated successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating application status',
      error: error.message,
    });
  }
};

// ===== UPLOAD OFFER LETTER =====
exports.uploadOfferLetter = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      universityName,
      course,
      fileUrl,
      tuitionFee,
      scholarship,
    } = req.body;

    const lead = await OverseasEducation.findByIdAndUpdate(
      id,
      {
        offerLetter: {
          universityName,
          course,
          receivedDate: new Date(),
          fileUrl,
          tuitionFee,
          scholarship,
          status: 'received',
        },
        status: 'offer_received',
        $push: {
          timeline: {
            event: `Offer letter received from ${universityName}`,
            date: new Date(),
            updatedBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({
      message: 'Offer letter uploaded successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error uploading offer letter',
      error: error.message,
    });
  }
};

// ===== ADD NOTE =====
exports.addNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { note } = req.body;

    const lead = await OverseasEducation.findByIdAndUpdate(
      id,
      {
        $push: {
          notes: {
            note,
            createdBy: req.user.id,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json({
      message: 'Note added successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding note',
      error: error.message,
    });
  }
};

// ===== GET LEADS BY COUNSELOR =====
exports.getLeadsByCounselor = async (req, res) => {
  try {
    const { counselorId } = req.params;
    const leads = await OverseasEducation.find({
      assignedCounselor: counselorId,
    }).sort({ createdAt: -1 });

    res.json({
      message: 'Leads retrieved successfully',
      count: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving leads',
      error: error.message,
    });
  }
};

// ===== GET LEAD ANALYTICS =====
exports.getLeadAnalytics = async (req, res) => {
  try {
    const totalLeads = await OverseasEducation.countDocuments();
    const inquiryLeads = await OverseasEducation.countDocuments({
      status: 'inquiry',
    });
    const offerReceivedLeads = await OverseasEducation.countDocuments({
      status: 'offer_received',
    });
    const completedLeads = await OverseasEducation.countDocuments({
      status: 'completed',
    });

    const conversionRate = ((completedLeads / totalLeads) * 100).toFixed(2);

    // Leads by country
    const leadsByCountry = await OverseasEducation.aggregate([
      { $unwind: '$studyAbroad.targetCountries' },
      {
        $group: {
          _id: '$studyAbroad.targetCountries',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    res.json({
      message: 'Lead analytics retrieved successfully',
      analytics: {
        totalLeads,
        inquiryLeads,
        offerReceivedLeads,
        completedLeads,
        conversionRate: conversionRate + '%',
        leadsByCountry,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
