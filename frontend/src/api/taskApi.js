import api from "./axios";

// Get all tasks
export const getTasks = () => api.get("/task");

// Create task
export const createTask = (taskData) => api.post("/task", taskData);

// Update task
export const updateTask = (taskId, taskData) =>
  api.patch(`/task/${taskId}`, taskData);

// Delete task
export const deleteTask = (taskId) => api.delete(`/task/${taskId}`);

// Toggle completion status
export const toggleTaskStatus = (taskId) => api.patch(`/task/${taskId}/toggle`);
