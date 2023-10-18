import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class HomeService {
  getClientHeader(patient) {
    let url = `${API_BASE}/client-portal/header`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/header/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getClientForms(patient) {
    let url = `${API_BASE}/client-portal/forms`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/forms/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // appointments
  getUpcomingAppointments(patient) {
    let url = `${API_BASE}/client-portal/upcoming-appointments`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/upcoming-appointments/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // purchase-labs
  getPurchaseLabs(patient) {
    let url = `${API_BASE}/patient-portal/purchase-labs`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/patient-portal/purchase-labs/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new HomeService();
