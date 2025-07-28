import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://guestapi.zynamis.co.ke/api/',
  timeout: 20000,
  headers: {
    'Content-Type': 'application/json',
    // 'ngrok-skip-browser-warning': 'true', 
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU2NDYyNTYxLCJpYXQiOjE3NTIxNDI1NjEsImp0aSI6IjU4YWQwZDA0YjdkMTQ1NjRhNWU5ZTgwZDExNWI2YWNkIiwidXNlcl9pZCI6Mn0.BeYMuyMI8QsNyf1_CGmHWUEmHiLHs9kPrdrM3KEeiew";
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