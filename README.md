# 🌍 Premass Overseas - Full Stack Application

> Premium overseas education consultancy website with enterprise-grade authentication and content management system.

---

## 🎯 Project Overview

**Premass Overseas** is a full-stack web application built to demonstrate UK developer-level architecture. It features:

- 🏢 Enterprise institutional design (Dark Blue #0A3A5E + Orange #F5A623)
- 🔐 Complete authentication system (Register → OTP → Login)
- 👥 Role-based dashboards (Student & Employee)
- 📋 Ticket management system
- 🌍 Dynamic country pages (CMS-ready)
- 📚 Scalable service architecture
- 🎨 Premium UI with Tailwind CSS

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Git

### Installation

```bash
# Clone repository
git clone <repo-url>
cd premass-overseas-app

# Backend Setup
cd backend
npm install
echo "MONGO_URI=mongodb://localhost:27017/premass-overseas
JWT_SECRET=test_secret_key
PORT=4000" > .env
npm run dev

# Frontend Setup (new terminal)
cd frontend
npm install
npm run dev
```

**URLs**:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:4000`

---

## 📊 Tech Stack

### Frontend
- **Framework**: React 18 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS
- **Routing**: React Router v6
- **State**: React Context API
- **HTTP**: Native Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcryptjs
- **Middleware**: CORS, Auth, Role-based

### DevTools
- **Frontend**: ESLint, TypeScript
- **Backend**: Nodemon
- **API Testing**: Postman / cURL

---

## 📁 Project Structure

```
premass-overseas-app/
├── frontend/                 # React + Vite + TypeScript
│   ├── src/
│   │   ├── context/         # AuthContext (global state)
│   │   ├── pages/           # Public + Auth pages
│   │   ├── student/         # Student features
│   │   ├── employee/        # Employee features
│   │   ├── components/      # Reusable components
│   │   ├── data/            # Services & countries JSON
│   │   └── App.tsx          # Main app routes
│   └── package.json
│
├── backend/                  # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/     # Business logic
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth & role middleware
│   │   └── config/          # Database connection
│   ├── .env                 # Environment variables
│   └── package.json
│
├── SETUP_GUIDE.md           # Step-by-step testing
├── AUTH_IMPLEMENTATION.md   # Auth system details
├── IMPLEMENTATION_SUMMARY.md # Project status
├── BRANDING_GUIDE.md        # Design system
└── README.md                # This file
```

---

## 🔐 Authentication System

### Features
- ✅ Registration with email verification
- ✅ OTP-based verification (10-minute expiry)
- ✅ JWT token authentication (1-day expiry)
- ✅ Role-based access control (Student/Employee)
- ✅ Password hashing (bcryptjs)
- ✅ Protected routes (frontend + backend)
- ✅ Global auth state (Context API)

### Flow
```
Register → Verify OTP → Login → Dashboard
```

### Routes

**Public**:
```
GET  /                       - Home
GET  /about                  - About
GET  /contact                - Contact
GET  /services               - Services listing
GET  /services/:category     - Service category
GET  /services/:category/:service - Service detail
GET  /countries              - Countries listing
GET  /countries/:country     - Country detail
GET  /login                  - Login form
GET  /register               - Registration form
GET  /verify-otp             - OTP verification
```

**Protected (Student)**:
```
GET  /dashboard/student      - Student dashboard
POST /student/create-ticket  - Create ticket
GET  /student/tickets        - View tickets
GET  /profile                - User profile
```

**Protected (Employee)**:
```
GET  /dashboard/employee     - Employee dashboard
GET  /employee/tickets       - Assigned tickets
GET  /profile                - User profile
```

---

## 🧪 Testing the Application

### Quick Test (5 minutes)
1. Register new account at `/register`
2. Check backend console for OTP code
3. Verify OTP at `/verify-otp`
4. Login with email & password
5. Create ticket (if student)
6. Logout

### Complete API Test
See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for:
- Detailed testing steps
- cURL examples
- API endpoints reference
- Troubleshooting guide

---

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [SETUP_GUIDE.md](./SETUP_GUIDE.md) | Testing & deployment guide |
| [AUTH_IMPLEMENTATION.md](./AUTH_IMPLEMENTATION.md) | Complete auth documentation |
| [BRANDING_GUIDE.md](./BRANDING_GUIDE.md) | Design system & colors |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Project status & features |
| [QUICK_BRANDING_REFERENCE.md](./QUICK_BRANDING_REFERENCE.md) | Quick color & style reference |

---

## 🎨 Design System

### Colors
- **Primary**: Dark Blue `#0A3A5E`
- **Accent**: Orange `#F5A623`
- **Backgrounds**: White, Slate, Soft Gradients
- **Text**: Gray scale (900-500)

### Typography
- **Headings**: Bold, large sizes
- **Body**: Regular, readable
- **Links**: Blue with underline on hover

### Components
- Buttons with hover effects
- Cards with shadows
- Forms with validation
- Badges & status indicators
- Modal & dropdown patterns

---

## 🔧 Environment Setup

### Backend .env
```
MONGO_URI=mongodb://localhost:27017/premass-overseas
JWT_SECRET=your_secret_key_here
PORT=4000
NODE_ENV=development
```

### Frontend .env.local (optional)
```
VITE_API_URL=http://localhost:4000
```

---

## 🚀 Deployment

### Prerequisites for Production
- [ ] Update JWT_SECRET to strong value
- [ ] Switch from localStorage to httpOnly cookies
- [ ] Set up email service (SendGrid/Nodemailer)
- [ ] Enable HTTPS
- [ ] Configure CORS properly
- [ ] Add rate limiting
- [ ] Set up monitoring/logging
- [ ] Use environment variables

### Deployment Platforms
- **Frontend**: Vercel, Netlify, AWS Amplify
- **Backend**: Render, Railway, Heroku, AWS EC2
- **Database**: MongoDB Atlas, AWS DocumentDB

---

## 📊 Database Schema

### Users Collection
```javascript
{
  name: String,
  email: String (unique),
  password: String (bcrypt),
  role: "student" | "employee" | "admin",
  isEmailVerified: Boolean,
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Tickets Collection
```javascript
{
  student: ObjectId (ref: User),
  title: String,
  description: String,
  status: "open" | "in-progress" | "closed",
  assignedTo: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🤝 Contributing

This is a personal project for demonstration purposes. However, suggestions are welcome!

### Code Style
- Use TypeScript in frontend
- Follow Express.js conventions in backend
- Add comments for complex logic
- Use descriptive variable names
- Keep components small & reusable

---

## 🐛 Known Issues

- OTP sent via console (not email) – use SendGrid for production
- localStorage used for tokens (use httpOnly cookies in production)
- No auto-logout on token expiry
- Password reset flow not yet implemented

---

## 🎯 Future Enhancements

### Phase 2
- [ ] Email service integration (SendGrid)
- [ ] Refresh token mechanism
- [ ] Admin dashboard
- [ ] Advanced search & filters
- [ ] File uploads for tickets

### Phase 3
- [ ] Real-time notifications (WebSocket)
- [ ] Analytics & reporting
- [ ] API documentation (Swagger)
- [ ] Mobile app (React Native)
- [ ] Multi-language support

### Phase 4
- [ ] OAuth (Google, GitHub)
- [ ] Two-factor authentication
- [ ] Advanced audit logs
- [ ] Compliance certifications
- [ ] Performance optimizations

---

## 📞 Support

### Common Issues
See [SETUP_GUIDE.md - Troubleshooting](./SETUP_GUIDE.md#-troubleshooting) for:
- Login problems
- OTP not showing
- API connection errors
- Protected route issues

### Getting Help
1. Check the relevant documentation file
2. Review backend console for errors
3. Check browser DevTools for frontend errors
4. Test API with cURL or Postman

---

## 📋 Architecture Highlights

### Separation of Concerns
- ✅ UI components are presentational only
- ✅ Business logic in controllers
- ✅ Data models separate from API routes
- ✅ Auth logic isolated in middleware

### Security
- ✅ Password hashing (bcryptjs)
- ✅ JWT verification on every request
- ✅ Role-based access control
- ✅ Email verification required
- ✅ Token expiration

### Scalability
- ✅ Services data is CMS-ready (JSON → API)
- ✅ Countries data is admin-editable
- ✅ Modular component structure
- ✅ Extensible route architecture

---

## 📈 Interview Talking Points

This project demonstrates:
- **Real-world routing** with React Router
- **Scalable architecture** (data-driven)
- **Authentication** (JWT + OTP)
- **Role-based access control**
- **Full-stack thinking** (UI + API + DB)
- **Enterprise UI discipline** (design system)
- **Production readiness** (error handling, validation)
- **API design** (RESTful conventions)

---

## 📅 Project Timeline

| Date | Milestone |
|------|-----------|
| Dec 2025 | Project initialization |
| Dec 2025 | Navbar & services architecture |
| Jan 2026 | Branding system implementation |
| Jan 2026 | **Authentication system (complete)** |
| Jan 2026 | Country detail pages |
| Q2 2026 | Admin panel development |
| Q2 2026 | Email service integration |
| Q3 2026 | Production deployment |

---

## 📄 License

This project is for demonstration and learning purposes.

---

## 👨‍💻 Author

Built by Bharath as a UK full-stack developer portfolio project.

**Skills Demonstrated**:
- React + TypeScript
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- RESTful API Design
- Tailwind CSS
- Component Architecture
- Full-stack thinking

---

## ✨ Key Achievements

✅ Complete authentication system (register → OTP → login)
✅ Role-based dashboards (student & employee)
✅ Ticket management system
✅ Global auth state (Context API)
✅ Protected routes (frontend + backend)
✅ Enterprise design system
✅ Comprehensive documentation
✅ Production-ready code quality

---

**Last Updated**: 10 January 2026
**Status**: ✅ Complete & Fully Functional

**Ready for**: Deployment to production (with security improvements)
