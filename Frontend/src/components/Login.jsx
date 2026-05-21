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
  linkClass,
} from "../styles/common";
import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import { useNavigate,useLocation } from "react-router";
import { toast } from "react-hot-toast";
import { useState } from "react";

function Login() {
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useAuth((state) => state.loading);
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const clearError = useAuth((state) => state.clearError);
  const navigate = useNavigate();
  const location=useLocation()

  useEffect(() => {
    clearError();
  }, [clearError]);


  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

 
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      if (location.pathname === "/login") {
        if (currentUser.role === "USER") {
          toast.success("Loggedin successfully");
          navigate("/user-profile");
        } else if (currentUser.role === "AUTHOR") {
          navigate("/author-profile");
        }
      }
    }
  }, [isAuthenticated, currentUser, location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eff6ff] via-[#f0f9ff] to-[#e0e7ff] flex items-center justify-center py-16 px-4">
      <div className={`${formCard} w-full max-w-md shadow-2xl shadow-blue-900/10 border-white/50 backdrop-blur-md`}>
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-[#1e3a8a] tracking-tight">Welcome Back</h2>
          <p className="text-[#64748b] mt-2">Please enter your details to sign in.</p>
        </div>

        {/* error message */}
        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserLogin)}>
          {/* Email */}
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input type="email" {...register("email")} placeholder="you@example.com" className={inputClass} />
          </div>

          {/* Password */}
          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="••••••••"
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

          {/* Submit */}
          <button type="submit" className="w-full bg-gradient-to-r from-[#2563eb] to-[#3b82f6] text-white font-bold py-3 rounded-xl hover:from-[#1d4ed8] hover:to-[#2563eb] transition-all cursor-pointer mt-4 shadow-md hover:shadow-lg hover:-translate-y-0.5" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <button onClick={() => navigate("/")} className="text-sm text-gray-500 hover:text-gray-700">
            ← Back to Home
          </button>
        </div>

        {/* Footer note */}
        <p className={`${mutedText} text-center mt-5`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
