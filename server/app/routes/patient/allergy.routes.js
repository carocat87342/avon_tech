const express = require("express");
const { authJwt } = require("../../middlewares");
const allergyController = require("../../controllers/patient/allergy.controller");

const router = express.Router();

router.get(
  "/client-portal/allergy",
  [authJwt.verifyToken],
  allergyController.getAllergy
);

module.exports = router;
