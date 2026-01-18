import React, { useState } from 'react';
import { DollarSign, TrendingUp, CheckCircle, Calculator } from 'lucide-react';
import LeadForm from '../../components/LeadForm';

export default function EducationLoan() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-white">
      <div className="text-white py-16 px-4" style={{ backgroundColor: '#054374' }}>
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Education Loan Services</h1>
          <p className="text-xl" style={{ color: '#cd9429' }}>Affordable financing for your education dreams</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex gap-4 border-b flex-wrap">
          {['overview', 'eligibility', 'lenders', 'calculator'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-4 font-semibold transition-colors ${
                activeTab === tab
                  ? 'text-green-600 border-b-2 border-green-600'
                  : 'text-gray-600 hover:text-green-600'
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
                <DollarSign className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Flexible Loan Options</h3>
                <p className="text-gray-600 mb-4">Secured and unsecured loans for education</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Loans up to 50 lakhs</li>
                  <li>✓ Low interest rates</li>
                  <li>✓ Flexible repayment</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <TrendingUp className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Bank & NBFC Partners</h3>
                <p className="text-gray-600 mb-4">Access to 50+ lending institutions</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ SBI, ICICI, HDFC</li>
                  <li>✓ Competitive rates</li>
                  <li>✓ Quick disbursement</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <Calculator className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Eligibility Check</h3>
                <p className="text-gray-600 mb-4">Assess your loan eligibility instantly</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Free assessment</li>
                  <li>✓ No hidden charges</li>
                  <li>✓ Instant results</li>
                </ul>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <CheckCircle className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Complete Support</h3>
                <p className="text-gray-600 mb-4">End-to-end loan processing assistance</p>
                <ul className="space-y-2 text-gray-600">
                  <li>✓ Document preparation</li>
                  <li>✓ Application tracking</li>
                  <li>✓ Disbursement help</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'eligibility' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-8">Loan Eligibility</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-green-600">Basic Requirements</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ Indian citizen, age 18-65 years</li>
                <li>✓ Valid admission from recognized university</li>
                <li>✓ Stable parental income</li>
                <li>✓ Good credit score (typically 650+)</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-6 text-green-600">Financial Criteria</h3>
              <ul className="space-y-4 text-gray-600">
                <li>✓ Minimum annual income: 3 lakhs</li>
                <li>✓ Collateral value for secured loans</li>
                <li>✓ Co-applicant/guarantor (optional)</li>
                <li>✓ Adequate repayment capacity</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'lenders' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Our Lending Partners</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'SBI', rate: '6.5%', desc: 'State Bank of India' },
                { name: 'ICICI', rate: '7.2%', desc: 'ICICI Bank' },
                { name: 'HDFC', rate: '6.8%', desc: 'HDFC Bank' },
                { name: 'Axis Bank', rate: '7.0%', desc: 'Axis Bank Limited' },
                { name: 'Bajaj Finance', rate: '8.0%', desc: 'Bajaj Finance Ltd' },
                { name: 'Shriram', rate: '8.5%', desc: 'Shriram Finance' },
              ].map((lender, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                  <h4 className="text-xl font-bold text-green-600 mb-2">{lender.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{lender.desc}</p>
                  <p className="text-lg font-bold text-green-700">From {lender.rate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">Loan Calculator</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Loan Amount (in lakhs)</label>
                  <input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    placeholder="6.5" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Tenure (years)</label>
                  <input 
                    type="number" 
                    placeholder="10" 
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-green-600"
                  />
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
                  Calculate EMI
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-green-600 text-white py-12 px-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Get Education Loan at Best Rates</h2>
          <p className="text-lg mb-8">Check your eligibility in 5 minutes</p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition">
            Check Eligibility
          </button>
        </div>
      </div>

      {/* Lead Form */}
      <LeadForm serviceType="education-loan" serviceName="Education Loan" />
    </div>
  );
}
