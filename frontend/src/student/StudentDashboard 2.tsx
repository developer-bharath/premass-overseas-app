import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import TicketComments from "./TicketComments";

type Ticket = {
  _id: string;
  title: string;
  status: string;
  description?: string;
  createdAt?: string;
};

export default function StudentDashboard() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user.role !== "student") {
      navigate("/login");
      return;
    }

    fetchTickets();
  }, [user, navigate, token]);

  const fetchTickets = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:4000/api/student/tickets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch tickets");

      const data = await res.json();
      setTickets(Array.isArray(data) ? data : data.tickets || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tickets");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      open: "bg-blue-100 text-blue-800",
      "in-progress": "bg-yellow-100 text-yellow-800",
      resolved: "bg-green-100 text-green-800",
      closed: "bg-gray-100 text-gray-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user.name}
            </h1>
            <p className="text-gray-600 text-sm mt-1">Student Dashboard</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              My Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Total Tickets</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {tickets.length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Active</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {tickets.filter((t) => t.status === "open").length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm font-medium">Resolved</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {tickets.filter((t) => t.status === "resolved").length}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mb-6">
          <a
            href="/student/create-ticket"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Create New Ticket
          </a>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Tickets Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Tickets</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">Loading tickets...</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600 mb-4">No tickets created yet.</p>
              <a
                href="/student/create-ticket"
                className="text-blue-600 hover:underline font-semibold"
              >
                Create your first ticket
              </a>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="p-6 hover:bg-slate-50 transition"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {ticket.title}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                  </div>

                  {ticket.description && (
                    <p className="text-gray-600 text-sm mb-3">
                      {ticket.description}
                    </p>
                  )}

                  {ticket.createdAt && (
                    <p className="text-xs text-gray-500 mb-4">
                      Created on{" "}
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                  )}

                  <details className="text-sm">
                    <summary className="cursor-pointer text-blue-600 hover:underline font-medium">
                      View Comments
                    </summary>
                    <div className="mt-4">
                      <TicketComments ticketId={ticket._id} />
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
