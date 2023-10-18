import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class HomeService {
  getSupports(data) {
    return axios
      .post(`${API_BASE}/corporate/supports`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new HomeService();
