import React, { useState } from 'react';
import { Shield, Plus, Edit2, Trash2, Users } from 'lucide-react';

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  department: string;
  level: number;
  employeeCount: number;
}

interface RoleManagementProps {
  employees?: any[];
  setEmployees?: (employees: any[]) => void;
  loggedInEmployee?: any;
}

function RoleManagement(props: RoleManagementProps) {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'role001',
      name: 'Counselor',
      description: 'Entry-level counselor for student guidance',
      permissions: ['view_applications', 'create_applications', 'send_messages'],
      department: 'Overseas Education',
      level: 1,
      employeeCount: 1,
    },
    {
      id: 'role002',
      name: 'Senior Counselor',
      description: 'Senior counselor with approval authority',
      permissions: ['view_applications', 'create_applications', 'edit_applications', 'approve_applications', 'send_messages'],
      department: 'Overseas Education',
      level: 2,
      employeeCount: 1,
    },
    {
      id: 'role003',
      name: 'Manager',
      description: 'Department manager with full control',
      permissions: ['manage_employees', 'view_reports', 'view_analytics', 'manage_settings'],
      department: 'Overseas Education',
      level: 3,
      employeeCount: 1,
    },
    {
      id: 'role004',
      name: 'Admin',
      description: 'System administrator with all permissions',
      permissions: ['manage_employees', 'manage_settings', 'view_reports', 'view_analytics'],
      department: 'Admin',
      level: 5,
      employeeCount: 1,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    department: 'overseas_education',
    level: 1,
    permissions: [] as string[],
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const departments = [
    { value: 'overseas_education', label: '🌍 Overseas Education' },
    { value: 'domestic_admission', label: '🎓 Domestic Admission' },
    { value: 'education_loan', label: '💰 Education Loan' },
    { value: 'visa_immigration', label: '📚 Visa & Immigration' },
    { value: 'document_management', label: '📄 Document Management' },
    { value: 'career_support', label: '💼 Career Support' },
    { value: 'admin', label: '⚙️ Administration' },
  ];

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

  const handleAddRole = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      department: 'overseas_education',
      level: 1,
      permissions: [],
    });
    setSelectedPermissions([]);
    setShowForm(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingId(role.id);
    setFormData({
      name: role.name,
      description: role.description,
      department: role.department,
      level: role.level,
      permissions: role.permissions,
    });
    setSelectedPermissions(role.permissions);
    setShowForm(true);
  };

  const handleSaveRole = () => {
    if (editingId) {
      setRoles(roles.map(role =>
        role.id === editingId
          ? {
              ...role,
              ...formData,
              permissions: selectedPermissions,
            }
          : role
      ));
    } else {
      setRoles([...roles, {
        id: `role${Date.now()}`,
        ...formData,
        permissions: selectedPermissions,
        employeeCount: 0,
      }]);
    }
    setShowForm(false);
  };

  const handleDeleteRole = (id: string) => {
    if (confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== id));
    }
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  const getLevelColor = (level: number) => {
    const colors: Record<number, string> = {
      1: '#3b82f6',
      2: '#06b6d4',
      3: '#f97316',
      4: '#ef4444',
      5: '#8b5cf6',
    };
    return colors[level] || '#054374';
  };

  const getLevelLabel = (level: number) => {
    const labels: Record<number, string> = {
      1: 'Entry Level',
      2: 'Senior',
      3: 'Manager',
      4: 'Director',
      5: 'Admin',
    };
    return labels[level] || 'Unknown';
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
              <Shield className="w-8 h-8" style={{ color: '#054374' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Role Management</h1>
              <p className="text-gray-600 mt-1">Create and manage job roles with permissions</p>
            </div>
          </div>
          <button
            onClick={handleAddRole}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
            style={{ backgroundColor: '#054374' }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Role</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? 'Edit Role' : 'Add New Role'}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Role Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="e.g., Senior Counselor"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  placeholder="Role description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    {departments.map(dept => (
                      <option key={dept.value} value={dept.value}>{dept.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Level</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    {[1, 2, 3, 4, 5].map(level => (
                      <option key={level} value={level}>{level} - {getLevelLabel(level)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Permissions</label>
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
                  onClick={handleSaveRole}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Role' : 'Create Role'}
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

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
          >
            {/* Level Bar */}
            <div
              className="h-1"
              style={{ backgroundColor: getLevelColor(role.level) }}
            />

            <div className="p-6">
              {/* Title and Level */}
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{role.name}</h3>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white mt-2"
                    style={{ backgroundColor: getLevelColor(role.level) }}
                  >
                    Level {role.level} - {getLevelLabel(role.level)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4">{role.description}</p>

              {/* Department */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-1">DEPARTMENT</p>
                <p className="text-sm font-semibold text-gray-900">
                  {departments.find(d => d.value === role.department)?.label}
                </p>
              </div>

              {/* Permissions */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-500 mb-2">PERMISSIONS ({role.permissions.length})</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map(perm => (
                    <span
                      key={perm}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {perm.replace(/_/g, ' ')}
                    </span>
                  ))}
                  {role.permissions.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{role.permissions.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Employee Count */}
              <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-600" />
                <div>
                  <p className="text-xs font-semibold text-gray-500">ASSIGNED TO</p>
                  <p className="text-sm font-bold text-blue-700">{role.employeeCount} employee(s)</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditRole(role)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteRole(role.id)}
                  className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {roles.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No roles configured yet</p>
          <button
            onClick={handleAddRole}
            className="px-6 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#054374' }}
          >
            Create First Role
          </button>
        </div>
      )}
    </div>
  );
}

export default RoleManagement;
