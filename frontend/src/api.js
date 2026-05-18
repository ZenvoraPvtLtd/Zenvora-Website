import axios from "axios";

// Base URL
// Create frontend/.env with VITE_API_URL=http://localhost:5000/api if your backend URL changes.
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Token Automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

// ================= AUTH =================

// OAuth — redirect browser to backend OAuth route
const loginWithGoogle = () => {
  window.location.href = `${BASE_URL}/auth/google`;
};

const loginWithMicrosoft = () => {
  window.location.href = `${BASE_URL}/auth/microsoft`;
};

// Register
const register = async (formData) => {
  const res = await axiosInstance.post("/auth/register", formData);

  return res.data;
};

// Login
const login = async (formData) => {
  const res = await axiosInstance.post("/auth/login", formData);

  return res.data;
};

// Backend health
const health = async () => {
  const res = await axiosInstance.get("/health");

  return res.data;
};

// Get Current User
const getMe = async () => {
  const res = await axiosInstance.get("/auth/me");

  return res.data;
};

// Logout
const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("rememberedEmail");
};

// ================= CONTACT =================

// Send Contact Form
const sendContact = async (formData) => {
  const res = await axiosInstance.post("/contact", formData);

  return res.data;
};

// Get All Contacts (admin)
const getContacts = async () => {
  const res = await axiosInstance.get("/contact");

  return res.data;
};

// Update Contact Status (admin)
const updateContactStatus = async (id, body) => {
  const res = await axiosInstance.patch(`/contact/${id}/status`, body);

  return res.data;
};

// ================= CAREERS =================

// Get All Jobs
const getJobs = async () => {
  const res = await axiosInstance.get("/careers/jobs");

  return res.data;
};

// Get Single Job
const getJobById = async (id) => {
  const res = await axiosInstance.get(`/careers/jobs/${id}`);

  return res.data;
};

// Apply Job
const applyJob = async (formData) => {
  const res = await axiosInstance.post("/careers/apply", formData);

  return res.data;
};

// ================= ADMIN =================

// Dashboard
const getDashboard = async () => {
  const res = await axiosInstance.get("/admin/dashboard");

  return res.data;
};

// Get Users
const getUsers = async () => {
  const res = await axiosInstance.get("/admin/users");

  return res.data;
};

// Delete User
const deleteUser = async (id) => {
  const res = await axiosInstance.delete(`/admin/users/${id}`);

  return res.data;
};

// Update User
const updateUser = async (id, body) => {
  const res = await axiosInstance.patch(`/admin/users/${id}`, body);

  return res.data;
};

// Create Job
const createJob = async (body) => {
  const res = await axiosInstance.post("/careers/jobs", body);

  return res.data;
};

// Update Job
const updateJob = async (id, body) => {
  const res = await axiosInstance.put(`/careers/jobs/${id}`, body);

  return res.data;
};

// Delete Job
const deleteJob = async (id) => {
  const res = await axiosInstance.delete(`/careers/jobs/${id}`);

  return res.data;
};

// Get Applications
const getApplications = async () => {
  const res = await axiosInstance.get("/careers/applications");

  return res.data;
};

// Update Application Status
const updateApplicationStatus = async (id, body) => {
  const res = await axiosInstance.patch(
    `/careers/applications/${id}/status`,
    body,
  );

  return res.data;
};

// Export APIs
export const api = {
  // Auth
  register,
  login,
  health,
  getMe,
  loginWithGoogle,
  loginWithMicrosoft,
  baseUrl: BASE_URL,

  // Contact
  sendContact,

  // Careers
  getJobs,
  getJobById,
  applyJob,

  // Admin
  getDashboard,
  getUsers,
  deleteUser,
  updateUser,

  createJob,
  updateJob,
  deleteJob,

  getApplications,
  updateApplicationStatus,

  getContacts,
  updateContactStatus,
};
