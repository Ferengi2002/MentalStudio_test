import axios from "axios";
import { getToken } from "@features/auth/context/AuthContext";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE ?? "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
});


api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});
