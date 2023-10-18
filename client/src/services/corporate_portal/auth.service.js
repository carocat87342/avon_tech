import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";

class AuthService {
  passwordChangeRequest(email) {
    return axios.post(`${API_BASE}/auth/reset_password/corporate/${email}`);
  }

  resetPassword(corporateId, token, password) {
    return axios.post(`${API_BASE}/auth/reset/corporate/${corporateId}/${token}`, {
      password,
    });
  }
}

export default new AuthService();
