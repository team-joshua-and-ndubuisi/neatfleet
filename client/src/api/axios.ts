import axios from "axios";
import { useAuthStore } from "@/features/auth/stores";

const url = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api";

const token = useAuthStore.getState().token

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default axiosInstance;
