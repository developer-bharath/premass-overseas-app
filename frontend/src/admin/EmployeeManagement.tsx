import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, Lock, Unlock, Mail, Phone, Building2, Badge } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  joiningDate: string;
  password: string;
}

interface EmployeeManagementProps {
  employees: Employee[];
  setEmployees: (employees: Employee[]) => void;
  loggedInEmployee?: Employee;
}

function EmployeeManagement(props: EmployeeManagementProps) {
  const { employees: propEmployees, setEmployees: setPropEmployees, loggedInEmployee } = props;
  const [employees, setEmployees] = useState<Employee[]>(propEmployees || [
    {
      id: '1',
      name: 'Raj Kumar',
      email: 'raj@premass.com',
      phone: '+91-9876543210',
      department: 'Overseas Education',
      designation: 'Senior Counselor',
      role: 'Manager',
      permissions: ['create_applications', 'view_applications', 'edit_applications', 'send_messages'],
      isActive: true,
      joiningDate: '2023-01-15',
      password: 'password123',
    },
    {
      id: 'emp002',
      name: 'Priya Singh',
      email: 'priya@premass.com',
      phone: '+91-9876543211',
      department: 'Domestic Admission',
      designation: 'Counselor',
      role: 'Counselor',
      permissions: ['create_applications', 'view_applications', 'send_messages'],
      isActive: true,
      joiningDate: '2023-03-20',
      password: 'password123',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: 'Overseas Education',
    designation: 'Counselor',
    password: '',
    permissions: [] as string[],
  });

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Sync with parent state
  useEffect(() => {
    if (propEmployees && propEmployees.length > 0) {
      setEmployees(propEmployees);
    }
  }, [propEmployees]);

  // Sync changes back to parent
  useEffect(() => {
    if (setPropEmployees) {
      setPropEmployees(employees);
    }
  }, [employees, setPropEmployees]);

  const departments = [
    { value: 'Overseas Education', label: '🌍 Overseas Education' },
    { value: 'Domestic Admission', label: '🎓 Domestic Admission' },
    { value: 'Education Loan', label: '💰 Education Loan' },
    { value: 'Visa & Immigration', label: '📚 Visa & Immigration' },
    { value: 'Document Management', label: '📄 Document Management' },
    { value: 'Career Support', label: '💼 Career Support' },
    { value: 'IT Training', label: '💻 IT Training' },
    { value: 'Student Support & Settlement', label: '🤝 Student Support & Settlement' },
  ];

  const designations = [
    { value: 'Counselor', label: 'Counselor' },
    { value: 'Senior Counselor', label: 'Senior Counselor' },
    { value: 'Service Officer', label: 'Service Officer' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Senior Manager', label: 'Senior Manager' },
    { value: 'Department Head', label: 'Department Head' },
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

  const handleAddEmployee = () => {
    setEditingId(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      department: 'overseas_education',
      designation: 'counselor',
      password: '',
      permissions: [],
    });
    setSelectedPermissions([]);
    setShowForm(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      designation: employee.designation,
      password: '',
      permissions: employee.permissions,
    });
    setSelectedPermissions(employee.permissions);
    setShowForm(true);
  };

  const handleSaveEmployee = () => {
    if (editingId) {
      setEmployees(employees.map(emp =>
        emp.id === editingId
          ? { ...emp, ...formData, permissions: selectedPermissions }
          : emp
      ));
    } else {
      setEmployees([...employees, {
        id: Date.now().toString(),
        ...formData,
        permissions: selectedPermissions,
        isActive: true,
        joiningDate: new Date().toISOString().split('T')[0],
        role: 'Counselor',
      }]);
    }
    setShowForm(false);
  };

  const handleDeleteEmployee = (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const toggleEmployeeStatus = (id: string) => {
    setEmployees(employees.map(emp =>
      emp.id === id ? { ...emp, isActive: !emp.isActive } : emp
    ));
  };

  const togglePermission = (permission: string) => {
    setSelectedPermissions(prev =>
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  return (
    <div className="min-h-screen p-6" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(5, 67, 116, 0.1)' }}>
              <Users className="w-8 h-8" style={{ color: '#054374' }} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Employee Management</h1>
              <p className="text-gray-600 mt-1">Manage team members and assign permissions</p>
            </div>
          </div>
          <button
            onClick={handleAddEmployee}
            className="flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-semibold hover:shadow-lg transition"
            style={{ backgroundColor: '#054374' }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Employee</span>
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">
              {editingId ? 'Edit Employee' : 'Add New Employee'}
            </h2>

            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#054374]"
                    placeholder="Employee name"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder="+91-9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                    placeholder={editingId ? "Leave blank to keep current" : "Enter password"}
                  />
                </div>
              </div>

              {/* Department & Designation */}
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Designation</label>
                  <select
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  >
                    {designations.map(des => (
                      <option key={des.value} value={des.value}>{des.label}</option>
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
                  onClick={handleSaveEmployee}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  {editingId ? 'Update Employee' : 'Create Employee'}
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

      {/* Employees List */}
      <div className="grid gap-4">
        {employees.map((employee) => (
          <div
            key={employee.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition border-l-4"
            style={{ borderColor: '#054374' }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Employee Info */}
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{employee.name}</h3>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{employee.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{employee.phone}</span>
                  </div>
                </div>
              </div>

              {/* Department & Role */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">ROLE</p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-900">
                      {departments.find(d => d.value === employee.department)?.label || employee.department}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">{employee.designation}</span>
                  </div>
                </div>
              </div>

              {/* Permissions Count */}
              <div>
                <p className="text-xs font-semibold text-gray-500 mb-2">PERMISSIONS</p>
                <div className="flex flex-wrap gap-1">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: '#054374' }}
                  >
                    {employee.permissions.length} assigned
                  </span>
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  <p className="line-clamp-2">{employee.permissions.slice(0, 2).join(', ')}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => handleEditEmployee(employee)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg font-semibold hover:bg-blue-200 transition text-sm"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => toggleEmployeeStatus(employee.id)}
                  className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg font-semibold transition text-sm ${
                    employee.isActive
                      ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {employee.isActive ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Inactive</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDeleteEmployee(employee.id)}
                  className="flex items-center justify-center space-x-2 px-3 py-2 bg-red-100 text-red-700 rounded-lg font-semibold hover:bg-red-200 transition text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employees.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">No employees added yet</p>
          <button
            onClick={handleAddEmployee}
            className="px-6 py-2 rounded-lg text-white font-semibold"
            style={{ backgroundColor: '#054374' }}
          >
            Add First Employee
          </button>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
