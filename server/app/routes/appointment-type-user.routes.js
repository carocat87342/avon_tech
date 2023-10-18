const express = require("express");
const { authJwt } = require("../middlewares");
const AppointmentTypes = require("../controllers/appointment-type-user.controller.js");

const router = express.Router();

router.get(
  "/appointment-types/users",
  [authJwt.verifyToken],
  AppointmentTypes.getAppointmentTypesUsers
);

module.exports = router;
