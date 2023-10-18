import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class DashboardHome {
  getProviders() {
    // eslint-disable-next-line no-console
    console.log(axios.get(`${API_BASE}/providers`, { headers: authHeader() }).then((res) => res.data));
    // eslint-disable-next-line no-console
    console.log(axios
      .get(`${API_BASE}/providers`, { headers: authHeader() }).then((res) => res.data.length));
    return axios
      .get(`${API_BASE}/providers`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getProviderDetails(providerId) {
    return axios
      .get(`${API_BASE}/providers-details/${providerId}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getPatientUnreadMessages(providerId) {
    return axios
      .get(`${API_BASE}/unread-messages/${providerId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getPatientApptRequests(providerId) {
    return axios
      .get(`${API_BASE}/appointment-requests/${providerId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new DashboardHome();
