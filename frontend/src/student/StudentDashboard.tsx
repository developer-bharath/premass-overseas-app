import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Settings,
  User,
  Calendar,
  FileText,
  Home,
  ClipboardList,
  Folder,
  Upload,
} from "lucide-react";
import { documentManagementAPI } from "../utils/api";

interface Ticket {
  _id: string;
  title: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  description?: string;
  createdAt?: string;
  category?: string;
  priority?: "low" | "medium" | "high";
}

interface Application {
  id: string;
  country: string;
  university: string;
  status: "applied" | "accepted" | "rejected" | "pending";
  appliedDate: string;
}

interface StudentDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  status: "pending" | "verified" | "rejected";
}

export default function StudentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "applications" | "studentDetails" | "documents">("overview");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [documentsLoading, setDocumentsLoading] = useState(false);
  const [documentsError, setDocumentsError] = useState("");
  const [documentType, setDocumentType] = useState("passport");
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileData, setProfileData] = useState({
    personalDetails: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      nationality: "",
      maritalStatus: "",
      passportNumber: "",
      passportExpiryDate: "",
    },
    contactDetails: {
      primaryMobile: "",
      alternateMobile: "",
      email: "",
      currentAddress: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
    },
    studyLevel: {
      applyingFor: "",
    },
    academicHistory: {
      tenth: {
        schoolName: "",
        board: "",
        yearOfCompletion: "",
        percentage: "",
      },
      twelfth: {
        collegeName: "",
        board: "",
        stream: "",
        yearOfCompletion: "",
        percentage: "",
      },
      bachelorDegree: {
        degreeName: "",
        specialization: "",
        university: "",
        yearOfCompletion: "",
        percentage: "",
      },
    },
    testScores: {
      ielts: "",
      toefl: "",
      pte: "",
      duolingo: "",
      neet: "",
      gre: "",
      gmat: "",
    },
    workExperience: {
      currentlyWorking: false,
      companyName: "",
      jobRole: "",
      fromDate: "",
      toDate: "",
      totalExperience: "",
    },
    studyPreferences: {
      preferredCountry: [] as string[],
      preferredIntake: "",
      preferredCourse: "",
      budgetRange: "",
      accommodationRequired: false,
    },
    visaHistory: {
      previousRefusal: false,
      country: "",
      year: "",
      reason: "",
    },
    referralDetails: {
      referredBy: "",
      referralName: "",
      referralMobile: "",
      referralEmail: "",
      relationship: "",
    },
    documents: {
      passport: false,
      academicCertificates: false,
      transcripts: false,
      testScores: false,
      resume: false,
    },
    declaration: {
      confirmed: false,
      submittedDate: "",
    },
  });

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock applications data
  const [applications] = useState<Application[]>([
    { id: "1", country: "UK", university: "Oxford", status: "accepted", appliedDate: "2025-10-15" },
    { id: "2", country: "USA", university: "Harvard", status: "pending", appliedDate: "2025-11-20" },
    { id: "3", country: "Canada", university: "Toronto", status: "applied", appliedDate: "2025-12-01" },
  ]);

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
      return;
    }
    setProfileData((prev) => ({
      ...prev,
      personalDetails: {
        ...prev.personalDetails,
        fullName: user.name || "",
      },
      contactDetails: {
        ...prev.contactDetails,
        email: user.email || "",
      },
    }));

    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/api/student/tickets", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("Failed to fetch tickets");

        const data = await response.json();
        // Mock data if no API response
        if (!Array.isArray(data)) {
          setTickets([
            { _id: "1", title: "Visa Document Review", status: "in-progress", description: "Reviewing submitted documents", category: "Visa", priority: "high", createdAt: new Date().toISOString() },
            { _id: "2", title: "Course Selection Help", status: "open", description: "Need guidance on course selection", category: "Academics", priority: "medium", createdAt: new Date().toISOString() },
            { _id: "3", title: "Accommodation Query", status: "resolved", description: "Arranged student housing", category: "General", priority: "low", createdAt: new Date().toISOString() },
          ]);
        } else {
          setTickets(data);
        }
      } catch (err) {
        // Show mock data on error
        setTickets([
          { _id: "1", title: "Visa Document Review", status: "in-progress", description: "Reviewing submitted documents", category: "Visa", priority: "high", createdAt: new Date().toISOString() },
          { _id: "2", title: "Course Selection Help", status: "open", description: "Need guidance on course selection", category: "Academics", priority: "medium", createdAt: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchDocuments = async () => {
      try {
        setDocumentsLoading(true);
        setDocumentsError("");
        const response = await documentManagementAPI.getDocuments(1, 20);
        const list = Array.isArray(response?.data) ? response.data : response;
        if (Array.isArray(list)) {
          const normalized = list.map((doc: any) => ({
            id: doc._id || doc.id || String(Math.random()),
            name: doc.name || doc.filename || "Document",
            type: doc.type || doc.category || "General",
            uploadedAt: doc.createdAt || new Date().toISOString(),
            status: doc.status || "pending",
          }));
          setDocuments(normalized);
        }
      } catch (err) {
        setDocumentsError("Unable to load documents. You can still upload new files.");
      } finally {
        setDocumentsLoading(false);
      }
    };
    fetchDocuments();
  }, [user]);

  const updateProfileField = (path: string[], value: any) => {
    setProfileData((prev) => {
      const updated: any = { ...prev };
      let current = updated;
      for (let i = 0; i < path.length - 1; i += 1) {
        const key = path[i];
        current[key] = { ...current[key] };
        current = current[key];
      }
      current[path[path.length - 1]] = value;
      return updated;
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaved(true);
  };

  const handleDocumentUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentFile) {
      setDocumentsError("Please choose a file to upload.");
      return;
    }
    try {
      setDocumentsError("");
      const formData = new FormData();
      formData.append("file", documentFile);
      formData.append("type", documentType);
      const response = await documentManagementAPI.uploadDocument(formData);
      const newDoc = {
        id: response?._id || response?.id || String(Date.now()),
        name: response?.name || documentFile.name,
        type: response?.type || documentType,
        uploadedAt: response?.createdAt || new Date().toISOString(),
        status: response?.status || "pending",
      };
      setDocuments((prev) => [newDoc, ...prev]);
      setDocumentFile(null);
    } catch (err) {
      setDocumentsError("Upload failed. Please try again.");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCreateTicket = () => {
    navigate("/student/create-ticket");
  };

  const filteredTickets =
    selectedStatus === "all" ? tickets : tickets.filter((t) => t.status === selectedStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="text-orange-500" size={18} />;
      case "in-progress":
        return <Clock className="text-blue-500" size={18} />;
      case "resolved":
        return <CheckCircle className="text-green-500" size={18} />;
      case "closed":
        return <CheckCircle className="text-gray-500" size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-orange-50 border-orange-200";
      case "in-progress":
        return "bg-blue-50 border-blue-200";
      case "resolved":
        return "bg-green-50 border-green-200";
      case "closed":
        return "bg-gray-50 border-gray-200";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getApplicationStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      applied: "bg-blue-100 text-blue-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  if (!user || user.role !== "student") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-[#054374] to-[#073a57] text-white p-6 overflow-y-auto">
        {/* Logo */}
        <div className="mb-10 pb-6 border-b border-white/20">
          <h2 className="text-2xl font-bold">Premass</h2>
          <p className="text-sm text-[#cd9429]">Overseas</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 mb-10">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "tickets", label: "My Tickets", icon: FileText },
            { id: "applications", label: "Applications", icon: BookOpen },
            { id: "studentDetails", label: "Student Details", icon: ClipboardList },
            { id: "documents", label: "Documents", icon: Folder },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-[#cd9429] text-white font-semibold"
                    : "text-gray-200 hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 bg-red-600/20 hover:bg-red-600/40 text-red-200 rounded-lg transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-[#054374] mb-1">
              Welcome back, {user.name || "Student"}! 👋
            </h1>
            <p className="text-gray-600">{new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#cd9429] to-[#b8821e] rounded-full flex items-center justify-center">
            <User className="text-white" size={24} />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Open Tickets</p>
                    <p className="text-3xl font-bold text-[#054374] mt-2">
                      {tickets.filter((t) => t.status === "open").length}
                    </p>
                  </div>
                  <AlertCircle className="text-blue-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-[#cd9429]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">In Progress</p>
                    <p className="text-3xl font-bold text-[#054374] mt-2">
                      {tickets.filter((t) => t.status === "in-progress").length}
                    </p>
                  </div>
                  <Clock className="text-[#cd9429]" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Resolved</p>
                    <p className="text-3xl font-bold text-[#054374] mt-2">
                      {tickets.filter((t) => t.status === "resolved").length}
                    </p>
                  </div>
                  <CheckCircle className="text-green-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Applications</p>
                    <p className="text-3xl font-bold text-[#0A3A5E] mt-2">{applications.length}</p>
                  </div>
                  <BookOpen className="text-purple-500" size={40} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-2 gap-8">
              {/* Recent Tickets */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A3A5E] mb-4">Recent Tickets</h3>
                <div className="space-y-3">
                  {tickets.slice(0, 3).map((ticket) => (
                    <div key={ticket._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      {getStatusIcon(ticket.status)}
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{ticket.title}</p>
                        <p className="text-xs text-gray-500 capitalize">{ticket.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Applications */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A3A5E] mb-4">Recent Applications</h3>
                <div className="space-y-3">
                  {applications.slice(0, 3).map((app) => (
                    <div key={app.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <BookOpen className="text-purple-500" size={18} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{app.university}, {app.country}</p>
                        <p className={`text-xs font-semibold capitalize ${getApplicationStatusBadge(app.status)}`}>
                          {app.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TICKETS TAB */}
        {activeTab === "tickets" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A3A5E]">My Tickets</h2>
              <button
                onClick={handleCreateTicket}
                className="flex items-center gap-2 bg-gradient-to-r from-[#F5A623] to-orange-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-semibold"
              >
                <Plus size={20} />
                New Ticket
              </button>
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 mb-6">
              {["all", "open", "in-progress", "resolved"].map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    selectedStatus === status
                      ? "bg-[#F5A623] text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-[#F5A623]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Tickets List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin">
                  <Clock className="text-[#F5A623]" size={40} />
                </div>
                <p className="text-gray-600 mt-4">Loading tickets...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600 mb-4">No tickets found</p>
                <button
                  onClick={handleCreateTicket}
                  className="text-[#F5A623] hover:text-orange-600 font-semibold"
                >
                  Create your first ticket →
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket._id}
                    className={`bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all cursor-pointer ${getStatusColor(ticket.status)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {getStatusIcon(ticket.status)}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">{ticket.title}</h3>
                          {ticket.description && (
                            <p className="text-gray-600 text-sm mt-2">{ticket.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-4">
                            {ticket.category && (
                              <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                                {ticket.category}
                              </span>
                            )}
                            {ticket.createdAt && (
                              <span className="text-xs text-gray-500 flex items-center gap-1">
                                <Calendar size={14} />
                                {new Date(ticket.createdAt).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {ticket.priority && (
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                              ticket.priority === "high"
                                ? "bg-red-100 text-red-800"
                                : ticket.priority === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {ticket.priority}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* APPLICATIONS TAB */}
        {activeTab === "applications" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0A3A5E] mb-6">My Applications</h2>

            <div className="grid grid-cols-3 gap-6">
              {applications.map((app) => (
                <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <BookOpen className="text-purple-500" size={32} />
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getApplicationStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{app.university}</h3>
                  <p className="text-gray-600 font-medium mb-4">{app.country}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2">
                    <Calendar size={14} />
                    Applied: {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                  <button className="mt-4 w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-lg font-semibold transition-all">
                    View Details
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENT DETAILS TAB */}
        {activeTab === "studentDetails" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A3A5E]">Student Details</h2>
              {profileSaved && (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                  Saved successfully
                </span>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Personal Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={profileData.personalDetails.fullName}
                    onChange={(e) => updateProfileField(["personalDetails", "fullName"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Gender"
                    value={profileData.personalDetails.gender}
                    onChange={(e) => updateProfileField(["personalDetails", "gender"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="date"
                    value={profileData.personalDetails.dateOfBirth}
                    onChange={(e) => updateProfileField(["personalDetails", "dateOfBirth"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Nationality"
                    value={profileData.personalDetails.nationality}
                    onChange={(e) => updateProfileField(["personalDetails", "nationality"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Marital Status"
                    value={profileData.personalDetails.maritalStatus}
                    onChange={(e) => updateProfileField(["personalDetails", "maritalStatus"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Passport Number"
                    value={profileData.personalDetails.passportNumber}
                    onChange={(e) => updateProfileField(["personalDetails", "passportNumber"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="date"
                    value={profileData.personalDetails.passportExpiryDate}
                    onChange={(e) => updateProfileField(["personalDetails", "passportExpiryDate"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Contact Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Primary Mobile"
                    value={profileData.contactDetails.primaryMobile}
                    onChange={(e) => updateProfileField(["contactDetails", "primaryMobile"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Alternate Mobile"
                    value={profileData.contactDetails.alternateMobile}
                    onChange={(e) => updateProfileField(["contactDetails", "alternateMobile"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileData.contactDetails.email}
                    onChange={(e) => updateProfileField(["contactDetails", "email"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Current Address"
                    value={profileData.contactDetails.currentAddress}
                    onChange={(e) => updateProfileField(["contactDetails", "currentAddress"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={profileData.contactDetails.city}
                    onChange={(e) => updateProfileField(["contactDetails", "city"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    value={profileData.contactDetails.state}
                    onChange={(e) => updateProfileField(["contactDetails", "state"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={profileData.contactDetails.country}
                    onChange={(e) => updateProfileField(["contactDetails", "country"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={profileData.contactDetails.postalCode}
                    onChange={(e) => updateProfileField(["contactDetails", "postalCode"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Study Level</h3>
                <input
                  type="text"
                  placeholder="Applying For (Foundation | Diploma | UG | PG | MBBS | PhD)"
                  value={profileData.studyLevel.applyingFor}
                  onChange={(e) => updateProfileField(["studyLevel", "applyingFor"], e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                />
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-[#054374]">Academic History</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="10th School Name"
                    value={profileData.academicHistory.tenth.schoolName}
                    onChange={(e) => updateProfileField(["academicHistory", "tenth", "schoolName"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="10th Board"
                    value={profileData.academicHistory.tenth.board}
                    onChange={(e) => updateProfileField(["academicHistory", "tenth", "board"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="10th Year of Completion"
                    value={profileData.academicHistory.tenth.yearOfCompletion}
                    onChange={(e) => updateProfileField(["academicHistory", "tenth", "yearOfCompletion"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="10th Percentage"
                    value={profileData.academicHistory.tenth.percentage}
                    onChange={(e) => updateProfileField(["academicHistory", "tenth", "percentage"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="12th College Name"
                    value={profileData.academicHistory.twelfth.collegeName}
                    onChange={(e) => updateProfileField(["academicHistory", "twelfth", "collegeName"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="12th Board"
                    value={profileData.academicHistory.twelfth.board}
                    onChange={(e) => updateProfileField(["academicHistory", "twelfth", "board"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="12th Stream"
                    value={profileData.academicHistory.twelfth.stream}
                    onChange={(e) => updateProfileField(["academicHistory", "twelfth", "stream"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="12th Year of Completion"
                    value={profileData.academicHistory.twelfth.yearOfCompletion}
                    onChange={(e) => updateProfileField(["academicHistory", "twelfth", "yearOfCompletion"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="12th Percentage"
                    value={profileData.academicHistory.twelfth.percentage}
                    onChange={(e) => updateProfileField(["academicHistory", "twelfth", "percentage"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Bachelor Degree Name"
                    value={profileData.academicHistory.bachelorDegree.degreeName}
                    onChange={(e) => updateProfileField(["academicHistory", "bachelorDegree", "degreeName"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Specialization"
                    value={profileData.academicHistory.bachelorDegree.specialization}
                    onChange={(e) => updateProfileField(["academicHistory", "bachelorDegree", "specialization"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="University"
                    value={profileData.academicHistory.bachelorDegree.university}
                    onChange={(e) => updateProfileField(["academicHistory", "bachelorDegree", "university"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Bachelor Year of Completion"
                    value={profileData.academicHistory.bachelorDegree.yearOfCompletion}
                    onChange={(e) => updateProfileField(["academicHistory", "bachelorDegree", "yearOfCompletion"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Bachelor Percentage"
                    value={profileData.academicHistory.bachelorDegree.percentage}
                    onChange={(e) => updateProfileField(["academicHistory", "bachelorDegree", "percentage"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Test Scores</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {["ielts", "toefl", "pte", "duolingo", "neet", "gre", "gmat"].map((score) => (
                    <input
                      key={score}
                      type="text"
                      placeholder={score.toUpperCase()}
                      value={(profileData.testScores as any)[score]}
                      onChange={(e) => updateProfileField(["testScores", score], e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                    />
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Work Experience</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData.workExperience.currentlyWorking}
                      onChange={(e) => updateProfileField(["workExperience", "currentlyWorking"], e.target.checked)}
                    />
                    <span>Currently Working</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Company Name"
                    value={profileData.workExperience.companyName}
                    onChange={(e) => updateProfileField(["workExperience", "companyName"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Job Role"
                    value={profileData.workExperience.jobRole}
                    onChange={(e) => updateProfileField(["workExperience", "jobRole"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="date"
                    value={profileData.workExperience.fromDate}
                    onChange={(e) => updateProfileField(["workExperience", "fromDate"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="date"
                    value={profileData.workExperience.toDate}
                    onChange={(e) => updateProfileField(["workExperience", "toDate"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Total Experience"
                    value={profileData.workExperience.totalExperience}
                    onChange={(e) => updateProfileField(["workExperience", "totalExperience"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Study Preferences</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Preferred Countries (comma separated)"
                    value={profileData.studyPreferences.preferredCountry.join(", ")}
                    onChange={(e) =>
                      updateProfileField(
                        ["studyPreferences", "preferredCountry"],
                        e.target.value.split(",").map((c) => c.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Preferred Intake"
                    value={profileData.studyPreferences.preferredIntake}
                    onChange={(e) => updateProfileField(["studyPreferences", "preferredIntake"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Preferred Course"
                    value={profileData.studyPreferences.preferredCourse}
                    onChange={(e) => updateProfileField(["studyPreferences", "preferredCourse"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Budget Range"
                    value={profileData.studyPreferences.budgetRange}
                    onChange={(e) => updateProfileField(["studyPreferences", "budgetRange"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData.studyPreferences.accommodationRequired}
                      onChange={(e) => updateProfileField(["studyPreferences", "accommodationRequired"], e.target.checked)}
                    />
                    <span>Accommodation Required</span>
                  </label>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Visa History</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData.visaHistory.previousRefusal}
                      onChange={(e) => updateProfileField(["visaHistory", "previousRefusal"], e.target.checked)}
                    />
                    <span>Previous Refusal</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Country"
                    value={profileData.visaHistory.country}
                    onChange={(e) => updateProfileField(["visaHistory", "country"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={profileData.visaHistory.year}
                    onChange={(e) => updateProfileField(["visaHistory", "year"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Reason"
                    value={profileData.visaHistory.reason}
                    onChange={(e) => updateProfileField(["visaHistory", "reason"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Referral Details</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Referred By (Friend | Relative | Agent | Social Media)"
                    value={profileData.referralDetails.referredBy}
                    onChange={(e) => updateProfileField(["referralDetails", "referredBy"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Referral Name"
                    value={profileData.referralDetails.referralName}
                    onChange={(e) => updateProfileField(["referralDetails", "referralName"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Referral Mobile"
                    value={profileData.referralDetails.referralMobile}
                    onChange={(e) => updateProfileField(["referralDetails", "referralMobile"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="email"
                    placeholder="Referral Email"
                    value={profileData.referralDetails.referralEmail}
                    onChange={(e) => updateProfileField(["referralDetails", "referralEmail"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Relationship"
                    value={profileData.referralDetails.relationship}
                    onChange={(e) => updateProfileField(["referralDetails", "relationship"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Document Checklist</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.keys(profileData.documents).map((docKey) => (
                    <label key={docKey} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={(profileData.documents as any)[docKey]}
                        onChange={(e) => updateProfileField(["documents", docKey], e.target.checked)}
                      />
                      <span className="capitalize">{docKey.replace(/([A-Z])/g, " $1")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Declaration</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={profileData.declaration.confirmed}
                      onChange={(e) => updateProfileField(["declaration", "confirmed"], e.target.checked)}
                    />
                    <span>I confirm the above details are correct.</span>
                  </label>
                  <input
                    type="date"
                    value={profileData.declaration.submittedDate}
                    onChange={(e) => updateProfileField(["declaration", "submittedDate"], e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#F5A623] text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Save Student Details
                </button>
                <button
                  type="button"
                  onClick={() => setProfileSaved(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {activeTab === "documents" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A3A5E]">Documents</h2>
              <button
                onClick={() => navigate("/student/create-ticket")}
                className="flex items-center gap-2 text-[#F5A623] font-semibold"
              >
                <Upload size={18} />
                Need help? Raise a ticket
              </button>
            </div>

            <div className="grid lg:grid-cols-[1fr_320px] gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Uploaded Documents</h3>
                {documentsLoading ? (
                  <p className="text-gray-500">Loading documents...</p>
                ) : documents.length === 0 ? (
                  <p className="text-gray-500">No documents uploaded yet.</p>
                ) : (
                  <div className="space-y-3">
                    {documents.map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between border border-gray-200 rounded-lg p-4">
                        <div>
                          <p className="font-semibold text-gray-800">{doc.name}</p>
                          <p className="text-xs text-gray-500">{doc.type} • {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                        </div>
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          doc.status === "verified" ? "bg-green-100 text-green-700" :
                          doc.status === "rejected" ? "bg-red-100 text-red-700" :
                          "bg-yellow-100 text-yellow-700"
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {documentsError && <p className="text-red-600 text-sm mt-3">{documentsError}</p>}
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#054374] mb-4">Upload New Document</h3>
                <form onSubmit={handleDocumentUpload} className="space-y-4">
                  <select
                    value={documentType}
                    onChange={(e) => setDocumentType(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg"
                  >
                    <option value="passport">Passport</option>
                    <option value="academicCertificates">Academic Certificates</option>
                    <option value="transcripts">Transcripts</option>
                    <option value="testScores">Test Scores</option>
                    <option value="resume">Resume</option>
                    <option value="other">Other</option>
                  </select>
                  <input
                    type="file"
                    onChange={(e) => setDocumentFile(e.target.files?.[0] || null)}
                    className="w-full text-sm"
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#054374] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Upload Document
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
