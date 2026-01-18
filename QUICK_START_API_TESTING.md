# 🎯 QUICK START - REST API TESTING GUIDE

## 🚀 Everything is READY! Start Testing Now!

---

## Step 1: Verify Server is Running ✅

Your backend server is running on **http://localhost:4000**

Check by opening this in browser (should see "Premass Overseas Backend Running"):
```
http://localhost:4000
```

---

## Step 2: Open Postman 📮

1. Launch Postman
2. Click **Collections** → **Import**
3. Choose the file: `Postman_Collection.json` from this folder

OR copy the JSON collection data and paste it directly into Postman

---

## Step 3: Set Up Environment Variables 🔑

In Postman, create environment variables:

```
base_url = http://localhost:4000/api
token = (leave empty for now)
user_id = (will fill after registration)
```

---

## Step 4: FIRST - Register & Login 🔐

### Register a New User
```
POST http://localhost:4000/api/auth/register
```

Body:
```json
{
  "name": "Your Name",
  "email": "your@email.com",
  "password": "password123",
  "phone": "+91-9876543210",
  "role": "student"
}
```

**Copy the token from response!**

### Login
```
POST http://localhost:4000/api/auth/login
```

Body:
```json
{
  "email": "your@email.com",
  "password": "password123"
}
```

---

## Step 5: Add Token to All Requests 🔓

In Postman:

1. Select **Collections** → **Edit** (gear icon)
2. Go to **Authorization** tab
3. Set Type to **Bearer Token**
4. Paste your token in the Token field

Now all requests will automatically include your token!

---

## Step 6: Start Testing! 🧪

### Example 1: Create an Overseas Education Lead

```
POST http://localhost:4000/api/services/overseas-education

Headers:
Authorization: Bearer YOUR_TOKEN

Body:
{
  "name": "Priya Singh",
  "email": "priya@email.com",
  "phone": "+91-9876543211",
  "academicProfile": {
    "qualification": "12th Pass",
    "percentage": 92,
    "boards": ["CBSE"],
    "streams": ["Science"]
  },
  "studyAbroad": {
    "targetCountries": ["USA", "Canada"],
    "preferredCourses": ["Computer Science"],
    "budgetRange": "25-30 LPA"
  },
  "leadSource": "Website"
}
```

**Response** (if success):
```json
{
  "message": "Lead created successfully",
  "lead": {
    "_id": "63f4a5b2c9d1e2a3f4b5c6d7",
    "name": "Priya Singh",
    "status": "inquiry",
    ...
  }
}
```

---

### Example 2: Create a Task

```
POST http://localhost:4000/api/tasks

Body:
{
  "taskTitle": "Follow-up with Lead",
  "taskDescription": "Contact Priya for counseling session",
  "assignedTo": "USER_ID_HERE",
  "taskCategory": "lead_follow_up",
  "priority": "high",
  "dueDate": "2026-02-20",
  "estimatedDuration": 2
}
```

---

### Example 3: Record Employee Attendance

First, create an employee account with role "employee"

```
POST http://localhost:4000/api/employees/EMPLOYEE_ID/attendance

Body:
{
  "action": "check_in",
  "ipAddress": "192.168.1.100"
}
```

Then check out:
```
POST http://localhost:4000/api/employees/EMPLOYEE_ID/attendance

Body:
{
  "action": "check_out",
  "ipAddress": "192.168.1.100"
}
```

---

### Example 4: Get Analytics Dashboard

```
GET http://localhost:4000/api/tasks/analytics/dashboard
```

Response shows:
- Total tasks
- Completed tasks
- Completion rate %
- In-progress tasks
- Overdue tasks

---

## 🎯 20 Essential APIs to Test First

