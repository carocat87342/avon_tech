const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const validation = require("../helpers/validations/patient.js");
const patientEmailController = require("../controllers/email-patient.controller.js");

const router = express.Router();

router.get(
  "/email/history",
  [authJwt.verifyToken],
  patientEmailController.getHistory
);
router.post(
  "/email/history",
  [authJwt.verifyToken, validation.validate("createEmailHistory"), authorization.isReadOnly],
  patientEmailController.createEmailHistory
);
router.put(
  "/email/history/:date",
  [authJwt.verifyToken, authorization.isReadOnly],
  patientEmailController.updateEmailHistory
);
router.delete(
  "/email/history/:date",
  [authJwt.verifyToken, authorization.isReadOnly],
  patientEmailController.deleteHistory
);
module.exports = router;
