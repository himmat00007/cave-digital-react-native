import { setIsLoading } from "../redux/feature/taskSlice";
import { clearToken, setToken } from "../redux/feature/userSlice";
import { store } from "../redux/store";
import apiClient from "./axios";

const handleResponse = async (response) => {
  if (response.data.token) {
    await store.dispatch(setToken(response.data.token));
  }
  return response.data;
};

const handleError = (error) => {
  throw error.response?.data || error.message;
};

const apiCall = async (url, data) => {
  try {
    await store.dispatch(setIsLoading(true));
    const response = await apiClient.post(url, data);
    return await handleResponse(response);
  } catch (error) {
    handleError(error);
  } finally {
    await store.dispatch(setIsLoading(false));
  }
};

export const authApi = {
  signup: (userData) => apiCall("/auth/signup", userData),
  login: (credentials) => apiCall("/auth/login", credentials),
  logout: async () => {
    try {
      await store.dispatch(clearToken());
      return true;
    } catch (error) {
      throw error;
    }
  },
};
