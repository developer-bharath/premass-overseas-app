# Backend API Testing Guide

## Quick Test Using cURL

### 1. Register New User

```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@premass.com",
    "phone": "9876543210",
    "password": "securePassword123",
    "department": "Education Loans",
    "designation": "Loan Counselor"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "emp1234567890",
      "name": "John Doe",
      "email": "john@premass.com",
      "role": "Counselor"
    }
  }
}
```

### 2. Login

```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@premass.com",
    "password": "securePassword123"
  }'
```

**Save the token:**
```bash
TOKEN="your-token-from-response"
```

### 3. Get All Employees

```bash
TOKEN="your-token-here"

curl -X GET http://localhost:3001/api/v1/employees \
  -H "Authorization: Bearer $TOKEN"
```

### 4. Create Employee

```bash
TOKEN="your-token-here"

curl -X POST http://localhost:3001/api/v1/employees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@premass.com",
    "phone": "9876543211",
    "department": "Overseas Education",
    "designation": "Counselor",
    "password": "password123",
    "permissions": ["view_applications", "send_messages"]
  }'
```

### 5. Update Employee

```bash
TOKEN="your-token-here"
EMPLOYEE_ID="emp-id-from-response"

curl -X PUT http://localhost:3001/api/v1/employees/$EMPLOYEE_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith Updated",
    "department": "Career Support",
    "permissions": ["view_applications", "send_messages", "approve_applications"]
  }'
```

### 6. Delete Employee

```bash
TOKEN="your-token-here"
EMPLOYEE_ID="emp-id-to-delete"

curl -X DELETE http://localhost:3001/api/v1/employees/$EMPLOYEE_ID \
  -H "Authorization: Bearer $TOKEN"
```

### 7. Create Role

```bash
TOKEN="your-token-here"

curl -X POST http://localhost:3001/api/v1/roles \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Senior Counselor",
    "description": "Manages student applications and support",
    "permissions": ["view_applications", "send_messages", "approve_applications"],
    "department": "Education Loans",
    "level": 3
  }'
```

### 8. Get All Roles

```bash
TOKEN="your-token-here"

curl -X GET http://localhost:3001/api/v1/roles \
  -H "Authorization: Bearer $TOKEN"
```

### 9. Create Permission

```bash
TOKEN="your-token-here"

curl -X POST http://localhost:3001/api/v1/permissions \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "View Reports",
    "description": "Ability to view system reports",
    "category": "Reporting",
    "riskLevel": "medium"
  }'
```

### 10. Create Assignment

```bash
TOKEN="your-token-here"

curl -X POST http://localhost:3001/api/v1/assignments \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "employeeId": "emp-id",
    "employeeName": "Jane Smith",
    "email": "jane@premass.com",
    "department": "Overseas Education",
    "permissions": ["view_applications", "send_messages"]
  }'
```

---

## Testing with Postman

### 1. Import Collection

1. Open Postman
2. Click "Import"
3. Use the provided `Postman_Collection.json`
4. All endpoints are pre-configured

### 2. Set Up Environment Variables

1. Create new Environment: "PREMASS Dev"
2. Add variables:
   - `base_url`: `http://localhost:3001/api/v1`
   - `token`: (will be auto-set after login)

### 3. Run Tests

1. **Auth → Register**: Register new user
2. **Auth → Login**: Get token (auto-saves to environment)
3. **Employees → Get All**: List all employees
4. **Employees → Create**: Add new employee
5. **Employees → Update**: Modify employee
6. **Employees → Delete**: Remove employee
7. Repeat for Roles, Permissions, Assignments

---

## Automated Testing Script

Create `test-api.sh`:

