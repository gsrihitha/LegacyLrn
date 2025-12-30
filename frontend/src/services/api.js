import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authAPI = {
  // Student auth
  registerStudent: (data) => api.post('/api/students/register', data),
  loginStudent: (email, password) => {
    // FastAPI expects form data for these endpoints
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    return api.post('/api/students/login', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // Mentor auth
  registerMentor: (data) => api.post('/api/mentors/register', data),
  loginMentor: (email, password) => {
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    return api.post('/api/mentors/login', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },
};

export const matchAPI = {
  getRecommendations: (query) => api.get('/api/match/', { params: { query } }),
  refreshEmbeddings: () => api.post('/api/match/refresh'),
};

export const feedbackAPI = {
  submitFeedback: (data) => api.post('/api/feedback/', data),
};

export default api;

