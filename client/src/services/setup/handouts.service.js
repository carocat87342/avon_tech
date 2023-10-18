import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class HandoutService {
  getHandouts() {
    return axios.get(`${API_BASE}/handouts/`, {
      headers: authHeader(),
    });
  }

  createHandouts(data) {
    return axios.post(`${API_BASE}/handouts/`, data, {
      headers: authHeader(),
    });
  }

  deleteHandout(id) {
    return axios.delete(`${API_BASE}/handouts/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new HandoutService();
