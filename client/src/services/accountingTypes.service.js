import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class AccountingTypes {
  getAccountingTypes() {
    return axios.get(`${API_BASE}/accounting-types`, {
      headers: authHeader(),
    });
  }
}

export default new AccountingTypes();
