import axios from "axios";

// Resolve backend URL:
// 1) VITE_API_URL if set
// 2) Default to http://localhost:5000 to ensure API calls work after refresh
const baseURL = import.meta?.env?.VITE_API_URL || "https://leaado-backend-tgij.vercel.app/";

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle auth errors centrally: clear stale token and redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
