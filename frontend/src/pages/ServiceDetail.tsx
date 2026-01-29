// =====================================================
// SERVICE DETAIL PAGE
// Route: /services/:category/:service
// =====================================================

import { useParams, Link } from "react-router-dom";
import { ShieldCheck, Sparkle } from "phosphor-react";
import { useEffect, useMemo, useRef } from "react";
import { services } from "../data/services";
import { serviceContent } from "../data/serviceContent";
import { IMAGES } from "../data/images";

export default function ServiceDetail() {
  const { category, service } = useParams();
  const mainRef = useRef<HTMLElement>(null);

  const activeCategory = services.find((c) => c.slug === category);
  const activeService = activeCategory?.items.find((s) => s.slug === service);

  if (!activeCategory || !activeService) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-2xl font-semibold text-[#054374]">Service not found</h2>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link to="/services" className="text-[#054374] underline hover:text-[#cd9429]">All Services</Link>
        </div>
      </div>
    );
  }

  const key = `${activeCategory.slug}/${activeService.slug}`;
  const content = serviceContent[key];

  const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const sectionAnchors = useMemo(
    () => content?.sections?.map((s) => ({ title: s.title, id: slugify(s.title) })) ?? [],
    [content]
  );

  useEffect(() => {
    document.title = `${activeService.name} | ${activeCategory.category} | Premass Overseas`;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => mainRef.current?.focus(), 0);
  }, [activeService.name, activeCategory.category]);

  const heroImage =
    content?.hero?.image ||
    IMAGES.home.services[activeCategory.slug as keyof typeof IMAGES.home.services] ||
    IMAGES.home.hero;

  return (
    <section className="bg-white">
      <div className="bg-gradient-to-br from-[#054374] via-[#054374] to-[#0a3f5c] text-white">
        <div className="max-w-7xl mx-auto px-6 py-14 md:py-16">
          <nav className="text-sm text-white/70 mb-6">
            <ol className="flex space-x-2 flex-wrap">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li>/</li>
              <li><Link to={`/services/${activeCategory.slug}`} className="hover:text-white">{activeCategory.category}</Link></li>
              <li>/</li>
              <li aria-current="page" className="text-white">{activeService.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
                Premium service
              </div>
              <h1 className="mt-4 text-4xl md:text-5xl font-semibold">{activeService.name}</h1>
              <p className="text-sm uppercase tracking-wide text-white/70 mt-2 font-semibold">
                {activeCategory.category}
              </p>
              <p className="mt-5 text-white/80 max-w-2xl">
                {content?.hero?.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link to={content?.cta?.primaryTo ?? "/contact"} className="btn-accent">
                  {content?.cta?.primaryText ?? "Book Free Consultation"}
                </Link>
                <Link to={content?.cta?.secondaryTo ?? "/services"} className="btn-secondary">
                  {content?.cta?.secondaryText ?? "Explore All Services"}
                </Link>
              </div>
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-white/70">
                {["Expert-led", "Compliance-first", "Transparent", "End-to-end"].map((tag) => (
                  <div key={tag} className="rounded-lg bg-white/10 px-3 py-2 text-center">
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 rounded-[32px] bg-white/10 blur-xl" />
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={heroImage}
                  alt={activeService.name}
                  className="h-[320px] w-full object-cover"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 grid lg:grid-cols-[280px_1fr] gap-10">
        {/* LEFT SIDEBAR */}
        <aside className="sticky top-28 h-fit bg-white rounded-2xl p-6 shadow-lg border border-[#054374]/10">
          <h3 className="text-lg font-semibold text-[#054374] mb-4">Services</h3>
          {services.map((group) => (
            <div key={group.slug} className="mb-6">
              <Link to={`/services/${group.slug}`} className={`block font-medium mb-2 transition ${group.slug === category ? "text-[#cd9429]" : "text-[#054374] hover:text-[#cd9429]"}`}>
                {group.category}
              </Link>
              <ul className="space-y-2 ml-2">
                {group.items.map((item) => (
                  <li key={item.slug}>
                    <Link to={`/services/${group.slug}/${item.slug}`} className={`text-sm transition ${item.slug === service ? "text-[#cd9429] font-semibold" : "text-slate-900 hover:text-[#054374]"}`}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {sectionAnchors.length > 0 && (
            <div className="pt-4 mt-4 border-t border-gray-100">
              <h4 className="text-sm font-semibold text-[#054374] mb-2">On this page</h4>
              <ul className="space-y-2 text-sm">
                {sectionAnchors.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-slate-900 hover:text-[#054374] transition">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* MAIN CONTENT */}
        <main ref={mainRef} tabIndex={-1} className="bg-white rounded-2xl p-10 shadow-lg border border-[#054374]/10">
          {/* HERO COPY */}
          <div className="mb-12">
            <div className="flex items-start gap-4 mb-4">
              {content?.hero?.icon && (
                <span className="text-5xl block">
                  {content.hero.icon}
                </span>
              )}
              <div>
                <h2 className="text-3xl font-semibold text-[#054374]">{activeService.name}</h2>
                <p className="text-xs uppercase tracking-wide text-[#cd9429] mt-2 font-semibold">
                  {activeCategory.category}
                </p>
              </div>
            </div>
            <p className="text-slate-900 leading-relaxed max-w-3xl">
              {content?.hero?.description}
            </p>
          </div>

          {/* OVERVIEW SECTION */}
          {content?.overview && (
            <div className="mb-12 p-10 bg-gradient-to-br from-[#054374]/5 via-[#cd9429]/5 to-white rounded-2xl border border-[#054374]/10">
              <div className="card-icon">
                <ShieldCheck weight="duotone" />
              </div>
              <h2 className="text-3xl font-bold text-[#054374] mb-4">
                {content.overview.title}
              </h2>
              <p className="text-slate-900 mb-8 leading-relaxed">
                {content.overview.description}
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {content.overview.highlights.map((h, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#cd9429] flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">✓</span>
                    </div>
                    <p className="text-slate-900 font-medium">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FEATURES SECTION */}
          {content?.features && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#054374] mb-8">
                {content.features.title}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.features.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-8 bg-gradient-to-br from-white to-[#F8FAFC] border-2 border-[#054374]/10 rounded-2xl hover:border-[#cd9429] hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                  >
                    <div className="card-icon">
                      <Sparkle weight="duotone" />
                    </div>
                    {item.icon && (
                      <span className="text-4xl block mb-4 transform group-hover:scale-125 transition-transform duration-300">
                        {item.icon}
                      </span>
                    )}
                    <h3 className="text-lg font-bold text-[#054374] mb-2 group-hover:text-[#cd9429] transition">
                      {item.title}
                    </h3>
                    <p className="text-slate-900 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROCESS SECTION */}
          {content?.process && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-[#054374] mb-8">
                {content.process.title}
              </h2>
              <div className="space-y-6">
                {content.process.steps.map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#054374] to-[#cd9429] text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                        {step.number}
                      </div>
                      {i < content.process.steps.length - 1 && (
                        <div className="w-1 h-16 bg-gradient-to-b from-[#cd9429] to-[#054374]/30 mt-2" />
                      )}
                    </div>
                    <div className="pb-6 pt-1">
                      <h3 className="text-xl font-bold text-[#054374] mb-2 group-hover:text-[#cd9429] transition">
                        {step.title}
                      </h3>
                      <p className="text-slate-900 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DETAILED SECTIONS */}
          <div className="space-y-8 mb-12">
            {content?.sections && content.sections.map((sec, idx) => (
              <section key={idx} id={slugify(sec.title)}>
                <h2 className="text-2xl font-semibold text-[#054374] mb-4">{sec.title}</h2>
                {sec.body && <p className="text-slate-900 mb-4">{sec.body}</p>}
                {sec.bullets && (
                  <ul className="list-disc pl-6 space-y-2 text-slate-900">
                    {sec.bullets.map((b, i) => (
                      <li key={i} className="text-slate-900">{b}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* FAQs SECTION */}
          {content?.faqs && content.faqs.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-[#054374] mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                {content.faqs.map((f, i) => (
                    <details key={i} className="p-4 bg-[#F8FAFC] rounded-lg hover:bg-white transition cursor-pointer border border-[#054374]/10">
                      <summary className="font-semibold text-[#054374]">{f.q}</summary>
                      <p className="text-slate-900 mt-3">{f.a}</p>
                    </details>
                ))}
              </div>
            </div>
          )}

          {/* CTA BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-12 pt-8 border-t-2 border-gray-200">
            <Link
              to={content?.cta?.primaryTo ?? "/contact"}
              className="btn-primary"
            >
              {content?.cta?.primaryText ?? "Book Free Consultation"}
            </Link>
            <Link
              to={content?.cta?.secondaryTo ?? "/services"}
              className="btn-secondary"
            >
              {content?.cta?.secondaryText ?? "Explore All Services"}
            </Link>
          </div>
        </main>
      </div>
    </section>
  );
}