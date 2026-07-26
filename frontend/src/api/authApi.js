import api from "./axios";

export const loginUser = (userData) => {
  return api.post("/user/login", userData);
};

export const registerUser = (formData) => {
  return api.post("/user/register", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const logoutUser = () => {
  return api.post("/user/logout");
};

export const getCurrentUser = () => {
  return api.get("/user/current-user");
};
