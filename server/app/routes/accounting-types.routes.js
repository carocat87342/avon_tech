const express = require("express");
const { authJwt } = require("../middlewares");
const AccountingTypes = require("../controllers/accounting-types.controller");

const router = express.Router();

router.get(
  "/accounting-types",
  [authJwt.verifyToken],
  AccountingTypes.getAccountingTypes
);

module.exports = router;
