import { useState } from "react";
import { Link } from "react-router-dom";
import { blogs, blogCategories } from "../data/blogs";
import { Calendar, Clock, Eye, ArrowRight } from "phosphor-react";

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === "All" || blog.category === selectedCategory;
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-[#054374] mb-4">Study Abroad Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert insights, tips, and guides for your international education journey.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#cd9429] focus:outline-none transition"
          />
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All", ...blogCategories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition ${selectedCategory === cat
                  ? "bg-[#cd9429] text-white shadow-md"
                  : "bg-white border border-gray-200 text-[#054374] hover:border-[#cd9429]"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map((blog) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.featuredImage}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#cd9429] text-white text-xs font-bold rounded-full">
                  {blog.category}
                </span>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-[#054374] mb-2 group-hover:text-[#cd9429] transition line-clamp-2 relative">
                  {blog.title}
                  <span className="absolute left-0 right-0 -bottom-0.5 h-0.5 bg-[#054374] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-200" />
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>

                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} weight="duotone" /> {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} weight="duotone" /> {blog.readTime}
                  </span>
                  {blog.views && (
                    <span className="flex items-center gap-1">
                      <Eye size={16} weight="duotone" /> {blog.views}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{blog.author.avatar}</span>
                    <div>
                      <p className="text-sm font-semibold text-[#054374]">{blog.author.name}</p>
                      <p className="text-xs text-gray-500">{blog.author.role}</p>
                    </div>
                  </div>
                  <ArrowRight size={20} weight="bold" className="text-[#cd9429] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No articles found. Try a different search or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
