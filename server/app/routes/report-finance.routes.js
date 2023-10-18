const express = require("express");
const { authJwt } = require("../middlewares");
const ReportFinance = require("../controllers/report-finance.controller.js");

const router = express.Router();

router.get("/report-finance", [authJwt.verifyToken], ReportFinance.getAll);
module.exports = router;
