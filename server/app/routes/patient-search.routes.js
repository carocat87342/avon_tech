const express = require("express");
const { authJwt } = require("../middlewares");
const PatientSearch = require("../controllers/patient-search.controller.js");

const router = express.Router();

router.post(
  "/client/patient-search",
  [authJwt.verifyToken],
  PatientSearch.search
);

module.exports = router;
