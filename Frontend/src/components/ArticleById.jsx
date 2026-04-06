import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
} from "../styles/common.js";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`http://localhost:4000/user-api/article/${id}`, { withCredentials: true });

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `http://localhost:4000/author-api/articles/${id}/status`,
        { isArticleActive: newStatus },
        { withCredentials: true },
      );

      console.log("SUCCESS:", res.data);

      setArticle(res.data.payload);

      toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        toast(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };
  
  const editArticle = (articleObj) => {
    navigate(`/edit-article/${articleObj._id}`, { state: articleObj });
  };

  const addComment = async () => {
    const trimmedComment = commentText.trim();

    if (!trimmedComment) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (!user?._id) {
      toast.error("Please login to comment");
      return;
    }

    setCommentLoading(true);

    try {
      const payload = {
        user: user._id,
        articleId: article._id,
        comment: trimmedComment,
      };

      const res = await axios.put("http://localhost:4000/user-api/articles", payload, {
        withCredentials: true,
      });

      setArticle(res.data.payload);
      setCommentText("");
      toast.success("Comment added");
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to add comment";
      toast.error(msg);
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {article.author?.firstName || "Author"}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}
      {user?.role === "USER" && article.isArticleActive && (
        <div className="mt-8 rounded-xl border border-slate-200 p-4">
          <p className="mb-2 text-sm font-semibold text-slate-700">Add Comment</p>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-slate-300 p-2 text-sm outline-none focus:border-slate-500"
            placeholder="Write your comment"
          />
          <button
            className="mt-2 rounded-md bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-50"
            onClick={addComment}
            disabled={commentLoading}
          >
            {commentLoading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      )}

      <div className="mt-8">
        <p className="mb-3 text-base font-semibold text-slate-800">Comments</p>
        {article.comments?.length ? (
          <div className="space-y-3">
            {article.comments.map((cmt, idx) => (
              <div key={`${cmt._id || idx}`} className="rounded-lg border border-slate-200 p-3">
                <p className="text-sm text-slate-700">{cmt.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No comments yet.</p>
        )}
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;
