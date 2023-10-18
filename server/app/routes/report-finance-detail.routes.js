const express = require("express");
const { authJwt } = require("../middlewares");
const ReportFinanceDetail = require("../controllers/report-finance-detail.controller");

const router = express.Router();

router.get(
  "/report-finance-detail",
  [authJwt.verifyToken],
  ReportFinanceDetail.getReportFinanceDetail
);

module.exports = router;
