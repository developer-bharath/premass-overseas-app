# ✅ SETUP VERIFICATION & TESTING GUIDE

## 🎯 Current Status

- ✅ **Register Button**: Already connected to `/register` in Navbar
- ✅ **MongoDB**: Installed locally
- ✅ **Postman**: Installed as extension
- ✅ **Authentication**: Complete

---

## 🚀 Getting Started (Next Steps)

### 1. Start MongoDB

**On macOS** (if using Homebrew):
```bash
# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongo --version
```

**Or manually**:
```bash
mongod
# Should show: "Waiting for connections on port 27017"
```

### 2. Create Database & Collections

MongoDB will auto-create when backend connects. The backend uses:
- **Database**: `premassDB` (from .env MONGO_URI)
- **Collections**: 
  - `users`
  - `otps`
  - `tickets`
  - `ticketcomments`

### 3. Start Backend

```bash
cd backend
npm run dev
```

**Expected Output**:
```
Server running on port 4000
MongoDB Connected
```

### 4. Start Frontend

```bash
cd frontend
npm run dev
```

**Expected Output**:
```
VITE v4.x ready in xxx ms
Local: http://localhost:5173
```

### 5. Test Register Button

1. Go to `http://localhost:5173`
2. Click **"Register"** button in navbar
3. Should navigate to `/register` page
4. Fill form & submit

---

## 📊 Postman Testing Guide

### Setup Postman (Browser Extension)

1. Open Postman extension
2. Create new workspace (e.g., "Premass Overseas")
3. Create collection called "Auth API"

### Test Endpoints

#### 1️⃣ Register User
```
POST http://localhost:4000/api/auth/register

Headers:
Content-Type: application/json

Body (JSON):
{
  "name": "John Doe",
  "email": "john@test.com",
  "password": "password123",
  "role": "student"
}

Expected Response (201):
{
  "message": "Registered successfully. Verify email with OTP."
}
```

**What happens**:
- User created in MongoDB
- OTP generated & stored
- OTP logged in backend console

#### 2️⃣ Get OTP from Backend Console

Look in your backend terminal output:
```
OTP: 123456
```

#### 3️⃣ Verify OTP
```
POST http://localhost:4000/api/auth/verify-otp

Headers:
Content-Type: application/json

Body (JSON):
{
  "email": "john@test.com",
  "otp": "123456"
}

Expected Response (200):
{
  "message": "Email verified successfully"
}
```

**What happens**:
- Email marked as verified
- OTP record deleted

#### 4️⃣ Login User
```
POST http://localhost:4000/api/auth/login

Headers:
Content-Type: application/json

Body (JSON):
{
  "email": "john@test.com",
  "password": "password123"
}

Expected Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**What happens**:
- JWT token generated
- Token valid for 1 day

#### 5️⃣ Get Student Tickets (Protected)
```
GET http://localhost:4000/api/student/tickets

Headers:
Authorization: Bearer <YOUR_TOKEN_HERE>
Content-Type: application/json

Replace <YOUR_TOKEN_HERE> with token from login response

Expected Response (200):
[]
(Empty array = no tickets yet)
```

#### 6️⃣ Create Ticket (Protected)
```
POST http://localhost:4000/api/tickets

Headers:
Authorization: Bearer <YOUR_TOKEN_HERE>
Content-Type: application/json

Body (JSON):
{
  "title": "Help with visa application",
  "description": "I need guidance on the visa process"
}

Expected Response (201):
{
  "_id": "...",
  "student": "...",
  "title": "Help with visa application",
  "description": "I need guidance on the visa process",
  "status": "open",
  ...
}
```

---

## 🗄️ MongoDB Verification

### Check MongoDB is Running

```bash
# Open MongoDB shell
mongosh

# Or older version
mongo

# You should see: MongoDB Enterprise Server
```

### Verify Database Structure

```bash
# In MongoDB shell
use premassDB

# View collections
show collections

# Check users
db.users.find()

# Check tickets
db.tickets.find()
```

### Example Database Queries

```bash
# Count users
db.users.countDocuments()

# Find user by email
db.users.findOne({ email: "john@test.com" })

