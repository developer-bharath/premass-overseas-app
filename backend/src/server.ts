// ============================================
// PREMASS Admin Dashboard - Backend API Server
// ============================================

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();

// ============================================
// Middleware
// ============================================

app.use(cors());
app.use(express.json());

// ============================================
// Environment Variables
// ============================================

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/premass-admin';
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

// ============================================
// Database Connection
// ============================================

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ============================================
// Database Schemas
// ============================================

// Employee Schema
const employeeSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    role: { type: String, required: true },
    permissions: [String],
    password: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    joiningDate: { type: Date, required: true },
    lastLogin: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'employees' }
);

// Role Schema
const roleSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    permissions: [String],
    department: { type: String, required: true },
    level: { type: Number, required: true },
    employeeCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'roles' }
);

// Permission Schema
const permissionSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    employees: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    riskLevel: { type: String, enum: ['low', 'medium', 'high'], required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'permissions' }
);

// Assignment Schema
const assignmentSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    employeeId: { type: String, required: true },
    employeeName: { type: String, required: true },
    email: { type: String, required: true },
    department: { type: String, required: true },
    permissions: [String],
    assignedDate: { type: Date, required: true },
    assignedBy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'assignments' }
);

// Dashboard Option Schema
const dashboardOptionSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    requiredPermissions: [String],
    assignedTo: [String],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'dashboardOptions' }
);

// ============================================
// Models
// ============================================

const Employee = mongoose.model('Employee', employeeSchema);
const Role = mongoose.model('Role', roleSchema);
const Permission = mongoose.model('Permission', permissionSchema);
const Assignment = mongoose.model('Assignment', assignmentSchema);
const DashboardOption = mongoose.model('DashboardOption', dashboardOptionSchema);

// ============================================
// JWT Middleware
// ============================================

