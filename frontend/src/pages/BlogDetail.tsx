import { useParams, Link } from "react-router-dom";
import { blogs } from "../data/blogs";
import { Calendar, Clock, Eye, ArrowLeft, ShareNetwork } from "phosphor-react";

export default function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#054374] mb-4">Blog post not found</h2>
          <Link to="/blog" className="inline-flex items-center gap-2 text-[#cd9429] font-semibold hover:text-[#054374]">
            <ArrowLeft size={20} weight="bold" /> Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const relatedBlogs = blogs.filter((b) => b.category === blog.category && b.id !== blog.id).slice(0, 3);

  return (
    <article className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#054374] font-semibold hover:text-[#cd9429] mb-8 transition">
          <ArrowLeft size={20} weight="bold" /> Back to Blog
        </Link>

        <div className="mb-8">
          <span className="inline-block px-3 py-1 bg-[#cd9429] text-white text-sm font-bold rounded-full mb-4">
            {blog.category}
          </span>
          <h1 className="text-5xl font-bold text-[#054374] mb-4 leading-tight">{blog.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={16} weight="duotone" /> {new Date(blog.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} weight="duotone" /> {blog.readTime}
            </span>
            {blog.views && (
              <span className="flex items-center gap-1">
                <Eye size={16} weight="duotone" /> {blog.views} views
              </span>
            )}
            <button className="flex items-center gap-1 text-[#cd9429] hover:text-[#054374] font-semibold transition">
              <ShareNetwork size={16} weight="duotone" /> Share
            </button>
          </div>

          <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
            <span className="text-3xl">{blog.author.avatar}</span>
            <div>
              <p className="font-bold text-[#054374]">{blog.author.name}</p>
              <p className="text-sm text-gray-600">{blog.author.role}</p>
            </div>
          </div>
        </div>

        <img
          src={blog.featuredImage}
          alt={blog.title}
          className="w-full h-96 object-cover rounded-2xl mb-8 shadow-lg"
        />

        <div
          className="prose prose-lg max-w-none mb-12 text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="flex flex-wrap gap-2 mb-12">
          {blog.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-[#F8FAFC] border border-gray-200 rounded-full text-sm font-semibold text-[#054374] hover:border-[#cd9429] transition">
              #{tag}
            </span>
          ))}
        </div>

        <div className="bg-gradient-to-r from-[#054374] to-[#cd9429] rounded-2xl p-8 text-center text-white mb-12 shadow-xl">
          <h3 className="text-2xl font-bold mb-2">Ready to Start Your Journey?</h3>
          <p className="mb-4 opacity-90">Get personalized guidance from our expert counsellors.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#054374] rounded-lg font-bold hover:shadow-lg hover:-translate-y-1 transition">
            Book Free Consultation <ArrowLeft size={20} weight="bold" className="rotate-180" />
          </Link>
        </div>

        {relatedBlogs.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-[#054374] mb-6 flex items-center gap-2">
              <span className="w-2 h-8 bg-[#cd9429] rounded-full" />
              Related Articles
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedBlogs.map((related) => (
                <Link
                  key={related.id}
                  to={`/blog/${related.slug}`}
                  className="group border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <img src={related.featuredImage} alt={related.title} className="w-full h-40 object-cover" />
                  <div className="p-4">
                    <h4 className="font-bold text-[#054374] group-hover:text-[#cd9429] line-clamp-2 transition">{related.title}</h4>
                    <p className="text-xs text-gray-500 mt-2">{related.readTime}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
