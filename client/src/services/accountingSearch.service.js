import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Accounting {
  search(data) {
    return axios.post(`${API_BASE}/client/accounting/search`, data, {
      headers: authHeader(),
    });
  }

  searchType() {
    return axios.get(`${API_BASE}/client/accounting`, {
      headers: authHeader(),
    });
  }
}

export default new Accounting();
