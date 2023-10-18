import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class MySelfService {
  getProfile(userId) {
    return axios
      .get(`${API_BASE}/myself/profile/${userId}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  updateProfile(payload, userId) {
    return axios.put(`${API_BASE}/myself/profile/${userId}`, payload, {
      headers: authHeader(),
    });
  }

  getForwardEmail(userId) {
    return axios
      .get(`${API_BASE}/myself/forward-email/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getLogins(userId) {
    return axios
      .get(`${API_BASE}/myself/logins/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getActivityHistory(userId) {
    return axios
      .get(`${API_BASE}/myself/activity-history/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new MySelfService();
