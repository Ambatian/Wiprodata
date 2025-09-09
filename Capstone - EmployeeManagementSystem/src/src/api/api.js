import axios from "axios";
import adapter from "axios/lib/adapters/xhr.js"; // force browser adapter

export const API_URL = "https://localhost:7223/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
});
// --- Auth ---
export async function loginUser({ email, password }) {
  const res = await api.post("/Auth/login", { email, password });
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return { token, user };
}

export async function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function registerUser(payload) {
  // HR only
  return api.post("/Auth/register", payload).then((r) => r.data);
}

// --- Employees ---
export async function getEmployees() {
  const res = await api.get("/Employees");
  return res.data;
}
export async function getEmployeeById(id) {
  const res = await api.get(`/Employees/${id}`);
  return res.data;
}
export async function createEmployee(data) {
  const res = await api.post("/Employees", data);
  return res.data;
}
export async function updateEmployee(id, data) {
  const res = await api.put(`/Employees/${id}`, data);
  return res.data;
}
export async function deleteEmployee(id) {
  await api.delete(`/Employees/${id}`);
  return id;
}

// --- Leaves ---
export async function getLeaves() {
  const res = await api.get("/Leaves");
  return res.data;
}
export async function applyLeave(data) {
  const res = await api.post("/Leaves", data);
  return res.data;
}
export async function updateLeaveStatus(id, status) {
  const res = await api.put(`/Leaves/${id}/status`, { status });
  return res.data;
}

export default api;
