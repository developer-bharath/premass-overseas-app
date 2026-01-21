export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  featuredImage: string;
  publishedAt: string;
  readTime: string;
  views?: number;
}

export const blogCategories = [
  "Study Abroad Tips",
  "Visa Guidance",
  "University Rankings",
  "Test Preparation",
  "Student Life",
  "Career Advice"
];

export const blogs: Blog[] = [
  {
    id: "1",
    title: "Top 10 Universities in UK for International Students 2026",
    slug: "top-10-universities-uk-2026",
    excerpt: "Discover the best UK universities offering world-class education, scholarships, and post-study work opportunities for international students.",
    content: `
      <h2>Why Study in the UK?</h2>
      <p>The UK remains a top destination for international students seeking world-class education and global career opportunities.</p>
      
      <h3>1. University of Oxford</h3>
      <p>Ranked #1 globally, Oxford offers exceptional programs across all disciplines with generous scholarships.</p>
      
      <h3>2. University of Cambridge</h3>
      <p>Known for STEM excellence and research opportunities for international students.</p>
      
      <h2>Graduate Route Visa</h2>
      <p>All international students can stay for 2 years post-study to work in the UK.</p>
    `,
    author: { name: "Rajesh Kumar", avatar: "👨‍🎓", role: "Senior Education Consultant" },
    category: "University Rankings",
    tags: ["UK", "Universities", "Rankings", "Oxford", "Cambridge"],
    featuredImage: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    views: 1250
  },
  {
    id: "2",
    title: "IELTS vs PTE: Which Test Should You Take?",
    slug: "ielts-vs-pte-comparison",
    excerpt: "A comprehensive comparison of IELTS and PTE to help you choose the right English proficiency test for your study abroad journey.",
    content: `
      <h2>Understanding IELTS</h2>
      <p>IELTS is the most widely accepted English test globally, required by UK, Australia, and Canadian universities.</p>
      
      <h2>What is PTE?</h2>
      <p>PTE is a computer-based test with faster results (2 days) and AI-based scoring for consistency.</p>
      
      <h2>Which Should You Choose?</h2>
      <p>Choose PTE if you need quick results and prefer computer-based testing. Choose IELTS for broader university acceptance.</p>
    `,
    author: { name: "Priya Sharma", avatar: "👩‍🏫", role: "Test Prep Expert" },
    category: "Test Preparation",
    tags: ["IELTS", "PTE", "English Tests", "Study Abroad"],
    featuredImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800",
    publishedAt: "2024-01-10",
    readTime: "6 min read",
    views: 890
  },
  {
    id: "3",
    title: "Student Visa Success: 10 Common Mistakes to Avoid",
    slug: "student-visa-mistakes-avoid",
    excerpt: "Learn about the most common visa application errors and how to avoid them for a successful study abroad application.",
    content: `
      <h2>Top 10 Visa Mistakes</h2>
      <ol>
        <li><strong>Incomplete Documents:</strong> Always double-check your checklist</li>
        <li><strong>Insufficient Funds:</strong> Show 1.5x the required amount</li>
        <li><strong>Poor Interview Prep:</strong> Practice with mock interviews</li>
        <li><strong>Wrong Visa Type:</strong> Apply for student visa, not tourist</li>
      </ol>
      
      <h2>Tips for Success</h2>
      <p>Prepare your documents 2 months in advance and practice your visa interview answers.</p>
    `,
    author: { name: "Amit Patel", avatar: "👨‍💼", role: "Visa Specialist" },
    category: "Visa Guidance",
    tags: ["Visa", "Application Tips", "Student Visa", "Interview"],
    featuredImage: "https://images.unsplash.com/photo-1569098644584-210bcd375b59?w=800",
    publishedAt: "2024-01-05",
    readTime: "7 min read",
    views: 1540
  }
];
