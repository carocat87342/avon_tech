import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class MergePatient {
  mergePatient(data) {
    return axios.post(
      `${API_BASE}/patient-merge`, data,
      {
        headers: authHeader(),
      },
    );
  }
}

export default new MergePatient();
