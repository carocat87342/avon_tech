import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Tests {
  getAllTests() {
    return axios.get(`${API_BASE}/tests`, { headers: authHeader() });
  }

  getTestMarkerName(markerId) {
    return axios.get(`${API_BASE}/tests/page-title/${markerId}`, {
      headers: authHeader(),
    });
  }

  getLabMarker(patientId) {
    return axios.get(`${API_BASE}/tests/lab-marker/${patientId}`, {
      headers: authHeader(),
    });
  }

  getTestGraph(patientId, labId) {
    return axios.get(`${API_BASE}/tests/graph/${patientId}/${labId}`, {
      headers: authHeader(),
    });
  }

  getConventionalRange(patientId, markerId) {
    return axios.get(
      `${API_BASE}/tests/conventionalrange/${patientId}/${markerId}`,
      { headers: authHeader() },
    );
  }
}

export default new Tests();
