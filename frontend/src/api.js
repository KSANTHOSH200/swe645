// src/api.js
import axios from "axios";

// Base URL: from env in Docker, fallback to localhost for local dev
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

console.log("Using API base URL:", API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // You can add timeout, etc. here if you want
  // timeout: 5000,
});

export default api;
