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
} from "lucide-react";

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

export default function StudentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "applications" | "profile">("overview");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

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
            { id: "profile", label: "Profile", icon: User },
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

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0A3A5E] mb-6">My Profile</h2>

            <div className="max-w-2xl">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F5A623] to-orange-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{user.name || "Student Name"}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500 capitalize mt-1">Role: {user.role}</p>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={user.name || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Status</label>
                    <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
                      ✓ Active
                    </div>
                  </div>

                  <div className="pt-6 flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                      <Settings size={18} />
                      Edit Profile
                    </button>
                    <button className="flex-1 px-4 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-semibold transition-all">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