# Find all tickets
db.tickets.find().pretty()
```

---

## 📋 Navbar Links Verification

| Link | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ Working |
| About | `/about` | ✅ Working |
| Services | `/services` | ✅ Working |
| Countries | `/countries` | ✅ Working |
| Contact | `/contact` | ✅ Working |
| **Register** | **/register** | ✅ **Connected** |
| Free Consultation | `/contact` | ✅ Working |
| Social Icons | - | ✅ Working |

---

## 🧪 Complete Test Flow (30 minutes)

### Step 1: Register (Frontend)
1. Navigate to `http://localhost:5173`
2. Click navbar **"Register"** button
3. Fill form:
   - Name: `Jane Doe`
   - Email: `jane@test.com`
   - Password: `password123`
   - Confirm: `password123`
   - Role: `Student`
4. Click "Create Account"
5. **Expected**: Redirect to `/verify-otp`

### Step 2: Verify OTP (Frontend)
1. Check backend terminal for OTP
2. Enter OTP code
3. Click "Verify Code"
4. **Expected**: Redirect to `/login`

### Step 3: Login (Frontend)
1. Enter email: `jane@test.com`
2. Enter password: `password123`
3. Click "Login"
4. **Expected**: Redirect to `/dashboard/student`

### Step 4: Create Ticket (Frontend)
1. Click "Create New Ticket"
2. Fill:
   - Title: `Request visa guidance`
   - Category: `Visa Assistance`
   - Description: `Need help with visa process`
3. Click "Create Ticket"
4. **Expected**: Ticket created, back to dashboard

### Step 5: Test with Postman (API)
1. Open Postman
2. Test same flow via API
3. Verify responses match
4. Check MongoDB for data

---

## 🔍 Debugging Checklist

### If Register Button Doesn't Work
- ✅ Check: Navbar.tsx has `<Link to="/register">`
- ✅ Verify: Register.tsx exists in `/src/pages/`
- ✅ Clear: Browser cache & reload

### If Backend Not Running
```bash
# Check if port 4000 is in use
lsof -i :4000

# Kill process if needed
kill -9 <PID>

# Restart backend
cd backend && npm run dev
```

### If MongoDB Connection Fails
```bash
# Check MongoDB is running
ps aux | grep mongod

# Start MongoDB
mongod

# Or with Homebrew
brew services start mongodb-community
```

### If OTP Not Showing
1. Check **backend terminal** (not frontend console)
2. Look for line: `OTP: 123456`
3. If not showing, check registration was successful

### If Login Fails
1. Ensure email was verified with OTP
2. Check password is correct
3. Try registering new account

---

## 📊 API Testing Postman Setup

### 1. Save Base URL
```
Variable Name: base_url
Value: http://localhost:4000
```

### 2. Save Auth Token
After login, copy token and add to Postman:
```
Variable Name: token
Value: <paste JWT token here>
```

### 3. Use in Requests
```
GET {{base_url}}/api/student/tickets

Headers:
Authorization: Bearer {{token}}
```

---

## ✅ Verification Checklist

- [ ] MongoDB running on port 27017
- [ ] Backend running on port 4000
- [ ] Frontend running on port 5173
- [ ] Register button visible in navbar
- [ ] Register button links to `/register`
- [ ] Can navigate to register page
- [ ] Backend console shows connection
- [ ] Postman extension installed
- [ ] Can create user via Postman
- [ ] OTP appears in backend console
- [ ] Can verify OTP via Postman
- [ ] Can login via Postman
- [ ] Received JWT token
- [ ] Can create ticket with token
- [ ] MongoDB has data

---

## 🚀 Quick Commands

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev

# Terminal 3: MongoDB (if needed)
mongod

# Terminal 4: MongoDB Shell (for debugging)
mongosh
```

---

## 📞 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Can't connect to MongoDB" | Start mongod: `mongod` |
| "Port 4000 in use" | Kill process: `lsof -i :4000` |
| "Register button not visible" | Clear browser cache |
| "OTP not showing" | Check backend terminal (not frontend) |
| "API 401 unauthorized" | Token expired, login again |
| "Postman can't find localhost" | Ensure backend is running |

---

## 🎯 What's Next

After verification:
1. ✅ Explore student dashboard
2. ✅ Test employee registration & login
3. ✅ Create multiple tickets
4. ✅ Test protected routes (logout & try accessing)
5. ✅ Review database in MongoDB shell

---

**Status**: ✅ Everything is set up and ready to test!

