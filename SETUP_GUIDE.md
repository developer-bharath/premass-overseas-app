# 🚀 Quick Start Guide – Authentication System

## Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

---

## ⚙️ Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

#### Configure Environment
Edit `.env` file:
```
MONGO_URI=mongodb://localhost:27017/premass-overseas
JWT_SECRET=test_secret_key
PORT=4000
```

#### Start Backend
```bash
npm run dev
```
✅ Backend running on `http://localhost:4000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

#### Start Frontend
```bash
npm run dev
```
✅ Frontend running on `http://localhost:5173`

---

## 🧪 Testing the Full Auth Flow

### Step 1: Register Account
1. Go to `http://localhost:5173/register`
2. Fill the form:
   - Name: `John Doe`
   - Email: `john@test.com`
   - Password: `password123`
   - Confirm Password: `password123`
   - Role: `Student`
3. Click "Create Account"

### Step 2: Verify OTP
1. Check **backend console** for OTP code (6 digits)
   ```
   OTP: 123456
   ```
2. Go to `/verify-otp` (auto-redirected)
3. Enter OTP from console
4. Click "Verify Code"

### Step 3: Login
1. Go to `http://localhost:5173/login`
2. Enter:
   - Email: `john@test.com`
   - Password: `password123`
3. Click "Login"
4. ✅ Should redirect to `/dashboard/student`

### Step 4: Create Ticket (Student)
1. From student dashboard, click "Create New Ticket"
2. Fill:
   - Title: `Help with visa application`
   - Category: `Visa Assistance`
   - Description: `I need guidance on the visa process`
3. Click "Create Ticket"
4. ✅ Ticket created, view on dashboard

### Step 5: View Dashboard
1. Student Dashboard shows:
   - Welcome message
   - Stats (Total, Active, Resolved)
   - List of tickets
   - Expandable comments section

### Step 6: Logout
1. Click "Logout" button
2. ✅ Redirected to home page
3. Token removed from browser storage

---

## 📱 Create Employee Account (Testing)

### Register as Employee
1. Go to `/register`
2. Same process, but select **Employee** in role dropdown
3. Verify OTP, login
4. ✅ Redirects to `/dashboard/employee`

### Employee Dashboard
- Views assigned tickets
- Can reply to student queries
- Update ticket status

---

## 🧠 Behind the Scenes

### What Happens During Registration
1. Frontend validates form
2. POST `/api/auth/register` with credentials
3. Backend hashes password (bcryptjs)
4. User created in MongoDB
5. OTP generated & stored (10-min expiry)
6. **OTP logged in console** (check backend terminal)

### What Happens During OTP Verification
1. Frontend sends OTP code
2. Backend verifies against stored OTP
3. Checks expiration time
4. Updates `isEmailVerified = true` on User
5. Deletes OTP record

### What Happens During Login
1. Frontend sends email & password
2. Backend finds user by email
3. Compares password with bcrypt
4. Checks email is verified
5. Signs JWT token (expires in 1 day)
6. Frontend stores token in localStorage
7. AuthContext updates global state
8. Redirects based on role

### What Happens During Protected Route Access
1. ProtectedRoute checks localStorage token
2. AuthContext checks user state
3. If no token → redirect to `/login`
4. If wrong role → redirect to `/login`
5. If authenticated → render component

---

## 📊 Database Structure

### Users Collection
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@test.com",
  password: "$2a$10$...", // bcrypt hash
  role: "student",
  isEmailVerified: true,
  isActive: true,
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### Tickets Collection
```javascript
{
  _id: ObjectId,
  student: ObjectId, // User._id
  title: "Help with visa",
  description: "Need guidance...",
  status: "open",
  assignedTo: null, // Will be Employee ObjectId
  createdAt: ISODate,
  updatedAt: ISODate
}
```

### OTP Collection (after verification, gets deleted)
```javascript
{
  _id: ObjectId,
  email: "john@test.com",
  otp: "123456",
  expiresAt: ISODate // 10 minutes from creation
}
```

---

## 🔑 Key Concepts

### JWT Token Structure
```
Header.Payload.Signature

Payload contains:
{
  id: "user_mongodb_id",
  role: "student",
  iat: 1704875400,
  exp: 1704961800
}
```

### Authentication Flow
```
Request with Authorization header:
Authorization: Bearer eyJhbGc...

Backend extracts token → Verifies signature → Gets user id/role
```

### Role-Based Access
```
Student can access:
- /dashboard/student
- /student/create-ticket
- /profile

Employee can access:
- /dashboard/employee
- /profile

Public pages:
- /
- /services
- /countries
- /about
- /login
- /register
```

---

## 🐛 Troubleshooting

### Problem: "Invalid credentials" on login
- Check email is correct
- Ensure password was verified with OTP
- Try registering a new account

### Problem: Can't see OTP
- Check **backend terminal** (not frontend console)
- Look for "OTP: 123456" message
- OTP expires after 10 minutes

### Problem: "Email not verified" error
- Go back and verify OTP
- Don't skip OTP verification step

### Problem: Redirect to login keeps happening
- Clear localStorage: `localStorage.clear()`
- Refresh page
- Login again

### Problem: API connection refused
- Ensure backend is running: `npm run dev` in backend folder
- Check PORT in .env (should be 4000)
- Check frontend API_URL matches

---

## 📝 API Testing with Curl

### Register
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John",
    "email":"john@test.com",
    "password":"pass123",
    "role":"student"
  }'
```

### Verify OTP
```bash
curl -X POST http://localhost:4000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@test.com",
    "otp":"123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email":"john@test.com",
    "password":"pass123"
  }'
```

### Create Ticket (needs token)
```bash
curl -X POST http://localhost:4000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title":"Help needed",
    "description":"..."
  }'
```

---

## ✅ Verification Checklist

- [ ] Backend runs without errors
- [ ] Frontend loads on localhost:5173
- [ ] Can register account
- [ ] OTP appears in backend console
- [ ] OTP verification works
- [ ] Login redirects to dashboard
- [ ] Dashboard displays user info
- [ ] Can create ticket
- [ ] Logout works
- [ ] Protected routes block unauthorized access
- [ ] Employee dashboard shows different view

---

## 🎯 What's Next?

1. **Email Service**: Replace console.log OTP with SendGrid/Nodemailer
2. **Refresh Token**: Implement token refresh mechanism
3. **Password Reset**: Add forgot password flow
4. **OAuth**: Add Google/GitHub login
5. **Admin Panel**: Create admin dashboard
6. **Analytics**: Track user activity
7. **Notifications**: Email/SMS alerts for tickets
8. **File Uploads**: Attach documents to tickets

---

**Happy Testing! 🚀**
