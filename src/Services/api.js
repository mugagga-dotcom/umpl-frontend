import axios from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

const API_TIMEOUT =
  import.meta.env.VITE_API_TIMEOUT || 10000;

const api = axios.create({
  baseURL: API_URL,
  timeout: Number(API_TIMEOUT),
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export const formatMediaUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  
  // VITE_API_URL is typically http://127.0.0.1:5000/api
  // We want to construct the base URL without /api
  const baseUrl = API_URL.replace('/api', '');
  
  // Ensure the URL starts with a slash
  const formattedPath = url.startsWith('/') ? url : `/${url}`;
  return `${baseUrl}${formattedPath}`;
};

export default api;