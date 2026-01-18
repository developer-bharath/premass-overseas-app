# API Integration Guide

## Overview
This document explains how to integrate frontend forms and tables with backend REST APIs.

## Files Created

### 1. **API Service File** (`src/utils/api.ts`)
Centralized API client with all endpoints organized by service:
- Authentication (register, login, logout)
- Overseas Education
- Domestic Admission
- Education Loan
- Visa & Immigration
- Document Management
- Career Job Support
- IT Training
- Student Support & Settlement
- Tickets & Tasks

**Features:**
- Automatic token management
- Error handling with redirects
- Consistent header management
- Request/response handling

### 2. **Custom Hooks** (`src/hooks/useAPI.ts`)
Three reusable hooks for different API scenarios:

#### `useFetch(fetchFn, dependencies)`
For GET requests with automatic loading/error states.
```typescript
const { data, loading, error, refetch } = useFetch(
  () => overseasEducationAPI.getApplications(),
  []
);
```

#### `useAsync(asyncFunction, immediate)`
For one-time async operations.
```typescript
const { execute, status, value, error } = useAsync(
  () => overseasEducationAPI.createApplication(data),
  false // Don't run immediately
);
```

#### `useFormSubmit(onSubmit)`
For form submissions with loading/error states.
```typescript
const { handleSubmit, loading, error, success } = useFormSubmit(
  (data) => overseasEducationAPI.createApplication(data)
);
```

## How to Use

### 1. Import API and Hooks
```typescript
import { overseasEducationAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';
```

### 2. Fetch Data on Component Mount
```typescript
const { data, loading, error, refetch } = useFetch(
  () => overseasEducationAPI.getApplications(1, 10),
  []
);

const applications = data?.data || [];
```

### 3. Handle Form Submission
```typescript
const { handleSubmit, loading, error } = useFormSubmit(
  (formData) => overseasEducationAPI.createApplication(formData)
);

const onSubmit = async () => {
  try {
    await handleSubmit(formData);
    refetch(); // Refresh data
  } catch (err) {
    console.error('Error:', err);
  }
};
```

### 4. Display Loading/Error States
```typescript
{loading && <Loader className="animate-spin" />}
{error && <ErrorMessage>{error}</ErrorMessage>}
{!loading && !error && <DataTable data={data} />}
```

### 5. Delete Operation
```typescript
const deleteHandler = async (id) => {
  try {
    await overseasEducationAPI.deleteApplication(id);
    refetch(); // Refresh list
  } catch (err) {
    alert('Failed to delete');
  }
};
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/verify-otp` - Verify OTP
- `GET /auth/profile` - Get user profile

### Overseas Education
- `GET /overseas-education?page=1&limit=10` - List applications
- `POST /overseas-education` - Create application
- `PUT /overseas-education/:id` - Update application
- `DELETE /overseas-education/:id` - Delete application
- `GET /overseas-education/stats` - Get statistics

### Domestic Admission
- `GET /domestic-admission?page=1&limit=10` - List applications
- `POST /domestic-admission` - Create application
- `PUT /domestic-admission/:id` - Update application
- `DELETE /domestic-admission/:id` - Delete application
- `GET /domestic-admission/stats` - Get statistics

### Education Loan
- `GET /education-loan?page=1&limit=10` - List applications
- `POST /education-loan` - Create application
- `PUT /education-loan/:id` - Update application
- `DELETE /education-loan/:id` - Delete application
- `GET /education-loan/stats` - Get statistics

### Visa & Immigration
- `GET /visa-immigration?page=1&limit=10` - List applications
- `POST /visa-immigration` - Create application
- `PUT /visa-immigration/:id` - Update application
- `DELETE /visa-immigration/:id` - Delete application
- `GET /visa-immigration/stats` - Get statistics

### Document Management
- `GET /document-management?page=1&limit=10` - List documents
- `POST /document-management/upload` - Upload document
- `PUT /document-management/:id/verify` - Verify document
- `DELETE /document-management/:id` - Delete document
- `GET /document-management/stats` - Get statistics

