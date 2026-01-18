import React, { useState } from 'react';
import { UserCheck, Plus, Filter, Download, Upload } from 'lucide-react';

interface Assignment {
  id: string;
  employeeId: string;
  employeeName: string;
  email: string;
  department: string;
  permissions: string[];
  assignedDate: string;
  assignedBy: string;
}

interface PermissionAssignmentsProps {
  employees?: any[];
  setEmployees?: (employees: any[]) => void;
  loggedInEmployee?: any;
}

function PermissionAssignments(props: PermissionAssignmentsProps) {
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: 'asg1',
      employeeId: '1',
      employeeName: 'Raj Kumar',
      email: 'raj@premass.com',
      department: 'Overseas Education',
      permissions: ['view_applications', 'create_applications', 'edit_applications', 'send_messages'],
      assignedDate: '2024-01-10',
      assignedBy: 'Admin',
    },
    {
      id: 'asg2',
      employeeId: '2',
      employeeName: 'Priya Singh',
      email: 'priya@premass.com',
      department: 'Visa & Immigration',
      permissions: ['view_applications', 'create_applications', 'send_messages'],
      assignedDate: '2024-01-15',
      assignedBy: 'Admin',
    },
    {
      id: 'asg3',
      employeeId: '3',
      employeeName: 'Vikram Kumar',
      email: 'vikram@premass.com',
      department: 'Education Loan',
      permissions: ['view_applications', 'view_reports'],
      assignedDate: '2024-02-01',
      assignedBy: 'Manager',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [filterDept, setFilterDept] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    employeeId: '',
    employeeName: '',
    email: '',
    department: '',
    permissions: [] as string[],
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const allPermissions = [
    { id: 'view_applications', label: 'View Applications' },
    { id: 'create_applications', label: 'Create Applications' },
    { id: 'edit_applications', label: 'Edit Applications' },
    { id: 'delete_applications', label: 'Delete Applications' },
    { id: 'approve_applications', label: 'Approve Applications' },
    { id: 'reject_applications', label: 'Reject Applications' },
    { id: 'send_messages', label: 'Send Messages' },
    { id: 'view_reports', label: 'View Reports' },
    { id: 'manage_documents', label: 'Manage Documents' },
    { id: 'manage_employees', label: 'Manage Employees' },
    { id: 'manage_settings', label: 'Manage Settings' },
    { id: 'view_analytics', label: 'View Analytics' },
  ];

  const departments = [
    'Overseas Education',
    'Domestic Admission',
    'Education Loan',
    'Visa & Immigration',
    'Document Management',
    'Career Support',
  ];

  const filteredAssignments = assignments.filter(asg => {
    const matchesSearch = asg.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asg.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'all' || asg.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const handleAddAssignment = () => {
    setFormData({
      employeeId: '',
      employeeName: '',
      email: '',
      department: '',
      permissions: [],
    });
    setSelectedPermissions([]);
    setShowForm(true);
  };

  const handleSaveAssignment = () => {
    const newAssignment: Assignment = {
      id: `asg${Date.now()}`,
      employeeId: formData.employeeId || `emp${Date.now()}`,
      employeeName: formData.employeeName,
      email: formData.email,
      department: formData.department,
      permissions: selectedPermissions,
      assignedDate: new Date().toISOString().split('T')[0],
      assignedBy: 'Admin',
    };
    setAssignments([...assignments, newAssignment]);
    setShowForm(false);
  };

  const handleUpdatePermissions = (assignmentId: string, newPermissions: string[]) => {
    setAssignments(assignments.map(asg =>
      asg.id === assignmentId
        ? { ...asg, permissions: newPermissions }
        : asg
    ));
  };

  const handleDeleteAssignment = (assignmentId: string) => {
    if (confirm('Remove all permissions from this employee?')) {
      setAssignments(assignments.filter(asg => asg.id !== assignmentId));
    }
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const toggleAssignmentPermission = (assignmentId: string, permission: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      const newPermissions = assignment.permissions.includes(permission)
        ? assignment.permissions.filter(p => p !== permission)
        : [...assignment.permissions, permission];
      handleUpdatePermissions(assignmentId, newPermissions);
    }
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
              <UserCheck className="w-8 h-8" style={{ color: '#054374' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Permission Assignments</h1>
              <p className="text-gray-600 mt-1">Assign and manage employee permissions</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-white text-gray-700 font-semibold hover:shadow-lg transition border border-gray-300"
            >
              <Download className="w-5 h-5" />
              <span>Export</span>
            </button>
            <button
              className="flex items-center space-x-2 px-4 py-3 rounded-lg bg-white text-gray-700 font-semibold hover:shadow-lg transition border border-gray-300"
            >
              <Upload className="w-5 h-5" />
              <span>Import</span>
            </button>
            <button
              onClick={handleAddAssignment}
              className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
              style={{ backgroundColor: '#054374' }}
            >
              <Plus className="w-5 h-5" />
              <span>Assign Permissions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Assign Permissions</h2>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Employee Name</label>
                  <input
                    type="text"
                    value={formData.employeeName}
                    onChange={(e) => setFormData({ ...formData, employeeName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="Enter employee name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="employee@premass.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Permissions to Assign</label>
                <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
                  {allPermissions.map(perm => (
                    <label key={perm.id} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700">{perm.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={handleSaveAssignment}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Assign Permissions
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="mb-6 flex space-x-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by employee name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
          />
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={filterDept}
            onChange={(e) => setFilterDept(e.target.value)}
            className="bg-transparent focus:outline-none font-semibold text-gray-900"
          >
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition"
          >
            {/* Employee Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-gray-200">
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">EMPLOYEE</p>
                <p className="text-lg font-bold text-gray-900">{assignment.employeeName}</p>
                <p className="text-sm text-gray-600">{assignment.email}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">DEPARTMENT</p>
                <p className="text-sm font-semibold text-gray-900">{assignment.department}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">ASSIGNED DATE</p>
                <p className="text-sm font-semibold text-gray-900">{new Date(assignment.assignedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-1">ASSIGNED BY</p>
                <p className="text-sm font-semibold text-gray-900">{assignment.assignedBy}</p>
              </div>
            </div>

            {/* Permissions Grid */}
            <div>
              <p className="text-sm font-semibold text-gray-600 mb-3">
                Current Permissions ({assignment.permissions.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {allPermissions.map(perm => {
                  const hasPermission = assignment.permissions.includes(perm.id);
                  return (
                    <label
                      key={perm.id}
                      className={`flex items-center space-x-2 p-3 rounded-lg border-2 cursor-pointer transition ${
                        hasPermission
                          ? 'border-green-400 bg-green-50'
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={hasPermission}
                        onChange={() => toggleAssignmentPermission(assignment.id, perm.id)}
                        className="rounded"
                      />
                      <span className={`text-sm font-semibold ${
                        hasPermission ? 'text-green-700' : 'text-gray-700'
                      }`}>
                        {perm.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => handleDeleteAssignment(assignment.id)}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition"
              >
                Remove Assignment
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <UserCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No assignments found</p>
        </div>
      )}

      {/* Summary */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Assignments</p>
          <p className="text-3xl font-bold text-gray-900">{assignments.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Total Permissions Assigned</p>
          <p className="text-3xl font-bold text-gray-900">
            {assignments.reduce((sum, a) => sum + a.permissions.length, 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-sm font-semibold text-gray-600 mb-2">Avg Permissions per Employee</p>
          <p className="text-3xl font-bold text-gray-900">
            {assignments.length > 0 
              ? Math.round(assignments.reduce((sum, a) => sum + a.permissions.length, 0) / assignments.length)
              : 0
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default PermissionAssignments;
