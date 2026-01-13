import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  BarChart3,
  Users,
  FileText,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  User,
  Calendar,
  MessageSquare,
  Search,
  Filter,
  Home,
} from "lucide-react";

interface Ticket {
  _id: string;
  studentId: string;
  studentName?: string;
  studentEmail?: string;
  title: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  description?: string;
  priority?: "low" | "medium" | "high";
  category?: string;
  createdAt?: string;
  assignedTo?: string;
}

interface Student {
  id: string;
  name: string;
  email: string;
  country: string;
  status: "active" | "pending" | "completed";
  appliedDate: string;
}

export default function EmployeeDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "tickets" | "students" | "analytics" | "profile">("overview");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Mock ticket data
  const mockTickets: Ticket[] = [
    {
      _id: "1",
      studentId: "s1",
      studentName: "John Doe",
      studentEmail: "john@example.com",
      title: "Visa Documentation Help",
      status: "open",
      priority: "high",
      category: "Visa",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "2",
      studentId: "s2",
      studentName: "Sarah Smith",
      studentEmail: "sarah@example.com",
      title: "Course Selection Query",
      status: "in-progress",
      priority: "medium",
      category: "Academic",
      assignedTo: user?.id || "emp1",
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
      _id: "3",
      studentId: "s3",
      studentName: "Alex Johnson",
      studentEmail: "alex@example.com",
      title: "Accommodation Arrangement",
      status: "resolved",
      priority: "low",
      category: "General",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Mock student data
  const mockStudents: Student[] = [
    { id: "s1", name: "John Doe", email: "john@example.com", country: "UK", status: "active", appliedDate: "2025-10-01" },
    { id: "s2", name: "Sarah Smith", email: "sarah@example.com", country: "USA", status: "pending", appliedDate: "2025-11-15" },
    { id: "s3", name: "Alex Johnson", email: "alex@example.com", country: "Canada", status: "completed", appliedDate: "2025-09-20" },
    { id: "s4", name: "Emma Wilson", email: "emma@example.com", country: "Australia", status: "active", appliedDate: "2025-10-10" },
    { id: "s5", name: "Michael Brown", email: "michael@example.com", country: "UK", status: "pending", appliedDate: "2025-11-25" },
  ];

  useEffect(() => {
    if (!user || user.role !== "employee") {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Simulate API call
        setTickets(mockTickets);
        setStudents(mockStudents);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleUpdateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets((prev) =>
      prev.map((t) =>
        t._id === ticketId ? { ...t, status: newStatus as any } : t
      )
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = selectedStatus === "all" || ticket.status === selectedStatus;
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.studentName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="text-orange-500" size={18} />;
      case "in-progress":
        return <Clock className="text-blue-500" size={18} />;
      case "resolved":
        return <CheckCircle className="text-green-500" size={18} />;
      default:
        return <FileText size={18} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      open: "bg-orange-100 text-orange-800",
      "in-progress": "bg-blue-100 text-blue-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  if (!user || user.role !== "employee") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-[#0A3A5E] to-[#1B5A8E] text-white p-6 overflow-y-auto">
        {/* Logo */}
        <div className="mb-10 pb-6 border-b border-white/20">
          <h2 className="text-2xl font-bold">Premass</h2>
          <p className="text-sm text-orange-300">Support Team</p>
        </div>

        {/* Navigation */}
        <nav className="space-y-3 mb-10">
          {[
            { id: "overview", label: "Overview", icon: Home },
            { id: "tickets", label: "All Tickets", icon: FileText },
            { id: "students", label: "Students", icon: Users },
            { id: "analytics", label: "Analytics", icon: BarChart3 },
            { id: "profile", label: "Profile", icon: User },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  activeTab === item.id
                    ? "bg-[#F5A623] text-white font-semibold"
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
            <h1 className="text-4xl font-bold text-[#0A3A5E] mb-1">
              Support Dashboard 👋
            </h1>
            <p className="text-gray-600">Welcome back, {user.name || "Team Member"}!</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-[#F5A623] to-orange-600 rounded-full flex items-center justify-center">
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
                    <p className="text-gray-600 text-sm font-medium">Total Tickets</p>
                    <p className="text-3xl font-bold text-[#0A3A5E] mt-2">{tickets.length}</p>
                  </div>
                  <FileText className="text-blue-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-orange-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Open Issues</p>
                    <p className="text-3xl font-bold text-[#0A3A5E] mt-2">
                      {tickets.filter((t) => t.status === "open").length}
                    </p>
                  </div>
                  <AlertCircle className="text-orange-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Active Students</p>
                    <p className="text-3xl font-bold text-[#0A3A5E] mt-2">
                      {students.filter((s) => s.status === "active").length}
                    </p>
                  </div>
                  <Users className="text-purple-500" size={40} />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">Resolved</p>
                    <p className="text-3xl font-bold text-[#0A3A5E] mt-2">
                      {tickets.filter((t) => t.status === "resolved").length}
                    </p>
                  </div>
                  <CheckCircle className="text-green-500" size={40} />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-8">
              {/* Top Issues */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A3A5E] mb-4">Pending Tickets</h3>
                <div className="space-y-3">
                  {tickets
                    .filter((t) => t.status === "open")
                    .slice(0, 4)
                    .map((ticket) => (
                      <div key={ticket._id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <AlertCircle className="text-orange-500 mt-1 flex-shrink-0" size={18} />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 text-sm">{ticket.title}</p>
                          <p className="text-xs text-gray-500">{ticket.studentName}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Recent Students */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A3A5E] mb-4">Recent Students</h3>
                <div className="space-y-3">
                  {students.slice(0, 4).map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{student.name}</p>
                        <p className="text-xs text-gray-500">{student.country}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusBadge(student.status)}`}>
                        {student.status}
                      </span>
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
              <h2 className="text-2xl font-bold text-[#0A3A5E]">All Tickets</h2>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#F5A623] focus:outline-none"
                  />
                </div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                  <Filter size={18} />
                  Filter
                </button>
              </div>
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
                <Clock className="mx-auto text-[#F5A623] animate-spin" size={40} />
                <p className="text-gray-600 mt-4">Loading tickets...</p>
              </div>
            ) : filteredTickets.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl">
                <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-600">No tickets found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div key={ticket._id} className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        {getStatusIcon(ticket.status)}
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800">{ticket.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{ticket.studentName} ({ticket.studentEmail})</p>
                          {ticket.description && (
                            <p className="text-gray-600 text-sm mt-2">{ticket.description}</p>
                          )}
                          <div className="flex items-center gap-4 mt-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(ticket.status)}`}>
                              {ticket.status}
                            </span>
                            {ticket.priority && (
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
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
                            {ticket.category && (
                              <span className="text-xs text-gray-500">{ticket.category}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <select
                          value={ticket.status}
                          onChange={(e) => handleUpdateTicketStatus(ticket._id, e.target.value)}
                          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:border-[#F5A623] focus:outline-none"
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                        <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 justify-center">
                          <MessageSquare size={16} />
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STUDENTS TAB */}
        {activeTab === "students" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#0A3A5E]">Students</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#F5A623] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                      <p className="text-sm text-gray-600">{student.email}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-sm text-gray-500 flex items-center gap-1">
                          <Calendar size={16} />
                          Applied: {new Date(student.appliedDate).toLocaleDateString()}
                        </span>
                        <span className="text-sm font-semibold text-gray-700">{student.country}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadge(student.status)}`}>
                        {student.status}
                      </span>
                      <button className="px-4 py-2 bg-[#F5A623] hover:bg-orange-600 text-white rounded-lg text-sm font-semibold transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ANALYTICS TAB */}
        {activeTab === "analytics" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0A3A5E] mb-8">Analytics & Reports</h2>

            <div className="grid grid-cols-2 gap-8">
              {/* Ticket Metrics */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A3A5E] mb-6">Ticket Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Open Tickets</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {tickets.filter((t) => t.status === "open").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                    <span className="font-semibold text-gray-700">In Progress</span>
                    <span className="text-2xl font-bold text-orange-600">
                      {tickets.filter((t) => t.status === "in-progress").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Resolved</span>
                    <span className="text-2xl font-bold text-green-600">
                      {tickets.filter((t) => t.status === "resolved").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Student Metrics */}
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#0A3A5E] mb-6">Student Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Active</span>
                    <span className="text-2xl font-bold text-green-600">
                      {students.filter((s) => s.status === "active").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Pending</span>
                    <span className="text-2xl font-bold text-yellow-600">
                      {students.filter((s) => s.status === "pending").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="font-semibold text-gray-700">Completed</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {students.filter((s) => s.status === "completed").length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === "profile" && (
          <div>
            <h2 className="text-2xl font-bold text-[#0A3A5E] mb-6">Team Member Profile</h2>

            <div className="max-w-2xl">
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#F5A623] to-orange-600 rounded-full flex items-center justify-center">
                    <User className="text-white" size={40} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">{user.name || "Team Member"}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500 capitalize mt-1">Role: {user.role}</p>
                  </div>
                </div>

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

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Tickets Resolved</label>
                      <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-lg text-green-700 font-bold text-xl text-center">
                        {tickets.filter((t) => t.status === "resolved").length}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Active Assignments</label>
                      <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-bold text-xl text-center">
                        {tickets.filter((t) => t.assignedTo === user?.id).length}
                      </div>
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
