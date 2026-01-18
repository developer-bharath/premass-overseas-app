// ====================================================================
// DOMESTIC ADMISSION ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const domesticController = require('../controllers/domesticAdmissionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Specific routes first
router.get('/analytics/dashboard', domesticController.getLeadAnalytics);

// Then :id routes
router.get('/:id', domesticController.getAllLeads);
router.put('/:id/status', domesticController.updateLeadStatus);
router.post('/:id/colleges', domesticController.addCollege);
router.put('/:id/seat-allocation', domesticController.updateSeatAllocation);

// Generic routes last
router.post('/', domesticController.createLead);
router.get('/', domesticController.getAllLeads);

module.exports = router;
