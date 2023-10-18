const express = require("express");
const { authJwt, authorization } = require("../../middlewares");
const encountersController = require("../../controllers/patient/encounters.controller");

const router = express.Router();

router.get(
  "/client-portal/encounters",
  [authJwt.verifyToken],
  encountersController.getAllencounters
);
router.put(
  "/client-portal/encounters/:encounterId",
  [authJwt.verifyToken, authorization.isReadOnly],
  encountersController.updateEncounter
);

module.exports = router;
