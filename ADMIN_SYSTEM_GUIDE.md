# Admin Dashboard & Employee Management System - Complete Setup Guide

## Overview

This comprehensive admin system provides complete employee and permission management for the PREMASS Overseas platform. The system includes:

- **Employee Management** - Add, edit, and manage team members
- **Role Management** - Create and assign job roles with permissions
- **Permissions Management** - Define and control system permissions
- **Permission Assignments** - Assign specific permissions to employees
- **Dashboard Options** - Configure admin dashboard features
- **Employee Login** - Employee authentication and profile management

---

## System Components

### 1. Employee Management (`EmployeeManagement.tsx`)

**Features:**
- Add new employees with complete information
- Edit employee details (name, email, phone, department, designation)
- Assign permissions to each employee
- Toggle employee active/inactive status
- Delete employees from system
- View assigned permissions count

**Key Data Fields:**
```typescript
interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  joiningDate: string;
}
```

**Usage:**
```jsx
import EmployeeManagement from '@/admin/EmployeeManagement';

<EmployeeManagement />
```

---

### 2. Role Management (`RoleManagement.tsx`)

**Features:**
- Create job roles (Counselor, Senior Counselor, Manager, Admin, etc.)
- Assign permissions to roles
- Set role levels (1-5 hierarchy)
- Assign roles to departments
- View employee count per role
- Edit and delete roles

**Key Data Fields:**
```typescript
interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  department: string;
  level: number;
  employeeCount: number;
}
```

**Predefined Roles:**
- Level 1: Counselor (Entry-level)
- Level 2: Senior Counselor
- Level 3: Manager
- Level 4: Director
- Level 5: Admin (Full access)

**Usage:**
```jsx
import RoleManagement from '@/admin/RoleManagement';

<RoleManagement />
```

---

### 3. Permissions Management (`PermissionsManagement.tsx`)

**Features:**
- Define system permissions
- Categorize permissions (Applications, Documents, Analytics, Admin, Communication)
- Set risk levels (Low, Medium, High)
- Track permission assignments
- Enable/disable permissions
- View assignment statistics

**Available Permission Categories:**
- **Applications**: view, create, edit, delete, approve, reject
- **Documents**: upload, download, manage
- **Analytics**: view reports, view analytics
- **Administration**: manage employees, manage settings
- **Communication**: send messages

**Risk Levels:**
- **Low**: Basic read access (view_applications, send_messages)
- **Medium**: Modification rights (edit, create)
- **High**: Administrative control (manage_employees, approve_applications)

**Usage:**
```jsx
import PermissionsManagement from '@/admin/PermissionsManagement';

<PermissionsManagement />
```

---

### 4. Permission Assignments (`PermissionAssignments.tsx`)

**Features:**
- Assign permissions to individual employees
- Filter by department and search
- Bulk assignment management
- Export/import assignments
- View assignment history
- Quick permission toggling

**Key Data Fields:**
```typescript
interface Assignment {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  permissions: string[];
  assignedDate: string;
  assignedBy: string;
}
```

**Usage:**
```jsx
import PermissionAssignments from '@/admin/PermissionAssignments';

<PermissionAssignments />
```

---

### 5. Admin Dashboard Options (`AdminDashboardOptions.tsx`)

**Features:**
- Configure dashboard features for employees
- Categorize options (Applications, Documents, Analytics, Admin, Communication, Settings)
- Set required permissions for each option
- Toggle option availability
- Track option assignments

**Key Data Fields:**
```typescript
interface AdminOption {
  id: string;
  title: string;
  description: string;
  category: string;
  isActive: boolean;
  requiredPermissions: string[];
  assignedTo: string[];
}
```

**Usage:**
```jsx
import AdminDashboardOptions from '@/admin/AdminDashboardOptions';

<AdminDashboardOptions />
```

---

### 6. Employee Login Page (`EmployeeLoginPage.tsx`)

**Features:**
- Employee login/signup functionality
- Password security (show/hide toggle)
- Employee profile display
- View assigned permissions
- Check permission access
- Logout functionality
- Remember me option

**Mock Demo Credentials:**
```
Email: raj@premass.com
Password: password123
```

**Usage:**
```jsx
import EmployeeLoginPage from '@/admin/EmployeeLoginPage';

<EmployeeLoginPage />
```

---

## Available Permissions

### Core Permissions (12 Total)

1. **view_applications** - View student applications
2. **create_applications** - Create new applications
3. **edit_applications** - Edit existing applications
4. **delete_applications** - Delete applications
5. **approve_applications** - Approve/reject applications
6. **reject_applications** - Reject applications
7. **send_messages** - Send messages to students
8. **view_reports** - Access reports dashboard
9. **manage_documents** - Manage document uploads
10. **manage_employees** - Add/edit/remove employees
11. **manage_settings** - Configure system settings
12. **view_analytics** - View analytics dashboard

---

## Department Structure

### Supported Departments:
1. **🌍 Overseas Education**
2. **🎓 Domestic Admission**
3. **💰 Education Loan**
4. **📚 Visa & Immigration**
5. **📄 Document Management**
6. **💼 Career Support**
7. **💻 IT Training**
8. **🤝 Student Support & Settlement**

---

## Employee Designations

- Counselor
- Senior Counselor
- Service Officer
- Manager
- Senior Manager
- Department Head

---

## Integration Steps

### Step 1: Import Components into Your Admin Routes

