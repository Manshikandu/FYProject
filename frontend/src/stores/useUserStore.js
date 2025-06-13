import { create } from 'zustand';
import axios from '../lib/axios';

 //import {persist} from 'zustand/middleware';

export const useUserStore = create((set, get) => ({

 
  user: null,
  loading: false,
  checkingAuth: true,

  clientSignup : async ({ username, email, phone, password }) => {
    set({ loading: true });

    // Validation inside store
    if (!username || !email || !phone || !password ) {
      set({ loading: false });
      throw new Error("All fields are required");
    }


    try {
      const res = await axios.post("/auth/clientSignup", {
        username,
        email,
        phone,
        password,
        // confirmPassword,
        // citizenshipNo,
      });

      set({ user: res.data, loading: false });
      return res.data; // Allow component to know it succeeded
    } catch (error) {
      set({ loading: false });
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },

   artistSignup: async ({ username, email, phone, password, category, location }) => {
    set({ loading: true });

    // Validation inside store
    if (!username || !email || !phone || !password || !category || !location) {
      set({ loading: false });
      throw new Error("All fields are required");
    }


    try {
      const res = await axios.post("/auth/artistSignup", {
        username,
        email,
        phone,
        password,
        category,
        location
        // confirmPassword,
        // citizenshipNo,
      });

      set({ user: res.data, loading: false });
      return res.data; // Allow component to know it succeeded
    } catch (error) {
      set({ loading: false });
      throw new Error(error.response?.data?.message || "Signup failed");
    }
  },

  // persist(
  //   (set) => ({
  //     artist : null,
  //     loading: false,

    //  artistSignup: async ({ username, email, phone, password, category, location }) => {
    //     set({ loading: true });

    //     if (!username || !email || !phone || !password || !category || !location) {
    //       set({ loading: false });
    //       throw new Error("All fields are required");
    //     }

    //     try {
    //       const res = await axios.post("/auth/artistSignup", {
    //         username,
    //         email,
    //         phone,
    //         password,
    //         category,
    //         location,
    //       });

    //       set({ artist: res.data, loading: false });
    //       return res.data;
    //     } catch (error) {
    //       set({ loading: false });
    //       throw new Error(error.response?.data?.message || "Signup failed");
    //     }
    //   },
    


  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Logout failed");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ checkingAuth: false, user: null });
    }
  },
}));
