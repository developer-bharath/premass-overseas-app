import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft, Paperclip, Send, AlertCircle, CheckCircle } from "lucide-react";

export default function CreateTicket() {
  const [formData, setFormData] = useState({
    title: "",
    category: "academic",
    priority: "medium",
    description: "",
    attachment: null as File | null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Validation
  const validateForm = () => {
    if (!formData.title.trim()) {
      setError("Ticket title is required");
      return false;
    }
    if (formData.title.trim().length < 5) {
      setError("Ticket title must be at least 5 characters");
      return false;
    }
    if (!formData.description.trim()) {
      setError("Description is required");
      return false;
    }
    if (formData.description.trim().length < 10) {
      setError("Description must be at least 10 characters");
      return false;
    }
    if (formData.attachment && formData.attachment.size > 5 * 1024 * 1024) {
      setError("Attachment size must be less than 5MB");
      return false;
    }
    setError("");
    return true;
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        attachment: file,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");

      // Create FormData for multipart upload
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("priority", formData.priority);
      if (formData.attachment) {
        formDataToSend.append("attachment", formData.attachment);
      }

      const response = await fetch("http://localhost:4000/api/student/tickets", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create ticket");
      }

      setSuccess(true);
      setFormData({
        title: "",
        category: "academic",
        priority: "medium",
        description: "",
        attachment: null,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/dashboard/student");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create ticket");
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [
    { id: "academic", label: "Academic" },
    { id: "visa", label: "Visa & Immigration" },
    { id: "accommodation", label: "Accommodation" },
    { id: "financial", label: "Financial" },
    { id: "general", label: "General Inquiry" },
    { id: "technical", label: "Technical Support" },
  ];

  const priorities = [
    { id: "low", label: "Low" },
    { id: "medium", label: "Medium" },
    { id: "high", label: "High" },
  ];

  if (!user || user.role !== "student") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/student")}
          className="flex items-center gap-2 text-[#0A3A5E] hover:text-[#F5A623] font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0A3A5E] mb-2">Create Support Ticket</h1>
          <p className="text-gray-600">Tell us how we can help you</p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-8 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg flex items-start gap-4">
            <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-green-900">Ticket Created Successfully!</h3>
              <p className="text-green-800 text-sm mt-1">
                We've received your support request. Redirecting to dashboard...
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-start gap-4">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-red-900">Error</h3>
              <p className="text-red-800 text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div>
              <label className="block text-sm font-bold text-[#0A3A5E] mb-3">
                Ticket Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Need help with visa application"
                maxLength={100}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#F5A623] focus:outline-none transition-all text-gray-800"
                disabled={isLoading || success}
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.title.length}/100 characters
              </p>
            </div>

            {/* Category & Priority Row */}
            <div className="grid grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-bold text-[#0A3A5E] mb-3">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#F5A623] focus:outline-none transition-all bg-white text-gray-800"
                  disabled={isLoading || success}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-bold text-[#0A3A5E] mb-3">
                  Priority <span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#F5A623] focus:outline-none transition-all bg-white text-gray-800"
                  disabled={isLoading || success}
                >
                  {priorities.map((pri) => (
                    <option key={pri.id} value={pri.id}>
                      {pri.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-[#0A3A5E] mb-3">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide detailed information about your issue or query..."
                rows={6}
                maxLength={1000}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#F5A623] focus:outline-none transition-all text-gray-800 resize-none"
                disabled={isLoading || success}
              />
              <p className="text-xs text-gray-500 mt-2">
                {formData.description.length}/1000 characters
              </p>
            </div>

            {/* Attachment */}
            <div>
              <label className="block text-sm font-bold text-[#0A3A5E] mb-3">
                Attachment <span className="text-gray-400">(Optional - Max 5MB)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                  className="hidden"
                  id="file-input"
                  disabled={isLoading || success}
                />
                <label
                  htmlFor="file-input"
                  className="flex items-center justify-center gap-3 px-6 py-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#F5A623] hover:bg-orange-50 transition-all cursor-pointer"
                >
                  <Paperclip className="text-gray-400" size={20} />
                  <div>
                    <p className="font-semibold text-gray-700">
                      {formData.attachment ? formData.attachment.name : "Click to upload or drag file"}
                    </p>
                    <p className="text-xs text-gray-500">PDF, DOC, TXT, or images</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Info Box */}
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>📝 Note:</strong> Our support team typically responds within 24 hours. You'll receive updates via email.
              </p>
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate("/dashboard/student")}
                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg transition-all disabled:opacity-50"
                disabled={isLoading || success}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F5A623] to-orange-600 hover:shadow-lg text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                disabled={isLoading || success}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin">
                      <Send size={20} />
                    </div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Create Ticket
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Support Info */}
        <div className="mt-12 grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-[#F5A623] mb-2">24h</div>
            <p className="text-gray-600">Average Response Time</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#F5A623] mb-2">500+</div>
            <p className="text-gray-600">Resolved Issues</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-[#F5A623] mb-2">4.9★</div>
            <p className="text-gray-600">Student Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
}

