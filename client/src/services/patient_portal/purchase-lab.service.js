import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class PurchaseLabsService {
  // patient profile
  getAll() {
    return axios
      .get(`${API_BASE}/patient-portal/purchase-labs`, { headers: authHeader() })
      .then((res) => res.data);
  }

  create(data) {
    return axios
      .post(`${API_BASE}/patient-portal/purchase-labs`, data, { headers: authHeader() })
      .then((res) => res.data);
  }
}

export default new PurchaseLabsService();
