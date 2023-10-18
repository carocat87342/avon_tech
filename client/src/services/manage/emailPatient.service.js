import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class EmailPatient {
  getEmailHistory() {
    return axios.get(`${API_BASE}/email/history`, {
      headers: authHeader(),
    });
  }

  updateEmailHistory(payload) {
    return axios.put(
      `${API_BASE}/email/history`,
      payload,
      {
        headers: authHeader(),
      },
    );
  }

  createEmailHistory(payload) {
    return axios.post(`${API_BASE}/email/history`, payload, {
      headers: authHeader(),
    });
  }

  deleteEmailHistory(date) {
    return axios.delete(
      `${API_BASE}/email/history/${date}`,
      {
        headers: authHeader(),
      },
    );
  }
}

export default new EmailPatient();
