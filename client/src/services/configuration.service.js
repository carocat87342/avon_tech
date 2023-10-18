import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Configuration {
  getConfig() {
    return axios.get(`${API_BASE}/config`, {
      headers: authHeader(),
    });
  }

  getConfigHistory() {
    return axios.get(`${API_BASE}/config/history`, {
      headers: authHeader(),
    });
  }

  updateLogo(id, data) {
    return axios.put(`${API_BASE}/config/logo/${id}`, data, {
      headers: authHeader(),
    });
  }

  updateConfig(id, data) {
    return axios.put(`${API_BASE}/config/${id}`, data, {
      headers: authHeader(),
    });
  }
}

export default new Configuration();
