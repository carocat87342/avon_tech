const express = require("express");
const { authJwt } = require("../middlewares");
const Support = require("../controllers/support.controller.js");

const router = express.Router();

router.get("/support", [authJwt.verifyToken], Support.getInit);
router.get("/support/status", [authJwt.verifyToken], Support.getStatus);

module.exports = router;