### Career Job Support
- `GET /career-job-support?page=1&limit=10` - List candidates
- `POST /career-job-support` - Create candidate
- `PUT /career-job-support/:id` - Update candidate
- `DELETE /career-job-support/:id` - Delete candidate
- `GET /career-job-support/stats` - Get statistics

### IT Training
- `GET /it-training?page=1&limit=10` - List enrollments
- `POST /it-training` - Create enrollment
- `PUT /it-training/:id` - Update enrollment
- `DELETE /it-training/:id` - Delete enrollment
- `GET /it-training/stats` - Get statistics

### Student Support & Settlement
- `GET /student-support-settlement?page=1&limit=10` - List cases
- `POST /student-support-settlement` - Create case
- `PUT /student-support-settlement/:id` - Update case
- `DELETE /student-support-settlement/:id` - Delete case
- `GET /student-support-settlement/stats` - Get statistics

### Tickets
- `GET /tickets?page=1&limit=10` - List tickets
- `POST /tickets` - Create ticket
- `PUT /tickets/:id` - Update ticket
- `POST /tickets/:id/comments` - Add comment

### Tasks
- `GET /tasks?page=1&limit=10` - List tasks
- `POST /tasks` - Create task
- `PUT /tasks/:id` - Update task
- `PUT /tasks/:id/complete` - Complete task

## Example: Complete Admin Dashboard Component

```typescript
import React, { useState } from 'react';
import { overseasEducationAPI } from '../utils/api';
import { useFetch, useFormSubmit } from '../hooks/useAPI';
import { Loader, AlertCircle } from 'lucide-react';

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    destination: '',
  });

  // Fetch data
  const { data, loading, error, refetch } = useFetch(
    () => overseasEducationAPI.getApplications(1, 50),
    []
  );

  // Form submission
  const { handleSubmit, loading: submitLoading, error: submitError } = useFormSubmit(
    (data) => overseasEducationAPI.createApplication(data)
  );

  const applications = data?.data || [];
  const filteredApplications = applications.filter(app =>
    app.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onAddApplication = async () => {
    try {
      await handleSubmit(formData);
      setFormData({ name: '', email: '', destination: '' });
      setShowAddForm(false);
      refetch(); // Refresh list
    } catch (err) {
      console.error('Error:', err);
    }
  };

  if (loading) return <div className="p-8"><Loader className="animate-spin" /></div>;
  if (error) return <div className="p-8 text-red-600"><AlertCircle /> {error}</div>;

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border rounded px-3 py-2 mb-4 w-full"
      />

      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          {submitError && <div className="text-red-600 mb-4">{submitError}</div>}
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="border rounded px-3 py-2 mb-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="border rounded px-3 py-2 mb-2 w-full"
          />
          <button
            onClick={onAddApplication}
            disabled={submitLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
          >
            {submitLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
      )}

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Destination</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map(app => (
            <tr key={app.id} className="border-b">
              <td className="px-6 py-4">{app.name}</td>
              <td className="px-6 py-4">{app.email}</td>
              <td className="px-6 py-4">{app.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

## Error Handling

All API errors are automatically caught and include:
- 401 Unauthorized - Redirects to login
- 400/500 errors - Returns error message in state
- Network errors - Caught in catch block

```typescript
try {
  await handleSubmit(formData);
} catch (err) {
  // Error already in `error` state
  console.error('Failed:', err.message);
}
```

## Token Management

Tokens are automatically:
- Stored in localStorage after login
- Added to all API requests
- Cleared on logout
- Removed if 401 response received

## Next Steps

1. **Connect remaining dashboards** - Apply same pattern to other admin pages
2. **Implement search filters** - Add backend pagination support
3. **Real-time updates** - Add WebSocket for live data
4. **Export/Reports** - Add PDF/Excel export endpoints
5. **Notifications** - Add toast notifications on success/error
