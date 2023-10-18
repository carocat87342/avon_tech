import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";

class PatientAuthService {
  async login(user) {
    const loginResponse = await axios.post(`${API_BASE}/auth/patient/login`, {
      client_id: user.client_id,
      email: user.email,
      password: user.password,
    });
    if (loginResponse.data) {
      if (loginResponse.data.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(loginResponse.data.data));
      }
      return loginResponse.data;
    }
    return false;
  }

  getClientCode(clientCode) {
    return axios
      .get(`${API_BASE}/auth/patient/client/?c=${clientCode}`)
      .then((res) => res.data);
  }

  validate(data) {
    return axios.post(`${API_BASE}/auth/field/validate`, data);
  }

  register(patient) {
    return axios.post(`${API_BASE}/auth/patient/signup`, patient);
  }

  passwordChangeRequest(email, data) {
    return axios.post(`${API_BASE}/auth/patient/reset_password/${email}`, data);
  }

  resetPassword(patientId, token, password) {
    return axios.post(`${API_BASE}/auth/patient/reset/${patientId}/${token}`, {
      password,
    });
  }
}

export default new PatientAuthService();