interface AuthRequest extends Request {
  userId?: string;
  user?: any;
  headers: any;
  body: any;
  params: any;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      res.status(401).json({ success: false, error: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    req.userId = decoded.userId;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// ============================================
// API Response Helper
// ============================================

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

const sendResponse = <T>(
  res: Response,
  statusCode: number,
  data: T | null = null,
  message: string = '',
  error: string = ''
): void => {
  const response: ApiResponse<T> = {
    success: statusCode < 400,
  };

  if (data) response.data = data;
  if (message) response.message = message;
  if (error) response.error = error;

  res.status(statusCode).json(response);
};

// ============================================
// Authentication Endpoints
// ============================================

// Login
app.post('/api/v1/auth/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });

    if (!employee) {
      return sendResponse(res, 401, null, '', 'Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return sendResponse(res, 401, null, '', 'Invalid email or password');
    }

    const token = jwt.sign(
      {
        userId: employee.id,
        email: employee.email,
        name: employee.name,
        role: employee.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { userId: employee.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    // Update last login
    await Employee.updateOne({ _id: employee._id }, { lastLogin: new Date() });

    return sendResponse(res, 200, {
      token,
      refreshToken,
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Register
app.post('/api/v1/auth/register', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, password, department, designation } = req.body;

    // Check if employee exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return sendResponse(res, 400, null, '', 'Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create employee
    const employee = new Employee({
      id: `emp${Date.now()}`,
      name,
      email,
      phone,
      password: hashedPassword,
      department,
      designation,
      role: 'employee',
      permissions: ['view_applications', 'send_messages'],
      isActive: true,
      joiningDate: new Date(),
    });

    await employee.save();

    const token = jwt.sign(
      {
        userId: employee.id,
        email: employee.email,
        name: employee.name,
        role: employee.role,
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const refreshToken = jwt.sign(
      { userId: employee.id },
      JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return sendResponse(res, 201, {
      token,
      refreshToken,
      user: {
        id: employee.id,
        name: employee.name,
        email: employee.email,
        role: employee.role,
      },
    });
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Refresh Token
app.post('/api/v1/auth/refresh', (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendResponse(res, 401, null, '', 'No refresh token provided');
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;

    const token = jwt.sign(
      { userId: decoded.userId },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    return sendResponse(res, 200, { token });
  } catch (error) {
    return sendResponse(res, 401, null, '', 'Invalid refresh token');
  }
});

// Logout
app.post('/api/v1/auth/logout', authMiddleware, (_req: AuthRequest, res: Response) => {
  // In a real app, you might blacklist the token here
  return sendResponse(res, 200, null, 'Logged out successfully');
});

// ============================================
// Employee Endpoints
// ============================================

// Get all employees
app.get('/api/v1/employees', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const employees = await Employee.find({}, '-password');
    return sendResponse(res, 200, employees);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Get single employee
app.get('/api/v1/employees/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const employee = await Employee.findOne({ id: req.params.id }, '-password');

    if (!employee) {
      return sendResponse(res, 404, null, '', 'Employee not found');
    }

    return sendResponse(res, 200, employee);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Create employee
app.post('/api/v1/employees', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, department, designation, password, permissions } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return sendResponse(res, 400, null, '', 'Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password || 'defaultPassword123', 10);

    const employee = new Employee({
      id: `emp${Date.now()}`,
      name,
      email,
      phone,
      department,
      designation,
      role: 'employee',
      password: hashedPassword,
      permissions: permissions || [],
      isActive: true,
      joiningDate: new Date(),
    });

    await employee.save();

    const savedEmployee = employee.toObject() as any;
    delete savedEmployee.password;

    return sendResponse(res, 201, savedEmployee, 'Employee created successfully');
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Update employee
app.put(
  '/api/v1/employees/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, email, phone, department, designation, permissions, isActive } = req.body;

      const employee = await Employee.findOneAndUpdate(
        { id: req.params.id },
        {
          name,
          email,
          phone,
          department,
          designation,
          permissions,
          isActive,
          updatedAt: new Date(),
        },
        { new: true }
      ).select('-password');

      if (!employee) {
        return sendResponse(res, 404, null, '', 'Employee not found');
      }

      return sendResponse(res, 200, employee, 'Employee updated successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// Delete employee
app.delete(
  '/api/v1/employees/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const employee = await Employee.findOneAndDelete({ id: req.params.id });

      if (!employee) {
        return sendResponse(res, 404, null, '', 'Employee not found');
      }

      return sendResponse(res, 200, null, 'Employee deleted successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// ============================================
// Role Endpoints
// ============================================

// Get all roles
app.get('/api/v1/roles', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const roles = await Role.find();
    return sendResponse(res, 200, roles);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Get single role
app.get('/api/v1/roles/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const role = await Role.findOne({ id: req.params.id });

    if (!role) {
      return sendResponse(res, 404, null, '', 'Role not found');
    }

    return sendResponse(res, 200, role);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Create role
app.post('/api/v1/roles', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, permissions, department, level } = req.body;

    const role = new Role({
      id: `role${Date.now()}`,
      name,
      description,
      permissions,
      department,
      level,
      employeeCount: 0,
    });

    await role.save();

    return sendResponse(res, 201, role, 'Role created successfully');
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Update role
app.put('/api/v1/roles/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, permissions, department, level } = req.body;

    const role = await Role.findOneAndUpdate(
      { id: req.params.id },
      {
        name,
        description,
        permissions,
        department,
        level,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!role) {
      return sendResponse(res, 404, null, '', 'Role not found');
    }

    return sendResponse(res, 200, role, 'Role updated successfully');
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Delete role
app.delete('/api/v1/roles/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const role = await Role.findOneAndDelete({ id: req.params.id });

    if (!role) {
      return sendResponse(res, 404, null, '', 'Role not found');
    }

    return sendResponse(res, 200, null, 'Role deleted successfully');
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// ============================================
// Permission Endpoints
// ============================================

// Get all permissions
app.get('/api/v1/permissions', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const permissions = await Permission.find();
    return sendResponse(res, 200, permissions);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Create permission
app.post('/api/v1/permissions', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, category, riskLevel } = req.body;

    const permission = new Permission({
      id: `perm${Date.now()}`,
      name,
      description,
      category,
      riskLevel,
      employees: 0,
      isActive: true,
    });

    await permission.save();

    return sendResponse(res, 201, permission, 'Permission created successfully');
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Update permission
app.put(
  '/api/v1/permissions/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, description, category, riskLevel, isActive } = req.body;

      const permission = await Permission.findOneAndUpdate(
        { id: req.params.id },
        {
          name,
          description,
          category,
          riskLevel,
          isActive,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!permission) {
        return sendResponse(res, 404, null, '', 'Permission not found');
      }

      return sendResponse(res, 200, permission, 'Permission updated successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// Delete permission
app.delete(
  '/api/v1/permissions/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const permission = await Permission.findOneAndDelete({ id: req.params.id });

      if (!permission) {
        return sendResponse(res, 404, null, '', 'Permission not found');
      }

      return sendResponse(res, 200, null, 'Permission deleted successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// ============================================
// Permission Assignment Endpoints
// ============================================

// Get all assignments
app.get('/api/v1/assignments', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    const assignments = await Assignment.find();
    return sendResponse(res, 200, assignments);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Create assignment
app.post('/api/v1/assignments', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, employeeName, email, department, permissions } = req.body;

    const assignment = new Assignment({
      id: `assign${Date.now()}`,
      employeeId,
      employeeName,
      email,
      department,
      permissions,
      assignedDate: new Date(),
      assignedBy: req.user?.name || 'Admin',
    });

    await assignment.save();

    return sendResponse(res, 201, assignment, 'Assignment created successfully');
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// Update assignment
app.put(
  '/api/v1/assignments/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { permissions } = req.body;

      const assignment = await Assignment.findOneAndUpdate(
        { id: req.params.id },
        {
          permissions,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!assignment) {
        return sendResponse(res, 404, null, '', 'Assignment not found');
      }

      return sendResponse(res, 200, assignment, 'Assignment updated successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// Delete assignment
app.delete(
  '/api/v1/assignments/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const assignment = await Assignment.findOneAndDelete({ id: req.params.id });

      if (!assignment) {
        return sendResponse(res, 404, null, '', 'Assignment not found');
      }

      return sendResponse(res, 200, null, 'Assignment deleted successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// ============================================
// Dashboard Options Endpoints
// ============================================

// Get all dashboard options
app.get(
  '/api/v1/dashboard-options',
  authMiddleware,
  async (_req: AuthRequest, res: Response) => {
    try {
      const options = await DashboardOption.find();
      return sendResponse(res, 200, options);
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// Create dashboard option
app.post(
  '/api/v1/dashboard-options',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, description, category, requiredPermissions, assignedTo } = req.body;

      const option = new DashboardOption({
        id: `opt${Date.now()}`,
        title,
        description,
        category,
        requiredPermissions,
        assignedTo,
        isActive: true,
      });

      await option.save();

      return sendResponse(res, 201, option, 'Dashboard option created successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// Update dashboard option
app.put(
  '/api/v1/dashboard-options/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, description, category, requiredPermissions, assignedTo, isActive } = req.body;

      const option = await DashboardOption.findOneAndUpdate(
        { id: req.params.id },
        {
          title,
          description,
          category,
          requiredPermissions,
          assignedTo,
          isActive,
          updatedAt: new Date(),
        },
        { new: true }
      );

      if (!option) {
        return sendResponse(res, 404, null, '', 'Dashboard option not found');
      }

      return sendResponse(res, 200, option, 'Dashboard option updated successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// Delete dashboard option
app.delete(
  '/api/v1/dashboard-options/:id',
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const option = await DashboardOption.findOneAndDelete({ id: req.params.id });

      if (!option) {
        return sendResponse(res, 404, null, '', 'Dashboard option not found');
      }

      return sendResponse(res, 200, null, 'Dashboard option deleted successfully');
    } catch (error) {
      return sendResponse(res, 500, null, '', 'Server error');
    }
  }
);

// ============================================
// Health Check
// ============================================

app.get('/api/v1/health', (_req: Request, res: Response) => {
  return sendResponse(res, 200, { status: 'ok', timestamp: new Date() });
});

// ============================================
// Start Server
// ============================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/v1`);
});

app.get("/", (_req, res) => {
  res.send("Premass Overseas API is running.");
});

export default app;
