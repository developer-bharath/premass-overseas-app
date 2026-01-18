import React, { useState } from 'react';
import { Code, Award, Users, BarChart3 } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function ITTraining() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">IT Training & Skill Development</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Master in-demand IT skills and get placed</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b flex-wrap">
          {['overview', 'courses', 'training', 'placements'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-orange-600 border-b-2 border-orange-600'
                  : 'text-gray-600 hover:text-orange-600'
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
                <Code className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Industry-Relevant Curriculum</h3>
                <p className="text-gray-600 mb-4">Courses designed with input from tech leaders</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Latest technologies</li>
                  <li>✓ Practical projects</li>
                  <li>✓ Real-world scenarios</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Users className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Expert Trainers</h3>
                <p className="text-gray-600 mb-4">Learn from industry professionals</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ 10+ years experience</li>
                  <li>✓ Active in industry</li>
                  <li>✓ Mentoring support</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Award className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Industry Certificates</h3>
                <p className="text-gray-600 mb-4">Recognized certifications upon completion</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Certificate of completion</li>
                  <li>✓ Skill badges</li>
                  <li>✓ LinkedIn credentials</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <BarChart3 className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Placement Guarantee</h3>
                <p className="text-gray-600 mb-4">100% placement assistance post-training</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Job interviews</li>
                  <li>✓ Resume support</li>
                  <li>✓ Salary negotiation</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Popular Courses</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Full Stack Web Development', 
                  duration: '12 weeks',
                  price: '₹35,000',
                  topics: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Deployment'],
                  rating: '4.8/5'
                },
                { 
                  title: 'Python for Data Science', 
                  duration: '10 weeks',
                  price: '₹32,000',
                  topics: ['Python Basics', 'NumPy', 'Pandas', 'ML Libraries', 'Projects'],
                  rating: '4.7/5'
                },
                { 
                  title: 'Java Backend Development', 
                  duration: '14 weeks',
                  price: '₹40,000',
                  topics: ['Core Java', 'Spring Boot', 'Databases', 'REST APIs', 'Microservices'],
                  rating: '4.9/5'
                },
                { 
                  title: 'Cloud & DevOps', 
                  duration: '8 weeks',
                  price: '₹28,000',
                  topics: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring'],
                  rating: '4.8/5'
                },
                { 
                  title: 'UI/UX Design', 
                  duration: '10 weeks',
                  price: '₹30,000',
                  topics: ['Design Principles', 'Figma', 'Prototyping', 'User Research'],
                  rating: '4.6/5'
                },
                { 
                  title: 'Mobile App Development', 
                  duration: '12 weeks',
                  price: '₹36,000',
                  topics: ['Flutter/React Native', 'Firebase', 'UI Building', 'Testing'],
                  rating: '4.7/5'
                },
              ].map((course, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-orange-600 mb-2">{course.title}</h4>
                  <div className="flex justify-between mb-4">
                    <span className="text-sm text-gray-600">⏱️ {course.duration}</span>
                    <span className="text-sm text-orange-600 font-bold">⭐ {course.rating}</span>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Topics Covered:</p>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((topic, i) => (
                        <span key={i} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-bold text-orange-700">{course.price}</p>
                    <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-sm">
                      Enroll
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'training' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Training Format</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Live Online Classes',
                  desc: 'Interactive live sessions with instructors',
                  features: ['Real-time doubt solving', 'Recorded sessions', 'Small batches (max 20)']
                },
                { 
                  title: 'Self-Paced Learning',
                  desc: 'Learn at your own speed with lifetime access',
                  features: ['Video lectures', 'Assignments', 'Downloadable resources']
                },
                { 
                  title: 'Hands-On Projects',
                  desc: 'Build real-world projects from day one',
                  features: ['Guided projects', 'Portfolio building', 'GitHub hosting']
                },
              ].map((format, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-orange-600 mb-3">{format.title}</h4>
                  <p className="text-gray-600 mb-4">{format.desc}</p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {format.features.map((feature, i) => (
                      <li key={i}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold mt-12 mb-6">Learning Resources</h3>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ul className="grid md:grid-cols-2 gap-4 text-gray-600">
                <li>✓ Comprehensive video tutorials</li>
                <li>✓ Weekly live Q&A sessions</li>
                <li>✓ Project-based assignments</li>
                <li>✓ Coding challenges</li>
                <li>✓ Interview preparation module</li>
                <li>✓ Mentoring sessions</li>
                <li>✓ GitHub repository access</li>
                <li>✓ Community forum support</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'placements' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Placement Support</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="text-2xl font-bold text-orange-600 mb-4">Our Stats</h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="text-lg"><strong>95%</strong> placement rate</li>
                  <li className="text-lg"><strong>₹6-15 LPA</strong> average salary</li>
                  <li className="text-lg"><strong>500+</strong> company partners</li>
                  <li className="text-lg"><strong>2000+</strong> students placed</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-2xl font-bold text-orange-600 mb-4">What We Provide</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Resume building & optimization</li>
                  <li>✓ Mock interviews & practice</li>
                  <li>✓ Direct placement drives</li>
                  <li>✓ LinkedIn profile enhancement</li>
                  <li>✓ Salary negotiation coaching</li>
                  <li>✓ Job referrals</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold mt-8 mb-6">Top Hiring Companies</h3>
            <div className="grid md:grid-cols-5 gap-4">
              {['TCS', 'Infosys', 'Wipro', 'HCL', 'Cognizant', 'Amazon', 'Google', 'Microsoft', 'Adobe', 'Facebook'].map((company, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow text-center font-bold text-gray-700">
                  {company}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="bg-orange-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Transform Your Career with IT Training</h2>
          <p className="text-lg mb-8">Start learning today, get hired tomorrow</p>
          <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-bold hover:bg-orange-50 transition">
            Browse All Courses
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="it-training" serviceName="IT Training" />
    </div>
  );
}
