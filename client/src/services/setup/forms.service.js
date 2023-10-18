import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class FormsService {
  getForms() {
    return axios.get(`${API_BASE}/forms/`, {
      headers: authHeader(),
    });
  }

  createForm(data) {
    return axios.post(`${API_BASE}/forms/`, data, {
      headers: authHeader(),
    });
  }

  deleteForm(id) {
    return axios.delete(`${API_BASE}/forms/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new FormsService();
