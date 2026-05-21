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
      {/* Hero Section with premium gradient styling */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#f4f6f8] pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className={`${pageWrapper} relative z-10 text-center`}>
          <div className="inline-block animate-fade-in-up">
            <p className="text-xs uppercase tracking-[0.25em] text-[#0066cc] font-bold mb-4 bg-[#eaf4ff] px-3 py-1 rounded-full border border-[#b3d4ff]">
              Welcome to the future of reading
            </p>
          </div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-[#111827] tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto drop-shadow-sm">
            Discover ideas that shape <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0066cc] to-[#00aaff]">the world</span>.
          </h1>
          <p className="text-lg sm:text-xl text-[#4b5563] leading-relaxed max-w-2xl mx-auto mb-10">
            A premium space for thoughtful minds to read, write, and explore meaningful content without distractions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            {isAuthenticated ? (
              <NavLink to={profilePath} className={`${primaryBtn} text-lg px-8 py-3.5 shadow-lg shadow-[#0b66c3]/20`}>
                Go to Dashboard
              </NavLink>
            ) : (
              <>
                <NavLink to="/register" className={`${primaryBtn} text-lg px-8 py-3.5 shadow-lg shadow-[#0b66c3]/20`}>
                  Start Reading For Free
                </NavLink>
                <NavLink to="/login" className={`${secondaryBtn} text-lg px-8 py-3.5`}>
                  Sign In
                </NavLink>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Topics Section */}
      <section className="border-y border-[#e5e7eb] bg-white py-10">
        <div className={`${pageWrapper} py-0`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-xl font-bold text-[#1f2937] whitespace-nowrap">Popular Topics:</h2>
            <div className="flex flex-wrap justify-center gap-2.5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => navigate(isAuthenticated ? profilePath + "/articles" : "/login")}
                  className="px-5 py-2 rounded-full border border-[#dce6f0] text-sm font-medium text-[#4b5563] hover:bg-[#1f2937] hover:text-white hover:border-[#1f2937] transition-all cursor-pointer shadow-sm"
                >
                  {category}
                </button>
              ))}
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