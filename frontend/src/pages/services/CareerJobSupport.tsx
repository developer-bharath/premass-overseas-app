import React, { useState } from 'react';
import { Briefcase, FileText, Users, TrendingUp } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function CareerJobSupport() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Career & Job Support Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Achieve your career goals with expert guidance</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b flex-wrap">
          {['overview', 'services', 'placement', 'testimonials'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-cyan-600 border-b-2 border-cyan-600'
                  : 'text-gray-600 hover:text-cyan-600'
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
                <FileText className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Resume Services</h3>
                <p className="text-gray-600 mb-4">Professional resume writing & optimization</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Resume writing</li>
                  <li>✓ Multiple revisions</li>
                  <li>✓ ATS optimization</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Briefcase className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Job Assistance</h3>
                <p className="text-gray-600 mb-4">End-to-end job placement support</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Job matching</li>
                  <li>✓ Application support</li>
                  <li>✓ Salary negotiation</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Interview Preparation</h3>
                <p className="text-gray-600 mb-4">Comprehensive interview coaching</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Mock interviews</li>
                  <li>✓ Technical prep</li>
                  <li>✓ HR round coaching</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <TrendingUp className="w-12 h-12 text-cyan-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">LinkedIn Optimization</h3>
                <p className="text-gray-600 mb-4">Build a powerful professional presence</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Profile optimization</li>
                  <li>✓ Content strategy</li>
                  <li>✓ Network building</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'services' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Our Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Resume Writing', 
                  features: ['Professional formatting', 'Keyword optimization', 'Achievement highlighting', 'Multiple versions'],
                  price: '₹2,500'
                },
                { 
                  title: 'Interview Coaching',
                  features: ['Mock interviews', '1-on-1 sessions', 'Behavioral questions', 'Technical prep'],
                  price: '₹5,000'
                },
                { 
                  title: 'LinkedIn Profile',
                  features: ['Professional photo', 'Bio optimization', 'Keyword strategy', 'Growth plan'],
                  price: '₹3,000'
                },
                { 
                  title: 'Job Application',
                  features: ['Job search', 'Application prep', 'Follow-ups', 'Negotiation help'],
                  price: '₹3,500'
                },
                { 
                  title: 'Career Counseling',
                  features: ['Goal setting', 'Career mapping', 'Skill assessment', 'Growth planning'],
                  price: '₹4,000'
                },
                { 
                  title: 'Full Package',
                  features: ['Resume + Interview + LinkedIn + Job search', 'Personalized support', 'Lifetime access', 'Priority support'],
                  price: '₹12,000'
                },
              ].map((service, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h4 className="text-xl font-bold text-cyan-600 mb-4">{service.title}</h4>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold text-cyan-700">{service.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'placement' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Placement Statistics</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { stat: '1000+', label: 'Students Placed' },
                { stat: '95%', label: 'Placement Rate' },
                { stat: '₹8 LPA', label: 'Average Salary' },
                { stat: '500+', label: 'Company Partners' },
              ].map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-lg text-center">
                  <p className="text-4xl font-bold text-cyan-600 mb-2">{item.stat}</p>
                  <p className="text-gray-600 font-semibold">{item.label}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">Top Recruiting Companies</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {['TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Accenture', 'Amazon', 'Google', 'Microsoft'].map((company, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow text-center">
                  <p className="font-bold text-gray-700">{company}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Student Success Stories</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  name: 'Rahul Kumar', 
                  company: 'Google India', 
                  salary: '₹25 LPA',
                  quote: 'The interview coaching helped me crack Google. Best investment I made!'
                },
                { 
                  name: 'Priya Singh', 
                  company: 'Microsoft', 
                  salary: '₹22 LPA',
                  quote: 'Resume optimization was key. Got 5 interviews in 2 weeks!'
                },
                { 
                  name: 'Arjun Patel', 
                  company: 'Amazon', 
                  salary: '₹20 LPA',
                  quote: 'From campus rejection to Amazon offer in 3 months!'
                },
                { 
                  name: 'Sneha Sharma', 
                  company: 'TCS', 
                  salary: '₹12 LPA',
                  quote: 'Career counseling helped me find the right path. Grateful!'
                },
              ].map((story, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-cyan-200 rounded-full flex items-center justify-center text-cyan-600 font-bold">
                      {story.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-bold text-lg">{story.name}</h4>
                      <p className="text-cyan-600 font-semibold text-sm">{story.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">"{story.quote}"</p>
                  <p className="text-cyan-700 font-bold">{story.salary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-cyan-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Launch Your Career Today</h2>
          <p className="text-lg mb-8">Get matched with your dream job</p>
          <button className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-bold hover:bg-cyan-50 transition">
            Explore Career Services
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="career-job-support" serviceName="Career & Job Support" />
    </div>
  );
}
