// ====================================================================
// TASK MANAGEMENT CONTROLLER
// ====================================================================

const TaskManagement = require('../models/TaskManagement');
const User = require('../models/User');

// ===== CREATE NEW TASK =====
exports.createTask = async (req, res) => {
  try {
    const {
      taskTitle,
      taskDescription,
      assignedTo,
      taskCategory,
      priority,
      dueDate,
      estimatedDuration,
      relatedService,
    } = req.body;

    // Create task
    const task = await TaskManagement.create({
      taskTitle,
      taskDescription,
      assignedBy: req.user.id,
      assignedTo,
      taskCategory,
      priority,
      dueDate,
      estimatedDuration,
      relatedService,
      status: 'assigned',
      assignedDate: new Date(),
    });

    // Add task to employee's assigned tasks
    await User.findByIdAndUpdate(assignedTo, {
      $push: {
        'employeeDetails.assignedTasks': {
          taskId: task._id,
          taskTitle,
          assignedDate: new Date(),
          dueDate,
          priority,
          status: 'assigned',
          assignedBy: req.user.id,
        },
      },
    });

    res.status(201).json({
      message: 'Task created successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating task',
      error: error.message,
    });
  }
};

// ===== GET ALL TASKS (With filters) =====
exports.getAllTasks = async (req, res) => {
  try {
    const { status, priority, assignedTo, assignedBy } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.assignedTo = assignedTo;
    if (assignedBy) filter.assignedBy = assignedBy;

    const tasks = await TaskManagement.find(filter)
      .populate('assignedBy', 'name email')
      .populate('assignedTo', 'name email employeeDetails.designation')
      .sort({ dueDate: 1 });

    res.json({
      message: 'Tasks retrieved successfully',
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving tasks',
      error: error.message,
    });
  }
};

// ===== GET TASK BY ID =====
exports.getTaskById = async (req, res) => {
  try {
    const task = await TaskManagement.findById(req.params.id)
      .populate('assignedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('statusHistory.changedBy', 'name');

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({
      message: 'Task retrieved successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving task',
      error: error.message,
    });
  }
};

// ===== UPDATE TASK STATUS =====
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { newStatus, notes } = req.body;

    const task = await TaskManagement.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Record status change
    task.statusHistory.push({
      previousStatus: task.status,
      newStatus,
      changedAt: new Date(),
      changedBy: req.user.id,
      reason: notes,
    });

    task.status = newStatus;

    // If task completed, add completion details
    if (newStatus === 'completed') {
      task.completedDate = new Date();
    }

    await task.save();

    // Update employee's task status
    await User.findByIdAndUpdate(
      task.assignedTo,
      {
        $set: {
          'employeeDetails.assignedTasks.$[elem].status': newStatus,
        },
      },
      {
        arrayFilters: [{ 'elem.taskId': id }],
      }
    );

    res.json({
      message: 'Task status updated successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating task status',
      error: error.message,
    });
  }
};

// ===== ADD TASK COMMENT =====
exports.addTaskComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const task = await TaskManagement.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            comment,
            createdBy: req.user.id,
            createdAt: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json({
      message: 'Comment added successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error adding comment',
      error: error.message,
    });
  }
};

// ===== LOG TASK TIME =====
exports.logTaskTime = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, hoursSpent, notes } = req.body;

    const task = await TaskManagement.findByIdAndUpdate(
      id,
      {
        $push: {
          'timeTracking.timeSpent': {
            date,
            hoursSpent,
            notes,
          },
        },
        $inc: { 'timeTracking.actualHours': hoursSpent },
      },
      { new: true }
    );

    res.json({
      message: 'Time logged successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error logging time',
      error: error.message,
    });
  }
};

// ===== DELETE TASK =====
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskManagement.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Remove from employee's tasks
    await User.findByIdAndUpdate(task.assignedTo, {
      $pull: {
        'employeeDetails.assignedTasks': { taskId: id },
      },
    });

    res.json({
      message: 'Task deleted successfully',
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting task',
      error: error.message,
    });
  }
};

// ===== GET TASKS BY EMPLOYEE =====
exports.getEmployeeTasks = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { status } = req.query;

    let filter = { assignedTo: employeeId };
    if (status) filter.status = status;

    const tasks = await TaskManagement.find(filter)
      .populate('assignedBy', 'name email')
      .sort({ dueDate: 1 });

    res.json({
      message: `Tasks for employee retrieved successfully`,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving employee tasks',
      error: error.message,
    });
  }
};

// ===== GET OVERDUE TASKS =====
exports.getOverdueTasks = async (req, res) => {
  try {
    const tasks = await TaskManagement.find({
      dueDate: { $lt: new Date() },
      status: { $ne: 'completed' },
    })
      .populate('assignedTo', 'name email')
      .sort({ dueDate: 1 });

    res.json({
      message: 'Overdue tasks retrieved successfully',
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving overdue tasks',
      error: error.message,
    });
  }
};

// ===== GET TASK ANALYTICS =====
exports.getTaskAnalytics = async (req, res) => {
  try {
    const totalTasks = await TaskManagement.countDocuments();
    const completedTasks = await TaskManagement.countDocuments({
      status: 'completed',
    });
    const inProgressTasks = await TaskManagement.countDocuments({
      status: 'in_progress',
    });
    const overdueTasks = await TaskManagement.countDocuments({
      status: { $ne: 'completed' },
      dueDate: { $lt: new Date() },
    });

    const avgCompletionTime = await TaskManagement.aggregate([
      { $match: { status: 'completed', completedDate: { $exists: true } } },
      {
        $group: {
          _id: null,
          avgTime: {
            $avg: {
              $subtract: ['$completedDate', '$assignedDate'],
            },
          },
        },
      },
    ]);

    res.json({
      message: 'Task analytics retrieved successfully',
      analytics: {
        totalTasks,
        completedTasks,
        completionRate: ((completedTasks / totalTasks) * 100).toFixed(2) + '%',
        inProgressTasks,
        overdueTasks,
        avgCompletionTimeMs:
          avgCompletionTime[0]?.avgTime || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving task analytics',
      error: error.message,
    });
  }
};
