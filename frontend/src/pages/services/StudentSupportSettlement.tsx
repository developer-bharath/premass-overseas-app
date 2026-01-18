import React, { useState } from 'react';
import { Plane, Home, Heart, MapPin, ShieldCheck } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function StudentSupportSettlement() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Student Support & Settlement Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Complete support from pre-departure to arrival and beyond</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b flex-wrap">
          {['overview', 'pre-departure', 'arrangements', 'support'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-rose-600 border-b-2 border-rose-600'
                  : 'text-gray-600 hover:text-rose-600'
              }`}
            >
              {tab.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <MapPin className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">End-to-End Settlement</h3>
                <p className="text-gray-600 mb-4">Comprehensive support for your relocation</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Accommodation arrangements</li>
                  <li>✓ Travel bookings</li>
                  <li>✓ Document processing</li>
                  <li>✓ Arrival coordination</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <ShieldCheck className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">24/7 Assistance</h3>
                <p className="text-gray-600 mb-4">Always there when you need us</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Emergency support hotline</li>
                  <li>✓ Email assistance</li>
                  <li>✓ WhatsApp support</li>
                  <li>✓ Local coordinators</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Heart className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Health & Insurance</h3>
                <p className="text-gray-600 mb-4">Your health and safety is our priority</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Health insurance assistance</li>
                  <li>✓ Medical emergency support</li>
                  <li>✓ Wellness programs</li>
                  <li>✓ Mental health resources</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Plane className="w-12 h-12 text-rose-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Travel Support</h3>
                <p className="text-gray-600 mb-4">Hassle-free travel arrangements</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Flight booking assistance</li>
                  <li>✓ Visa documentation</li>
                  <li>✓ Travel insurance</li>
                  <li>✓ Airport pickup</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pre-departure' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Pre-Departure Checklist</h2>
            <div className="space-y-4">
              {[
                {
                  title: 'Documentation',
                  items: ['Passport (valid for 6+ months)', 'Student visa', 'Admission letter', 'Financial proof', 'Medical documents', 'Bank statements']
                },
                {
                  title: 'Accommodation',
                  items: ['On-campus housing booking', 'Private accommodation search', 'Lease agreement review', 'Deposit payment', 'Utility setup', 'Insurance for belongings']
                },
                {
                  title: 'Financial',
                  items: ['Open NRI bank account', 'International credit/debit card', 'Currency exchange', 'Tuition fee payment', 'Living expense budget', 'Insurance premium']
                },
                {
                  title: 'Medical & Health',
                  items: ['Health insurance enrollment', 'Vaccination requirements', 'Medical check-up', 'Prescription medicines', 'Emergency contacts', 'Travel health kit']
                },
                {
                  title: 'Travel',
                  items: ['Flight booking', 'Visa application finalization', 'Travel insurance', 'Luggage planning', 'Airport transfer booking', 'Emergency contacts']
                },
                {
                  title: 'Personal',
                  items: ['Inform institution of arrival', 'Setup phone/SIM plan', 'University orientation dates', 'Create support network', 'Document photos', 'Emergency fund']
                }
              ].map((section, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold text-rose-600 mb-4">{section.title}</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {section.items.map((item, i) => (
                      <label key={i} className="flex items-center space-x-3 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-rose-600" />
                        <span className="text-gray-600">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'arrangements' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Our Arrangements</h2>
            
            <div>
              <h3 className="text-2xl font-bold text-rose-600 mb-6">Accommodation Options</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'On-Campus Hostel',
                    price: 'Varies',
                    features: ['Walking distance to campus', 'Utilities included', 'Campus facilities', 'Community environment', 'Furnished rooms'],
                    process: '2-4 weeks'
                  },
                  {
                    title: 'Shared Apartment',
                    price: '$800-1200/month',
                    features: ['Independent living', 'Cost-effective', 'Shared amenities', 'Local neighborhoods', 'Furnished/unfurnished'],
                    process: '1-2 weeks'
                  },
                  {
                    title: 'Homestay',
                    price: '$600-900/month',
                    features: ['Local family living', 'Home-cooked meals', 'Cultural immersion', 'Guided support', 'Utilities included'],
                    process: '2-3 weeks'
                  }
                ].map((option, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold text-rose-600 mb-2">{option.title}</h4>
                    <p className="text-lg font-bold text-gray-700 mb-4">{option.price}</p>
                    <p className="text-sm text-gray-600 mb-4">Arrangement: <strong>{option.process}</strong></p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      {option.features.map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-rose-600 mb-6">Travel & Flight Booking</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-rose-600 mb-4">Flight Services</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>✓ Best price research and booking</li>
                    <li>✓ Flexible payment options</li>
                    <li>✓ Airport transfer coordination</li>
                    <li>✓ Flight change assistance</li>
                    <li>✓ Travel insurance included</li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="text-xl font-bold text-rose-600 mb-4">Visa Documentation</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li>✓ Complete document checklist</li>
                    <li>✓ Application form assistance</li>
                    <li>✓ Interview preparation</li>
                    <li>✓ Embassy coordination</li>
                    <li>✓ Expedited processing support</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-rose-600 mb-6">Insurance Coverage</h3>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">Health Insurance</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>✓ Comprehensive medical coverage</li>
                      <li>✓ Emergency hospitalization</li>
                      <li>✓ Doctor consultations</li>
                      <li>✓ Prescription medicines</li>
                      <li>✓ Dental & vision care</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-700 mb-3">Travel Insurance</h4>
                    <ul className="space-y-2 text-gray-600 text-sm">
                      <li>✓ Trip cancellation protection</li>
                      <li>✓ Baggage coverage</li>
                      <li>✓ Personal liability</li>
                      <li>✓ Emergency medical abroad</li>
                      <li>✓ Flight delay compensation</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'support' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold mb-8">Post-Arrival Support</h2>
            
            <h3 className="text-2xl font-bold text-rose-600 mb-6">Arrival Support</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="font-bold text-gray-700 mb-4">Day 1-7</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Airport pickup & transfer</li>
                  <li>✓ University orientation guidance</li>
                  <li>✓ SIM card activation help</li>
                  <li>✓ Bank account opening</li>
                  <li>✓ Accommodation check-in</li>
                  <li>✓ Emergency contact setup</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="font-bold text-gray-700 mb-4">Week 2-4</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Campus facility tours</li>
                  <li>✓ Documentation verification</li>
                  <li>✓ Course registration assistance</li>
                  <li>✓ Library & lab access setup</li>
                  <li>✓ Student club introductions</li>
                  <li>✓ Wellness orientation</li>
                </ul>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-rose-600 mb-6">Ongoing Support</h3>
            <div className="space-y-4">
              {[
                {
                  title: '🏥 Health & Wellness',
                  desc: 'Medical emergencies, health insurance claims, wellness programs, mental health counseling, student health center referrals'
                },
                {
                  title: '🏠 Housing & Accommodation',
                  desc: 'Housing issues, landlord disputes, utilities problems, moving assistance, lease extension or termination'
                },
                {
                  title: '💼 Academic Support',
                  desc: 'Course selection guidance, academic advisor introduction, tutoring resources, exam preparation, grade appeal assistance'
                },
                {
                  title: '📱 Technical Issues',
                  desc: 'Phone plan changes, internet setup, laptop repairs, university system access, software troubleshooting'
                },
                {
                  title: '💰 Financial Assistance',
                  desc: 'Budget management, part-time job guidance, scholarship opportunities, financial hardship support, payment plans'
                },
                {
                  title: '✈️ Travel & Visa',
                  desc: 'Visa extension processing, return trip planning, work permit applications, travel during breaks, documentation updates'
                }
              ].map((support, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                  <h4 className="font-bold text-gray-700 mb-2">{support.title}</h4>
                  <p className="text-gray-600">{support.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-rose-600 mt-8 mb-6">Community & Social</h3>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ul className="grid md:grid-cols-2 gap-4 text-gray-600">
                <li>✓ Monthly networking events</li>
                <li>✓ Cultural celebration programs</li>
                <li>✓ Weekend excursion planning</li>
                <li>✓ Student alumni mentoring</li>
                <li>✓ Sports & recreation groups</li>
                <li>✓ International student community</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="bg-rose-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Your Journey Starts Here</h2>
          <p className="text-lg mb-8">We're with you every step of the way - from pre-departure planning to successful settlement</p>
          <button className="bg-white text-rose-600 px-8 py-3 rounded-lg font-bold hover:bg-rose-50 transition">
            Start Your Settlement Journey
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="student-support-settlement" serviceName="Student Support & Settlement" />
    </div>
  );
}
