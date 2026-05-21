import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { toast } from "react-hot-toast";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  secondaryBtn
} from "../styles/common";

function EditProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const updateUser = useAuth((state) => state.updateUser);
  const navigate = useNavigate();
  
  const { register, handleSubmit, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(currentUser?.profileImageUrl || null);

  useEffect(() => {
    if (currentUser) {
      setValue("firstName", currentUser.firstName || "");
      setValue("lastName", currentUser.lastName || "");
    }
  }, [currentUser, setValue]);

  const onUpdateProfile = async (data) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("firstName", data.firstName);
    if (data.lastName) formData.append("lastName", data.lastName);

    const profileFile = data.profileImageUrl?.[0];
    if (profileFile) {
      formData.append("profileImageUrl", profileFile);
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/common-api/profile`, formData, {
        withCredentials: true,
      });

      if (res.status === 200) {
        updateUser(res.data.payload);
        toast.success("Profile updated successfully!");
        
        if (currentUser.role === "USER") {
          navigate("/user-profile");
        } else if (currentUser.role === "AUTHOR" || currentUser.role === "ADMIN") {
          navigate("/author-profile");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (preview && preview !== currentUser?.profileImageUrl) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, currentUser]);

  const handleCancel = () => {
    if (currentUser?.role === "USER") {
      navigate("/user-profile");
    } else {
      navigate("/author-profile");
    }
  };

  return (
    <div className={`${pageBackground} flex items-center justify-center py-16 px-4`}>
      <div className={formCard}>
        <h2 className={formTitle}>Edit Profile</h2>
        {error && <p className={errorClass}>{error}</p>}
        
        <form onSubmit={handleSubmit(onUpdateProfile)}>
          <div className="sm:flex gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                {...register("lastName")}
                className={inputClass}
              />
            </div>
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (!["image/jpeg", "image/png"].includes(file.type)) {
                    setError("Only JPG or PNG allowed");
                    return;
                  }
                  if (file.size > 2 * 1024 * 1024) {
                    setError("File size must be less than 2MB");
                    return;
                  }
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                  setError(null);
                }
              }}
            />
            {preview && (
              <div className="mt-3 flex justify-center">
                <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full border shadow-sm" />
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className={`${secondaryBtn} flex-1`}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className={`${submitBtn} flex-1 !mt-0`} disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
