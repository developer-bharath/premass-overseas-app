# Quick Start: Separate Login System

## What's New? 🎯

You now have a **role-based login system** where students and employees login through separate portals. This allows for:
- ✅ Different databases per role (when configured)
- ✅ Better user experience
- ✅ Separate authentication flows
- ✅ Role-specific features and dashboards

## Login URLs

| Role | Login Page | Dashboard |
|------|-----------|-----------|
| **Student** | `/login/student` | `/dashboard/student` |
| **Employee** | `/login/employee` | `/dashboard/employee` |
| **Admin** | `/login/employee` | `/admin` |

## Main Entry Point

When users visit **`/login`**, they see a selection page with two options:

```
┌─────────────────────────────────────────────┐
│          Choose Your Login Portal           │
├──────────────────┬──────────────────────────┤
│   Student Login  │    Employee Login        │
│   👨‍🎓             │    💼                   │
│                  │                          │
│ • Dashboard      │ • Support dashboard      │
│ • Applications   │ • Student management     │
│ • Tickets        │ • Ticket handling        │
│ • Profile        │ • Performance metrics    │
└──────────────────┴──────────────────────────┘
```

## Test Accounts Ready to Use

### 📚 Student Account
**URL**: `http://localhost:5173/login/student`

```
Email:    student@test.com
Password: password123
Redirect: /dashboard/student
```

### 💼 Employee Account
**URL**: `http://localhost:5173/login/employee`

```
Email:    employee@test.com
Password: password123
Redirect: /dashboard/employee
```

### 👨‍💼 Admin Account
**URL**: `http://localhost:5173/login/employee`

```
Email:    admin@test.com
Password: password123
Redirect: /admin
```

## How to Test

### Test 1: Student Login
1. Go to `/login/student`
2. You'll see pre-filled email: `student@test.com`
3. Password is pre-filled: `password123`
4. Click "Sign In as Student"
5. **Expected**: Redirected to `/dashboard/student`

### Test 2: Employee Login
1. Go to `/login/employee`
2. You'll see TWO credential options:
   - Employee: `employee@test.com / password123`
   - Admin: `admin@test.com / password123`
3. Choose which one to login with
4. Click "Sign In as Employee"
5. **Expected**: 
   - Employee → Redirected to `/dashboard/employee`
   - Admin → Redirected to `/admin`

### Test 3: Cross-Login Prevention
1. Go to `/login/student`
2. Try entering `employee@test.com` as email
3. Click "Sign In as Student"
4. **Expected**: Error message: "This account is not a student account. Please use the employee login."

## Login Page Features

### Student Login Page
✅ Displays student-only login form
✅ Pre-filled demo credentials (student@test.com)
✅ Shows demo credentials below form
✅ Link to switch to employee login
✅ Link to registration page
✅ Back button to login selection page
✅ Beautiful gradient design (#054374 + #cd9429)
✅ Password visibility toggle
✅ Error messages for failed logins

### Employee Login Page
✅ Displays employee/admin login form
✅ Shows BOTH employee and admin demo credentials
✅ Pre-filled with employee@test.com by default
✅ Link to switch to student login
✅ Link to registration page
✅ Back button to login selection page
✅ Beautiful gradient design
✅ Password visibility toggle
✅ Smart routing (admin → /admin, employee → /dashboard/employee)
✅ Error messages for failed logins

## Architecture

### Frontend Routes
```typescript
/login              → Login selection page (Student vs Employee choice)
/login/student      → Student-only login portal
/login/employee     → Employee & Admin login portal
/register           → Registration page (unchanged)
```

### Role Validation
```typescript
// StudentLogin.tsx
if (response.user?.role !== 'student') {
  error: "This account is not a student account"
}

// EmployeeLogin.tsx
if (response.user?.role !== 'employee' && response.user?.role !== 'super_admin') {
  error: "This account is not an employee account"
}
```

### Smart Routing
```typescript
// EmployeeLogin.tsx
if (response.user?.role === 'super_admin') {
  navigate('/admin')      // Admins go to admin panel
} else {
  navigate('/dashboard/employee')  // Employees go to employee dashboard
}
```

## Backend API (Unchanged)

The backend API remains the same. All logins use:

```
POST /api/auth/login
Body: { email: "...", password: "..." }
Response: { token: "...", user: { id, email, name, role } }
```

The **role** field in the response determines where users are redirected:
- `role: "student"` → StudentLogin page validates this
- `role: "employee"` → EmployeeLogin page validates this
- `role: "super_admin"` → EmployeeLogin page accepts this, redirects to /admin

## Branding

All login pages use official Premass colors:
- **Primary Blue**: `#054374` (backgrounds, text)
- **Gold Accent**: `#cd9429` (highlights, buttons, borders)
- **Gradient**: `linear-gradient(to right, #054374, #cd9429)`

## Files Modified

1. **Login.tsx** - Changed from login form to selection page
2. **StudentLogin.tsx** - Created/Enhanced with role validation
3. **EmployeeLogin.tsx** - Created/Enhanced with dual-role support
4. **App.tsx** - Routes added for `/login/student` and `/login/employee`

## Current Status ✅

- ✅ All components created and integrated
- ✅ Zero TypeScript compilation errors
- ✅ All API endpoints verified working
- ✅ All test accounts pre-verified
- ✅ Frontend ready to run
- ✅ Backend API ready
- ✅ Brand colors applied throughout

## Future: Database Separation

The current system uses a **single MongoDB database** with role-based field separation. To use truly separate databases:

### Option 1: Different MongoDB Instances
```javascript
// Backend configuration
const studentDB = mongoose.createConnection('mongodb://localhost/student_db');
const employeeDB = mongoose.createConnection('mongodb://localhost/employee_db');
```

### Option 2: Different API Endpoints
```typescript
// Frontend configuration in api.ts
const apiUrl = role === 'student' 
  ? 'http://localhost:4000/api/student'
  : 'http://localhost:4000/api/employee';
```

### Option 3: Different Collections (Current)
```javascript
// Same database, different collections
const collection = role === 'student' ? 'students' : 'employees';
```

To implement database separation, update the backend routes and database configuration. The frontend login system is already prepared to support this.

## Need Help?

### Student Login Not Working?
- Verify backend is running on `http://localhost:4000`
- Check that student@test.com account exists and is verified
- Look for console errors in browser DevTools (F12)
- Try the test credentials: `student@test.com / password123`

### Employee Login Not Working?
- Same checks as student login
- Remember employee login accepts BOTH employee and super_admin roles
- Check which redirect URL you're seeing in the address bar

### Still Have Issues?
Check the browser console (F12) for:
- Network errors (401, 403, 500, etc.)
- Authentication errors
- API connection issues
- Validation error messages

## Summary

You now have:
✅ Role-based login selection page at `/login`
✅ Dedicated student login at `/login/student`
✅ Dedicated employee/admin login at `/login/employee`
✅ Automatic role validation and redirection
✅ Cross-login prevention
✅ Pre-filled test credentials
✅ Professional branding throughout
✅ Foundation for future database separation

**Start testing**: Visit `http://localhost:5173/login` in your browser!
