import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class SupportAPI {
  getStatus = () => axios.get(`${API_BASE}/support/status`, {
    headers: authHeader(),
  });

  getSuport = (status) => axios.get(`${API_BASE}/support?cStatus=${status}`, {
    headers: authHeader(),
  });

  createCase(data) {
    return axios.post(`${API_BASE}/support`, data, {
      headers: authHeader(),
    });
  }
}

export default new SupportAPI();
