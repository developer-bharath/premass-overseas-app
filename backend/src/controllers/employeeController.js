// ====================================================================
// EMPLOYEE & USER MANAGEMENT CONTROLLER
// ====================================================================

const User = require('../models/User');
const TaskManagement = require('../models/TaskManagement');
const bcrypt = require('bcryptjs');

// ===== GET ALL EMPLOYEES =====
exports.getAllEmployees = async (req, res) => {
  try {
    const { department, role } = req.query;

    let filter = { role: { $ne: 'student' } };
    if (department) filter['employeeDetails.department'] = department;
    if (role) filter.role = role;

    const employees = await User.find(filter)
      .select('-password')
      .populate('employeeDetails.reportingManager', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      message: 'Employees retrieved successfully',
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving employees',
      error: error.message,
    });
  }
};

// ===== GET EMPLOYEE BY ID =====
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await User.findById(req.params.id)
      .select('-password')
      .populate('employeeDetails.reportingManager', 'name email');

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      message: 'Employee retrieved successfully',
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving employee',
      error: error.message,
    });
  }
};

// ===== RECORD ATTENDANCE (CHECK IN/OUT) =====
exports.recordAttendance = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { action, ipAddress } = req.body; // action: 'check_in' or 'check_out'

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const todayAttendance = employee.employeeDetails.attendance.find((att) => {
      const attDate = new Date(att.date);
      attDate.setHours(0, 0, 0, 0);
      return attDate.getTime() === today.getTime();
    });

    if (action === 'check_in') {
      if (todayAttendance) {
        return res
          .status(400)
          .json({ message: 'Already checked in today' });
      }

      employee.employeeDetails.attendance.push({
        date: new Date(),
        checkInTime: new Date().toLocaleTimeString('en-US', {
          hour12: false,
        }),
        status: 'present',
      });

      // Record login
      employee.employeeDetails.loginHistory.push({
        loginTime: new Date(),
        ipAddress,
      });
    } else if (action === 'check_out') {
      if (!todayAttendance) {
        return res.status(400).json({ message: 'Must check in first' });
      }

      todayAttendance.checkOutTime = new Date().toLocaleTimeString('en-US', {
        hour12: false,
      });

      // Calculate work hours
      const [inHour, inMin] = todayAttendance.checkInTime.split(':');
      const [outHour, outMin] = todayAttendance.checkOutTime.split(':');
      const hours =
        parseInt(outHour) - parseInt(inHour) +
        (parseInt(outMin) - parseInt(inMin)) / 60;
      todayAttendance.workHours = parseFloat(hours.toFixed(2));

      // Record logout
      const lastLogin =
        employee.employeeDetails.loginHistory[
          employee.employeeDetails.loginHistory.length - 1
        ];
      if (lastLogin && !lastLogin.logoutTime) {
        lastLogin.logoutTime = new Date();
        lastLogin.sessionDuration = Math.round(
          (lastLogin.logoutTime - lastLogin.loginTime) / (1000 * 60)
        );
      }
    }

    await employee.save();

    res.json({
      message: `Attendance ${action} recorded successfully`,
      employee: {
        name: employee.name,
        attendanceDate: todayAttendance?.date || new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error recording attendance',
      error: error.message,
    });
  }
};

// ===== GET ATTENDANCE REPORT =====
exports.getAttendanceReport = async (req, res) => {
  try {
    const { employeeId, month, year } = req.params;

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Filter attendance by month/year
    const attendance = employee.employeeDetails.attendance.filter((att) => {
      const attDate = new Date(att.date);
      return (
        attDate.getMonth() === parseInt(month) - 1 &&
        attDate.getFullYear() === parseInt(year)
      );
    });

    const totalDays = attendance.length;
    const presentDays = attendance.filter(
      (att) => att.status === 'present'
    ).length;
    const totalHours = attendance.reduce((sum, att) => sum + att.workHours, 0);

    res.json({
      message: 'Attendance report retrieved successfully',
      report: {
        employee: employee.name,
        month,
        year,
        totalDays,
        presentDays,
        absentDays: totalDays - presentDays,
        attendancePercentage: ((presentDays / totalDays) * 100).toFixed(2),
        totalHours: totalHours.toFixed(2),
        attendanceDetails: attendance,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving attendance report',
      error: error.message,
    });
  }
};

// ===== UPDATE PERFORMANCE METRICS =====
exports.updatePerformanceMetrics = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const {
      tasksCompleted,
      averageResponseTime,
      customerSatisfactionScore,
      performanceRating,
    } = req.body;

    const employee = await User.findByIdAndUpdate(
      employeeId,
      {
        'employeeDetails.performance': {
          tasksCompleted,
          averageResponseTime,
          customerSatisfactionScore,
          performanceRating,
          lastReviewDate: new Date(),
          nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
        },
      },
      { new: true }
    );

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({
      message: 'Performance metrics updated successfully',
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error updating performance metrics',
      error: error.message,
    });
  }
};