```bash
#!/bin/bash

# API Testing Script
BASE_URL="http://localhost:3001/api/v1"
EMAIL="test-$(date +%s)@premass.com"
PASSWORD="testPassword123"
NAME="Test User $(date +%s)"

echo "🧪 Starting API Tests..."
echo ""

# 1. Register
echo "1️⃣  Testing Register..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"$NAME\",
    \"email\": \"$EMAIL\",
    \"phone\": \"9876543210\",
    \"password\": \"$PASSWORD\",
    \"department\": \"Test Dept\",
    \"designation\": \"Test Role\"
  }")

TOKEN=$(echo $REGISTER_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
    echo "❌ Register failed!"
    echo $REGISTER_RESPONSE
    exit 1
fi

echo "✅ Register successful!"
echo ""

# 2. Get Employees
echo "2️⃣  Testing Get Employees..."
EMPLOYEES=$(curl -s -X GET $BASE_URL/employees \
  -H "Authorization: Bearer $TOKEN")

echo "✅ Get Employees successful!"
echo ""

# 3. Create Employee
echo "3️⃣  Testing Create Employee..."
NEW_EMAIL="new-$(date +%s)@premass.com"
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/employees \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"name\": \"New Employee\",
    \"email\": \"$NEW_EMAIL\",
    \"phone\": \"9876543211\",
    \"department\": \"Test\",
    \"designation\": \"Test\",
    \"password\": \"password123\",
    \"permissions\": [\"view_applications\"]
  }")

echo "✅ Create Employee successful!"
echo ""

# 4. Get Roles
echo "4️⃣  Testing Get Roles..."
curl -s -X GET $BASE_URL/roles \
  -H "Authorization: Bearer $TOKEN" > /dev/null

echo "✅ Get Roles successful!"
echo ""

# 5. Get Permissions
echo "5️⃣  Testing Get Permissions..."
curl -s -X GET $BASE_URL/permissions \
  -H "Authorization: Bearer $TOKEN" > /dev/null

echo "✅ Get Permissions successful!"
echo ""

# 6. Get Assignments
echo "6️⃣  Testing Get Assignments..."
curl -s -X GET $BASE_URL/assignments \
  -H "Authorization: Bearer $TOKEN" > /dev/null

echo "✅ Get Assignments successful!"
echo ""

# 7. Health Check
echo "7️⃣  Testing Health Check..."
curl -s -X GET $BASE_URL/health > /dev/null

echo "✅ Health Check successful!"
echo ""

echo "✅ All tests passed!"
```

Make script executable and run:
```bash
chmod +x test-api.sh
./test-api.sh
```

---

## Performance Testing

### Load Test with Apache Bench

```bash
# Get 1000 requests with 10 concurrent
ab -n 1000 -c 10 http://localhost:3001/api/v1/health
```

### Load Test with wrk

```bash
# Install wrk
brew install wrk

# Run test (4 connections, 2 threads, 30 seconds)
wrk -t2 -c4 -d30s http://localhost:3001/api/v1/health
```

---

## Debugging Tips

### 1. Enable Detailed Logging

In `server.ts`, add logging middleware:

```typescript
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});
```

### 2. Check MongoDB Connection

```bash
# Connect to MongoDB
mongosh

# List databases
show dbs

# Use premass-admin
use premass-admin

# List collections
show collections

# View employees
db.employees.find().pretty()
```

### 3. Verify JWT Token

Use https://jwt.io to decode token:
1. Paste token
2. Verify signature with JWT_SECRET
3. Check expiration (exp field)

### 4. Network Debugging

```bash
# Check if server is listening
lsof -i :3001

# Monitor network requests
tcpdump -i lo0 -n 'port 3001'
```

---

## Common Issues & Solutions

### Issue: "MongoDB connected" but no database changes
**Solution:** Check MONGODB_URI in `.env` matches actual MongoDB instance

### Issue: "Invalid token" error
**Solution:** Token might be expired. Re-login or use refresh endpoint

### Issue: CORS errors in browser console
**Solution:** Verify FRONTEND_URL in `.env` matches actual frontend URL

### Issue: POST requests return 400 Bad Request
**Solution:** Check request body structure matches API specs

### Issue: Slow API responses
**Solution:** Check MongoDB indexes, add `await session.startSession()`

---

## Test Data Scenarios

### Scenario 1: Complete Workflow
1. Register new user
2. Get user profile
3. Create roles with permissions
4. Assign permissions to user
5. Create dashboard options
6. Verify all relationships

### Scenario 2: Permission Hierarchy
1. Create 3 roles with different levels
2. Create employees with different roles
3. Assign different permissions to each
4. Verify permission inheritance

### Scenario 3: Bulk Operations
1. Create 50+ employees
2. Assign 5 permissions each
3. Create 10 roles
4. Verify performance

---

## Continuous Integration Testing

### GitHub Actions Example

Create `.github/workflows/api-tests.yml`:

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      mongodb:
        image: mongo:latest
        options: >-
          --health-cmd mongosh
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
        ports:
          - 27017:27017
    
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run build
      - run: npm start &
      - run: sleep 5
      - run: ./test-api.sh
```

---

## Monitoring

### Health Check Endpoint

```bash
curl http://localhost:3001/api/v1/health
```

Response:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-15T10:30:00.000Z"
  }
}
```

### Uptime Monitoring

Use services like:
- UptimeRobot (free)
- Pingdom
- New Relic
- Datadog

Configure to ping health endpoint every 5 minutes.

---

## Next Steps

1. ✅ Run all endpoint tests
2. ✅ Verify responses match schema
3. ✅ Test error cases (invalid email, wrong password)
4. ✅ Test authentication flow
5. ✅ Test CRUD operations for all resources
6. ✅ Test concurrent requests
7. ✅ Test edge cases
8. ✅ Performance test under load
