import { create } from "zustand";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    ...user,
    role: user.role?.toUpperCase?.() || user.role,
  };
};

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,
  login: async (userCredWithRole) => {
    const { role: _role, ...userCredObj } = userCredWithRole;
    try {
      //set loading true
      set({ loading: true, error: null });
      //make api call
      let res = await axios.post(`${API_BASE_URL}/common-api/login`, userCredObj, { withCredentials: true });

      //update state
      set({
        loading: false,
        isAuthenticated: true,
        currentUser: normalizeUser(res.data.payload || res.data.user),
      });
    } catch (err) {

      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        //error: err,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      //set loading state
      set({ loading: true, error: null });
      //make logout api req
      await axios.get(`${API_BASE_URL}/common-api/logout`, { withCredentials: true });
      //update state
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
      });
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },
  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API_BASE_URL}/common-api/check-auth`, { withCredentials: true });

      set({
        currentUser: normalizeUser(res.data.payload || res.data.user),
        isAuthenticated: true,
        loading: false,
      });
    } catch (err) {
      // If user is not logged in → do nothing
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
        });
        return;
      }

      // other errors
      console.error("Auth check failed:", err);
      set({ loading: false });
    }
  },
}));
