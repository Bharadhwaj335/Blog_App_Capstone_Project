import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import {
  pageBackground,
  pageWrapper,
  primaryBtn,
  secondaryBtn,
  articleGrid,
  loadingClass,
} from "../styles/common";

const categories = ["Tech", "Design", "Career", "Productivity", "AI", "Wellness"];

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const role = user?.role?.toUpperCase?.();
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const profilePath =
    role === "AUTHOR" ? "/author-profile" : role === "ADMIN" ? "/admin-profile" : "/user-profile";

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/common-api/articles`);
        setArticles(res.data.payload || []);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });
  };

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, { state: articleObj });
  };

  return (
    <main className={`${pageBackground} font-sans`}>
      {/* Hero Section with colorful student-friendly styling */}
      <section className="bg-gradient-to-br from-[#eff6ff] via-[#f0f9ff] to-[#e0e7ff] pt-16 pb-16 sm:pt-20 sm:pb-24 border-b border-[#c7d2fe]">
        <div className={`${pageWrapper} text-center`}>
          <div className="inline-block mb-4">
            <span className="text-sm font-bold text-[#4338ca] bg-[#e0e7ff] px-4 py-1.5 rounded-full border border-[#a5b4fc] shadow-sm tracking-wide">
              🎓 Capstone Project
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1e3a8a] leading-tight mb-5 max-w-4xl mx-auto drop-shadow-sm">
            Welcome to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#7c3aed]">Blog Platform</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#334155] leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            A simple, interactive platform built to let people read interesting articles, write their own thoughts, and share ideas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            {isAuthenticated ? (
              <NavLink to={profilePath} className="inline-flex items-center justify-center bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold px-8 py-3 rounded-full hover:from-[#1d4ed8] hover:to-[#2563eb] transition-all cursor-pointer text-base tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5">
                Go to Dashboard
              </NavLink>
            ) : (
              <>
                <NavLink to="/register" className="inline-flex items-center justify-center bg-gradient-to-r from-[#2563eb] to-[#4f46e5] text-white font-bold px-8 py-3 rounded-full hover:from-[#1d4ed8] hover:to-[#4338ca] transition-all cursor-pointer text-base tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5">
                  Sign Up to Write
                </NavLink>
                <NavLink to="/login" className="inline-flex items-center justify-center bg-white border-2 border-[#cbd5e1] text-[#334155] font-bold px-8 py-3 rounded-full hover:bg-[#f8fafc] hover:border-[#94a3b8] hover:text-[#0f172a] transition-all cursor-pointer text-base tracking-wide shadow-sm hover:shadow-md hover:-translate-y-0.5">
                  Login
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="border-y border-[#cbd5e1] bg-[#f8fafc] py-10 shadow-inner">
        <div className={`${pageWrapper} py-0`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-xl font-extrabold text-[#1e293b] whitespace-nowrap">Explore Topics:</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category, idx) => {
                // Generate colorful borders based on index
                const colors = [
                  "border-[#ef4444] text-[#b91c1c] hover:bg-[#ef4444]",
                  "border-[#f59e0b] text-[#b45309] hover:bg-[#f59e0b]",
                  "border-[#10b981] text-[#047857] hover:bg-[#10b981]",
                  "border-[#3b82f6] text-[#1d4ed8] hover:bg-[#3b82f6]",
                  "border-[#8b5cf6] text-[#6d28d9] hover:bg-[#8b5cf6]",
                  "border-[#ec4899] text-[#be185d] hover:bg-[#ec4899]",
                ];
                const colorClass = colors[idx % colors.length];

                return (
                  <button
                    key={category}
                    onClick={() => navigate(isAuthenticated ? profilePath + "/articles" : "/login")}
                    className={`px-5 py-2 rounded-full border-2 bg-white font-bold transition-all cursor-pointer shadow-sm hover:text-white hover:-translate-y-1 hover:shadow-md ${colorClass}`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className={`${pageWrapper} py-16 sm:py-20`}>
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-[#111827] tracking-tight">Latest Articles</h2>
            <p className="text-[#6b7280] mt-2">Explore the newest content from our top authors.</p>
          </div>
        </div>

        {loading ? (
          <p className={loadingClass}>Loading amazing articles...</p>
        ) : articles.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#e5e7eb] shadow-sm">
             <p className="text-lg text-[#6b7280] font-medium">No articles published yet. Check back soon!</p>
          </div>
        ) : (
          <div className={articleGrid}>
            {articles.map((articleObj) => (
              <div 
                className="bg-white border border-[#e7ebef] p-7 rounded-2xl hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col h-full group" 
                key={articleObj._id}
                onClick={() => navigateToArticleByID(articleObj)}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    {articleObj.author?.profileImageUrl ? (
                       <img src={articleObj.author.profileImageUrl} alt="author" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                       <div className="w-6 h-6 rounded-full bg-[#eaf4ff] flex items-center justify-center text-[10px] font-bold text-[#0066cc]">
                         {articleObj.author?.firstName?.charAt(0)}
                       </div>
                    )}
                    <span className="text-xs font-medium text-[#4b5563]">
                      {articleObj.author?.firstName} {articleObj.author?.lastName}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1f2937] leading-snug tracking-tight mb-2 group-hover:text-[#0b66c3] transition-colors line-clamp-2">
                    {articleObj.title}
                  </h3>
                  <p className="text-sm text-[#4b5563] leading-relaxed line-clamp-3">
                    {articleObj.content}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#f3f4f6] flex items-center justify-between">
                  <span className="text-[0.65rem] font-semibold text-[#0066cc] uppercase tracking-widest bg-[#eaf4ff] px-2 py-1 rounded">
                    {articleObj.category || "General"}
                  </span>
                  <p className="text-xs text-[#9ca3af] font-medium">{formatDateIST(articleObj.createdAt)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;