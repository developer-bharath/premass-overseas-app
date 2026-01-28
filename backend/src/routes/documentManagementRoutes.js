// ====================================================================
// DOCUMENT MANAGEMENT ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const docController = require('../controllers/documentManagementController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.use(authMiddleware);

// Specific routes first
router.get('/check/expiring', docController.getExpiringDocuments);
router.get('/analytics/dashboard', docController.getDocumentAnalytics);

// Then :id routes
router.get('/:id', docController.getDocumentById);
router.put('/:id/verify', roleMiddleware(['counselor', 'service_manager', 'department_head', 'super_admin']), docController.verifyDocument);
router.post('/:id/access', docController.grantAccess);
router.delete('/:id', docController.deleteDocument);

// Generic routes last
router.post('/upload', upload.single('file'), docController.uploadDocument);
router.post('/', upload.single('file'), docController.uploadDocument);
router.get('/', docController.getAllDocuments);

module.exports = router;