// ===== REQUEST LEAVE =====
exports.requestLeave = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { leaveType, fromDate, toDate, reason } = req.body;

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Calculate leave days
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const leaveDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

    if (leaveDays > employee.employeeDetails.leaveDetails.pendingLeaves) {
      return res
        .status(400)
        .json({ message: 'Insufficient leave balance' });
    }

    employee.employeeDetails.leaveDetails.leaveRequests.push({
      leaveType,
      fromDate: new Date(fromDate),
      toDate: new Date(toDate),
      reason,
      status: 'pending',
    });

    await employee.save();

    res.json({
      message: 'Leave request submitted successfully',
      leaveRequest: {
        employee: employee.name,
        leaveType,
        daysRequested: leaveDays,
        status: 'pending',
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error requesting leave',
      error: error.message,
    });
  }
};

// ===== APPROVE/REJECT LEAVE =====
exports.approveLeaveRequest = async (req, res) => {
  try {
    const { employeeId, leaveIndex } = req.params;
    const { approvalStatus } = req.body; // 'approved' or 'rejected'

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const leaveRequest =
      employee.employeeDetails.leaveDetails.leaveRequests[leaveIndex];
    if (!leaveRequest) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    leaveRequest.status = approvalStatus;
    leaveRequest.approvedBy = req.user.id;
    leaveRequest.approvedDate = new Date();

    if (approvalStatus === 'approved') {
      const from = new Date(leaveRequest.fromDate);
      const to = new Date(leaveRequest.toDate);
      const leaveDays = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

      employee.employeeDetails.leaveDetails.usedLeaves += leaveDays;
      employee.employeeDetails.leaveDetails.pendingLeaves -= leaveDays;
    }

    await employee.save();

    res.json({
      message: `Leave request ${approvalStatus} successfully`,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error approving leave request',
      error: error.message,
    });
  }
};

// ===== GET EMPLOYEE PERFORMANCE DASHBOARD =====
exports.getEmployeePerformanceDashboard = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const assignedTasks = employee.employeeDetails.assignedTasks;
    const completedTasks = assignedTasks.filter(
      (t) => t.status === 'completed'
    ).length;
    const overdueTasks = assignedTasks.filter((t) => {
      const isOverdue =
        new Date(t.dueDate) < new Date() && t.status !== 'completed';
      return isOverdue;
    }).length;

    res.json({
      message: 'Employee performance dashboard retrieved successfully',
      dashboard: {
        employee: {
          name: employee.name,
          email: employee.email,
          department: employee.employeeDetails.department,
          designation: employee.employeeDetails.designation,
        },
        performance: employee.employeeDetails.performance,
        taskMetrics: {
          totalAssignedTasks: assignedTasks.length,
          completedTasks,
          inProgressTasks: assignedTasks.filter(
            (t) => t.status === 'in_progress'
          ).length,
          overdueTasks,
        },
        attendance: {
          presentDays: employee.employeeDetails.attendance.filter(
            (a) => a.status === 'present'
          ).length,
          absentDays: employee.employeeDetails.attendance.filter(
            (a) => a.status === 'absent'
          ).length,
          totalDays: employee.employeeDetails.attendance.length,
        },
        leaveBalance: {
          totalLeaves: employee.employeeDetails.leaveDetails.totalLeaves,
          usedLeaves: employee.employeeDetails.leaveDetails.usedLeaves,
          pendingLeaves: employee.employeeDetails.leaveDetails.pendingLeaves,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving employee dashboard',
      error: error.message,
    });
  }
};

// ===== GET LOGIN HISTORY =====
exports.getLoginHistory = async (req, res) => {
  try {
    const { employeeId } = req.params;
    const { days = 30 } = req.query;

    const employee = await User.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    const recentLogins = employee.employeeDetails.loginHistory.filter(
      (login) => new Date(login.loginTime) > cutoffDate
    );

    res.json({
      message: 'Login history retrieved successfully',
      loginHistory: {
        employee: employee.name,
        period: `Last ${days} days`,
        totalLogins: recentLogins.length,
        logins: recentLogins.sort((a, b) => b.loginTime - a.loginTime),
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving login history',
      error: error.message,
    });
  }
};
