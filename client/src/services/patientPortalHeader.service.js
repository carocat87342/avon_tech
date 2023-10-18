import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class PatientPortalHeader {
  getClientPortalHeader() {
    return axios.get(`${API_BASE}/patient-portal-header`, {
      headers: authHeader(),
    });
  }

  editClientPortalHeader(id, data) {
    return axios.put(`${API_BASE}/patient-portal-header/${id}`, data, {
      headers: authHeader(),
    });
  }
}

export default new PatientPortalHeader();
