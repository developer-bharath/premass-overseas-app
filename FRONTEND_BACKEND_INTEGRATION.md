# Frontend-Backend Integration Guide

## Overview

This guide walks you through integrating the PREMASS Admin Dashboard frontend with the backend API server.

---

## Phase 1: Backend Setup ✅

### 1.1 Install Dependencies

```bash
cd backend
npm install
```

### 1.2 Create Environment File

```bash
cp .env.example .env
```

Edit `.env` and update:
- `MONGODB_URI`: Your MongoDB connection string
- `JWT_SECRET`: Strong random string (minimum 32 characters)
- `JWT_REFRESH_SECRET`: Another strong random string

### 1.3 Start MongoDB

**Option A: Local MongoDB**
```bash
brew services start mongodb-community  # macOS
# or
sudo systemctl start mongodb            # Linux
```

**Option B: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

**Option C: MongoDB Atlas (Cloud)**
- Create free cluster at https://www.mongodb.com/cloud/atlas
- Get connection string and update MONGODB_URI in `.env`

### 1.4 Start Backend Server

```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on http://localhost:3001
📚 API Docs: http://localhost:3001/api/v1
```

---

## Phase 2: Frontend Integration

### 2.1 Update Environment Variables

In `frontend/.env` (create if doesn't exist):

```env
REACT_APP_API_BASE_URL=http://localhost:3001/api/v1
```

### 2.2 API Client Already Available ✅

The `frontend/src/services/apiClient.ts` file is already set up with:
- ✅ Axios configuration
- ✅ Request interceptors (adds auth tokens)
- ✅ Response interceptors (handles 401 errors)
- ✅ All CRUD methods for all resources
- ✅ JWT token management
- ✅ Error handling

**No changes needed to apiClient.ts** - it's production-ready!

### 2.3 Update Components to Use API

Replace mock data with API calls in each component:

#### Example: EmployeeManagement.tsx

**Before (Mock Data):**
```typescript
const [employees, setEmployees] = useState<Employee[]>([
  { id: 'emp001', name: 'Raj Kumar', ... },
  { id: 'emp002', name: 'Jane Smith', ... },
]);
```

**After (API Call):**
```typescript
import apiClient from '@/services/apiClient';

useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const response = await apiClient.getEmployees();
      setEmployees(response.data || []);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };
  fetchEmployees();
}, []);
```

---

## Phase 3: Authentication Integration

### 3.1 Update Login in AdminDashboard.tsx

**Current Mock Implementation:**
```typescript
const handleLogin = (email: string, password: string) => {
  const employee = MOCK_EMPLOYEES.find(e => e.email === email);
  if (employee && password === 'password123') {
    setLoggedInEmployee(employee);
    // ...
  }
};
```

**New API Implementation:**
```typescript
import apiClient from '@/services/apiClient';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.login({ email, password });
    apiClient.setToken(response.data.token);
    setLoggedInEmployee(response.data.user);
    // ...
  } catch (error) {
    console.error('Login failed:', error);
    // Show error message to user
  }
};
```

### 3.2 Update Registration

**New API Implementation:**
```typescript
const handleSignup = async (formData: any) => {
  try {
    const response = await apiClient.register(formData);
    apiClient.setToken(response.data.token);
    setLoggedInEmployee(response.data.user);
    // ...
  } catch (error) {
    console.error('Registration failed:', error);
  }
};
```

### 3.3 Update Logout

```typescript
const handleLogout = async () => {
  try {
    await apiClient.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setLoggedInEmployee(null);
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
```

---

## Phase 4: Component Data Integration

### Example: Integrating EmployeeManagement Component

**Step 1: Update useEffect in AdminDashboard.tsx**

```typescript
useEffect(() => {
  if (loggedInEmployee) {
    loadEmployees();
  }
}, [loggedInEmployee]);

const loadEmployees = async () => {
  try {
    const response = await apiClient.getEmployees();
    setEmployees(response.data || []);
  } catch (error) {
    console.error('Failed to load employees:', error);
  }
};
```

**Step 2: Update create employee handler**

```typescript
// In EmployeeManagement component
const handleAddEmployee = async (newEmployee: Omit<Employee, 'id'>) => {
  try {
    const response = await apiClient.createEmployee(newEmployee);
    const updatedEmployees = [...employees, response.data];
    setEmployees(updatedEmployees);
  } catch (error) {
    console.error('Failed to create employee:', error);
  }
};
```

**Step 3: Update delete employee handler**

```typescript
const handleDeleteEmployee = async (id: string) => {
  try {
    await apiClient.deleteEmployee(id);
    const updatedEmployees = employees.filter(e => e.id !== id);
    setEmployees(updatedEmployees);
  } catch (error) {
    console.error('Failed to delete employee:', error);
  }
};
```

---

## Phase 5: Integration Checklist

Complete these steps for each module:

### For Employee Management
- [ ] Import apiClient
- [ ] Replace getEmployees() mock with API call
- [ ] Replace createEmployee() with API call
- [ ] Replace updateEmployee() with API call
- [ ] Replace deleteEmployee() with API call
- [ ] Test CRUD operations

### For Role Management
- [ ] Import apiClient
- [ ] Replace getRoles() mock with API call
- [ ] Replace createRole() with API call
- [ ] Replace updateRole() with API call
- [ ] Replace deleteRole() with API call
- [ ] Test CRUD operations

### For Permissions Management
- [ ] Import apiClient
- [ ] Replace getPermissions() mock with API call
- [ ] Replace createPermission() with API call
- [ ] Replace updatePermission() with API call
- [ ] Replace deletePermission() with API call
- [ ] Test CRUD operations

### For Permission Assignments
- [ ] Import apiClient
- [ ] Replace getAssignments() mock with API call
- [ ] Replace createAssignment() with API call
- [ ] Replace updateAssignment() with API call
- [ ] Replace deleteAssignment() with API call
- [ ] Test CRUD operations

### For Dashboard Options
- [ ] Import apiClient
- [ ] Replace getDashboardOptions() mock with API call
- [ ] Replace createDashboardOption() with API call
- [ ] Replace updateDashboardOption() with API call
- [ ] Replace deleteDashboardOption() with API call
- [ ] Test CRUD operations

---

## Phase 6: Testing Integration

### 6.1 Manual Testing Steps

1. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Login**
   - Go to http://localhost:5173/admin-system
   - Use test credentials: `raj@premass.com` / `password123`
   - Verify token is saved in localStorage

4. **Test Employee CRUD**
   - Create new employee
   - View employee list
   - Update employee details
   - Delete employee
   - Verify changes in database

5. **Test Other Modules**
   - Repeat for roles, permissions, assignments, options

### 6.2 Using Postman for Testing

1. **Create Login Request**
   - URL: `POST http://localhost:3001/api/v1/auth/login`
   - Body:
   ```json
   {
     "email": "raj@premass.com",
     "password": "password123"
   }
   ```

2. **Copy Token from Response**

3. **Get Employees**
   - URL: `GET http://localhost:3001/api/v1/employees`
   - Headers: `Authorization: Bearer {YOUR_TOKEN}`

---

## Phase 7: Error Handling

### 7.1 Add Error Boundaries

```typescript
// In EmployeeManagement.tsx
const [error, setError] = useState<string | null>(null);

const loadEmployees = async () => {
  try {
    setError(null);
    const response = await apiClient.getEmployees();
    setEmployees(response.data || []);
  } catch (error: any) {
    const message = error.message || 'Failed to load employees';
    setError(message);
    console.error(message);
  }
};

// In JSX
{error && (
  <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded text-red-700">
    {error}
  </div>
)}
```

### 7.2 Add Loading States

```typescript
const [isLoading, setIsLoading] = useState(false);

const loadEmployees = async () => {
  try {
    setIsLoading(true);
    const response = await apiClient.getEmployees();
    setEmployees(response.data || []);
  } finally {
    setIsLoading(false);
  }
};

// In JSX
{isLoading && <div>Loading...</div>}
```

---

## Phase 8: Demo Data Setup

### 8.1 Create Initial Employees

Make POST request to create test data:

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Employee",
    "email": "test@premass.com",
    "phone": "9876543210",
    "password": "password123",
    "department": "Education Loans",
    "designation": "Counselor"
  }'
