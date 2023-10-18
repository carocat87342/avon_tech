import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class SearchPatient {
  search(data) {
    return axios.post(`${API_BASE}/client/patient-search`, data, {
      headers: authHeader(),
    });
  }
}

export default new SearchPatient();
