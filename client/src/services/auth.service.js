import axios from "axios";

import { API_BASE } from "../utils/API_BASE";

class AuthService {
  async login(user) {
    const loginResponse = await axios.post(`${API_BASE}/auth/login`, {
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

  logout() {
    localStorage.removeItem("user");
  }

  passwordChangeRequest(email) {
    return axios.post(`${API_BASE}/auth/reset_password/user/${email}`);
  }

  resetPassword(userId, token, password) {
    return axios.post(`${API_BASE}/auth/reset/${userId}/${token}`, {
      password,
    });
  }

  register(user) {
    return axios.post(`${API_BASE}/auth/signup`, user);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  checkAuth() {
    const user = JSON.parse(localStorage.getItem("user"));
    // TODO:: Need Token validation check
    if (user && user.accessToken) {
      return true;
    }
    return false;
  }

  validate(data) {
    return axios.post(`${API_BASE}/auth/field/validate`, data);
  }
}

export default new AuthService();
