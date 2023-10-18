const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const controller = require("../controllers/patient-merge.controller");

const router = express.Router();

router.post("/patient-merge", [authJwt.verifyToken, authorization.isReadOnly], controller.mergePatient);

module.exports = router;
