const express = require("express");
const Client = require("../controllers/client-agreement.controller.js");

const router = express.Router();

router.get("/client/agreement", Client.getAgreement);

module.exports = router;
