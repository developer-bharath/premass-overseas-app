import React, { useState } from 'react';
import { GraduationCap, TrendingUp, BookOpen, Users } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function DomesticAdmission() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Domestic Admission Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Get admitted to India's top universities</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b">
          {['overview', 'eligibility', 'colleges', 'process'].map(tab => (
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

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <GraduationCap className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Expert Guidance</h3>
                <p className="text-gray-600 mb-4">Navigate UG & PG admissions with our experienced counselors</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Stream selection</li>
                  <li>✓ College counseling</li>
                  <li>✓ Entrance exam prep</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <BookOpen className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">College Network</h3>
                <p className="text-gray-600 mb-4">Access to 1000+ colleges across India</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ IIT & NIT colleges</li>
                  <li>✓ Tier-1 private colleges</li>
                  <li>✓ Specialized institutions</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <TrendingUp className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Eligibility Check</h3>
                <p className="text-gray-600 mb-4">Assess your eligibility for desired courses</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Cutoff analysis</li>
                  <li>✓ Merit ranking</li>
                  <li>✓ College matching</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Personal Counseling</h3>
                <p className="text-gray-600 mb-4">1-on-1 sessions with admission experts</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Profile analysis</li>
                  <li>✓ College selection</li>
                  <li>✓ Seat confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Eligibility Criteria</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-amber-600">Undergraduate Admissions</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ 12th pass or equivalent</li>
                <li>✓ Minimum 45% aggregate (40% for reserved categories)</li>
                <li>✓ Valid JEE/NEET/State entrance exam score (if applicable)</li>
                <li>✓ Age limit as per college guidelines</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-amber-600">Postgraduate Admissions</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ Bachelor's degree from recognized university</li>
                <li>✓ Minimum 50% marks in graduation</li>
                <li>✓ Valid CAT/GATE/NET score (if required)</li>
                <li>✓ Work experience (varies by program)</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'colleges' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Top Colleges</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'IITs', desc: 'Engineering excellence' },
                { name: 'NITs', desc: 'Quality engineering' },
                { name: 'DU Delhi', desc: 'Academic quality' },
                { name: 'Mumbai University', desc: 'Arts & Science' },
                { name: 'BITS Pilani', desc: 'Private excellence' },
                { name: 'INSEAD', desc: 'Business programs' },
              ].map((college, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h4 className="text-xl font-bold text-amber-600 mb-2">{college.name}</h4>
                  <p className="text-gray-600 mb-4">{college.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Our Process</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { step: 1, title: 'Assessment', desc: 'Evaluate academic profile & interests' },
                { step: 2, title: 'Counseling', desc: 'Discuss career goals & options' },
                { step: 3, title: 'College Selection', desc: 'Shortlist suitable colleges' },
                { step: 4, title: 'Application', desc: 'Submit applications' },
                { step: 5, title: 'Merit List', desc: 'Track merit list publication' },
                { step: 6, title: 'Seat Confirmation', desc: 'Confirm admission & enroll' },
              ].map((item, index) => (
                <div key={index} className="bg-amber-50 p-6 rounded-lg">
                  <div className="w-10 h-10 bg-amber-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-center">{item.title}</h4>
                  <p className="text-sm text-gray-600 text-center">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Admitted to Your Dream College</h2>
          <p className="text-lg mb-8">Schedule a free counseling session today</p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-bold hover:bg-amber-50 transition">
            Start Counseling
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="domestic-admission" serviceName="Domestic Admission" />
    </div>
  );
}
