import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class LabRangeService {
  getLabRanges() {
    return axios.get(`${API_BASE}/client-ranges`, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  searchTests(text) {
    return axios.get(`${API_BASE}/client-range/test/search?query=${text}`, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  createLabRange(data) {
    return axios.post(`${API_BASE}/client-range`, data, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  updateLabRange(data, id) {
    return axios.put(`${API_BASE}/client-range/${id}`, data, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  deleteLabRange(reqBody, id) {
    return axios.delete(`${API_BASE}/client-range/${id}`, {
      headers: authHeader(),
      data: reqBody,
    }).then((res) => res.data);
  }

  resetLabRanges() {
    return axios.post(`${API_BASE}/client-range/reset`, null, {
      headers: authHeader(),
    }).then((res) => res.data);
  }

  updateLabRangeUse(data) {
    return axios.put(`${API_BASE}/auth/client/functional-range`, data, {
      headers: authHeader(),
    }).then((res) => res.data);
  }
}

export default new LabRangeService();
