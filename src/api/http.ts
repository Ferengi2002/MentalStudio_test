import axios from "axios";
import { ENV } from "../config/env";
import { getToken } from "../context/AuthContext";

export const api = axios.create({
  baseURL: ENV.API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (!config.headers) config.headers = new axios.AxiosHeaders();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete (config.headers as any).Authorization;
  }
  return config;
});
