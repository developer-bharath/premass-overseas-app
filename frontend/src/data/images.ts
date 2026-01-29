import brandLogo from "../logo.svg";

export const IMAGES = {
  brand: {
    logo: brandLogo
  },

  // HOME PAGE IMAGES
  home: {
    hero: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&auto=format&fit=crop&q=80",
    stats: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&auto=format&fit=crop&q=80",
    whyChoose: {
      counselling: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
      documentation: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1200&auto=format&fit=crop&q=80",
      reach: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&auto=format&fit=crop&q=80",
      career: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80"
    },
    services: {
      counselling: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      applications: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?w=1200&auto=format&fit=crop&q=80",
      "test-prep": "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=1200&auto=format&fit=crop&q=80",
      visa: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&auto=format&fit=crop&q=80",
      "post-arrival": "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80",
      countries: "https://images.unsplash.com/photo-1433477155337-9aea4e790195?w=1200&auto=format&fit=crop&q=80"
    },
    testimonials: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80",
    cta: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80"
  },

  // ABOUT PAGE IMAGES
  about: {
    hero: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&auto=format&fit=crop&q=80",
    story: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    values: {
      "Student-First": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
      Excellence: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80",
      "Global Reach": "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&auto=format&fit=crop&q=80",
      Integrity: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80"
    },
    countries: {
      "United Kingdom": "https://images.unsplash.com/photo-1473959383414-b1c1e9b60441?w=1200&auto=format&fit=crop&q=80",
      "Europe (Germany, Ireland, Netherlands)": "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&auto=format&fit=crop&q=80",
      Canada: "https://images.unsplash.com/photo-1501769214405-5e86fb2f86b4?w=1200&auto=format&fit=crop&q=80",
      Australia: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80"
    }
  },

  // BLOG DEFAULT/FALLBACK
  blog: {
    default: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop&q=80"
  }
};

// Countries menu config for navbar and detail pages
export const COUNTRIES_MENU = [
  { label: "USA", path: "/countries/usa" },
  { label: "UK", path: "/countries/uk" },
  { label: "Canada", path: "/countries/canada" },
  { label: "Australia", path: "/countries/australia" },
  { label: "Germany", path: "/countries/germany" },
  { label: "Ireland", path: "/countries/ireland" },
  { label: "Netherlands", path: "/countries/netherlands" }
];
