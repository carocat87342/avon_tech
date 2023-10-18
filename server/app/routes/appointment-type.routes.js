const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const AppointmentTypes = require("../controllers/appointment-type.controller.js");
const fieldValidation = require("../helpers/fieldValidation");

const router = express.Router();

router.get(
  "/appointment-types",
  [authJwt.verifyToken],
  AppointmentTypes.getAll
);
router.post(
  "/appointment-types",
  [fieldValidation.validate("createAppointmentType"), authJwt.verifyToken, authorization.isReadOnly],
  AppointmentTypes.create
);
router.put(
  "/appointment-types/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  AppointmentTypes.update
);
router.delete(
  "/appointment-types/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  AppointmentTypes.deleteAppointment
);

module.exports = router;
