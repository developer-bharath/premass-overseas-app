# 🚀 QUICK REFERENCE - Separate Login System

## ⚡ Instant Access

### Frontend URL
```
http://localhost:5177/login
```

### Backend API
```
http://localhost:4000/api
```

## 🔓 Test Credentials (Pick One)

### Option 1: Student Login
```
URL:      http://localhost:5177/login/student
Email:    student@test.com
Password: password123
Redirect: /dashboard/student
```

### Option 2: Employee Login
```
URL:      http://localhost:5177/login/employee
Email:    employee@test.com
Password: password123
Redirect: /dashboard/employee
```

### Option 3: Admin Login
```
URL:      http://localhost:5177/login/employee
Email:    admin@test.com
Password: password123
Redirect: /admin
```

## 📱 What to See

### Login Selection Page (`/login`)
```
┌─────────────────────────────────────┐
│  Premass Overseas                   │
│  Choose your login portal           │
│                                     │
│ [👨‍🎓 Student Login] [💼 Employee]   │
└─────────────────────────────────────┘
```

### Student Login Page (`/login/student`)
```
┌─────────────────────────────────────┐
│  Premass Overseas                   │
│  Student Login Portal               │
│                                     │
│  Email: student@test.com (prefilled)│
│  Password: ••••••••• (prefilled)    │
│  [Sign In as Student >]             │
│                                     │
│  [Switch to Employee Login]         │
└─────────────────────────────────────┘
```

### Employee Login Page (`/login/employee`)
```
┌─────────────────────────────────────┐
│  Premass Overseas                   │
│  Employee Login Portal              │
│                                     │
│  Email: employee@test.com (pref)    │
│  Password: ••••••••• (prefilled)    │
│  [Sign In as Employee >]            │
│                                     │
│  Demo Credentials:                  │
│  • Employee: employee@test.com      │
│  • Admin: admin@test.com            │
│                                     │
│  [Switch to Student Login]          │
└─────────────────────────────────────┘
```

## ✅ Expected Behavior

| Action | Expected Result |
|--------|-----------------|
| Click "Student Login" | Redirect to `/login/student` |
| Click "Employee Login" | Redirect to `/login/employee` |
| Login as student | Redirect to `/dashboard/student` |
| Login as employee | Redirect to `/dashboard/employee` |
| Login as admin | Redirect to `/admin` |
| Try student email on employee login | Error: "not a student account" |
| Try employee email on student login | Error: "not an employee account" |

## 🎨 Visual Elements

### Colors
```
Primary Blue:     #054374 (dark backgrounds)
Gold Accent:      #cd9429 (highlights, buttons)
Gradient:         #054374 → #cd9429
```

### Fonts
```
Headings:   Bold, Large
Labels:     Semibold, Medium
Input:      Regular, Medium
Buttons:    Bold, Gradient background
```

## 🔐 Security Features

✅ Passwords are masked by default
✅ Toggle button to show/hide password
✅ Email validation before submit
✅ Role validation on login
✅ JWT token authentication
✅ Automatic logout on token expiration
✅ CORS enabled for API requests

## 📋 Server Status

### Frontend
- Status: ✅ Running
- Port: 5177 (started on 5173, but ports busy)
- Type: Vite dev server
- Hot reload: Enabled
- Command: `npm run dev`

### Backend
- Status: ✅ Running
- Port: 4000
- Type: Express.js + MongoDB
- Command: `npm start` or `node src/server.js`

## 🐛 Troubleshooting

### "Port already in use"
```bash
# The system automatically tried ports 5173, 5174, 5175, 5176
# and started on 5177. This is normal.
# Visit http://localhost:5177/login
```

### "Login fails with HTTP 401"
```bash
# Check if backend is running on port 4000
# Verify credentials: student@test.com / password123
# Check browser console (F12) for error details
```

### "Page not loading"
```bash
# Check internet connection
# Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
# Try incognito mode
# Check frontend server is running
```

### "Wrong redirect after login"
```bash
# Check role in response (should be 'student', 'employee', or 'super_admin')
# Check browser console for error messages
# Try logging out and logging in again
```

## 🚀 Commands

### Start Frontend
```bash
cd frontend
npm run dev
```

### Start Backend
```bash
cd backend
npm start
```

### Build for Production
```bash
cd frontend
npm run build
# Output in 'dist' folder
```

### Run Tests
```bash
npm test
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `Login.tsx` | Selection page |
| `StudentLogin.tsx` | Student portal |
| `EmployeeLogin.tsx` | Employee/Admin portal |
| `App.tsx` | Routes configuration |
| `api.ts` | API client setup |

## 🎯 Test Checklist

- [ ] Visit `/login` - See selection page
- [ ] Click "Student Login" - Redirect to `/login/student`
- [ ] Click "Employee Login" - Redirect to `/login/employee`
- [ ] Login as student - Redirect to `/dashboard/student`
- [ ] Login as employee - Redirect to `/dashboard/employee`
- [ ] Login as admin - Redirect to `/admin`
- [ ] Try wrong credentials - See error message
- [ ] Try cross-role login - See error message
- [ ] Check branding colors - See #054374 + #cd9429
- [ ] Test on mobile - Responsive layout works

## 💾 Documentation

| File | Purpose |
|------|---------|
| `SEPARATE_LOGIN_COMPLETE.md` | Full implementation summary |
| `SEPARATE_LOGIN_IMPLEMENTATION.md` | Technical documentation |
| `SEPARATE_LOGIN_QUICK_START.md` | User guide |
| This file | Quick reference |

## 🎉 You're All Set!

Everything is ready:
- ✅ Frontend running on port 5177
- ✅ Backend running on port 4000
- ✅ Test accounts all verified
- ✅ API endpoints all working
- ✅ Zero build errors
- ✅ Brand colors applied
- ✅ Role validation working

**Next Step**: Open http://localhost:5177/login in your browser and test it out!

---

## Quick Terminal Commands

### Check Frontend Status
```bash
curl -I http://localhost:5177 2>/dev/null
```

### Check Backend Status
```bash
curl -I http://localhost:4000 2>/dev/null
```

### Test Student Login API
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"student@test.com","password":"password123"}'
```

### Test Employee Login API
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"employee@test.com","password":"password123"}'
```

### Test Admin Login API
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"password123"}'
```

---

## Notes

- Ports 5173, 5174, 5175, 5176 were already in use
- Frontend automatically started on port 5177
- Backend remains on port 4000
- All credentials are the same across development
- Demo credentials are pre-filled in login forms
- All test accounts are verified (no OTP needed)
- CORS is enabled for API requests
- Hot reload is active for frontend development

---

**Last Updated**: December 2024
**Status**: ✅ Complete & Ready to Test
**Next Action**: Visit http://localhost:5177/login
