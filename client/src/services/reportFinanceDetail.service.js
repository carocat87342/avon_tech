import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class ReportFinanceDetail {
  getReportFinanceDetail(dateFrom, dateTo) {
    return axios.get(
      `${API_BASE}/report-finance-detail?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      {
        headers: authHeader(),
      },
    );
  }
}

export default new ReportFinanceDetail();
