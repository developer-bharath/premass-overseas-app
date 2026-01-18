// ====================================================================
// IT TRAINING ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const trainingController = require('../controllers/itTrainingController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Specific routes first
router.get('/analytics/dashboard', trainingController.getTrainingAnalytics);

// Then :id routes with nested paths
router.get('/:id', trainingController.getCourseById);
router.post('/:id/enroll', trainingController.enrollStudent);
router.post('/:id/batch', trainingController.scheduleBatch);
router.post('/:id/assessment/:studentIndex', trainingController.recordAssessment);
router.post('/:id/certificate/:studentIndex', trainingController.issueCertificate);
router.put('/:id/placement/:studentIndex', trainingController.updateStudentPlacement);

// Generic routes last
router.post('/', roleMiddleware(['service_manager', 'department_head', 'super_admin']), trainingController.createCourse);
router.get('/', trainingController.getAllCourses);

module.exports = router;
