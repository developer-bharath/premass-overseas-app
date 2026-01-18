// ============================================
// PREMASS Admin Dashboard - Backend API Server (In-Memory)
// ============================================

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

// ============================================
// In-Memory Data Storage
// ============================================

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: string;
  permissions: string[];
  password: string;
  isActive: boolean;
  joiningDate: Date;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  department: string;
  level: number;
  employeeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  employees: number;
  isActive: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

interface Assignment {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  permissions: string[];
  assignedDate: Date;
  assignedBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory databases
let employees: Employee[] = [
  {
    id: 'emp-1',
    name: 'Raj Kumar',
    email: 'raj@premass.com',
    phone: '+91-9876543210',
    department: 'Administration',
    designation: 'Admin',
    role: 'admin',
    permissions: ['view', 'edit', 'delete', 'create'],
    password: bcrypt.hashSync('password123', 10),
    isActive: true,
    joiningDate: new Date('2023-01-01'),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let roles: Role[] = [
  {
    id: 'role-1',
    name: 'Admin',
    description: 'Administrator with full access',
    permissions: ['view', 'edit', 'delete', 'create'],
    department: 'Administration',
    level: 5,
    employeeCount: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let permissions: Permission[] = [
  {
    id: 'perm-1',
    name: 'View Employees',
    description: 'Can view employee data',
    category: 'Employee Management',
    employees: 1,
    isActive: true,
    riskLevel: 'low',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

let assignments: Assignment[] = [];

// ============================================
// Auth Middleware
// ============================================

interface AuthRequest extends Request {
  headers: {
    authorization?: string;
    [key: string]: any;
  };
  body: any;
  params: any;
  user?: { id: string; email: string };
}

const authMiddleware = (req: AuthRequest, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string };
      req.user = decoded;
    } catch (_err) {
      // Token verification failed
    }
  }
  next();
};

// ============================================
// Response Helper
// ============================================

const sendResponse = (res: Response, status: number, data: any = null, message: string = '', error: string = '') => {
  return res.status(status).json({
    success: status < 400,
    data,
    message,
    error,
  });
};

// ============================================
// Authentication Routes
// ============================================

app.post('/api/v1/auth/login', async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const employee = employees.find((e) => e.email === email);
    if (!employee) {
      return sendResponse(res, 401, null, '', 'Invalid email or password');
    }

    const isPasswordValid = bcrypt.compareSync(password, employee.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, null, '', 'Invalid email or password');
    }

    const token = jwt.sign({ id: employee.id, email: employee.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    const refreshToken = jwt.sign({ id: employee.id, email: employee.email }, JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    employee.lastLogin = new Date();
    employee.updatedAt = new Date();

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

app.post('/api/v1/auth/register', async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, phone, department, designation, role } = req.body;

    if (employees.some((e) => e.email === email)) {
      return sendResponse(res, 400, null, '', 'Email already exists');
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
      role,
      permissions: [],
      isActive: true,
      joiningDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    employees.push(newEmployee);

    const token = jwt.sign({ id: newEmployee.id, email: newEmployee.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    const refreshToken = jwt.sign({ id: newEmployee.id, email: newEmployee.email }, JWT_REFRESH_SECRET, {
      expiresIn: '7d',
    });

    return sendResponse(res, 201, {
      token,
      refreshToken,
      user: {
        id: newEmployee.id,
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
      },
    });
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.post('/api/v1/auth/refresh', (req: AuthRequest, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return sendResponse(res, 401, null, '', 'Refresh token required');
    }

    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { id: string; email: string };
    const token = jwt.sign({ id: decoded.id, email: decoded.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    return sendResponse(res, 200, { token });
  } catch (_error) {
    return sendResponse(res, 401, null, '', 'Invalid refresh token');
  }
});

app.post('/api/v1/auth/logout', authMiddleware, (_req: AuthRequest, res: Response) => {
  return sendResponse(res, 200, null, 'Logged out successfully');
});

// ============================================
// Employee Routes
// ============================================

app.get('/api/v1/employees', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    return sendResponse(res, 200, employees);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.get('/api/v1/employees/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const employee = employees.find((e) => e.id === req.params.id);
    if (!employee) {
      return sendResponse(res, 404, null, '', 'Employee not found');
    }
    return sendResponse(res, 200, employee);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.post('/api/v1/employees', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, department, designation, role } = req.body;

    if (employees.some((e) => e.email === email)) {
      return sendResponse(res, 400, null, '', 'Email already exists');
    }

    const hashedPassword = bcrypt.hashSync('password123', 10);
    const newEmployee: Employee = {
      id: `emp-${Date.now()}`,
      name,
      email,
      password: hashedPassword,
      phone,
      department,
      designation,
      role,
      permissions: [],
      isActive: true,
      joiningDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    employees.push(newEmployee);
    return sendResponse(res, 201, newEmployee);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.put('/api/v1/employees/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const employee = employees.find((e) => e.id === req.params.id);
    if (!employee) {
      return sendResponse(res, 404, null, '', 'Employee not found');
    }

    Object.assign(employee, req.body);
    employee.updatedAt = new Date();

    return sendResponse(res, 200, employee);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.delete('/api/v1/employees/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const index = employees.findIndex((e) => e.id === req.params.id);
    if (index === -1) {
      return sendResponse(res, 404, null, '', 'Employee not found');
    }

    const deleted = employees.splice(index, 1);
    return sendResponse(res, 200, deleted[0]);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// ============================================
// Role Routes
// ============================================

app.get('/api/v1/roles', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    return sendResponse(res, 200, roles);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.get('/api/v1/roles/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const role = roles.find((r) => r.id === req.params.id);
    if (!role) {
      return sendResponse(res, 404, null, '', 'Role not found');
    }
    return sendResponse(res, 200, role);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.post('/api/v1/roles', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, permissions, department, level } = req.body;

    const newRole: Role = {
      id: `role-${Date.now()}`,
      name,
      description,
      permissions,
      department,
      level,
      employeeCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    roles.push(newRole);
    return sendResponse(res, 201, newRole);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.put('/api/v1/roles/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const role = roles.find((r) => r.id === req.params.id);
    if (!role) {
      return sendResponse(res, 404, null, '', 'Role not found');
    }

    Object.assign(role, req.body);
    role.updatedAt = new Date();

    return sendResponse(res, 200, role);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.delete('/api/v1/roles/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const index = roles.findIndex((r) => r.id === req.params.id);
    if (index === -1) {
      return sendResponse(res, 404, null, '', 'Role not found');
    }

    const deleted = roles.splice(index, 1);
    return sendResponse(res, 200, deleted[0]);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// ============================================
// Permission Routes
// ============================================

app.get('/api/v1/permissions', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    return sendResponse(res, 200, permissions);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.post('/api/v1/permissions', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { name, description, category, riskLevel } = req.body;

    const newPermission: Permission = {
      id: `perm-${Date.now()}`,
      name,
      description,
      category,
      riskLevel,
      employees: 0,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    permissions.push(newPermission);
    return sendResponse(res, 201, newPermission);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.put('/api/v1/permissions/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const permission = permissions.find((p) => p.id === req.params.id);
    if (!permission) {
      return sendResponse(res, 404, null, '', 'Permission not found');
    }

    Object.assign(permission, req.body);
    permission.updatedAt = new Date();

    return sendResponse(res, 200, permission);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.delete('/api/v1/permissions/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const index = permissions.findIndex((p) => p.id === req.params.id);
    if (index === -1) {
      return sendResponse(res, 404, null, '', 'Permission not found');
    }

    const deleted = permissions.splice(index, 1);
    return sendResponse(res, 200, deleted[0]);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// ============================================
// Assignment Routes
// ============================================

app.get('/api/v1/assignments', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    return sendResponse(res, 200, assignments);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.post('/api/v1/assignments', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { employeeId, employeeName, email, department, permissions: perms, assignedBy } = req.body;

    const newAssignment: Assignment = {
      id: `assign-${Date.now()}`,
      employeeId,
      employeeName,
      email,
      department,
      permissions: perms,
      assignedDate: new Date(),
      assignedBy,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    assignments.push(newAssignment);
    return sendResponse(res, 201, newAssignment);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.put('/api/v1/assignments/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const assignment = assignments.find((a) => a.id === req.params.id);
    if (!assignment) {
      return sendResponse(res, 404, null, '', 'Assignment not found');
    }

    Object.assign(assignment, req.body);
    assignment.updatedAt = new Date();

    return sendResponse(res, 200, assignment);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.delete('/api/v1/assignments/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const index = assignments.findIndex((a) => a.id === req.params.id);
    if (index === -1) {
      return sendResponse(res, 404, null, '', 'Assignment not found');
    }

    const deleted = assignments.splice(index, 1);
    return sendResponse(res, 200, deleted[0]);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

// ============================================
// Dashboard Options Routes
// ============================================

let dashboardOptions: any[] = [
  {
    id: 'opt-1',
    userId: 'emp-1',
    theme: 'light',
    layout: 'grid',
    refreshInterval: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

app.get('/api/v1/dashboard-options', authMiddleware, async (_req: AuthRequest, res: Response) => {
  try {
    return sendResponse(res, 200, dashboardOptions);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.post('/api/v1/dashboard-options', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const newOption = {
      id: `opt-${Date.now()}`,
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    dashboardOptions.push(newOption);
    return sendResponse(res, 201, newOption);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.put('/api/v1/dashboard-options/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const option = dashboardOptions.find((o) => o.id === req.params.id);
    if (!option) {
      return sendResponse(res, 404, null, '', 'Dashboard option not found');
    }

    Object.assign(option, req.body);
    option.updatedAt = new Date();

    return sendResponse(res, 200, option);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

app.delete('/api/v1/dashboard-options/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const index = dashboardOptions.findIndex((o) => o.id === req.params.id);
    if (index === -1) {
      return sendResponse(res, 404, null, '', 'Dashboard option not found');
    }

    const deleted = dashboardOptions.splice(index, 1);
    return sendResponse(res, 200, deleted[0]);
  } catch (error) {
    return sendResponse(res, 500, null, '', 'Server error');
  }
});

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
  console.log(`✅ Using in-memory database (no MongoDB required)`);
});

export default app;
