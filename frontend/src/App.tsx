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

// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";

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

          {/* Countries */}
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:country" element={<CountryDetail />} />

          {/* ============ AUTH PAGES ============ */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />

          {/* ============ PROTECTED PAGES ============ */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute role="student">
                <Profile />
              </ProtectedRoute>
            }
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
