import React, { useState } from 'react';
import { BookOpen, FileCheck, Calendar, CheckCircle } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function VisaImmigration() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Visa & Immigration Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Your visa approval journey starts here</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b flex-wrap">
          {['overview', 'visatypes', 'documents', 'process'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'border-b-2'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              style={activeTab === tab ? { color: '#054374', borderColor: '#cd9429' } : {}}
            >
              {tab === 'visatypes' ? 'Visa Types' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <BookOpen className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Expert Visa Consultants</h3>
                <p className="text-gray-600 mb-4">Experienced professionals with visa success stories</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Country-specific experts</li>
                  <li>✓ Interview preparation</li>
                  <li>✓ 98% success rate</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <FileCheck className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Document Management</h3>
                <p className="text-gray-600 mb-4">Complete documentation support</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Document checklist</li>
                  <li>✓ SOP writing</li>
                  <li>✓ Verification help</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Calendar className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Interview Scheduling</h3>
                <p className="text-gray-600 mb-4">Professional interview coaching</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Mock interviews</li>
                  <li>✓ Confidence building</li>
                  <li>✓ Follow-up support</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Fast-Track Service</h3>
                <p className="text-gray-600 mb-4">Priority processing available</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Express processing</li>
                  <li>✓ Guaranteed support</li>
                  <li>✓ Follow-up tracking</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'visatypes' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Visa Types We Handle</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Student Visa', 
                  desc: 'For international education',
                  countries: ['USA', 'UK', 'Canada', 'Australia'],
                  processingTime: '4-8 weeks'
                },
                { 
                  title: 'Work Visa', 
                  desc: 'For employment abroad',
                  countries: ['USA', 'Canada', 'Germany', 'UAE'],
                  processingTime: '6-12 weeks'
                },
                { 
                  title: 'Dependent Visa', 
                  desc: 'For family members',
                  countries: ['All countries'],
                  processingTime: '4-6 weeks'
                },
                { 
                  title: 'Visit Visa', 
                  desc: 'For tourism & visits',
                  countries: ['All countries'],
                  processingTime: '2-4 weeks'
                },
              ].map((visa, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-purple-600 mb-2">{visa.title}</h4>
                  <p className="text-gray-600 mb-3">{visa.desc}</p>
                  <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Popular Countries:</p>
                    <div className="flex flex-wrap gap-2">
                      {visa.countries.map((country, i) => (
                        <span key={i} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-sm">
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">Processing: {visa.processingTime}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Required Documents</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-purple-600">Common Documents</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Valid Passport (6 months validity)</li>
                <li>✓ Birth Certificate</li>
                <li>✓ Character Certificate (PCC)</li>
                <li>✓ Educational Certificates</li>
                <li>✓ Bank Statements & Financial Documents</li>
                <li>✓ Medical Reports (if required)</li>
                <li>✓ Employment Letter (for work visa)</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-purple-600">Student Visa Specific</h3>
              <ul className="space-y-3 text-gray-600">
                <li>✓ Acceptance letter from university</li>
                <li>✓ IELTS/TOEFL scores</li>
                <li>✓ Statement of Purpose (SOP)</li>
                <li>✓ Letters of Recommendation</li>
                <li>✓ Proof of financial support</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Visa Application Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Assessment', desc: 'Eligibility check & counseling' },
                { step: 2, title: 'Document', desc: 'Prepare all documents' },
                { step: 3, title: 'Application', desc: 'Submit visa application' },
                { step: 4, title: 'Interview', desc: 'Attend visa interview' },
                { step: 5, title: 'Decision', desc: 'Visa decision released' },
                { step: 6, title: 'Passport', desc: 'Collect passport' },
                { step: 7, title: 'Preparation', desc: 'Pre-departure briefing' },
                { step: 8, title: 'Departure', desc: 'Travel & settlement' },
              ].map((item, index) => (
                <div key={index} className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-bold mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-purple-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Your Visa Approved</h2>
          <p className="text-lg mb-8">Start your application with expert guidance</p>
          <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-50 transition">
            Begin Visa Process
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="visa-immigration" serviceName="Visa & Immigration" />
    </div>
  );
}
