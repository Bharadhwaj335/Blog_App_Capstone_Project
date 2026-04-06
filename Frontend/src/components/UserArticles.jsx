import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

import {
  articleGrid,
  articleCardClass,
  articleTitle,
  articleExcerpt,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  emptyStateClass,
} from "../styles/common.js";

function UserArticles() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_BASE_URL}/user-api/articles`, { withCredentials: true });
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const navigateToArticleByID = (articleObj) => {
    navigate(`/article/${articleObj._id}`, {
      state: articleObj,
    });
  };

  const formatDateIST = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  if (!articles.length) {
    return <p className={emptyStateClass}>No articles available right now.</p>;
  }

  return (
    <div className={`${articleGrid} mt-8`}>
      {articles.map((articleObj) => (
        <div className={`${articleCardClass} rounded-2xl bg-white`} key={articleObj._id}>
          <div className="flex flex-col h-full">
            <div>
              <p className={articleTitle}>{articleObj.title}</p>
              <p className={articleExcerpt}>{articleObj.content.slice(0, 80)}...</p>
              <p className={timestampClass}>{formatDateIST(articleObj.createdAt)}</p>
            </div>

            <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => navigateToArticleByID(articleObj)}>
              Read Article →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserArticles;
