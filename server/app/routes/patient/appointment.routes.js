const express = require("express");
const { authJwt, authorization } = require("../../middlewares");
const appointmentsController = require("../../controllers/patient/appointment.controller");

const router = express.Router();

router.get(
  "/client-portal/practitioners",
  [authJwt.verifyToken],
  appointmentsController.getAllPractitioner
);

router.get(
  "/client-portal/practitioner-dates",
  [authJwt.verifyToken],
  appointmentsController.getPractitionerDates
);

router.get(
  "/client-portal/booked-appointments",
  [authJwt.verifyToken],
  appointmentsController.getBookedAppointments
);

router.post(
  "/client-portal/appointment-types",
  [authJwt.verifyToken],
  appointmentsController.getAppointmentTypes
);

router.post(
  "/client-portal/appointment",
  [authJwt.verifyToken, authorization.isReadOnly],
  appointmentsController.createAppointment
);
router.put(
  "/client-portal/appointment/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  appointmentsController.updateAppointment
);
router.delete(
  "/client-portal/appointment/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  appointmentsController.cancelRequestRescheduleAppointment
);

module.exports = router;
