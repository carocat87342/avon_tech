const express = require("express");
const { authJwt } = require("../../middlewares");
const prescriptionController = require("../../controllers/patient/prescription.controller");

const router = express.Router();

router.get(
  "/client-portal/prescription",
  [authJwt.verifyToken],
  prescriptionController.getPrescription
);

module.exports = router;
