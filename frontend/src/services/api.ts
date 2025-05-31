import axios from 'axios';
import { auth } from '../config/firebase';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Survey API
export const surveyApi = {
  create: (data: any) => api.post('/surveys', data),
  getAll: () => api.get('/surveys'),
  getById: (id: string) => api.get(`/surveys/${id}`),
  update: (id: string, data: any) => api.put(`/surveys/${id}`, data),
  delete: (id: string) => api.delete(`/surveys/${id}`),
  deploy: (id: string) => api.post(`/surveys/${id}/deploy`),
  pause: (id: string) => api.post(`/surveys/${id}/pause`),
  resume: (id: string) => api.post(`/surveys/${id}/resume`),
  complete: (id: string) => api.post(`/surveys/${id}/complete`),
  generateQuestions: (data: any) => api.post('/surveys/ai/generate-questions', data),
};

// Panelist API
export const panelistApi = {
  create: (data: any) => api.post('/panels', data),
  getAll: () => api.get('/panels'),
  getById: (id: string) => api.get(`/panels/${id}`),
  update: (id: string, data: any) => api.put(`/panels/${id}`, data),
  delete: (id: string) => api.delete(`/panels/${id}`),
  import: (data: any) => api.post('/panels/import', data),
  export: () => api.get('/panels/export'),
  optOut: (id: string) => api.post(`/panels/${id}/opt-out`),
};

// User API
export const userApi = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data: any) => api.put('/users/profile', data),
};

export default api;