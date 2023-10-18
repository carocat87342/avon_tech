import axios from "axios";

import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_API_URL}api/v1` || "http://localhost:5000/api/v1";

class Users {
  getAllUsers() {
    return axios.get(`${API_URL}/allusers`, { headers: authHeader() });
  }

  getForwardEmailList() {
    return axios.get(`${API_URL}/forwardemail`, { headers: authHeader() });
  }

  createNewUser(data) {
    return axios.post(`${API_URL}/user`, data, { headers: authHeader() });
  }

  updateUser(id, data) {
    return axios.put(`${API_URL}/user/${id}`, data, {
      headers: authHeader(),
    });
  }

  getContractlists() {
    return axios.get(`${API_URL}/auth/user/contracts`, {
      headers: authHeader(),
    });
  }
}

export default new Users();
