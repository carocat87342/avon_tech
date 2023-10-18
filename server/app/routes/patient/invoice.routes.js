const express = require("express");
const { authJwt } = require("../../middlewares");
const allergyController = require("../../controllers/patient/invoice.controller");

const router = express.Router();

router.get(
  "/client-portal/invoices",
  [authJwt.verifyToken],
  allergyController.getInvoice
);

module.exports = router;
