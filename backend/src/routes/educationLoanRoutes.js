// ====================================================================
// EDUCATION LOAN ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const loanController = require('../controllers/educationLoanController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

router.use(authMiddleware);

// Specific routes first
router.get('/analytics/dashboard', loanController.getLoanAnalytics);

// Then :id routes
router.get('/:id', loanController.getApplicationById);
router.post('/:id/eligibility', loanController.calculateEligibility);
router.post('/:id/lenders', loanController.addLender);
router.put('/:id/disbursement', loanController.updateDisbursement);

// Generic routes last
router.post('/', loanController.createLoanApplication);
router.get('/', loanController.getAllApplications);

module.exports = router;
