import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class AppointmentService {
  getIntegrations() {
    return axios
      .get(`${API_BASE}/integrations`, { headers: authHeader() })
      .then((res) => res.data);
  }

  update(data) {
    return axios.put(`${API_BASE}/integrations/`, data, {
      headers: authHeader(),
    });
  }
}

export default new AppointmentService();
