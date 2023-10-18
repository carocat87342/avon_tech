const express = require("express");
const { authJwt, authorization } = require("../../middlewares");
const lanbsController = require("../../controllers/patient/labs.controller");

const router = express.Router();

router.get(
  "/client-portal/labs",
  [authJwt.verifyToken],
  lanbsController.getAlllabs
);

router.post(
  "/client-portal/labs",
  [authJwt.verifyToken, authorization.isReadOnly],
  lanbsController.createLabs
);

module.exports = router;
