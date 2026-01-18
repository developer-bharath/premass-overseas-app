import axios, { AxiosInstance, AxiosError } from 'axios';

// ============================================
// API Configuration
// ============================================

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:3001/api/v1';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

// ============================================
// API Client Setup
// ============================================

class ApiClient {
  private client: AxiosInstance;
  private token: string | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Load token from localStorage
    this.token = localStorage.getItem('authToken');
    this.setupInterceptors();
  }

  // ============================================
  // Setup Interceptors
  // ============================================

  private setupInterceptors() {
    // Request interceptor - add token to headers
    this.client.interceptors.request.use(
      (config: any) => {
        if (this.token) {
          config.headers.Authorization = `Bearer ${this.token}`;
        }
        return config;
      },
      (error: any) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors and token refresh
    this.client.interceptors.response.use(
      (response: any) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Handle 401 - Token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
              this.logout();
              return Promise.reject(error);
            }

            const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
              refreshToken,
            });

            const { token } = response.data;
            this.setToken(token);

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        return Promise.reject(error);
      }
    );
  }

  // ============================================
  // Token Management
  // ============================================

  public setToken(token: string): void {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  public setRefreshToken(refreshToken: string): void {
    localStorage.setItem('refreshToken', refreshToken);
  }

  public getToken(): string | null {
    return this.token;
  }

  // ============================================
  // Authentication Endpoints
  // ============================================

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await this.client.post<ApiResponse<AuthResponse>>(
        '/auth/login',
        credentials
      );

      if (response.data.data) {
        const { token, refreshToken } = response.data.data;
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        return response.data.data;
      }

      throw new Error('No authentication data returned');
    } catch (error) {
      console.error('Login error:', error);
      throw this.handleError(error);
    }
  }

  async register(userData: any): Promise<AuthResponse> {
    try {
      const response = await this.client.post<ApiResponse<AuthResponse>>(
        '/auth/register',
        userData
      );

      if (response.data.data) {
        const { token, refreshToken } = response.data.data;
        this.setToken(token);
        this.setRefreshToken(refreshToken);
        return response.data.data;
      }

      throw new Error('No authentication data returned');
    } catch (error) {
      console.error('Register error:', error);
      throw this.handleError(error);
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.token = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
    }
  }

  // ============================================
  // Employee Endpoints
  // ============================================

  async getEmployees(): Promise<any[]> {
    try {
      const response = await this.client.get<ApiResponse<any[]>>('/employees');
      return response.data.data || [];
    } catch (error) {
      console.error('Get employees error:', error);
      throw this.handleError(error);
    }
  }

  async getEmployee(id: string): Promise<any> {
    try {
      const response = await this.client.get<ApiResponse<any>>(
        `/employees/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Get employee error:', error);
      throw this.handleError(error);
    }
  }

  async createEmployee(employeeData: any): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>(
        '/employees',
        employeeData
      );
      return response.data.data;
    } catch (error) {
      console.error('Create employee error:', error);
      throw this.handleError(error);
    }
  }

  async updateEmployee(id: string, employeeData: any): Promise<any> {
    try {
      const response = await this.client.put<ApiResponse<any>>(
        `/employees/${id}`,
        employeeData
      );
      return response.data.data;
    } catch (error) {
      console.error('Update employee error:', error);
      throw this.handleError(error);
    }
  }

  async deleteEmployee(id: string): Promise<void> {
    try {
      await this.client.delete(`/employees/${id}`);
    } catch (error) {
      console.error('Delete employee error:', error);
      throw this.handleError(error);
    }
  }

  // ============================================
  // Role Endpoints
  // ============================================

  async getRoles(): Promise<any[]> {
    try {
      const response = await this.client.get<ApiResponse<any[]>>('/roles');
      return response.data.data || [];
    } catch (error) {
      console.error('Get roles error:', error);
      throw this.handleError(error);
    }
  }

  async getRole(id: string): Promise<any> {
    try {
      const response = await this.client.get<ApiResponse<any>>(`/roles/${id}`);
      return response.data.data;
    } catch (error) {
      console.error('Get role error:', error);
      throw this.handleError(error);
    }
  }

  async createRole(roleData: any): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>(
        '/roles',
        roleData
      );
      return response.data.data;
    } catch (error) {
      console.error('Create role error:', error);
      throw this.handleError(error);
    }
  }

  async updateRole(id: string, roleData: any): Promise<any> {
    try {
      const response = await this.client.put<ApiResponse<any>>(
        `/roles/${id}`,
        roleData
      );
      return response.data.data;
    } catch (error) {
      console.error('Update role error:', error);
      throw this.handleError(error);
    }
  }

  async deleteRole(id: string): Promise<void> {
    try {
      await this.client.delete(`/roles/${id}`);
    } catch (error) {
      console.error('Delete role error:', error);
      throw this.handleError(error);
    }
  }

  // ============================================
  // Permission Endpoints
  // ============================================

  async getPermissions(): Promise<any[]> {
    try {
      const response = await this.client.get<ApiResponse<any[]>>(
        '/permissions'
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Get permissions error:', error);
      throw this.handleError(error);
    }
  }

  async getPermission(id: string): Promise<any> {
    try {
      const response = await this.client.get<ApiResponse<any>>(
        `/permissions/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Get permission error:', error);
      throw this.handleError(error);
    }
  }

  async createPermission(permissionData: any): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>(
        '/permissions',
        permissionData
      );
      return response.data.data;
    } catch (error) {
      console.error('Create permission error:', error);
      throw this.handleError(error);
    }
  }

  async updatePermission(id: string, permissionData: any): Promise<any> {
    try {
      const response = await this.client.put<ApiResponse<any>>(
        `/permissions/${id}`,
        permissionData
      );
      return response.data.data;
    } catch (error) {
      console.error('Update permission error:', error);
      throw this.handleError(error);
    }
  }

  async deletePermission(id: string): Promise<void> {
    try {
      await this.client.delete(`/permissions/${id}`);
    } catch (error) {
      console.error('Delete permission error:', error);
      throw this.handleError(error);
    }
  }

  // ============================================
  // Permission Assignment Endpoints
  // ============================================

  async getAssignments(): Promise<any[]> {
    try {
      const response = await this.client.get<ApiResponse<any[]>>(
        '/assignments'
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Get assignments error:', error);
      throw this.handleError(error);
    }
  }

  async getAssignment(id: string): Promise<any> {
    try {
      const response = await this.client.get<ApiResponse<any>>(
        `/assignments/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error('Get assignment error:', error);
      throw this.handleError(error);
    }
  }

  async createAssignment(assignmentData: any): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>(
        '/assignments',
        assignmentData
      );
      return response.data.data;
    } catch (error) {
      console.error('Create assignment error:', error);
      throw this.handleError(error);
    }
  }

  async updateAssignment(id: string, assignmentData: any): Promise<any> {
    try {
      const response = await this.client.put<ApiResponse<any>>(
        `/assignments/${id}`,
        assignmentData
      );
      return response.data.data;
    } catch (error) {
      console.error('Update assignment error:', error);
      throw this.handleError(error);
    }
  }

  async deleteAssignment(id: string): Promise<void> {
    try {
      await this.client.delete(`/assignments/${id}`);
    } catch (error) {
      console.error('Delete assignment error:', error);
      throw this.handleError(error);
    }
  }

  // ============================================
  // Dashboard Options Endpoints
  // ============================================

  async getDashboardOptions(): Promise<any[]> {
    try {
      const response = await this.client.get<ApiResponse<any[]>>(
        '/dashboard-options'
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Get dashboard options error:', error);
      throw this.handleError(error);
    }
  }

  async createDashboardOption(optionData: any): Promise<any> {
    try {
      const response = await this.client.post<ApiResponse<any>>(
        '/dashboard-options',
        optionData
      );
      return response.data.data;
    } catch (error) {
      console.error('Create dashboard option error:', error);
      throw this.handleError(error);
    }
  }

  async updateDashboardOption(id: string, optionData: any): Promise<any> {
    try {
      const response = await this.client.put<ApiResponse<any>>(
        `/dashboard-options/${id}`,
        optionData
      );
      return response.data.data;
    } catch (error) {
      console.error('Update dashboard option error:', error);
      throw this.handleError(error);
    }
  }

  async deleteDashboardOption(id: string): Promise<void> {
    try {
      await this.client.delete(`/dashboard-options/${id}`);
    } catch (error) {
      console.error('Delete dashboard option error:', error);
      throw this.handleError(error);
    }
  }

  // ============================================
  // Error Handling
  // ============================================

  private handleError(error: any): Error {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      return new Error(message);
    }
    return error as Error;
  }
}

// ============================================
// Export Singleton Instance
// ============================================

export const apiClient = new ApiClient();

export default apiClient;
