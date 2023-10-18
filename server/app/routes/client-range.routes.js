const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const ClientRange = require("../controllers/client-range.controller.js");

const router = express.Router();

router.get(
  "/client-ranges",
  [authJwt.verifyToken],
  ClientRange.getClientRanges
);
router.delete(
  "/client-range/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  ClientRange.deleteClientRange
);
router.post(
  "/client-range/reset",
  [authJwt.verifyToken, authorization.isReadOnly],
  ClientRange.resetClientRange
);
router.put(
  "/client-range/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  ClientRange.updateClientRange
);
router.get("/client-range", [authJwt.verifyToken], ClientRange.getClientRange);
router.post(
  "/client-range",
  [authJwt.verifyToken, authorization.isReadOnly],
  ClientRange.createClientRange
);
router.get(
  "/client-range/test/search",
  [authJwt.verifyToken],
  ClientRange.searchTests
);

module.exports = router;
