import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Catalog {
  searchCatalog(data) {
    return axios
      .post(`${API_BASE}/catalog/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new Catalog();
