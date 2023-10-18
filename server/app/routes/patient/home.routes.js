const express = require("express");
const { authJwt } = require("../../middlewares");
const homeController = require("../../controllers/patient/home.controller");

const router = express.Router();

router.get(
  "/client-portal/header",
  [authJwt.verifyToken],
  homeController.getClientPortalHeader
);
router.get(
  "/client-portal/forms",
  [authJwt.verifyToken],
  homeController.getClientPortalForms
);
router.get(
  "/client-portal/upcoming-appointments",
  [authJwt.verifyToken],
  homeController.getUpcomingAppointments
);

module.exports = router;
