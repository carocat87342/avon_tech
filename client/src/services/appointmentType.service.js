import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class AppointmentService {
  getAll() {
    return axios
      .get(`${API_BASE}/appointment-types`, { headers: authHeader() })
      .then((res) => res.data);
  }

  create(data) {
    return axios.post(`${API_BASE}/appointment-types`, data, {
      headers: authHeader(),
    });
  }

  update(data, appointmentId) {
    return axios.put(
      `${API_BASE}/appointment-types/${appointmentId}`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  deleteById(id) {
    return axios.delete(`${API_BASE}/appointment-types/${id}`, {
      headers: authHeader(),
    });
  }
}

export default new AppointmentService();
