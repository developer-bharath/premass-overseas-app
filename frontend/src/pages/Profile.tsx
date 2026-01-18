import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Fetch user profile data from backend
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const endpoint =
          user.role === "student"
            ? "/api/student/profile"
            : "/api/employee/profile";

        const res = await fetch(`http://localhost:4000${endpoint}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#054374] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-white">My Profile</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Account Information
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p className="text-lg text-gray-900">{user.name}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-lg text-gray-900">{user.email}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      User Type
                    </label>
                    <p className="text-lg text-gray-900 capitalize">
                      {user.role}
                    </p>
                  </div>

                  {profileData && (
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <p className="text-lg text-gray-900 capitalize">
                        {profileData.status || "Active"}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => navigate(`/dashboard/${user.role}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Go to Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="bg-white rounded-lg shadow p-6 h-fit">
              <h3 className="font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {user.role === "student" && (
                  <>
                    <li>
                      <a
                        href="/dashboard/student"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="/student/create-ticket"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Create Ticket
                      </a>
                    </li>
                  </>
                )}
                {user.role === "employee" && (
                  <li>
                    <a
                      href="/dashboard/employee"
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View Dashboard
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href="/services"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Browse Services
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Contact Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
