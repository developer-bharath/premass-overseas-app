// ====================================================================
// STUDENT SUPPORT & SETTLEMENT ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const supportController = require('../controllers/studentSupportSettlementController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Specific routes first
router.get('/analytics/dashboard', supportController.getSettlementAnalytics);

// Then :id routes
router.get('/:id', supportController.getSupportProfileById);
router.put('/:id/pre-departure-checklist', supportController.updatePreDepartureChecklist);
router.put('/:id/accommodation', supportController.arrangeAccommodation);
router.put('/:id/travel', supportController.arrangeTravel);
router.put('/:id/health-insurance', supportController.arrangeHealthInsurance);
router.put('/:id/arrival-support', supportController.updateArrivalSupport);

// Generic routes last
router.post('/', supportController.createSupportProfile);
router.get('/', supportController.getAllSupportProfiles);

module.exports = router;
