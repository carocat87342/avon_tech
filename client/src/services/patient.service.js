import axios from "axios";

import { API_BASE } from "../utils/API_BASE";
import authHeader from "./auth-header";

class Patient {
  getCardsLayout(userId) {
    return axios
      .get(`${API_BASE}/patient-layout/${userId}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getAllergies(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/allergies`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getAllHandouts() {
    return axios
      .get(`${API_BASE}/patient-handout`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getPatientHandouts(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/handouts`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getForms(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/forms`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getBillings(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/billing`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getBillingTransactionTypes(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/billing/transactionTypes`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getBillingPaymentOptions(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/billing/paymentOptions`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchBilling(patientId, data) {
    return axios
      .post(`${API_BASE}/patient/${patientId}/billing/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getBillingFavorites(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/billing/favorites`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getBillingRecents(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/billing/recents`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getDocuments(patientId, tab) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/documents/?tab=${tab}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getPatientData(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}`, { headers: authHeader() })
      .then((res) => res.data);
  }

  getNextAppointment(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/next-appointment`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getAppointmentHistory(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/appointment/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getPatientHistory(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getPatientBalance(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/balance`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchPatient(patientId, data) {
    return axios
      .post(`${API_BASE}/patient/${patientId}/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchHandouts(data) {
    return axios
      .post(`${API_BASE}/handouts/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // encounters apis
  getEncounters(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/encounters`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getEncountersPlan(patientId, encounterId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/encounters/${encounterId}/plan`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // encounters billing APIs
  getEncountersBilling(patientId, encounterId) {
    return axios
      .get(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/billing`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  geEncountersBillingDiagnoses(patientId, encounterId) {
    return axios
      .get(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/billing/diagnoses`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  geEncountersBillingProcedures(patientId, encounterId) {
    return axios
      .get(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/billing/procedsures`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  geEncountersBillingPayments(patientId, encounterId) {
    return axios
      .get(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/billing/payment`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  createEncountersBillingPayments(patientId, encounterId, reqBody) {
    return axios
      .post(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/billing/payment`,
        reqBody,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  createEncountersPrescriptions(patientId, encounter_id, data) {
    return axios.post(
      `${API_BASE}/patient/${patientId}/encounters/${encounter_id}/plan/new-prescriptions`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  editEncountersPrescriptions(patientId, encounter_id, data) {
    return axios.post(
      `${API_BASE}/patient/${patientId}/encounters/${encounter_id}/plan/new-prescriptions/edit`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  getEncountersPrescriptions(patient_id, encounter_id) {
    return axios
      .get(
        `${API_BASE}/patient/${patient_id}/encounters/${encounter_id}/plan/new-prescription/recent`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  getEncountersRecentDiagnosesICDs(patientId, encounterId) {
    return axios
      .get(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/diagnoses/recent-icds`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  searchEncountersPrescriptionsDrugs(data) {
    return axios
      .post(`${API_BASE}/patient/encounters/prescriptions/search-drug`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getEncountersPrescriptionsDrugsFrequencies(patientId, encounterId) {
    return axios
      .get(
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/plan/new-prescriptions/frequencies`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  getEncountersPrescriptionsDrugsStrengths(patientId, encounterId, drugId) {
    return axios
      .get(
        // eslint-disable-next-line max-len
        `${API_BASE}/patient/${patientId}/encounters/${encounterId}/plan/new-prescriptions/${drugId}/strengths`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  getFavoriteTests(patient_id, encounter_id) {
    return axios
      .get(
        `${API_BASE}/patient/${patient_id}/encounters/${encounter_id}/new-lab/favorites/?tab=All`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  getOrderedTests(patient_id, encounter_id) {
    return axios
      .get(
        `${API_BASE}/patient/${patient_id}/encounters/${encounter_id}/new-lab/test-ordered`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  deleteOrderedTests(testId) {
    return axios
      .delete(`${API_BASE}/patient/encounters/new-lab/test-ordered/${testId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getLabortories(patient_id, encounter_id) {
    return axios
      .get(
        `${API_BASE}/patient/${patient_id}/encounters/${encounter_id}/new-lab/laboratories`,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  searchLabs(data) {
    return axios
      .post(`${API_BASE}/patient/encounters/new-lab/search/?tab=All`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getMedicalNotes(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/medical-notes/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getAdminNotesHistory(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/admin-note/history`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getMessages(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/messages`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getDiagnoses(patientId, active) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/diagnoses`, {
        headers: authHeader(),
        params: { active },
      })
      .then((res) => res.data);
  }

  getDiagnosesRecentICDs(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/diagnoses/recent-icds`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getDiagnosesFavoriteICDs(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/diagnoses/favorite-icds`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchTests(patientId, data) {
    return axios
      .post(
        `${API_BASE}/patient/${patientId}/requisitions/search-tests`,
        data,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }

  getRequisitionsRecentTests(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/requisitions/recent-tests`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getRequisitionsFavoriteTests(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/requisitions/favorite-tests`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getMedications(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/medications`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getMedicationById(patientId, medicationId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/medications/${medicationId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getMedicationFavorites(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/medication/favorites`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getMedicationRecents(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/medication/recents`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getRequisitions(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/requisitions`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  getTests(patientId) {
    return axios
      .get(`${API_BASE}/patient/${patientId}/all-tests`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // search methods
  searchAllergies(data) {
    return axios
      .post(`${API_BASE}/allergies/search`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchICD(query) {
    return axios
      .get(`${API_BASE}/icd/search/?query=${query}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  searchDrugs(query) {
    return axios
      .get(`${API_BASE}/drug/search/?query=${query}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  // update methods
  updatePatient(patientId, data) {
    return axios
      .put(`${API_BASE}/patient/${patientId}`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updateCardsLayout(userId, layout) {
    return axios
      .post(`${API_BASE}/patient-layout/${userId}`, layout, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  resetCardsLayout(userId) {
    return axios
      .delete(`${API_BASE}/patient-layout/${userId}`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updateAdminNotes(patientId, data) {
    return axios.put(`${API_BASE}/patient/${patientId}/admin-note`, data, {
      headers: authHeader(),
    });
  }

  updateMedicalNotes(patientId, data) {
    return axios.put(
      `${API_BASE}/patient/${patientId}/medical-notes/history`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  updateEncounters(patientId, encounterId, data) {
    return axios.put(
      `${API_BASE}/patient/${patientId}/encounters/${encounterId}`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  updateBilling(patientId, billingId, data) {
    return axios
      .put(`${API_BASE}/patient/${patientId}/billing/${billingId}`, data, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  updateMessage(patientId, messageId, data) {
    return axios.put(
      `${API_BASE}/patient/${patientId}/messages/${messageId}`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  updateDiagnoses(patient_id, icd_id, data) {
    return axios.put(
      `${API_BASE}/patient/${patient_id}/diagnoses/${icd_id}`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  updateMedication(patientId, medicationId, data) {
    return axios.put(
      `${API_BASE}/patient/${patientId}/medications/${medicationId}`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  // create methods
  createPatient(data) {
    return axios.post(
      `${API_BASE}/patient/create-patient`, data,
      {
        headers: authHeader(),
      },
    )
      .then((res) => res.data);
  }

  createPatientHandout(patientId, data) {
    return axios.post(
      `${API_BASE}/patient/${patientId}/patient-handout`,
      data,
      {
        headers: authHeader(),
      },
    );
  }

  createDiagnoses(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/diagnoses`, data, {
      headers: authHeader(),
    });
  }

  createMedication(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/medications`, data, {
      headers: authHeader(),
    });
  }

  createBilling(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/billing`, data, {
      headers: authHeader(),
    });
  }

  createNewBilling(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/new-billing`, data, {
      headers: authHeader(),
    });
  }

  createDocuments(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/documents/`, data, {
      headers: authHeader(),
    });
  }

  createAllergy(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/allergies`, data, {
      headers: authHeader(),
    });
  }

  createMessage(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/messages`, data, {
      headers: authHeader(),
    });
  }

  createEncounter(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/encounters`, data, {
      headers: authHeader(),
    });
  }

  createRequisition(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/requisitions`, data, {
      headers: authHeader(),
    });
  }

  // delete methods
  deleteBilling(patientId, id) {
    return axios.delete(`${API_BASE}/patient/${patientId}/billing/${id}`, {
      headers: authHeader(),
    });
  }

  deleteMessages(patientId, id) {
    return axios.delete(`${API_BASE}/patient/${patientId}/messages/${id}`, {
      headers: authHeader(),
    });
  }

  deleteAllergy(patientId, drugId) {
    return axios.delete(
      `${API_BASE}/patient/${patientId}/allergies/${drugId}`,
      {
        headers: authHeader(),
      },
    );
  }

  deleteEncounter(patientId, encounterId) {
    return axios.delete(
      `${API_BASE}/patient/${patientId}/encounters/${encounterId}`,
      {
        headers: authHeader(),
      },
    );
  }

  deletePatientHandout(patientId, handoutId) {
    return axios.delete(
      `${API_BASE}/patient/patient-handout/${patientId}/${handoutId}`,
      {
        headers: authHeader(),
      },
    );
  }

  deleteHandout(patientId, handoutId) {
    return axios.delete(
      `${API_BASE}/patient/${patientId}/handouts/${handoutId}`,
      {
        headers: authHeader(),
      },
    );
  }

  updateDocument(patientId, documentId, body) {
    return axios.put(
      `${API_BASE}/patient/${patientId}/documents/${documentId}`,
      body,
      {
        headers: authHeader(),
      },
    );
  }

  deleteDiagnoses(patientId, icdId) {
    return axios.delete(`${API_BASE}/patient/${patientId}/diagnoses/${icdId}`, {
      headers: authHeader(),
    });
  }

  deleteMedications(patientId, medicationId) {
    return axios.delete(
      `${API_BASE}/patient/${patientId}/medications/${medicationId}`,
      {
        headers: authHeader(),
      },
    );
  }

  deleteRequisitions(patientId, requisitionId) {
    return axios.delete(`${API_BASE}/patient/${patientId}/requisitions/${requisitionId}`, {
      headers: authHeader(),
    });
  }

  getPaymentMethods() {
    return axios
      .get(`${API_BASE}/patient-portal/payment-methods`, {
        headers: authHeader(),
      })
      .then((res) => res.data);
  }

  createPaymentMethod(patientId, data) {
    return axios.post(`${API_BASE}/patient/${patientId}/payment-methods`, data, {
      headers: authHeader(),
    })
      .then((res) => res.data);
  }

  deletePaymentMethod(patientId, paymentMethodId) {
    return axios.delete(
      `${API_BASE}/patient/${patientId}/payment-methods/${paymentMethodId}`,
      {
        headers: authHeader(),
      },
    );
  }

  updatePaymentMethod(patientId, paymentMethodId, data) {
    return axios
      .put(
        `${API_BASE}/patient/${patientId}/payment-methods/${paymentMethodId}`,
        data,
        {
          headers: authHeader(),
        },
      )
      .then((res) => res.data);
  }
}

export default new Patient();
