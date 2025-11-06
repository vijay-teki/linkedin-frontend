import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // Adjust for deployment later
});

API.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
