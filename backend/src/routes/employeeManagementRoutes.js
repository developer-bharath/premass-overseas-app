// ====================================================================
// EMPLOYEE MANAGEMENT ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// ===== EMPLOYEE ENDPOINTS =====

// Then :id routes
router.get('/:id', employeeController.getEmployeeById);
router.post('/:employeeId/attendance', employeeController.recordAttendance);
router.get(
  '/:employeeId/attendance/:month/:year',
  employeeController.getAttendanceReport
);
router.put(
  '/:employeeId/performance',
  roleMiddleware(['hr_manager', 'department_head', 'super_admin']),
  employeeController.updatePerformanceMetrics
);
router.post('/:employeeId/leave-request', employeeController.requestLeave);
router.put(
  '/:employeeId/leave-request/:leaveIndex',
  roleMiddleware(['hr_manager', 'department_head', 'super_admin']),
  employeeController.approveLeaveRequest
);
router.get('/:employeeId/dashboard', employeeController.getEmployeePerformanceDashboard);
router.get('/:employeeId/login-history', employeeController.getLoginHistory);

// Generic routes last
router.get(
  '/',
  roleMiddleware(['hr_manager', 'department_head', 'super_admin']),
  employeeController.getAllEmployees
);

module.exports = router;
