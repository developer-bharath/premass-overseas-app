// ================================
// ROUTING SETUP – FULL APP
// ================================

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Chatbot from "./components/Chatbot";
import WelcomeModal from "./components/WelcomeModal";

// Public Pages
import Home from "./pages/Home";
import About from "./pages/About";
import EducationLoanSupport from "./pages/EducationLoanSupport";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import ServiceCategory from "./pages/ServiceCategory";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOtp from "./pages/VerifyOtp";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Profile from "./pages/Profile";

// Protected Pages
import ProtectedRoute from "./auth/ProtectedRoute";
import StudentDashboard from "./student/StudentDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";
import CreateTicket from "./student/CreateTicket";

export default function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/education-loan-support" element={<EducationLoanSupport />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:category" element={<ServiceCategory />} />
              <Route path="/services/:category/:service" element={<ServiceDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/countries/:country" element={<CountryDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              
              {/* Protected Routes - Student */}
              <Route
                path="/dashboard/student"
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
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
              
              {/* Protected Routes - Employee */}
              <Route
                path="/dashboard/employee"
                element={
                  <ProtectedRoute role="employee">
                    <EmployeeDashboard />
                  </ProtectedRoute>
                }
              />
              
              {/* Protected Routes - Any Authenticated User */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              
              {/* 404 Page */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#F8FAFC] to-white px-6">
                  <div className="text-center max-w-2xl">
                    <h1 className="text-8xl font-bold text-[#cd9429] mb-4">404</h1>
                    <h2 className="text-4xl font-bold text-[#054374] mb-4">Page Not Found</h2>
                    <p className="text-xl text-gray-600 mb-8">Sorry, the page you're looking for doesn't exist or has been moved.</p>
                    <a href="/" className="group inline-flex items-center gap-2 px-10 py-4 bg-[#cd9429] text-white rounded-lg font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition">
                      <span className="relative">Go Back Home<span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-white/70 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" /></span>
                      <span>→</span>
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
          <WelcomeModal />
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}
