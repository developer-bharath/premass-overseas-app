import React from 'react';
import { useState } from 'react';
import { ArrowRight, Globe, Users, FileText, Award } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function OverseasEducation() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Study Abroad Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Your journey to world-class education starts here</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b">
          {['overview', 'process', 'countries', 'faqs'].map(tab => (
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
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Features */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border-t-4" style={{ borderColor: '#cd9429' }}>
                <Globe className="w-12 h-12 mb-4" style={{ color: '#054374' }} />
                <h3 className="text-2xl font-bold mb-4">Global University Network</h3>
                <p className="text-gray-600 mb-4">Access to 500+ universities across USA, UK, Canada, Australia, and more</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Top-ranked institutions</li>
                  <li>✓ Diverse course options</li>
                  <li>✓ Scholarship guidance</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Expert Counseling</h3>
                <p className="text-gray-600 mb-4">1-on-1 guidance from experienced education counselors</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Profile evaluation</li>
                  <li>✓ Career guidance</li>
                  <li>✓ Interview prep</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <FileText className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Application Support</h3>
                <p className="text-gray-600 mb-4">End-to-end assistance with university applications</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ SOP writing</li>
                  <li>✓ Essay guidance</li>
                  <li>✓ Application tracking</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Award className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Visa & Settlement</h3>
                <p className="text-gray-600 mb-4">Complete visa processing and settlement support</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Visa applications</li>
                  <li>✓ Document preparation</li>
                  <li>✓ Arrival support</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Our Process</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {[
                { step: 1, title: 'Counseling', desc: 'Initial assessment & guidance' },
                { step: 2, title: 'Profile Build', desc: 'Academic profile evaluation' },
                { step: 3, title: 'University Selection', desc: 'Shortlist universities' },
                { step: 4, title: 'Application', desc: 'Submit applications' },
                { step: 5, title: 'Interview Prep', desc: 'Prepare for interviews' },
                { step: 6, title: 'Offer Letters', desc: 'Receive & process offers' },
                { step: 7, title: 'Visa Processing', desc: 'Visa applications' },
                { step: 8, title: 'Settlement', desc: 'Arrival & settlement' },
              ].map((item, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg text-center">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'countries' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Popular Destinations</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Ireland'].map(country => (
                <div key={country} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h3 className="text-2xl font-bold text-blue-600 mb-3">{country}</h3>
                  <p className="text-gray-600 mb-4">Top universities and programs</p>
                  <button className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition">
                    Explore <ArrowRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
            {[
              { q: 'What are the eligibility criteria?', a: 'Minimum 12th pass with good academics. Requirements vary by university.' },
              { q: 'How much does the service cost?', a: 'Services are customized. Contact our counselors for detailed pricing.' },
              { q: 'How long is the entire process?', a: 'Typically 6-12 months from counseling to offer letter.' },
              { q: 'Do you provide visa assistance?', a: 'Yes, complete visa processing and settlement support included.' },
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <h4 className="font-bold text-lg mb-2">{item.q}</h4>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Study Abroad?</h2>
          <p className="text-lg mb-8">Start your journey with a free counseling session</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
            Book Free Counseling Session
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="overseas-education" serviceName="Overseas Education" />
    </div>
  );
}
