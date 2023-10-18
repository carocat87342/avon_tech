const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Procedurecodes = require("../controllers/procedure.controller");

const router = express.Router();

router.get("/procedure", [authJwt.verifyToken], Procedurecodes.getLabCompnayList);
router.post("/procedure/search", [authJwt.verifyToken], Procedurecodes.search);
router.post(
  "/procedure/:id/:userId",
  [authJwt.verifyToken, authorization.isReadOnly],
  Procedurecodes.updateClientProcedure
);

module.exports = router;
