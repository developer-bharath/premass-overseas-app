// API Service - All backend endpoints and request handling
// Read Vite env at build-time via import.meta.env
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'https://premass-overseas-app-production.up.railway.app';


// ===== TOKEN MANAGEMENT =====
export const getToken = () => localStorage.getItem('token');
export const setToken = (token: string) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ===== ERROR HANDLING =====
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    try {
      const error = await response.json();
      throw new Error(error.message || `HTTP ${response.status}`);
    } catch (e) {
      throw new Error(`HTTP ${response.status}: Failed to connect to server`);
    }
  }
  return response.json();
};

// ===== AUTH ENDPOINTS =====
export const authAPI = {
  register: async (data: {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, role: data.role || "student" }),
    });
    return handleResponse(response);
  },

  login: async (data: { email: string; password: string }) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await handleResponse(response);
    if (result.token) setToken(result.token);
    return result;
  },

  getProfile: async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  logout: () => {
    removeToken();
  },
};


// ===== OVERSEAS EDUCATION ENDPOINTS =====
export const overseasEducationAPI = {
  getApplications: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/overseas-education?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createApplication: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/overseas-education`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateApplication: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/overseas-education/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteApplication: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/overseas-education/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/overseas-education/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== DOMESTIC ADMISSION ENDPOINTS =====
export const domesticAdmissionAPI = {
  getApplications: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/domestic-admission?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createApplication: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/domestic-admission`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateApplication: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/domestic-admission/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteApplication: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/domestic-admission/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/domestic-admission/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== EDUCATION LOAN ENDPOINTS =====
export const educationLoanAPI = {
  getApplications: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/education-loan?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createApplication: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/education-loan`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateApplication: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/education-loan/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteApplication: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/education-loan/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/education-loan/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== VISA & IMMIGRATION ENDPOINTS =====
export const visaImmigrationAPI = {
  getApplications: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/visa-immigration?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createApplication: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/visa-immigration`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateApplication: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/visa-immigration/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteApplication: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/visa-immigration/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/visa-immigration/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== DOCUMENT MANAGEMENT ENDPOINTS =====
export const documentManagementAPI = {
  getDocuments: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/documents?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  uploadDocument: async (formData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${getToken()}` },
      body: formData,
    });
    return handleResponse(response);
  },

  verifyDocument: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/documents/${id}/verify`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  deleteDocument: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/documents/analytics/dashboard`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== CAREER JOB SUPPORT ENDPOINTS =====
export const careerJobSupportAPI = {
  getCandidates: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/career-job-support?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createCandidate: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/career-job-support`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateCandidate: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/career-job-support/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteCandidate: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/career-job-support/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/career-job-support/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== IT TRAINING ENDPOINTS =====
export const itTrainingAPI = {
  getEnrollments: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/it-training?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createEnrollment: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/it-training`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateEnrollment: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/it-training/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteEnrollment: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/it-training/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/it-training/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== STUDENT SUPPORT & SETTLEMENT ENDPOINTS =====
export const studentSupportSettlementAPI = {
  getCases: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/student-support-settlement?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createCase: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/student-support-settlement`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateCase: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/student-support-settlement/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  deleteCase: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/student-support-settlement/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },

  getStats: async () => {
    const response = await fetch(`${API_BASE_URL}/student-support-settlement/stats`, {
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

// ===== TICKET MANAGEMENT ENDPOINTS =====
export const ticketAPI = {
  getTickets: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/tickets?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createTicket: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/tickets`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateTicket: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  addComment: async (ticketId: string, data: { message: string }) => {
    const response = await fetch(`${API_BASE_URL}/tickets/${ticketId}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },
};

// ===== TASK MANAGEMENT ENDPOINTS =====
export const taskAPI = {
  getTasks: async (page = 1, limit = 10) => {
    const response = await fetch(
      `${API_BASE_URL}/tasks?page=${page}&limit=${limit}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(response);
  },

  createTask: async (data: any) => {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  updateTask: async (id: string, data: any) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  completeTask: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/tasks/${id}/complete`, {
      method: 'PUT',
      headers: getAuthHeaders(),
    });
    return handleResponse(response);
  },
};

export default {
  authAPI,
  overseasEducationAPI,
  domesticAdmissionAPI,
  educationLoanAPI,
  visaImmigrationAPI,
  documentManagementAPI,
  careerJobSupportAPI,
  itTrainingAPI,
  studentSupportSettlementAPI,
  ticketAPI,
  taskAPI,
};
