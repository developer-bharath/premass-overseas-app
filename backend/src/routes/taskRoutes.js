// ====================================================================
// TASK MANAGEMENT ROUTES
// ====================================================================

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// All routes require authentication
router.use(authMiddleware);

// ===== TASK ENDPOINTS =====

// Specific routes first
router.get('/analytics/overdue', taskController.getOverdueTasks);
router.get('/analytics/dashboard', taskController.getTaskAnalytics);
router.get('/employee/:employeeId', taskController.getEmployeeTasks);

// Then :id routes
router.get('/:id', taskController.getTaskById);
router.put(
  '/:id/status',
  roleMiddleware(['employee', 'hr_manager', 'department_head', 'super_admin']),
  taskController.updateTaskStatus
);
router.post('/:id/comments', taskController.addTaskComment);
router.post('/:id/time-log', taskController.logTaskTime);
router.delete(
  '/:id',
  roleMiddleware(['hr_manager', 'department_head', 'super_admin']),
  taskController.deleteTask
);

// Generic routes last
router.post(
  '/',
  roleMiddleware(['employee', 'hr_manager', 'department_head', 'super_admin']),
  taskController.createTask
);
router.get('/', taskController.getAllTasks);

module.exports = router;
