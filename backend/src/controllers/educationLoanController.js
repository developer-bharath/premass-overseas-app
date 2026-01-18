// ====================================================================
// EDUCATION LOAN CONTROLLER
// ====================================================================

const EducationLoan = require('../models/EducationLoan');

// ===== CREATE NEW LOAN APPLICATION =====
exports.createLoanApplication = async (req, res) => {
  try {
    const { name, email, phone, financialProfile, loanDetails } = req.body;

    const application = await EducationLoan.create({
      student: req.user.id,
      name,
      email,
      phone,
      financialProfile,
      loanDetails,
      status: 'application_received',
      timeline: [
        {
          event: 'Loan application received',
          date: new Date(),
          updatedBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Loan application created successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating loan application',
      error: error.message,
    });
  }
};

// ===== GET ALL APPLICATIONS =====
exports.getAllApplications = async (req, res) => {
  try {
    const { status, assignedOfficer } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (assignedOfficer) filter.assignedOfficer = assignedOfficer;

    const applications = await EducationLoan.find(filter)
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

// ===== GET APPLICATION BY ID =====
exports.getApplicationById = async (req, res) => {
  try {
    const application = await EducationLoan.findById(req.params.id)
      .populate('assignedOfficer', 'name email');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json({
      message: 'Application retrieved successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving application',
      error: error.message,
    });
  }
};

// ===== CALCULATE LOAN ELIGIBILITY =====
exports.calculateEligibility = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      creditScore,
      parentalIncome,
      collateral,
      repaymentCapacity,
    } = req.body;

    const application = await EducationLoan.findById(id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Calculate eligibility score
    let eligibilityScore = 0;
    if (creditScore >= 700) eligibilityScore += 30;
    if (parentalIncome >= 500000) eligibilityScore += 30;
    if (collateral >= 100000) eligibilityScore += 20;
    if (repaymentCapacity >= 10000) eligibilityScore += 20;

    const eligible = eligibilityScore >= 60;

    application.loanEligibility = {
      eligibilityScore,
      eligible,
      evaluatedDate: new Date(),
      evaluatedBy: req.user.id,
      factors: {
        creditScore,
        parentalIncome,
        collateral,
        repaymentCapacity,
      },
    };

    application.status = eligible ? 'eligible' : 'not_eligible';
    application.timeline.push({
      event: `Eligibility evaluated: ${eligible ? 'Eligible' : 'Not Eligible'}`,
      date: new Date(),
      updatedBy: req.user.id,
    });

    await application.save();

    res.json({
      message: 'Eligibility calculated successfully',
      eligibility: {
        eligibilityScore,
        eligible,
      },
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error calculating eligibility',
      error: error.message,
    });
  }
};

// ===== ADD BANK/NBFC PARTNER =====
exports.addLender = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      lenderName,
      lenderType,
      interestRate,
      processingFee,
      repaymentPeriod,
    } = req.body;

    const application = await EducationLoan.findByIdAndUpdate(
      id,
      {
        $push: {
          bankNbfcPartners: {
            lenderName,
            lenderType,
            interestRate,
            processingFee,
            repaymentPeriod,
            addedDate: new Date(),
            status: 'offer_pending',
          },
          timeline: {
            event: `${lenderName} added as partner`,
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
      message: 'Lender added successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding lender',
      error: error.message,
    });
  }
};

// ===== UPDATE DISBURSEMENT STATUS =====
exports.updateDisbursement = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      disbursementAmount,
      disbursementDate,
      bankAccountNumber,
      description,
    } = req.body;

    const application = await EducationLoan.findByIdAndUpdate(
      id,
      {
        disbursement: {
          amount: disbursementAmount,
          date: new Date(disbursementDate),
          bankAccountNumber,
          status: 'disbursed',
          description,
        },
        status: 'disbursed',
        $push: {
          timeline: {
            event: `Loan disbursed: ₹${disbursementAmount}`,
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
      message: 'Disbursement recorded successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating disbursement',
      error: error.message,
    });
  }
};

// ===== GET LOAN ANALYTICS =====
exports.getLoanAnalytics = async (req, res) => {
  try {
    const totalApplications = await EducationLoan.countDocuments();
    const eligibleApplications = await EducationLoan.countDocuments({
      status: 'eligible',
    });
    const approvedApplications = await EducationLoan.countDocuments({
      status: 'approved',
    });
    const disbursedApplications = await EducationLoan.countDocuments({
      status: 'disbursed',
    });

    const totalDisbursed = await EducationLoan.aggregate([
      { $match: { 'disbursement.status': 'disbursed' } },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$disbursement.amount' },
        },
      },
    ]);

    res.json({
      message: 'Loan analytics retrieved successfully',
      analytics: {
        totalApplications,
        eligibleApplications,
        approvalRate:
          ((approvedApplications / totalApplications) * 100).toFixed(2) + '%',
        disbursedApplications,
        totalDisbursed: totalDisbursed[0]?.totalAmount || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
