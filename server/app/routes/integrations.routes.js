const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Integrations = require("../controllers/integrations.controller.js");

const router = express.Router();

router.get(
  "/integrations",
  [authJwt.verifyToken],
  Integrations.getIntegrations
);
router.put("/integrations", [authJwt.verifyToken, authorization.isReadOnly], Integrations.update);

module.exports = router;
