const express = require("express");
const { authJwt } = require("../../middlewares");
const labRequisitionController = require("../../controllers/patient/lab_requisitions.controller");

const router = express.Router();

router.get(
  "/client-portal/lab_requisitions",
  [authJwt.verifyToken],
  labRequisitionController.getLabRequitions
);

router.get(
  "/client-portal/lab_requisitions/test-list",
  [authJwt.verifyToken],
  labRequisitionController.getTestList
);

router.get(
  "/client-portal/lab_requisitions/test-profile-info",
  [authJwt.verifyToken],
  labRequisitionController.getTestProfileInfo
);

router.get(
  "/client-portal/lab_requisitions/profile-tests",
  [authJwt.verifyToken],
  labRequisitionController.getProfileTests
);

module.exports = router;
