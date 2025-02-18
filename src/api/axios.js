import axios from "axios";
import { store } from "../redux/store";
import { clearToken } from "../redux/feature/userSlice";
const BASE_URL = "https://cave-digital-nodejs.vercel.app";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const token = store.getState().user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle token expiration
      store.dispatch(clearToken());
      // You might want to redirect to login screen here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
