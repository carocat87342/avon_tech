const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const controller = require("../controllers/patient-delete.controller");

const router = express.Router();

router.delete(
  "/patient-delete/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  controller.deletePatient
);

module.exports = router;
