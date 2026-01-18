// ====================================================================
// VISA & IMMIGRATION ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const visaController = require('../controllers/visaImmigrationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Specific routes first
router.get('/analytics/dashboard', visaController.getVisaAnalytics);

// Then :id routes with nested paths
router.get('/:id', visaController.getAllApplications);
router.put('/:id/status', visaController.updateApplicationStatus);
router.post('/:id/documents', visaController.addDocument);
router.post('/:id/interview/schedule', visaController.scheduleInterview);
router.put('/:id/interview/outcome', visaController.updateInterviewOutcome);
router.put('/:id/decision', visaController.updateVisaDecision);

// Generic routes last
router.post('/', visaController.createApplication);
router.get('/', visaController.getAllApplications);

module.exports = router;
