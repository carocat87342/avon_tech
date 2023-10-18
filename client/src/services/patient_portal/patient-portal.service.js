import axios from "axios";

import { API_BASE } from "../../utils/API_BASE";
import authHeader from "../auth-header";

class PatientPortalService {
  // patient profile
  getProfile() {
    return axios.get(`${API_BASE}/client-portal/patient`, { headers: authHeader() }).then((res) => res.data);
  }

  updateProfile(payload, patientId) {
    return axios.put(`${API_BASE}/client-portal/patient/${patientId}`, payload, {
      headers: authHeader(),
    });
  }

  // appointments
  getPractitioners(patient) {
    let url = `${API_BASE}/client-portal/practitioners`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/practitioners/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getPractitionerDates(patient) {
    let url = `${API_BASE}/client-portal/practitioner-dates`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/practitioner-dates/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getBookedAppointments(patient, params) {
    let url = `${API_BASE}/client-portal/booked-appointments`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/booked-appointments?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
        params,
      })
      .then((res) => res.data);
  }

  getAppointmentTypesByPractitionerId(data) {
    return axios
      .post(`${API_BASE}/client-portal/appointment-types`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  bookAppointment(data) {
    return axios
      .post(`${API_BASE}/client-portal/appointment`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updateAppointment(payload, appointmentId) {
    return axios
      .put(`${API_BASE}/client-portal/appointment/${appointmentId}`, payload, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  cancelRequestRescheduleAppointment(id) {
    return axios
      .delete(`${API_BASE}/client-portal/appointment/${id}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // encounters
  getEncounters(patient) {
    let url = `${API_BASE}/client-portal/encounters`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/encounters/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // lab/documents
  getLabDocuments(patient) {
    let url = `${API_BASE}/client-portal/labs`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/labs/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  createLabDocuments(patient, reqBody) {
    let url = `${API_BASE}/client-portal/labs`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/labs/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .post(url, reqBody, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Billings
  getBillings(patient) {
    let url = `${API_BASE}/client-portal/billings`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/billings/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }

    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  createBilling(data) {
    return axios
      .post(`${API_BASE}/client-portal/billings`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getBalance(patient) {
    let url = `${API_BASE}/client-portal/balance`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/balance/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Payment Methods
  getPaymentMethods(patient) {
    let url = `${API_BASE}/patient-portal/payment-methods`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/patient-portal/payment-methods/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Pharmacies
  getPharmacies() {
    return axios
      .get(`${API_BASE}/client-portal/pharmacy`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchPharmacies(data) {
    return axios
      .post(`${API_BASE}/client-portal/pharmacy/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updatePharmacy(pharmacyId, payload) {
    return axios.put(`${API_BASE}/client-portal/pharmacy/${pharmacyId}`, payload, {
      headers: authHeader(),
    })
      .then((res) => res.data);
  }

  // Requisitions
  getRequisitions(patient) {
    let url = `${API_BASE}/client-portal/lab_requisitions`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/lab_requisitions/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Lab billing
  getLabBilling(patient) {
    let url = `${API_BASE}/client-portal/lab_billing`;
    if (patient) {
        // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/lab_billing/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }


  // test list
  getTestList(patient) {
    let url = `${API_BASE}/client-portal/lab_requisitions/test-list`;
    if (patient) {
      // eslint-disable-next-line max-len
      url = `${API_BASE}/client-portal/lab_requisitions/?patient_id=${patient.id}&client_id=${patient.client_id}`;
    }
    return axios
      .get(url, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  async getTestProfileInfo(testId) {
    const url = `${API_BASE}/client-portal/lab_requisitions/test-profile-info?testId=${testId}`;

    const res = await axios.get(url, {
      headers: authHeader(),
    });
    return res.data;
  }

  async getProfileTests(testId) {
    const url = `${API_BASE}/client-portal/lab_requisitions/profile-tests?testId=${testId}`;

    const res = await axios.get(url, {
      headers: authHeader(),
    });

    return res.data;
  }

  // Handouts
  getHandouts() {
    return axios
      .get(`${API_BASE}/client-portal/handouts`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  createHandouts() {
    return axios
      .post(`${API_BASE}/client-portal/handouts`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  deleteHandout(id) {
    return axios
      .delete(`${API_BASE}/client-portal/handouts/${id}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // Prescriptions
  getPrescriptions() {
    return axios
      .get(`${API_BASE}/client-portal/prescription`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }
}

export default new PatientPortalService();
