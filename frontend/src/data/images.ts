export const IMAGES = {
  brand: {
    logo: "/images/logo.png" // replace with hosted PNG/JPG if preferred
  },

  // HOME PAGE IMAGES
  home: {
    hero: "",                 // main hero/banner
    stats: "",                // background for stats (optional)
    whyChoose: {
      counselling: "",        // card 1 image
      documentation: "",      // card 2 image
      reach: "",              // card 3 image
      career: ""              // card 4 image
    },
    services: {
      counselling: "",        // service card thumbnails
      applications: "",
      "test-prep": "",
      visa: "",
      "post-arrival": "",
      countries: ""
    },
    testimonials: "",         // section background or avatar sprite
    cta: ""                   // final CTA background
  },

  // ABOUT PAGE IMAGES
  about: {
    hero: "",                 // hero/cover
    story: "",                // brand story card
    values: {
      "Student-First": "",
      Excellence: "",
      "Global Reach": "",
      Integrity: ""
    },
    countries: {
      "United Kingdom": "",
      "Europe (Germany, Ireland, Netherlands)": "",
      Canada: "",
      Australia: ""
    }
  },

  // BLOG DEFAULT/FALLBACK
  blog: {
    default: ""               // fallback for posts without image
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
