// ====================================================================
// DOMESTIC ADMISSION CONTROLLER
// ====================================================================

const DomesticAdmission = require('../models/DomesticAdmission');

// ===== CREATE NEW LEAD =====
exports.createLead = async (req, res) => {
  try {
    const { name, email, phone, academicProfile, preferences, leadSource } =
      req.body;

    const lead = await DomesticAdmission.create({
      student: req.user.id,
      name,
      email,
      phone,
      academicProfile,
      preferences,
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
    const { status, assignedCounselor } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (assignedCounselor) filter.assignedCounselor = assignedCounselor;

    const leads = await DomesticAdmission.find(filter)
      .populate('assignedCounselor', 'name email')
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

// ===== UPDATE LEAD STATUS =====
exports.updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus } = req.body;

    const lead = await DomesticAdmission.findByIdAndUpdate(
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

// ===== ADD SHORTLISTED COLLEGE =====
exports.addCollege = async (req, res) => {
  try {
    const { id } = req.params;
    const { collegeName, state, course, cutoff } = req.body;

    const lead = await DomesticAdmission.findByIdAndUpdate(
      id,
      {
        $push: {
          shortlistedColleges: {
            collegeName,
            state,
            course,
            cutoff,
            addedDate: new Date(),
          },
          timeline: {
            event: `${collegeName} shortlisted`,
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
      message: 'College added successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding college',
      error: error.message,
    });
  }
};

// ===== UPDATE SEAT ALLOCATION =====
exports.updateSeatAllocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { collegeName, allottedCourse, rank, allottedCategory } = req.body;

    const lead = await DomesticAdmission.findByIdAndUpdate(
      id,
      {
        seatAllocation: {
          collegeName,
          allottedCourse,
          rank,
          allottedCategory,
          allottedDate: new Date(),
          status: 'allotted',
        },
        status: 'seat_allotted',
        $push: {
          timeline: {
            event: `Seat allotted at ${collegeName}`,
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
      message: 'Seat allocation updated successfully',
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating seat allocation',
      error: error.message,
    });
  }
};

// ===== GET LEAD ANALYTICS =====
exports.getLeadAnalytics = async (req, res) => {
  try {
    const totalLeads = await DomesticAdmission.countDocuments();
    const inquiryLeads = await DomesticAdmission.countDocuments({
      status: 'inquiry',
    });
    const seatAllottedLeads = await DomesticAdmission.countDocuments({
      status: 'seat_allotted',
    });
    const admittedLeads = await DomesticAdmission.countDocuments({
      status: 'admitted',
    });

    const conversionRate = ((admittedLeads / totalLeads) * 100).toFixed(2);

    res.json({
      message: 'Lead analytics retrieved successfully',
      analytics: {
        totalLeads,
        inquiryLeads,
        seatAllottedLeads,
        admittedLeads,
        conversionRate: conversionRate + '%',
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
