import axios from 'axios';

const url = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