```jsx
// admin/AdminRoutes.tsx or similar
import EmployeeManagement from '@/admin/EmployeeManagement';
import RoleManagement from '@/admin/RoleManagement';
import PermissionsManagement from '@/admin/PermissionsManagement';
import PermissionAssignments from '@/admin/PermissionAssignments';
import AdminDashboardOptions from '@/admin/AdminDashboardOptions';
import EmployeeLoginPage from '@/admin/EmployeeLoginPage';
```

### Step 2: Add Routes in Your Router

```jsx
<Route path="/admin/employees" element={<EmployeeManagement />} />
<Route path="/admin/roles" element={<RoleManagement />} />
<Route path="/admin/permissions" element={<PermissionsManagement />} />
<Route path="/admin/assignments" element={<PermissionAssignments />} />
<Route path="/admin/options" element={<AdminDashboardOptions />} />
<Route path="/employee/login" element={<EmployeeLoginPage />} />
```

### Step 3: Create Navigation Menu

```jsx
const adminMenuItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Employees', path: '/admin/employees', icon: Users },
  { label: 'Roles', path: '/admin/roles', icon: Shield },
  { label: 'Permissions', path: '/admin/permissions', icon: Lock },
  { label: 'Assignments', path: '/admin/assignments', icon: UserCheck },
  { label: 'Dashboard Options', path: '/admin/options', icon: Settings },
];
```

---

## Workflow Example

### Creating a New Employee with Permissions

1. **Navigate to Employee Management**
   - Click "Add Employee"
   - Fill in: Name, Email, Phone, Department, Designation

2. **Assign Permissions**
   - In the form, select permissions
   - Example for "Senior Counselor":
     - view_applications ✓
     - create_applications ✓
     - edit_applications ✓
     - send_messages ✓

3. **Save and Activate**
   - Click "Create Employee"
   - Employee is automatically set to "Active"

4. **Employee Can Now Login**
   - Use email and password to access system
   - Sees only permitted features on dashboard

---

## Security Features

### Access Control
- Role-based permission assignment
- Multi-level authorization (3 levels)
- Permission validation on every action

### Data Protection
- Department isolation
- Employee-specific data access
- Admin-only operations

### Audit Trail
- Assignment tracking (assignedDate, assignedBy)
- Activity logging
- Change history available

---

## Best Practices

### 1. Permission Assignment
- ✅ Assign minimum required permissions
- ✅ Use role templates for consistency
- ✅ Review permissions quarterly
- ❌ Avoid assigning all permissions

### 2. Role Management
- ✅ Create role templates by department
- ✅ Use clear role names and descriptions
- ✅ Document role purposes
- ❌ Don't overlap role responsibilities

### 3. Employee Management
- ✅ Verify email addresses are unique
- ✅ Set inactive status instead of deleting
- ✅ Document department assignments
- ❌ Don't share login credentials

### 4. Security
- ✅ Enable 2FA for admin accounts
- ✅ Review high-risk permission assignments
- ✅ Monitor login attempts
- ✅ Regular security audits

---

## Customization Guide

### Adding New Permission

1. **Update the permission list** in each component:
```typescript
const allPermissions = [
  // ... existing permissions
  { id: 'new_permission', label: 'New Permission' },
];
```

2. **Add to backend validation** (if integrated)

3. **Update documentation**

### Adding New Department

1. **Update department list**:
```typescript
const departments = [
  // ... existing departments
  { value: 'new_dept', label: '🔧 New Department' },
];
```

2. **Add in all relevant components**

3. **Create department-specific roles**

### Custom Risk Levels

To add custom risk colors:
```typescript
const getRiskColor = (level: string) => {
  const colors: Record<string, string> = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
    critical: '#7c3aed', // New level
  };
  return colors[level] || '#6b7280';
};
```

---

## Troubleshooting

### Common Issues

**Issue: Permission not showing in dropdown**
- Solution: Ensure permission is added to `allPermissions` array

**Issue: Employee changes not saving**
- Solution: Check browser console for errors, verify form data

**Issue: Filter not working**
- Solution: Clear search term, check department spelling

**Issue: Login page not redirecting**
- Solution: Verify employee exists in mock data, check password

---

## Backend Integration Notes

When integrating with backend:

1. **Replace mock data** with API calls:
```jsx
const [employees, setEmployees] = useState([]);

useEffect(() => {
  fetchEmployees().then(setEmployees);
}, []);
```

2. **Add API endpoints needed:**
   - POST `/api/employees` - Create
   - GET `/api/employees` - List
   - PUT `/api/employees/:id` - Update
   - DELETE `/api/employees/:id` - Delete
   - GET `/api/permissions` - List permissions
   - POST `/api/permissions/:id/assign` - Assign

3. **Add authentication checks:**
```jsx
useEffect(() => {
  if (!isAdmin) {
    navigate('/unauthorized');
  }
}, [isAdmin]);
```

4. **Implement proper error handling:**
```jsx
const handleSave = async () => {
  try {
    await saveEmployee(data);
    showSuccess('Employee saved');
  } catch (error) {
    showError(error.message);
  }
};
```

---

## Summary

This admin system provides:
- ✅ Complete employee lifecycle management
- ✅ Flexible role-based access control
- ✅ Fine-grained permission management
- ✅ Employee authentication system
- ✅ Audit and tracking capabilities
- ✅ Professional UI with PREMASS branding

The modular design allows easy integration with your backend and customization for specific needs.

**For questions or customization requests, refer to individual component documentation.**
