import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { GraduationCap, MapPin, BookOpen, Calendar, BadgeCheck, Briefcase, Home, Award, TrendingUp, ChevronRight } from "lucide-react";
import countries from "../data/countries.json";

export default function CountryDetail() {
  const { country } = useParams();
  const data = country ? (countries as any)[country] : null;
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  const toggleExpanded = (cardId: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId);
    } else {
      newExpanded.add(cardId);
    }
    setExpandedCards(newExpanded);
  };

  if (!data) {
    return (
      <section className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-[#054374]">Country not found</h2>
        <Link to="/countries" className="mt-6 inline-block btn-primary">
          Back to Countries
        </Link>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* HERO */}
      <section className="bg-gradient-to-r from-[#054374] to-[#054374] text-white py-32">
        <div className="max-w-7xl mx-auto px-6">
          <Link to="/countries" className="text-[#F5A623] hover:text-orange-400 transition-colors text-sm font-semibold mb-6 inline-flex items-center gap-1">
            ← Back to Countries
          </Link>
          <h1 className="text-6xl font-bold mb-6">{data.name}</h1>
          <p className="text-lg text-white max-w-3xl leading-relaxed">{data.heroDescription}</p>
        </div>
      </section>

      {/* BLUE STRIP */}
      <section className="bg-[#054374] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-8" />
        </div>
      </section>

      {/* WHY STUDY */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Why Study in {data.name}?</h2>
            <p className="premium-subtext mx-auto">Discover opportunities and advantages</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="premium-card">
              <p className="text-gray-700 text-lg leading-relaxed">{data.whyStudy}</p>
            </div>
            <div className="premium-card bg-gradient-to-br from-blue-50 to-purple-50 min-h-96 flex items-center justify-center rounded-xl border-2 border-blue-100">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#054374] flex items-center justify-center">
                  <GraduationCap size={48} className="text-white" />
                </div>
                <p className="text-gray-600 font-semibold">Educational Experience</p>
                <p className="text-sm text-gray-500 mt-2">World-class academic programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UNIVERSITIES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Top Universities</h2>
            <p className="premium-subtext mx-auto">Ranked among the best in the world</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {data.universities.map((uni: string, idx: number) => (
              <div key={uni} className="group">
                <div className="premium-card premium-card:hover cursor-pointer border-l-4 border-[#F5A623]" onClick={() => toggleExpanded(`uni-${idx}`)}>
                  <div className="flex gap-4 items-start mb-4">
                    <div className="premium-icon flex-shrink-0">
                      <GraduationCap size={32} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg text-[#054374] mb-1">{uni}</h4>
                      <p className="text-sm text-gray-600">World-class education</p>
                    </div>
                  </div>

                  {expandedCards.has(`uni-${idx}`) && (
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-700 animate-in fade-in duration-300">
                      <p><strong>Ranking:</strong> QS Top 100</p>
                      <p><strong>Programs:</strong> 200+ degrees</p>
                    </div>
                  )}
                  
                  <button onClick={(e) => { e.preventDefault(); toggleExpanded(`uni-${idx}`); }} className="mt-3 text-[#F5A623] text-sm font-semibold hover:gap-2 transition-all">
                    {expandedCards.has(`uni-${idx}`) ? "Less Details" : "More Details"} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Top Courses</h2>
            <p className="premium-subtext mx-auto">Most sought-after programs</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.topCourses.map((course: string, idx: number) => (
              <div key={course} className="group" onClick={() => toggleExpanded(`course-${idx}`)}>
                <div className="premium-card premium-card:hover cursor-pointer border-l-4 border-[#F5A623]">
                  <div className="flex gap-3 items-start mb-3">
                    <div className="premium-icon flex-shrink-0">
                      <BookOpen size={28} />
                    </div>
                    <h4 className="font-bold text-base text-[#054374]">{course}</h4>
                  </div>
                  <p className="text-xs text-gray-600 mb-3">High-demand</p>
                  
                  {expandedCards.has(`course-${idx}`) && (
                    <div className="pt-3 border-t border-gray-200 space-y-1 text-xs text-gray-700 animate-in fade-in duration-300">
                      <p><strong>Duration:</strong> 1-2 years</p>
                      <p><strong>Salary:</strong> £35k-55k</p>
                    </div>
                  )}
                  
                  <button onClick={(e) => { e.preventDefault(); toggleExpanded(`course-${idx}`); }} className="mt-3 text-[#F5A623] text-xs font-semibold transition-all">
                    {expandedCards.has(`course-${idx}`) ? "Less" : "More"} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTAKES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Intake Dates</h2>
            <p className="premium-subtext mx-auto">Application periods & deadlines</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.intakes.map((intake: string) => (
              <div key={intake} className="premium-card text-center border-t-4 border-[#F5A623]">
                <div className="premium-icon mx-auto">
                  <Calendar size={36} />
                </div>
                <h4 className="font-bold text-xl text-[#054374]">{intake}</h4>
                <p className="text-sm text-gray-600 mt-2">Apply 3-6 months before</p>
                <p className="text-xs text-gray-500 mt-1">Decision: 4-6 weeks</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISA */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Student Visa</h2>
            <p className="premium-subtext mx-auto">Complete visa information & requirements</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="premium-card border-l-4 border-[#F5A623]">
              <div className="flex gap-4 mb-6">
                <div className="premium-icon flex-shrink-0">
                  <BadgeCheck size={36} />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-[#054374]">{data.visa.type}</h4>
                  <p className="text-gray-600 mt-1">{data.visa.duration}</p>
                </div>
              </div>

              <div className="space-y-4 mb-4">
                <div>
                  <p className="font-semibold text-[#054374] text-sm">Processing Time</p>
                  <p className="text-gray-700 text-sm mt-1">{data.visa.processTime}</p>
                </div>
                <div>
                  <p className="font-semibold text-[#054374] text-sm">Description</p>
                  <p className="text-gray-700 text-sm mt-1">{data.visa.description}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="font-semibold text-[#054374] text-sm mb-3">Key Requirements</p>
                <ul className="space-y-2">
                  {data.visa.requirements.slice(0, 3).map((req: string, i: number) => (
                    <li key={i} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-[#F5A623]">✓</span> {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="premium-card bg-gradient-to-br from-green-50 to-emerald-50 min-h-96 flex items-center justify-center rounded-xl border-2 border-green-100">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#054374] flex items-center justify-center">
                  <BadgeCheck size={48} className="text-white" />
                </div>
                <p className="text-gray-600 font-semibold">Visa Processing</p>
                <p className="text-sm text-gray-500 mt-2">Streamlined application support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORK RIGHTS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Work Rights</h2>
            <p className="premium-subtext mx-auto">Employment opportunities during & after studies</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card border-l-4 border-[#054374]">
              <div className="flex gap-4 items-start mb-6">
                <div className="premium-icon flex-shrink-0">
                  <Briefcase size={32} />
                </div>
                <h4 className="font-bold text-lg text-[#054374] pt-2">During Studies</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Hours:</strong> {typeof data.workRights === 'string' ? data.workRights : data.workRights.duringStudies}</p>
                <ul className="space-y-2">
                  <li>• On-campus work allowed</li>
                  <li>• Part-time employment</li>
                  <li>• Max hours during term</li>
                </ul>
              </div>
            </div>

            <div className="premium-card border-l-4 border-[#F5A623]">
              <div className="flex gap-4 items-start mb-6">
                <div className="premium-icon flex-shrink-0">
                  <TrendingUp size={32} />
                </div>
                <h4 className="font-bold text-lg text-[#054374] pt-2">After Graduation</h4>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <p><strong>Post-Study Visa:</strong> Available</p>
                <ul className="space-y-2">
                  <li>• Work for major companies</li>
                  <li>• Path to residency</li>
                  <li>• Flexible employment</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVING COSTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Cost of Living</h2>
            <p className="premium-subtext mx-auto">Budget breakdown & money-saving tips</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card border-l-4 border-[#054374]">
              <div className="flex gap-4 items-start mb-6">
                <div className="premium-icon flex-shrink-0">
                  <Home size={32} />
                </div>
                <h4 className="font-bold text-lg text-[#054374]">Monthly Breakdown</h4>
              </div>
              <p className="text-3xl font-bold text-[#F5A623] mb-6">£{data.livingCosts?.total || '1,200-1,500'}</p>
              <div className="space-y-2 text-sm text-gray-700 border-t border-gray-200 pt-4">
                <p>• <strong>Accommodation:</strong> £{data.livingCosts?.accommodation || '600-800'}</p>
                <p>• <strong>Food:</strong> £{data.livingCosts?.food || '200-300'}</p>
                <p>• <strong>Transport:</strong> £${data.livingCosts?.transport || '50-100'}</p>
                <p>• <strong>Utilities:</strong> £${data.livingCosts?.utilities || '100-150'}</p>
                <p>• <strong>Entertainment:</strong> £${data.livingCosts?.entertainment || '150-250'}</p>
              </div>
            </div>

            <div className="premium-card bg-gradient-to-br from-orange-50 to-amber-50 border-l-4 border-[#F5A623]">
              <div className="flex gap-4 items-start mb-6">
                <div className="premium-icon flex-shrink-0">
                  <Award size={32} />
                </div>
                <h4 className="font-bold text-lg text-[#054374]">Money-Saving Tips</h4>
              </div>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex gap-2"><span className="text-[#F5A623]">✓</span> Use student discounts</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">✓</span> Cook at home</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">✓</span> Student accommodation</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">✓</span> Part-time work</li>
                <li className="flex gap-2"><span className="text-[#F5A623]">✓</span> Scholarships & aid</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOLARSHIPS */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Scholarships</h2>
            <p className="premium-subtext mx-auto">Funding opportunities ({data.scholarships.length} available)</p>
          </div>
          
          <div className="premium-card border-l-4 border-[#F5A623]">
            <div className="flex gap-4 items-start mb-6">
              <div className="premium-icon flex-shrink-0">
                <GraduationCap size={32} />
              </div>
              <h4 className="font-bold text-lg text-[#054374]">Available Scholarships</h4>
            </div>

            <div className="space-y-2">
              {data.scholarships.slice(0, 3).map((scholarship: string, idx: number) => (
                <p key={idx} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-[#F5A623]">✓</span> {scholarship}
                </p>
              ))}

              {expandedCards.has('scholarships') && (
                <>
                  {data.scholarships.slice(3).map((scholarship: string, idx: number) => (
                    <p key={idx + 3} className="text-sm text-gray-700 flex gap-2">
                      <span className="text-[#F5A623]">✓</span> {scholarship}
                    </p>
                  ))}
                </>
              )}
            </div>

            {data.scholarships.length > 3 && (
              <button
                onClick={() => toggleExpanded('scholarships')}
                className="mt-6 btn-premium"
              >
                {expandedCards.has('scholarships') ? 'Show Less' : `View All ${data.scholarships.length}`}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* JOB MARKET */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Job Market</h2>
            <p className="premium-subtext mx-auto">Career opportunities & employment outlook</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="premium-card border-l-4 border-[#054374]">
              <div className="flex gap-4 items-start mb-6">
                <div className="premium-icon flex-shrink-0">
                  <Briefcase size={32} />
                </div>
                <h4 className="font-bold text-lg text-[#054374]">Top Industries</h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.jobMarket?.topIndustries.map((industry: string) => (
                  <span key={industry} className="px-3 py-1 bg-[#054374] text-white text-xs font-semibold rounded-full">
                    {industry}
                  </span>
                ))}
              </div>
            </div>

            <div className="premium-card border-l-4 border-[#F5A623]">
              <div className="flex gap-4 items-start mb-6">
                <div className="premium-icon flex-shrink-0">
                  <TrendingUp size={32} />
                </div>
                <h4 className="font-bold text-lg text-[#054374]">Employment Rate</h4>
              </div>
              <p className="text-4xl font-bold text-[#F5A623] mb-2">{data.jobMarket?.employmentRate}</p>
              <p className="text-sm text-gray-600">Employed within 6 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEST CITIES */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="premium-heading">Best Cities to Study</h2>
            <p className="premium-subtext mx-auto">Popular student destinations</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {data.bestCities?.slice(0, 3).map((city: { name: string; description: string }) => (
              <div key={city.name} className="premium-card border-l-4 border-[#054374]">
                <div className="flex gap-3 items-start mb-4">
                  <div className="premium-icon flex-shrink-0">
                    <MapPin size={28} />
                  </div>
                  <h4 className="font-bold text-lg text-[#054374]">{city.name}</h4>
                </div>
                <p className="text-sm text-gray-700">{city.description}</p>
              </div>
            ))}
          </div>

          {data.bestCities?.length > 3 && (
            <div className="mt-8 premium-card bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-[#F5A623]">
              <p className="text-sm text-gray-700">
                <strong>Other cities:</strong> {data.bestCities?.slice(3).map((city: { name: string }) => city.name).join(', ')}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-[#054374] to-[#054374] text-white py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-100 max-w-2xl mx-auto mb-8">Apply now and begin your international education adventure</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="btn-premium">
              Contact Us
            </Link>
            <Link to="/countries" className="btn-premium-outline">
              Back to Countries
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
