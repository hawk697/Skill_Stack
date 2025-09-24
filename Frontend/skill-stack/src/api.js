import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // ✅ backend URL
});

// Users
export const createUser = (data) => API.post("/users", data);
export const getUsers = () => API.get("/users");

// Skills
export const addSkill = (userId, data) => API.post(`/users/${userId}/skills`, data);
export const getSkills = (userId) => API.get(`/users/${userId}/skills`);
export const deleteSkill = (skillId) => API.delete(`/skills/${skillId}`);

// Resources
export const addResource = (skillId, data) => API.post(`/skills/${skillId}/resources`, data);

// Progress
export const addProgress = (skillId, data) => API.post(`/skills/${skillId}/progress`, data);
export const getProgress = (skillId) => API.get(`/skills/${skillId}/progress`);
