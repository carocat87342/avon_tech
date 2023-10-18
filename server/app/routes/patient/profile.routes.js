const express = require("express");
const { authJwt, authorization } = require("../../middlewares");
const profileController = require("../../controllers/patient/profile.controller");

const router = express.Router();

router.get(
  "/client-portal/patient",
  [authJwt.verifyToken],
  profileController.getPatient
);
router.put(
  "/client-portal/patient/:patientId",
  [authJwt.verifyToken, authorization.isReadOnly],
  profileController.updatePatient
);
router.get(
  "/client-portal/patient/payment-method",
  [authJwt.verifyToken],
  profileController.getPatientPaymentMethod
);

module.exports = router;
