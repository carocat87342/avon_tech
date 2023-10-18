import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class ContractsService {
  getContracts() {
    return axios.get(`${API_BASE}/contracts/`, {
      headers: authHeader(),
    });
  }
}

export default new ContractsService();