1. **POST** `/auth/register` - Register user
2. **POST** `/auth/login` - Login & get token
3. **POST** `/tasks` - Create task
4. **GET** `/tasks` - List all tasks
5. **PUT** `/tasks/:id/status` - Update task status
6. **POST** `/services/overseas-education` - Create overseas lead
7. **GET** `/services/overseas-education` - List leads
8. **POST** `/services/education-loan` - Apply for loan
9. **POST** `/employees/:id/attendance` - Check in/out
10. **GET** `/employees/:id/dashboard` - View employee dashboard
11. **POST** `/documents` - Upload document
12. **GET** `/documents` - List documents
13. **POST** `/services/career-support` - Enroll in career support
14. **POST** `/services/visa-immigration` - Create visa application
15. **POST** `/services/domestic-admission` - Create domestic lead
16. **POST** `/services/it-training` - Create course
17. **POST** `/services/student-support` - Create support profile
18. **GET** `/tasks/analytics/dashboard` - Task analytics
19. **GET** `/services/overseas-education/analytics/dashboard` - Lead analytics
20. **GET** `/employees/:id/login-history` - View login history

---

## 📊 Test All 10 Services

### Service 1: Task Management
- Create task
- Update status
- Log time
- View analytics

### Service 2: Overseas Education  
- Create lead
- Add university
- Assign counselor
- Upload offer letter

### Service 3: Domestic Admission
- Create lead
- Add college
- Update seat allocation
- View analytics

### Service 4: Education Loan
- Create application
- Calculate eligibility
- Add lender
- Update disbursement

### Service 5: Visa & Immigration
- Create application
- Add documents
- Schedule interview
- Approve visa

### Service 6: Document Management
- Upload document
- Verify document
- Grant access
- Check expiring docs

### Service 7: Career Support
- Enroll student
- Request resume service
- Track job applications
- Record job offer

### Service 8: IT Training
- Create course
- Enroll student
- Record assessment
- Issue certificate

### Service 9: Student Support
- Create support profile
- Arrange accommodation
- Book flights
- Arrange insurance

### Service 10: Employee Management
- Get all employees
- Record attendance
- Update performance
- Request leave

---

## 🐛 Troubleshooting

### Issue: "Invalid token"
**Solution:** Copy token from login response and paste into Postman environment

### Issue: "Route not found"
**Solution:** Make sure server is running on port 4000
```
http://localhost:4000
```

### Issue: "Unauthorized"
**Solution:** Make sure you're logged in and have proper role

### Issue: "Database connection failed"
**Solution:** Check MongoDB is running and `.env` has correct `MONGO_URI`

### Issue: "CORS error"
**Solution:** Already enabled in backend, should work fine

---

## 📝 Notes

- All endpoints require `Authorization: Bearer TOKEN` header (except /auth/*)
- All request/response bodies are in JSON format
- Postman will show response status and body
- Check `API_DOCUMENTATION.md` for all 110+ endpoints details

---

## 🎓 Learning Outcomes

By testing these APIs, you'll understand:

✅ RESTful API design patterns  
✅ JWT authentication & authorization  
✅ Role-based access control (RBAC)  
✅ Status lifecycle management  
✅ Activity logging & audit trails  
✅ Analytics & reporting  
✅ Complex business workflows  
✅ Enterprise SaaS architecture  

---

## 💡 Next Phase

Once you're comfortable with APIs, build React components to:
- Create leads dashboard
- Employee performance tracking
- Task management interface
- Analytics dashboards

---

## 📞 API Endpoints Summary

| Service | Base URL | Endpoints |
|---------|----------|-----------|
| Tasks | `/api/tasks` | 8 |
| Overseas | `/api/services/overseas-education` | 10 |
| Domestic | `/api/services/domestic-admission` | 6 |
| Loans | `/api/services/education-loan` | 6 |
| Visa | `/api/services/visa-immigration` | 8 |
| Documents | `/api/documents` | 8 |
| Career | `/api/services/career-support` | 7 |
| Training | `/api/services/it-training` | 9 |
| Support | `/api/services/student-support` | 9 |
| Employees | `/api/employees` | 9 |

---

## ✨ READY TO TEST!

1. ✅ Backend server running
2. ✅ All 10 service APIs built
3. ✅ 110+ endpoints ready
4. ✅ Authentication configured
5. ✅ Database connected

**Open Postman and start testing RIGHT NOW!** 🚀

---

**Happy Testing! 🎉**
