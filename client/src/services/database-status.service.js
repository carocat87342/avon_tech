import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class DatabaseStatusService {
  getDatabaseStatus() {
    return axios
      .get(`${API_BASE}/database-status`, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new DatabaseStatusService();
