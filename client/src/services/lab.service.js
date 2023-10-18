import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class LabService {
  // Lab data from dahsboard page
  getLabData() {
    return axios
      .get(`${API_BASE}/labs`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab by Id
  getLabById(labId) {
    return axios
      .get(`${API_BASE}/labs/${labId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // User History
  getUserHistory(userId) {
    return axios
      .get(`${API_BASE}/labs/${userId}/user-history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab History
  getLabHistory(labId) {
    return axios
      .get(`${API_BASE}/labs/${labId}/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab Values
  getLabValues(labId) {
    return axios
      .get(`${API_BASE}/labs/${labId}/values`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // update lab status
  updateLabStatus(labId, payload) {
    return axios.put(`${API_BASE}/labs/${labId}`, payload, {
      headers: authHeader(),
    })
      .then((res) => res.data);
  }

  // update lab data
  updateLab(labId, payload) {
    return axios.put(`${API_BASE}/labs/${labId}/update`, payload, {
      headers: authHeader(),
    })
      .then((res) => res.data);
  }

  // Assignee Users
  getAssigneeUsers() {
    return axios
      .get(`${API_BASE}/lab/assign-user`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new LabService();
