import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Appointments {
  getAll() {
    return axios
      .get(`${API_BASE}/appointments/events`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getHistory() {
    return axios
      .get(`${API_BASE}/appointments/history`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getAllByProvider(providerId) {
    return axios
      .get(`${API_BASE}/appointments/events/${providerId}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  create(payload) {
    return axios.post(`${API_BASE}/appointments/events`, payload, {
      headers: authHeader(),
    });
  }

  update(payload) {
    return axios.put(
      `${API_BASE}/appointments/events/update/${payload.data.id}`,
      payload,
      {
        headers: authHeader(),
      },
    );
  }

  cancelEvent(payload) {
    return axios.put(
      `${API_BASE}/appointments/events/cancel/${payload.data.id}`,
      payload,
      {
        headers: authHeader(),
      },
    );
  }
}

export default new Appointments();
