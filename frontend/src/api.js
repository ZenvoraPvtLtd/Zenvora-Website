import axios from "axios";

// Base URL
const BASE_URL = import.meta.env.VITE_API_URL || "/api";
const CHATBOT_URL = import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:8000";

// Axios Instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const chatbotInstance = axios.create({
  baseURL: CHATBOT_URL,
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

// Backend health check
const health = async () => {
  const res = await axiosInstance.get("/health");

  return res.data;
};

// OAuth - redirect browser to backend OAuth route
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

// Admin Login
const adminLogin = async (formData) => {
  const res = await axiosInstance.post("/auth/admin-login", formData);

  return res.data;
};

// Forgot Password
const forgotPassword = async (formData) => {
  const res = await axiosInstance.post("/auth/forgot-password", formData);

  return res.data;
};

// Reset Password
const resetPassword = async (formData) => {
  const res = await axiosInstance.post("/auth/reset-password", formData);

  return res.data;
};

// Activity Overview (admin)
const getActivityOverview = async (range = "week") => {
  const res = await axiosInstance.get(`/admin/activity?range=${range}`);

  return res.data;
};

// Recent Activities (admin)
const getRecentActivities = async () => {
  const res = await axiosInstance.get("/admin/activities");

  return res.data;
};

// Google Token Login
const googleLogin = async (idToken) => {
  const res = await axiosInstance.post("/auth/google", { token: idToken });

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

const sendChatMessage = async (message) => {
  const res = await chatbotInstance.post("/chat", { message });

  return res.data;
};

const getChatFaqs = async () => {
  const res = await chatbotInstance.get("/faqs");

  return res.data;
};

const getChatExperts = async () => {
  const res = await chatbotInstance.get("/experts");

  return res.data;
};

const sendChatEmail = async ({ email, topic }) => {
  const res = await chatbotInstance.post("/email-info", { email, topic });

  return res.data;
};

const sendChatQuestionEmail = async ({ email, question }) => {
  const res = await chatbotInstance.post("/email-question", { email, question });

  return res.data;
};

// Direct named exports for convenience
export { sendChatMessage, getChatFaqs, getChatExperts, sendChatEmail, sendChatQuestionEmail };

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

const applyJob = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/careers/apply`, {
    method: "POST",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to apply");
  return data;
};

// Parse Resume
const parseResume = async (formData) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/resume/parse`, {
    method: "POST",
    headers: token ? { "Authorization": `Bearer ${token}` } : {},
    body: formData
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to parse resume");
  return data;
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

// ================= ADMIN MANAGEMENT =================

// Get all admins
const getAdmins = async () => {
  const res = await axiosInstance.get("/admin/admins");

  return res.data;
};

// Create admin
const createAdmin = async (body) => {
  const res = await axiosInstance.post("/admin/admins", body);

  return res.data;
};

// Update admin
const updateAdmin = async (id, body) => {
  const res = await axiosInstance.patch(`/admin/admins/${id}`, body);

  return res.data;
};

// Delete admin
const deleteAdmin = async (id) => {
  const res = await axiosInstance.delete(`/admin/admins/${id}`);

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
  baseUrl: BASE_URL,
  health,

  // Auth
  register,
  login,
  adminLogin,
  forgotPassword,
  resetPassword,
  googleLogin,
  getMe,
  loginWithGoogle,
  loginWithMicrosoft,
  logout,

  // Contact
  sendContact,
  sendChatMessage,
  getChatFaqs,
  getChatExperts,
  sendChatEmail,
  sendChatQuestionEmail,

  // Careers
  getJobs,
  getJobById,
  applyJob,
  parseResume,

  // Admin
  getDashboard,
  getUsers,
  getActivityOverview,
  getRecentActivities,
  deleteUser,
  updateUser,
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,

  createJob,
  updateJob,
  deleteJob,

  getApplications,
  updateApplicationStatus,

  getContacts,
  updateContactStatus,
};

