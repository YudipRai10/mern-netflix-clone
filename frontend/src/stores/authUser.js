import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  isLoggingIn: false,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const res = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: res.data.user, isSigningUp: false });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Error signing up");
      set({ isSigningUp: false, user: null });
    }
  },

  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axios.post("/api/v1/auth/login", credentials);
      set({ user: res.data.user, isLoggingIn: false });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Failed to login");
      set({ isLoggingIn: false, user: null });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
      set({ isLoggingOut: false });
    }
  },

  authCheck: async () => {
    try {
      const res = await axios.get("/api/v1/auth/authCheck");
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      console.error(error);
    }
  },
}));
