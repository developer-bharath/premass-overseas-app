// ====================================================================
// STUDENT SUPPORT & SETTLEMENT CONTROLLER
// ====================================================================

const StudentSupportSettlement = require('../models/StudentSupportSettlement');

// ===== CREATE SUPPORT PROFILE =====
exports.createSupportProfile = async (req, res) => {
  try {
    const {
      studentName,
      studentEmail,
      studyDestination,
      departureDate,
      accommodationNeeds,
    } = req.body;

    const profile = await StudentSupportSettlement.create({
      student: req.user.id,
      studentName,
      studentEmail,
      studyDestination,
      departureDate: new Date(departureDate),
      accommodationNeeds,
      status: 'pre_departure_support',
      timeline: [
        {
          event: 'Support profile created',
          date: new Date(),
          actionBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Support profile created successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating support profile',
      error: error.message,
    });
  }
};

// ===== UPDATE PRE-DEPARTURE CHECKLIST =====
exports.updatePreDepartureChecklist = async (req, res) => {
  try {
    const { id } = req.params;
    const { checklistItem, isCompleted } = req.body;

    const profile = await StudentSupportSettlement.findByIdAndUpdate(
      id,
      {
        $push: {
          preDepartureChecklist: {
            item: checklistItem,
            isCompleted,
            completedDate: isCompleted ? new Date() : null,
          },
          timeline: {
            event: `Pre-departure checklist item ${isCompleted ? 'completed' : 'added'}`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Support profile not found' });
    }

    res.json({
      message: 'Pre-departure checklist updated successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating checklist',
      error: error.message,
    });
  }
};

// ===== ARRANGE ACCOMMODATION =====
exports.arrangeAccommodation = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      accommodationType,
      location,
      monthlyRent,
      landlordName,
      landlordContact,
      checkinDate,
    } = req.body;

    const profile = await StudentSupportSettlement.findByIdAndUpdate(
      id,
      {
        accommodationArrangement: {
          accommodationType,
          location,
          monthlyRent,
          landlordName,
          landlordContact,
          checkInDate: new Date(checkinDate),
          status: 'arranged',
          arrangedDate: new Date(),
        },
        $push: {
          timeline: {
            event: `Accommodation arranged at ${location}`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Support profile not found' });
    }

    res.json({
      message: 'Accommodation arranged successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error arranging accommodation',
      error: error.message,
    });
  }
};

// ===== ARRANGE TRAVEL & FLIGHTS =====
exports.arrangeTravel = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      departureCity,
      arrivalCity,
      departureDate,
      arrivalDate,
      airline,
      ticketNumber,
      ticketCost,
      bookingConfirmation,
    } = req.body;

    const profile = await StudentSupportSettlement.findByIdAndUpdate(
      id,
      {
        travelArrangement: {
          departureCity,
          arrivalCity,
          departureDate: new Date(departureDate),
          arrivalDate: new Date(arrivalDate),
          airline,
          ticketNumber,
          ticketCost,
          bookingConfirmationUrl: bookingConfirmation,
          status: 'booked',
          bookedDate: new Date(),
        },
        $push: {
          timeline: {
            event: `Flight booked from ${departureCity} to ${arrivalCity}`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Support profile not found' });
    }

    res.json({
      message: 'Travel arranged successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error arranging travel',
      error: error.message,
    });
  }
};

// ===== ARRANGE HEALTH INSURANCE =====
exports.arrangeHealthInsurance = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      insuranceProvider,
      policyNumber,
      coverageType,
      monthlyCost,
      policyStartDate,
      policyEndDate,
      documentUrl,
    } = req.body;

    const profile = await StudentSupportSettlement.findByIdAndUpdate(
      id,
      {
        healthInsurance: {
          insuranceProvider,
          policyNumber,
          coverageType,
          monthlyCost,
          policyStartDate: new Date(policyStartDate),
          policyEndDate: new Date(policyEndDate),
          documentUrl,
          status: 'active',
          activatedDate: new Date(),
        },
        $push: {
          timeline: {
            event: `Health insurance activated with ${insuranceProvider}`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Support profile not found' });
    }

    res.json({
      message: 'Health insurance arranged successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error arranging insurance',
      error: error.message,
    });
  }
};

// ===== UPDATE ARRIVAL SUPPORT =====
exports.updateArrivalSupport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      airportPickupArranged,
      pickupContactName,
      pickupContactPhone,
      orientationScheduled,
      bankAccountOpened,
      phoneConnectionEstablished,
    } = req.body;

    const profile = await StudentSupportSettlement.findByIdAndUpdate(
      id,
      {
        arrivalSettlement: {
          airportPickupArranged,
          pickupContactName,
          pickupContactPhone,
          orientationScheduled,
          bankAccountOpened,
          phoneConnectionEstablished,
          lastUpdated: new Date(),
        },
        status: 'post_arrival_support',
        $push: {
          timeline: {
            event: 'Arrival support details updated',
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Support profile not found' });
    }

    res.json({
      message: 'Arrival support details updated successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating arrival support',
      error: error.message,
    });
  }
};

// ===== GET SUPPORT PROFILE BY ID =====
exports.getSupportProfileById = async (req, res) => {
  try {
    const profile = await StudentSupportSettlement.findById(req.params.id);

    if (!profile) {
      return res.status(404).json({ message: 'Support profile not found' });
    }

    res.json({
      message: 'Support profile retrieved successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving support profile',
      error: error.message,
    });
  }
};

// ===== GET ALL SUPPORT PROFILES =====
exports.getAllSupportProfiles = async (req, res) => {
  try {
    const { status, destination } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (destination) filter.studyDestination = destination;

    const profiles = await StudentSupportSettlement.find(filter).sort({
      createdAt: -1,
    });

    res.json({
      message: 'Support profiles retrieved successfully',
      count: profiles.length,
      profiles,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving support profiles',
      error: error.message,
    });
  }
};

// ===== GET SETTLEMENT ANALYTICS =====
exports.getSettlementAnalytics = async (req, res) => {
  try {
    const totalProfiles = await StudentSupportSettlement.countDocuments();
    const preDepartureProfiles = await StudentSupportSettlement.countDocuments({
      status: 'pre_departure_support',
    });
    const postArrivalProfiles = await StudentSupportSettlement.countDocuments({
      status: 'post_arrival_support',
    });

    const accommodationArranged = await StudentSupportSettlement.countDocuments({
      'accommodationArrangement.status': 'arranged',
    });
    const travelBooked = await StudentSupportSettlement.countDocuments({
      'travelArrangement.status': 'booked',
    });
    const insuranceActive = await StudentSupportSettlement.countDocuments({
      'healthInsurance.status': 'active',
    });

    res.json({
      message: 'Settlement analytics retrieved successfully',
      analytics: {
        totalStudents: totalProfiles,
        preDepartureSupport: preDepartureProfiles,
        postArrivalSupport: postArrivalProfiles,
        accommodationArranged,
        travelBooked,
        insuranceActive,
        readinessPercentage: (
          ((accommodationArranged + travelBooked + insuranceActive) /
            (totalProfiles * 3)) *
          100
        ).toFixed(2) + '%',
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};
