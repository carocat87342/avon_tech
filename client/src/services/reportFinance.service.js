import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class ReportFinanceService {
  getAll(from, to) {
    return axios
      .get(`${API_BASE}/report-finance?from=${from}&to=${to}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new ReportFinanceService();
