import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class DeletePatient {
  deletePatient(id) {
    return axios.delete(
      `${API_BASE}/patient-delete/${id}`,
      {
        headers: authHeader(),
      },
    );
  }
}

export default new DeletePatient();
