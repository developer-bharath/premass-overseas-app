import React, { useState } from 'react';
import { FileText, Lock, Clock, Shield } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function DocumentManagement() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Document Management Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Secure storage and verification of all your documents</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b flex-wrap">
          {['overview', 'services', 'security', 'faqs'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-600 hover:text-indigo-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <FileText className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Centralized Storage</h3>
                <p className="text-gray-600 mb-4">All your documents in one secure location</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Cloud-based storage</li>
                  <li>✓ 24/7 access</li>
                  <li>✓ Multiple backups</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Lock className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Secure & Encrypted</h3>
                <p className="text-gray-600 mb-4">Bank-level security for your documents</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ End-to-end encryption</li>
                  <li>✓ Role-based access</li>
                  <li>✓ Audit logs</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Clock className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Expiry Tracking</h3>
                <p className="text-gray-600 mb-4">Automatic alerts for document expiry</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Smart notifications</li>
                  <li>✓ Renewal reminders</li>
                  <li>✓ Compliance tracking</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Shield className="w-12 h-12 text-indigo-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Verification Support</h3>
                <p className="text-gray-600 mb-4">Professional document verification</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Expert review</li>
                  <li>✓ Authenticity check</li>
                  <li>✓ Compliance assurance</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Documents We Accept</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { category: 'Academic', docs: ['Transcripts', 'Degree Certificates', 'Mark Sheets', 'Course Completion'] },
                { category: 'Identity', docs: ['Passport', 'Birth Certificate', 'Aadhar', 'Driver License'] },
                { category: 'Financial', docs: ['Bank Statements', 'Tax Returns', 'Salary Slips', 'Investment Docs'] },
                { category: 'Medical', docs: ['Vaccination Records', 'Medical Reports', 'Health Insurance', 'Lab Tests'] },
                { category: 'Professional', docs: ['Resume', 'Employment Letter', 'Experience Certificate', 'Recommendation'] },
                { category: 'Travel', docs: ['Visa', 'Passport Stamps', 'Travel Insurance', 'Booking Confirmations'] },
              ].map((doc, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-indigo-600 mb-4">{doc.category}</h4>
                  <ul className="space-y-2 text-gray-600">
                    {doc.docs.map((item, i) => (
                      <li key={i}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Security Features</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">Data Protection</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ <strong>AES 256-bit Encryption:</strong> Military-grade encryption for all data</li>
                <li>✓ <strong>SSL/TLS Protocol:</strong> Secure data transmission</li>
                <li>✓ <strong>Regular Backups:</strong> Automatic daily backups</li>
                <li>✓ <strong>Disaster Recovery:</strong> Redundant servers across locations</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">Access Control</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ <strong>Role-Based Access:</strong> Only authorized users can view documents</li>
                <li>✓ <strong>Two-Factor Authentication:</strong> Extra layer of security</li>
                <li>✓ <strong>Audit Logs:</strong> Track all document access</li>
                <li>✓ <strong>IP Whitelisting:</strong> Restrict access by IP address</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-indigo-600">Compliance</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ <strong>ISO 27001:</strong> Information security management certified</li>
                <li>✓ <strong>GDPR Compliant:</strong> Privacy regulations followed</li>
                <li>✓ <strong>Data Residency:</strong> Data stored in India</li>
                <li>✓ <strong>Regular Audits:</strong> Third-party security audits</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            {[
              { q: 'How much storage do I get?', a: 'Unlimited document storage for your account.' },
              { q: 'Can I share documents with others?', a: 'Yes, you can grant time-limited access to specific people.' },
              { q: 'How long are documents stored?', a: 'Documents are retained as long as your account is active.' },
              { q: 'Is there a verification process?', a: 'Yes, our experts verify documents for authenticity.' },
              { q: 'How do I get document alerts?', a: 'Automatic email/SMS alerts for expiry 30 days in advance.' },
              { q: 'Can I download my documents anytime?', a: 'Yes, download documents 24/7 from your dashboard.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-lg mb-2 text-indigo-600">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-indigo-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Organize Your Documents Today</h2>
          <p className="text-lg mb-8">Secure, verified, and always accessible</p>
          <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-bold hover:bg-indigo-50 transition">
            Start Document Storage
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="document-management" serviceName="Document Management" />
    </div>
  );
}
