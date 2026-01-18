# Backend API Setup Guide - PREMASS Admin Dashboard

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install express cors dotenv bcryptjs jsonwebtoken mongoose typescript @types/express @types/node ts-node
```

### 2. Create Environment File

Create `.env` in the `backend` folder:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/premass-admin

# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production-12345
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production-67890

# API Configuration
API_BASE_URL=http://localhost:3001/api/v1
```

### 3. Start MongoDB

```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# OR using Homebrew on macOS
brew services start mongodb-community

# OR using MongoDB Atlas (Cloud)
# Update MONGODB_URI in .env with your cloud connection string
```

### 4. Run the Server

```bash
# Development with auto-reload
npm run dev

# Production build
npm run build
npm start
```

Server will be running on `http://localhost:3001`

---

## API Endpoint Reference

### Authentication Endpoints

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "raj@premass.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "emp001",
      "name": "Raj Kumar",
      "email": "raj@premass.com",
      "role": "Manager"
    }
  }
}
```

#### Register
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@premass.com",
  "phone": "9876543210",
  "password": "securePassword123",
  "department": "Education Loans",
  "designation": "Loan Counselor"
}
```

#### Refresh Token
```http
POST /api/v1/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```http
POST /api/v1/auth/logout
Authorization: Bearer {token}
```

---

### Employee Management Endpoints

#### Get All Employees
```http
GET /api/v1/employees
Authorization: Bearer {token}
```

#### Get Single Employee
```http
GET /api/v1/employees/{employeeId}
Authorization: Bearer {token}
```

#### Create Employee
```http
POST /api/v1/employees
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@premass.com",
  "phone": "9876543211",
  "department": "Overseas Education",
  "designation": "Counselor",
  "password": "defaultPassword123",
  "permissions": ["view_applications", "send_messages"]
}
```

#### Update Employee
```http
PUT /api/v1/employees/{employeeId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Jane Smith Updated",
  "department": "Career Support",
  "permissions": ["view_applications", "send_messages", "approve_applications"],
  "isActive": true
}
```

#### Delete Employee
```http
DELETE /api/v1/employees/{employeeId}
Authorization: Bearer {token}
```

---

### Role Management Endpoints

#### Get All Roles
```http
GET /api/v1/roles
Authorization: Bearer {token}
```

#### Create Role
```http
POST /api/v1/roles
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Senior Counselor",
  "description": "Manages student applications and support",
  "permissions": ["view_applications", "send_messages", "approve_applications", "generate_reports"],
  "department": "Education Loans",
  "level": 3
}
```

#### Update Role
```http
PUT /api/v1/roles/{roleId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Senior Counselor Updated",
  "permissions": ["view_applications", "send_messages", "approve_applications"],
  "level": 2
}
```

#### Delete Role
```http
DELETE /api/v1/roles/{roleId}
Authorization: Bearer {token}
```

---

### Permission Management Endpoints

#### Get All Permissions
```http
GET /api/v1/permissions
Authorization: Bearer {token}
```

#### Create Permission
```http
POST /api/v1/permissions
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "View Reports",
  "description": "Ability to view system reports",
  "category": "Reporting",
  "riskLevel": "medium"
}
```

#### Update Permission
```http
PUT /api/v1/permissions/{permissionId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "View Reports Updated",
  "isActive": true
}
```

#### Delete Permission
```http
DELETE /api/v1/permissions/{permissionId}
Authorization: Bearer {token}
```

---

### Permission Assignment Endpoints

#### Get All Assignments
```http
GET /api/v1/assignments
Authorization: Bearer {token}
```

#### Create Assignment
```http
POST /api/v1/assignments
Authorization: Bearer {token}
Content-Type: application/json

{
  "employeeId": "emp002",
  "employeeName": "Jane Smith",
  "email": "jane@premass.com",
  "department": "Overseas Education",
  "permissions": ["view_applications", "send_messages", "approve_applications"]
}
```

#### Update Assignment
```http
PUT /api/v1/assignments/{assignmentId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "permissions": ["view_applications", "send_messages", "approve_applications", "generate_reports"]
}
```

#### Delete Assignment
```http
DELETE /api/v1/assignments/{assignmentId}
Authorization: Bearer {token}
```

---

### Dashboard Options Endpoints

#### Get All Dashboard Options
```http
GET /api/v1/dashboard-options
Authorization: Bearer {token}
```

#### Create Dashboard Option
```http
POST /api/v1/dashboard-options
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Student Analytics",
  "description": "View detailed student application analytics",
  "category": "Analytics",
  "requiredPermissions": ["view_applications", "generate_reports"],
  "assignedTo": ["emp001", "emp002"]
}
```

#### Update Dashboard Option
```http
PUT /api/v1/dashboard-options/{optionId}
Authorization: Bearer {token}
Content-Type: application/json

