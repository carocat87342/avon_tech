const express = require("express");
const { authJwt } = require("../../middlewares");
const labBillingController = require("../../controllers/patient/lab_billing.controller");

const router = express.Router();

router.get(
  "/client-portal/lab_billing",
  [authJwt.verifyToken],
  labBillingController.getLabBilling
);

module.exports = router;
