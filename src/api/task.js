import { setIsLoading } from "../redux/feature/taskSlice";
import { store } from "../redux/store";
import apiClient from "./axios";

const handleRequest = async (method, url, data = null) => {
  try {
    let obj = {
      method: method,
      url: url,
      data: data,
    };
    if (method === "delete") {
      delete obj.data;
    }
    await store.dispatch(setIsLoading(true));

    const response = await apiClient(obj);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  } finally {
    await store.dispatch(setIsLoading(false));
  }
};

export const taskApi = {
  createTask: (taskData) => handleRequest("post", "/tasks", taskData),
  getAllTasks: () => handleRequest("get", "/tasks"),
  getTask: (taskId) => handleRequest("get", `/tasks/${taskId}`),
  updateTask: (taskId, taskData) =>
    handleRequest("put", `/tasks/${taskId}`, taskData),
  deleteTask: (taskId) => handleRequest("delete", `/tasks/${taskId}`),
};