{
  "isActive": true,
  "assignedTo": ["emp001", "emp002", "emp003"]
}
```

#### Delete Dashboard Option
```http
DELETE /api/v1/dashboard-options/{optionId}
Authorization: Bearer {token}
```

---

## Database Schema

### Collections Structure

**employees**
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  email: String (unique),
  phone: String,
  department: String,
  designation: String,
  role: String,
  permissions: [String],
  password: String (hashed),
  isActive: Boolean,
  joiningDate: Date,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

**roles**
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  description: String,
  permissions: [String],
  department: String,
  level: Number,
  employeeCount: Number,
  createdAt: Date,
  updatedAt: Date
}
```

**permissions**
```javascript
{
  _id: ObjectId,
  id: String (unique),
  name: String,
  description: String,
  category: String,
  employees: Number,
  isActive: Boolean,
  riskLevel: String (low|medium|high),
  createdAt: Date,
  updatedAt: Date
}
```

**assignments**
```javascript
{
  _id: ObjectId,
  id: String (unique),
  employeeId: String,
  employeeName: String,
  email: String,
  department: String,
  permissions: [String],
  assignedDate: Date,
  assignedBy: String,
  createdAt: Date,
  updatedAt: Date
}
```

**dashboardOptions**
```javascript
{
  _id: ObjectId,
  id: String (unique),
  title: String,
  description: String,
  category: String,
  isActive: Boolean,
  requiredPermissions: [String],
  assignedTo: [String],
  createdAt: Date,
  updatedAt: Date
}
```

---

## Environment Variables Explained

| Variable | Purpose | Example |
|----------|---------|---------|
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGODB_URI` | Database connection | `mongodb://localhost:27017/premass-admin` |
| `JWT_SECRET` | Token signing key | `your-secret-key-minimum-32-chars` |
| `JWT_REFRESH_SECRET` | Refresh token signing key | `your-refresh-secret-minimum-32-chars` |

---

## Testing the API

### Using cURL

```bash
# Login
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "raj@premass.com",
    "password": "password123"
  }'

# Save token from response, then get employees
curl -X GET http://localhost:3001/api/v1/employees \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman

1. Create new request
2. Set method to `GET`
3. URL: `http://localhost:3001/api/v1/employees`
4. Headers tab: Add `Authorization: Bearer YOUR_TOKEN`
5. Click Send

---

## TypeScript Configuration

Update `backend/tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

---

## Package.json Scripts

Update `backend/package.json`:

```json
{
  "scripts": {
    "dev": "ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "watch": "tsc --watch"
  }
}
```

---

## MongoDB Setup Options

### Option 1: Local MongoDB (macOS)

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify installation
mongosh --eval "db.version()"

# Stop MongoDB
brew services stop mongodb-community
```

### Option 2: Docker

```bash
# Pull MongoDB image
docker pull mongo:latest

# Run MongoDB container
docker run -d \
  -p 27017:27017 \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Connect with URI
# MONGODB_URI=mongodb://admin:password@localhost:27017/premass-admin?authSource=admin
```

### Option 3: MongoDB Atlas (Cloud)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update `.env` with connection string

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/premass-admin
```

---

## Security Best Practices

1. **Never commit `.env` to git** - Add to `.gitignore`
2. **Use strong JWT secrets** - Minimum 32 characters
3. **Hash all passwords** - Using bcryptjs (implemented)
4. **HTTPS in production** - Use SSL certificates
5. **CORS properly configured** - Only allow your frontend domain
6. **Rate limiting** - Add express-rate-limit for production
7. **Input validation** - Validate all incoming data
8. **Error messages** - Don't expose sensitive info in errors

---

## Troubleshooting

### MongoDB Connection Error
```
error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Ensure MongoDB is running (`brew services start mongodb-community`)

### JWT Verification Failed
```
error: Invalid token
```
**Solution:** Ensure token is being sent in Authorization header as `Bearer {token}`

### CORS Error
```
error: Access to XMLHttpRequest has been blocked by CORS policy
```
**Solution:** Ensure CORS is enabled in server.ts (it's already configured)

### Port Already in Use
```
error: listen EADDRINUSE: address already in use :::3001
```
**Solution:** Kill process on port 3001 or change PORT in `.env`

---

## Next Steps

1. ✅ Run the backend server
2. ✅ Test endpoints with Postman or cURL
3. ✅ Update frontend apiClient.ts with actual API calls
4. ✅ Test frontend → backend integration
5. ✅ Deploy to production

---

## Deployment

### Vercel (Recommended for Node.js)

```bash
npm i -g vercel
vercel
```

### Heroku

```bash
heroku create your-app-name
git push heroku main
heroku config:set JWT_SECRET=your-key
```

### AWS EC2 or DigitalOcean

1. SSH into server
2. Install Node.js and MongoDB
3. Clone repo
4. Run `npm install && npm run build`
5. Start with PM2: `pm2 start dist/server.js --name "premass-api"`

---

## Support

For issues or questions:
1. Check MongoDB connection
2. Verify `.env` variables
3. Review server logs
4. Test endpoints with Postman
5. Check CORS configuration
