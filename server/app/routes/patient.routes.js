const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Patient = require("../controllers/patient.controller");
const validation = require("../helpers/validations/patient");

const router = express.Router();

router.get("/patient/:patient_id", [authJwt.verifyToken], Patient.getPatient);
router.put(
  "/patient/:patient_id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updatePatient
);
router.post(
  "/patient/create-patient",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createPatient
);
router.post(
  "/patient/:patient_id/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.search
);
router.get(
  "/patient/:patient_id/history",
  [authJwt.verifyToken],
  Patient.history
);
router.get(
  "/patient/:patient_id/appointment/history",
  [authJwt.verifyToken],
  Patient.getAppointmenthistory
);
router.get(
  "/patient/:patient_id/balance",
  [authJwt.verifyToken],
  Patient.balance
);
router.get(
  "/patient/:patient_id/next-appointment",
  [authJwt.verifyToken],
  Patient.nextAppointment
);
router.get(
  "/patient/:patient_id/admin-note/history",
  [authJwt.verifyToken],
  Patient.AdminNotehistory
);
router.put(
  "/patient/:patient_id/admin-note/",
  [authJwt.verifyToken, validation.validate("adminNoteupdate"), authorization.isReadOnly],
  Patient.adminNoteupdate
);
router.get(
  "/patient/:patient_id/forms",
  [authJwt.verifyToken],
  Patient.getForms
);
router.get(
  "/patient/:patient_id/forms/:id",
  [authJwt.verifyToken, validation.validate("singleForm")],
  Patient.getFormById
);
router.post(
  "/handouts/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.searchHandouts
);
router.get(
  "/patient/:patient_id/handouts",
  [authJwt.verifyToken],
  Patient.handouts
);
router.delete(
  "/patient/:patient_id/handouts/:id",
  [authJwt.verifyToken, validation.validate("handoutDelete"), authorization.isReadOnly],
  Patient.handoutDelete
);
router.get("/patient-handout", [authJwt.verifyToken], Patient.patientHandouts);
router.post(
  "/patient/:patient_id/patient-handout",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.CreatePatientHandouts
);
router.delete(
  "/patient/:patient_id/patient-handout/:handout_id",
  [authJwt.verifyToken, validation.validate("DeletePatientHandouts"), authorization.isReadOnly],
  Patient.DeletePatientHandouts
);
router.get(
  "/patient/:patient_id/tran-types",
  [authJwt.verifyToken],
  Patient.getTranType
);
router.get(
  "/patient/:patient_id/billing",
  [authJwt.verifyToken],
  Patient.getBilling
);
router.post(
  "/patient/:patient_id/billing",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createBilling
);
router.put(
  "/patient/:patient_id/billing/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updateBilling
);
router.delete(
  "/patient/:patient_id/billing/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteBilling
);
router.get(
  "/patient/:patient_id/billing/transactionTypes",
  [authJwt.verifyToken],
  Patient.getBillingTransactionTypes
);
router.get(
  "/patient/:patient_id/billing/paymentOptions",
  [authJwt.verifyToken],
  Patient.getBillingPaymentOptions
);
router.post(
  "/patient/:patient_id/billing/search",
  [authJwt.verifyToken],
  Patient.searchBilling
);
router.get(
  "/patient/:patient_id/billing/favorites",
  [authJwt.verifyToken],
  Patient.getBillingFavorites
);
router.get(
  "/patient/:patient_id/billing/recents",
  [authJwt.verifyToken],
  Patient.getBillingRecents
);
router.post(
  "/patient/:patient_id/new-billing",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createNewBilling
);
router.get(
  "/patient/:patient_id/allergies",
  [authJwt.verifyToken],
  Patient.getAllergies
);
router.delete(
  "/patient/:patient_id/allergies/:drug_id",
  [authJwt.verifyToken, validation.validate("deleteAllergy"), authorization.isReadOnly],
  Patient.deleteAllergy
);
router.post(
  "/allergies/search",
  [authJwt.verifyToken, validation.validate("search")],
  Patient.searchAllergies
);
router.post(
  "/patient/:patient_id/allergies",
  [authJwt.verifyToken, validation.validate("createPatientAllergy"), authorization.isReadOnly],
  Patient.createPatientAllergy
);
router.get(
  "/patient/:patient_id/documents/",
  [authJwt.verifyToken],
  Patient.getDocuments
);
router.put(
  "/patient/:id/documents/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updateDocuments
);
router.get(
  "/patient/:patient_id/documents/check",
  [authJwt.verifyToken],
  Patient.checkDocument
);
router.post(
  "/patient/:patient_id/documents",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createDocuments
);
/** encounters */
router.get(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken],
  Patient.getEncounters
);
router.post(
  "/patient/:patient_id/encounters",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createEncounter
);
router.put(
  "/patient/:patient_id/encounters/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updateEncounter
);
router.delete(
  "/patient/:patient_id/encounters/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteEncounter
);
router.get(
  "/patient/:patient_id/medical-notes/history",
  [authJwt.verifyToken],
  Patient.getMedicalNotesHistory
);
router.put(
  "/patient/:patient_id/medical-notes/history/",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.medicalNotesHistoryUpdate
);
router.get(
  "/patient/:patient_id/messages",
  [authJwt.verifyToken],
  Patient.getMessages
);
router.post(
  "/patient/:patient_id/messages",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createMessage
);
router.put(
  "/patient/:patient_id/messages/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updateMessage
);
router.delete(
  "/patient/:patient_id/messages/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteMessage
);
router.get(
  "/patient/:patient_id/all-tests",
  [authJwt.verifyToken],
  Patient.getAllTests
);
router.get(
  "/patient/:patient_id/diagnoses",
  [authJwt.verifyToken],
  Patient.getDiagnoses
);
router.get(
  "/patient/:patient_id/diagnoses/recent-icds",
  [authJwt.verifyToken],
  Patient.getRecentDiagnoses
);
router.get(
  "/patient/:patient_id/diagnoses/favorite-icds",
  [authJwt.verifyToken],
  Patient.getFavoriteDiagnoses
);
router.post(
  "/patient/:patient_id/requisitions/search-tests",
  [authJwt.verifyToken],
  Patient.searchTests
);
router.get(
  "/patient/:patient_id/requisitions/recent-tests",
  [authJwt.verifyToken],
  Patient.getRecentTests
);
router.get(
  "/patient/:patient_id/requisitions/favorite-tests",
  [authJwt.verifyToken],
  Patient.getFavoriteTests
);
router.put(
  "/patient/:patient_id/diagnoses/:icd_id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updateDiagnose
);
router.delete(
  "/patient/:patient_id/diagnoses/:icd_id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteDiagnose
);
router.post(
  "/patient/:patient_id/diagnoses",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createDiagnoses
);
router.get(
  "/patient/:patient_id/medications",
  [authJwt.verifyToken],
  Patient.getMedications
);
router.post(
  "/patient/:patient_id/medications",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createMedications
);
router.put(
  "/patient/:patient_id/medications/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updateMedications
);
router.get(
  "/patient/:patient_id/medications/:medication_id",
  [authJwt.verifyToken],
  Patient.getMedicationById
);
router.get(
  "/patient/:patient_id/medication/favorites",
  [authJwt.verifyToken],
  Patient.getMedicationFavorites
);
router.get(
  "/patient/:patient_id/medication/recents",
  [authJwt.verifyToken],
  Patient.getMedicationRecents
);
router.delete(
  "/patient/:patient_id/medications/:drug_id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteMedications
);
router.get(
  "/patient/:patient_id/requisitions",
  [authJwt.verifyToken],
  Patient.getRequisitions
);
router.post(
  "/patient/:patient_id/requisitions",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createRequisitions
);
router.delete(
  "/patient/:patient_id/requisitions/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteRequisitions
);
router.get(
  "/patient-layout/:user_id",
  [authJwt.verifyToken],
  Patient.getLayout
);
router.post(
  "/patient-layout/:user_id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.saveLayout
);
router.delete(
  "/patient-layout/:user_id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deleteLayout
);
router.get(
  "/patient/:patient_id/payment-methods",
  [authJwt.verifyToken],
  Patient.getPaymentMethods
);
router.post(
  "/patient/:patient_id/payment-methods",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.createPaymentMethod
);
router.put(
  "/patient/:patient_id/payment-methods/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.updatePaymentMethod
);
router.delete(
  "/patient/:patient_id/payment-methods/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Patient.deletePaymentMethod
);

router.get("/drug/search", [authJwt.verifyToken], Patient.getDrugs);
router.get("/icd/search", [authJwt.verifyToken], Patient.getIcds);

module.exports = router;
