// ====================================================================
// IT TRAINING CONTROLLER
// ====================================================================

const ITTraining = require('../models/ITTraining');

// ===== CREATE NEW COURSE =====
exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      technologies,
      duration,
      trainingMode,
      courseStartDate,
    } = req.body;

    const course = await ITTraining.create({
      courseName,
      courseDescription,
      technologies,
      duration,
      trainingMode,
      courseStartDate: new Date(courseStartDate),
      status: 'open_for_enrollment',
      timeline: [
        {
          event: 'Course created',
          date: new Date(),
          actionBy: req.user.id,
        },
      ],
    });

    res.status(201).json({
      message: 'Course created successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating course',
      error: error.message,
    });
  }
};

// ===== ENROLL STUDENT IN COURSE =====
exports.enrollStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { studentId, studentName, studentEmail, enrollmentDate } = req.body;

    const course = await ITTraining.findByIdAndUpdate(
      id,
      {
        $push: {
          enrolledStudents: {
            studentId,
            studentName,
            studentEmail,
            enrollmentDate: new Date(enrollmentDate),
            enrollmentStatus: 'active',
          },
          timeline: {
            event: `${studentName} enrolled`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Student enrolled successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error enrolling student',
      error: error.message,
    });
  }
};

// ===== SCHEDULE BATCH =====
exports.scheduleBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { batchName, startDate, endDate, maxStrength, trainerId } = req.body;

    const course = await ITTraining.findByIdAndUpdate(
      id,
      {
        $push: {
          batches: {
            batchName,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
            maxStrength,
            trainerId,
            status: 'scheduled',
            createdDate: new Date(),
          },
          timeline: {
            event: `Batch ${batchName} scheduled`,
            date: new Date(),
            actionBy: req.user.id,
          },
        },
      },
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Batch scheduled successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error scheduling batch',
      error: error.message,
    });
  }
};

// ===== RECORD STUDENT ASSESSMENT =====
exports.recordAssessment = async (req, res) => {
  try {
    const { id, studentIndex } = req.params;
    const {
      assignmentScore,
      projectScore,
      quizScore,
      overallScore,
      feedback,
    } = req.body;

    const course = await ITTraining.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (
      studentIndex >= 0 &&
      studentIndex < course.enrolledStudents.length
    ) {
      course.enrolledStudents[studentIndex].assessments = {
        assignmentScore,
        projectScore,
        quizScore,
        overallScore,
        feedback,
        assessedDate: new Date(),
      };

      course.timeline.push({
        event: `Assessment recorded for student`,
        date: new Date(),
        actionBy: req.user.id,
      });

      await course.save();
    }

    res.json({
      message: 'Assessment recorded successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error recording assessment',
      error: error.message,
    });
  }
};

// ===== ISSUE CERTIFICATE =====
exports.issueCertificate = async (req, res) => {
  try {
    const { id, studentIndex } = req.params;
    const { certificateNumber, issuedDate, certificateUrl } = req.body;

    const course = await ITTraining.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (
      studentIndex >= 0 &&
      studentIndex < course.enrolledStudents.length
    ) {
      const student = course.enrolledStudents[studentIndex];
      student.completionCertificate = {
        certificateNumber,
        issuedDate: new Date(issuedDate),
        certificateUrl,
        status: 'issued',
      };
      student.enrollmentStatus = 'completed';

      course.timeline.push({
        event: `Certificate issued to student`,
        date: new Date(),
        actionBy: req.user.id,
      });

      await course.save();
    }

    res.json({
      message: 'Certificate issued successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error issuing certificate',
      error: error.message,
    });
  }
};

// ===== TRACK STUDENT PLACEMENT =====
exports.updateStudentPlacement = async (req, res) => {
  try {
    const { id, studentIndex } = req.params;
    const {
      companyName,
      position,
      salary,
      placedDate,
      placementStatus,
    } = req.body;

    const course = await ITTraining.findById(id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (
      studentIndex >= 0 &&
      studentIndex < course.enrolledStudents.length
    ) {
      course.enrolledStudents[studentIndex].postCoursePlacement = {
        companyName,
        position,
        salary,
        placedDate: new Date(placedDate),
        placementStatus,
      };

      course.timeline.push({
        event: `${placementStatus === 'placed' ? 'Placement' : 'Placement attempt'} recorded for student`,
        date: new Date(),
        actionBy: req.user.id,
      });

      await course.save();
    }

    res.json({
      message: 'Student placement recorded successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating placement',
      error: error.message,
    });
  }
};

// ===== GET TRAINING ANALYTICS =====
exports.getTrainingAnalytics = async (req, res) => {
  try {
    const totalCourses = await ITTraining.countDocuments();
    const activeCourses = await ITTraining.countDocuments({
      status: { $in: ['open_for_enrollment', 'in_progress'] },
    });
    const completedCourses = await ITTraining.countDocuments({
      status: 'completed',
    });

    const totalEnrollments = await ITTraining.aggregate([
      { $unwind: '$enrolledStudents' },
      { $count: 'totalEnrollments' },
    ]);

    const placedStudents = await ITTraining.aggregate([
      { $unwind: '$enrolledStudents' },
      {
        $match: {
          'enrolledStudents.postCoursePlacement.placementStatus': 'placed',
        },
      },
      { $count: 'placedStudents' },
    ]);

    res.json({
      message: 'Training analytics retrieved successfully',
      analytics: {
        totalCourses,
        activeCourses,
        completedCourses,
        totalEnrollments: totalEnrollments[0]?.totalEnrollments || 0,
        placedStudents: placedStudents[0]?.placedStudents || 0,
        placementRate:
          ((
            (placedStudents[0]?.placedStudents || 0) /
            (totalEnrollments[0]?.totalEnrollments || 1)
          ) * 100).toFixed(2) + '%',
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving analytics',
      error: error.message,
    });
  }
};

// ===== GET COURSE BY ID =====
exports.getCourseById = async (req, res) => {
  try {
    const course = await ITTraining.findById(req.params.id)
      .populate('trainerId', 'name email')
      .populate('batches.trainerId', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json({
      message: 'Course retrieved successfully',
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving course',
      error: error.message,
    });
  }
};

// ===== GET ALL COURSES =====
exports.getAllCourses = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status) filter.status = status;

    const courses = await ITTraining.find(filter)
      .populate('trainerId', 'name email')
      .sort({ courseStartDate: -1 });

    res.json({
      message: 'Courses retrieved successfully',
      count: courses.length,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving courses',
      error: error.message,
    });
  }
};
