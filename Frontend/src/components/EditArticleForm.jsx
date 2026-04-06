import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [article, setArticle] = useState(location.state || null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (location.state) {
      setArticle(location.state);
    }
  }, [location.state]);

  useEffect(() => {
    if (article || !id) return;

    const getArticle = async () => {
      setLoading(true);
      setApiError(null);
      try {
        const res = await axios.get(`http://localhost:4000/user-api/article/${id}`, {
          withCredentials: true,
        });
        setArticle(res.data.payload);
      } catch (err) {
        const msg = err.response?.data?.message || err.response?.data?.error || "Unable to load article";
        setApiError(msg);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [article, id]);

  // prefill form
  useEffect(() => {
    if (!article) return;

     setValue("title", article.title);
     setValue("category", article.category);
     setValue("content", article.content);
  }, [article, setValue]);

  const updateArticle = async (data) => {
    if (!article?._id && !id) {
      toast.error("Article data not found. Please open edit from article page.");
      navigate("/author-profile/articles");
      return;
    }

    setSubmitting(true);
    setApiError(null);

    try {
      const payload = {
        ...data,
        articleId: article?._id || id,
      };

      const res = await axios.put("http://localhost:4000/author-api/articles", payload, {
        withCredentials: true,
      });

      toast.success("Article updated successfully");
      navigate(`/article/${article?._id || id}`, { state: res.data.payload });
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || "Failed to update article";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      {loading && <p className={loadingClass}>Loading article details...</p>}
      {apiError && <p className={errorClass}>{apiError}</p>}

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input className={inputClass} {...register("title", { required: "Title required" })} />

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select className={inputClass} {...register("category", { required: "Category required" })}>
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea rows="14" className={inputClass} {...register("content", { required: "Content required" })} />

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        <button className={submitBtn} disabled={submitting}>
          {submitting ? "Updating..." : "Update Article"}
        </button>

        {submitting && <p className={loadingClass}>Updating article...</p>}
      </form>
    </div>
  );
}

export default EditArticle;
