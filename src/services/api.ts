import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { ENV } from '@/config/env';
import { API } from '@/constants';
import { storage } from '@/utils/storage';
import { STORAGE_KEYS } from '@/constants';

/**
 * Axios instance with automatic token injection and refresh.
 */
const api: AxiosInstance = axios.create({
  baseURL: ENV.API_BASE_URL,
  timeout: API.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request Interceptor — inject auth token ───────────────────────────────
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor — handle 401 token refresh ──────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = await storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
        if (!refreshToken) throw new Error('No refresh token');

        const { data } = await axios.post(`${ENV.API_BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        });

        await storage.set(STORAGE_KEYS.AUTH_TOKEN, data.access_token);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
        }
        return api(originalRequest);
      } catch {
        // Refresh failed — clear tokens and let auth store handle logout
        await storage.remove(STORAGE_KEYS.AUTH_TOKEN);
        await storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
