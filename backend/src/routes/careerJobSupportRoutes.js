// ====================================================================
// CAREER & JOB SUPPORT ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerJobSupportController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Specific routes first
router.get('/analytics/dashboard', careerController.getCareerAnalytics);

// Then :id routes with nested paths
router.post('/:id/resume-service', careerController.requestResumeService);
router.put('/:id/resume-service/:serviceIndex', careerController.submitRevisedResume);
router.post('/:id/job-applications', careerController.addJobApplication);
router.put('/:id/job-applications/:appIndex', careerController.updateJobApplicationStatus);
router.put('/:id/job-offer', careerController.recordJobOffer);

// Generic routes last
router.post('/', careerController.enrollStudentCareerSupport);
router.get('/', careerController.enrollStudentCareerSupport);

module.exports = router;
