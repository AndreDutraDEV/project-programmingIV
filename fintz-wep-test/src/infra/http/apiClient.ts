// src/infra/http/apiClient.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ou onde está sua API Python
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;