```

### 8.2 Create Initial Roles

```bash
curl -X POST http://localhost:3001/api/v1/roles \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {TOKEN}" \
  -d '{
    "name": "Manager",
    "description": "Manages employees and applications",
    "permissions": ["view_applications", "approve_applications"],
    "department": "Education Loans",
    "level": 3
  }'
```

---

## Phase 9: Deployment Preparation

### 9.1 Environment Configuration

**Production Backend (.env)**
```env
PORT=3001
NODE_ENV=production
MONGODB_URI=your-production-mongodb-uri
JWT_SECRET=your-strong-production-secret
JWT_REFRESH_SECRET=your-strong-refresh-secret
FRONTEND_URL=https://yourdomain.com
```

**Production Frontend (.env)**
```env
REACT_APP_API_BASE_URL=https://api.yourdomain.com/api/v1
```

### 9.2 Build for Production

```bash
# Backend
npm run build
npm start

# Frontend
npm run build
# Deploy dist folder to hosting service
```

---

## Troubleshooting Integration Issues

### Issue: 401 Unauthorized Error

**Cause:** Token not being sent or expired
**Solution:**
```typescript
// Check token in localStorage
console.log('Token:', localStorage.getItem('token'));

// Re-login if token is missing
// Update REACT_APP_API_BASE_URL in .env
```

### Issue: CORS Error

**Cause:** Frontend and backend URLs mismatch
**Solution:**
- Verify `FRONTEND_URL` in backend `.env`
- Verify `REACT_APP_API_BASE_URL` in frontend `.env`
- Ensure both are accessible

### Issue: MongoDB Connection Error

**Cause:** MongoDB not running or wrong URI
**Solution:**
```bash
# Check MongoDB status
brew services list | grep mongodb

# Start MongoDB if needed
brew services start mongodb-community

# Update MONGODB_URI in .env
```

### Issue: Port Already in Use

**Cause:** Another process using port 3001
**Solution:**
```bash
# Find process on port 3001
lsof -i :3001

# Kill process
kill -9 <PID>

# Or change PORT in .env
```

---

## Next Steps

1. ✅ Start backend server
2. ✅ Test API endpoints with Postman
3. ✅ Integrate components one by one
4. ✅ Test frontend ↔ backend communication
5. ✅ Add error handling and loading states
6. ✅ Deploy to production

---

## Support Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Documentation](https://jwt.io/)
- [Axios Documentation](https://axios-http.com/)
- [React Documentation](https://react.dev/)
