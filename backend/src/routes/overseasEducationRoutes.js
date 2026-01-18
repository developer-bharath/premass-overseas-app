// ====================================================================
// OVERSEAS EDUCATION ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const overseasController = require('../controllers/overseasEducationController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// ===== OVERSEAS EDUCATION ENDPOINTS =====

// Get lead analytics (specific route first)
router.get('/analytics/dashboard', overseasController.getLeadAnalytics);

// Get leads by counselor
router.get('/counselor/:counselorId', overseasController.getLeadsByCounselor);

// Routes with :id and nested paths
router.get('/:id', overseasController.getLeadById);
router.put('/:id/status', overseasController.updateLeadStatus);
router.put(
  '/:id/assign-counselor',
  roleMiddleware(['service_manager', 'department_head', 'super_admin']),
  overseasController.assignCounselor
);
router.post('/:id/universities', overseasController.addUniversity);
router.put('/:id/applications/:applicationIndex', overseasController.updateApplicationStatus);
router.post('/:id/offer-letter', overseasController.uploadOfferLetter);
router.post('/:id/notes', overseasController.addNote);

// Generic routes last
router.post('/', overseasController.createLead);
router.get('/', overseasController.getAllLeads);

module.exports = router;
