import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class ProcessLab {
  getLabById(userId, labId) {
    return axios.get(`${API_BASE}/lab/${userId}/${labId}`, {
      headers: authHeader(),
    });
  }

  getLabByUserId() {
    return axios.get(`${API_BASE}/lab/:userId/`, {
      headers: authHeader(),
    });
  }
}

export default new ProcessLab();
