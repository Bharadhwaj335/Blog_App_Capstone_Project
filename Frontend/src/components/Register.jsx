import { useForm } from "react-hook-form";
import {
  pageBackground,
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  divider,
  loadingClass,
} from "../styles/common";
import { NavLink } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../config/api";
import { toast } from "react-hot-toast";
import { useAuth } from "../store/authStore";

function Register() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const clearError = useAuth((state) => state.clearError);

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    // Create form data object
    const formData = new FormData();
    //get user object
    let { role, profileImageUrl, ...userObj } = newUser;
    //add all fields except profilePic to FormData object
    Object.keys(userObj).forEach((key) => {
      formData.append(key, userObj[key]);
    });
    // add profile image only when the user selected one
    const profileFile = profileImageUrl?.[0];
    if (profileFile) {
      formData.append("profileImageUrl", profileFile);
    }
    //add image to formData objecte
    try {
      if (role === "user") {
        //make API req to user-api
        let resObj = await axios.post(`${API_BASE_URL}/user-api/users`, formData);
        if (resObj.status === 201) {
          toast.success("Account created successfully!");
          clearError();
          navigate("/login");
        }
      }
      if (role === "author") {
        //make API req to author-api
        //make API req to user-api
        let resObj = await axios.post(`${API_BASE_URL}/author-api/users`, formData);
        if (resObj.status === 201) {
          //navigate to login
          clearError();
          navigate("/login");
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  //cleanup(remove preview image from browser memory)
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  //removed old loading class return

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-[#f0f9ff] to-[#e0e7ff] flex items-center justify-center py-16 px-4">
      <div className={`${formCard} w-full max-w-2xl shadow-2xl shadow-blue-900/10 border-white/50 backdrop-blur-md`}>
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#1e3a8a] tracking-tight">Create an Account</h2>
          <p className="text-[#64748b] mt-2">Join us to start reading and writing amazing articles.</p>
        </div>
        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserRegister)}>
          {/* Role Selection */}
          <div className="mb-5">
            <p className={labelClass}>Register as</p>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("role", { required: "Please select a role" })}
                  id="user"
                  value="user"
                  className="accent-violet-600 w-4 h-4"
                />
                <span className="text-sm text-stone-700 font-medium">User</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  {...register("role", { required: "Please select a role" })}
                  id="author"
                  value="author"
                  className="accent-violet-600 w-4 h-4"
                />
                <span className="text-sm text-stone-700 font-medium">Author</span>
              </label>
            </div>
          </div>

          <div className={divider} />

          {/* First & Last Name — side by side */}
          <div className="sm:flex gap-4 mb-4">
            <div className="flex-1">
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                placeholder="First name"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last name"
                className={inputClass}
              />
            </div>
          </div>

          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="Min. 8 characters"
                className={inputClass}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Profile Image */}
          <div className={formGroup}>
            <label className={labelClass}>Profile Image</label>
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("profileImageUrl")}
              onChange={(e) => {
                //get image file
                const file = e.target.files[0];
                // validation for image format
                if (file) {
                  if (!["image/jpeg", "image/png"].includes(file.type)) {
                    setError("Only JPG or PNG allowed");
                    return;
                  }
                  //validation for file size
                  if (file.size > 2 * 1024 * 1024) {
                    setError("File size must be less than 2MB");
                    return;
                  }
                  //Converts file → temporary browser URL(create preview URL)
                  const previewUrl = URL.createObjectURL(file);
                  setPreview(previewUrl);
                  setError(null);
                }
              }}
            />

            {preview && (
              <div className="mt-3 flex justify-center">
                <img src={preview} alt="Preview" className="w-24 h-24 object-cover rounded-full border" />
              </div>
            )}
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold py-3 rounded-xl hover:from-[#1d4ed8] hover:to-[#2563eb] transition-all cursor-pointer mt-6 shadow-md hover:shadow-lg hover:-translate-y-0.5" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </button>
        </div>

        {/* Footer note */}
        <p className={`${mutedText} text-center mt-5`}>
          Already have an account?{" "}
          <NavLink to="/login" className="text-violet-600 hover:text-violet-500 font-medium">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;

//res.data
//err.response.

//append(fn,userObj.profileImageUrl)
