// ================================
// ROUTING SETUP – FULL APP
// ================================

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Auth Provider
import { AuthProvider } from "./context/AuthContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ServiceCategory from "./pages/ServiceCategory";
import ServiceDetail from "./pages/ServiceDetail";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";

// Service Pages
import OverseasEducation from "./pages/services/OverseasEducation";
import DomesticAdmission from "./pages/services/DomesticAdmission";
import EducationLoan from "./pages/services/EducationLoan";
import VisaImmigration from "./pages/services/VisaImmigration";
import DocumentManagement from "./pages/services/DocumentManagement";
import CareerJobSupport from "./pages/services/CareerJobSupport";
import ITTraining from "./pages/services/ITTraining";
import StudentSupportSettlement from "./pages/services/StudentSupportSettlement";

// Auth Pages
import Login from "./auth/Login";
import StudentLogin from "./auth/StudentLogin";
import EmployeeLogin from "./auth/EmployeeLogin";
import Register from "./auth/Register";
import VerifyOTP from "./auth/VerifyOTP";

// Admin Dashboard System
import AdminDashboard from "./admin/AdminDashboard";

// Protected Pages
import Profile from "./pages/Profile";
import StudentDashboard from "./student/StudentDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";
import CreateTicket from "./student/CreateTicket";

// Protected Route Component
import ProtectedRoute from "./auth/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          {/* ============ PUBLIC PAGES ============ */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Services */}
          <Route path="/services" element={<Services />} />
          <Route path="/services/:category" element={<ServiceCategory />} />
          <Route
            path="/services/:category/:service"
            element={<ServiceDetail />}
          />

          {/* Individual Service Pages */}
          <Route path="/services/overseas-education" element={<OverseasEducation />} />
          <Route path="/services/domestic-admission" element={<DomesticAdmission />} />
          <Route path="/services/education-loan" element={<EducationLoan />} />
          <Route path="/services/visa-immigration" element={<VisaImmigration />} />
          <Route path="/services/document-management" element={<DocumentManagement />} />
          <Route path="/services/career-job-support" element={<CareerJobSupport />} />
          <Route path="/services/it-training" element={<ITTraining />} />
          <Route path="/services/student-support-settlement" element={<StudentSupportSettlement />} />

          {/* Countries */}
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:country" element={<CountryDetail />} />

          {/* ============ AUTH PAGES ============ */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/student" element={<StudentLogin />} />
          <Route path="/login/employee" element={<EmployeeLogin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />

          {/* ============ PROTECTED PAGES ============ */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="student">
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* New Admin Dashboard System */}
          <Route
            path="/admin-system"
            element={<AdminDashboard />}
          />

          <Route
            path="/dashboard/student"
            element={
              <ProtectedRoute role="student">
                <StudentDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/dashboard/employee"
            element={
              <ProtectedRoute role="employee">
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student/create-ticket"
            element={
              <ProtectedRoute role="student">
                <CreateTicket />
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
