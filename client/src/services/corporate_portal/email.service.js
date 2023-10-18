import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";

class EmailService {
  sendEmailVerification(user) {
    return axios.post(`${API_BASE}/email/send/verification/`, user);
  }

  resendEmailVerification(user) {
    return axios.post(`${API_BASE}/email/resend/verification/`, user);
  }

  emailVerify(userId, token) {
    return axios.get(`${API_BASE}/email/confirmation/${userId}/${token}`);
  }
}

export default new EmailService();
