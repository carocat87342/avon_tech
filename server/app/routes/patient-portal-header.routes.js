const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const ClientPortalHeader = require("../controllers/patient-portal-header.controller");

const router = express.Router();

router.get(
  "/patient-portal-header",
  [authJwt.verifyToken],
  ClientPortalHeader.getClientPortalHeader
);
router.put(
  "/patient-portal-header/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  ClientPortalHeader.editClientPortalHeader
);

module.exports = router;
