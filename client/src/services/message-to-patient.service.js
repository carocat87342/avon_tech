import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Messages {
  getMessageByID(id) {
    return axios
      .get(`${API_BASE}/message/${id}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  create(payload) {
    return axios.post(`${API_BASE}/message`, payload, {
      headers: authHeader(),
    });
  }

  update(payload) {
    return axios.put(`${API_BASE}/message/${payload.data.id}`, payload, {
      headers: authHeader(),
    });
  }
}

export default new Messages();
