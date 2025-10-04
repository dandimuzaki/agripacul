import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
let accessToken = null;

export const getAccessToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
    console.log('🔑 Sending token:', accessToken);
  } else {
    console.warn('⚠️ No token set, request is unauthenticated');
  }
  return config;
});

export default api;