export type Country = {
  name: string;
  slug: string;
  flag: string; // emoji flag
  popularCourses: string[];
  description: string;
};

export const countries: Country[] = [
  {
    name: "United Kingdom",
    slug: "uk",
    flag: "🇬🇧",
    popularCourses: [
      "Business & Management",
      "Computer Science",
      "Engineering",
      "Healthcare",
      "Law",
    ],
    description:
      "The UK offers world-class universities, shorter course durations, and strong post-study work opportunities.",
  },
  {
    name: "United States",
    slug: "usa",
    flag: "🇺🇸",
    popularCourses: [
      "Computer Science",
      "Data Science",
      "MBA",
      "Engineering",
      "Life Sciences",
    ],
    description:
      "The USA provides flexible education pathways, top-ranked universities, and global career exposure.",
  },
  {
    name: "Canada",
    slug: "canada",
    flag: "🇨🇦",
    popularCourses: [
      "IT & Software",
      "Business",
      "Healthcare",
      "Engineering",
      "Supply Chain",
    ],
    description:
      "Canada is known for affordable education, post-study work permits, and permanent residency pathways.",
  },
  {
    name: "Australia",
    slug: "australia",
    flag: "🇦🇺",
    popularCourses: [
      "Engineering",
      "Nursing",
      "Business Analytics",
      "IT",
      "Education",
    ],
    description:
      "Australia offers high-quality education with strong employability and migration opportunities.",
  },
  {
    name: "Europe",
    slug: "europe",
    flag: "🇪🇺",
    popularCourses: [
      "Management",
      "Engineering",
      "Public Health",
      "Design",
      "Artificial Intelligence",
    ],
    description:
      "European countries provide affordable education, English-taught programs, and rich cultural exposure.",
  },
];
