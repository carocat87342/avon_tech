import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class AppointmentService {
  getAll() {
    return axios
      .get(`${API_BASE}/appointment-types/users`, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new AppointmentService();
