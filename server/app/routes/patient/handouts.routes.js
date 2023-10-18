const express = require("express");
const { authJwt } = require("../../middlewares");
const handoutsController = require("../../controllers/patient/handouts.controller");

const router = express.Router();

router.get(
  "/client-portal/handouts",
  [authJwt.verifyToken],
  handoutsController.getAllHandouts
);

module.exports = router;
