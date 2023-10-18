const express = require("express");
const { authJwt } = require("../middlewares");
const testReports = require("../controllers/marker-report.controller.js");

const router = express.Router();

router.get("/tests", [authJwt.verifyToken], testReports.getFunctionalRange);
router.get(
  "/tests/page-title/:markerId",
  [authJwt.verifyToken],
  testReports.getPageTitle
);
router.get(
  "/tests/lab-marker/:patientId/:labId",
  [authJwt.verifyToken],
  testReports.getLabMarkerByLabId
);
router.get(
  "/tests/lab-marker/:patientId/lab/:labId",
  [authJwt.verifyToken],
  testReports.getLabMarkerByLabId
);
router.get(
  "/tests/lab-marker/:patientId",
  [authJwt.verifyToken],
  testReports.getLabMarker
);
router.get(
  "/tests/graph/:patientId/:markerId",
  [authJwt.verifyToken],
  testReports.getTestGraph
);
router.get(
  "/tests/conventionalrange/:patientId/:markerId",
  [authJwt.verifyToken],
  testReports.getConventionalRange
);
module.exports = router;
