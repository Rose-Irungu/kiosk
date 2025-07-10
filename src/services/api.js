import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://guestapi.zynamis.co.ke/api/',
  timeout: 10000,
  headers: {
    // 'Content-Type': 'application/json',
    // 'ngrok-skip-browser-warning': 'true', 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;