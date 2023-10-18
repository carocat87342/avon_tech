const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Config = require("../controllers/config.controller.js");

const router = express.Router();

router.get("/config", [authJwt.verifyToken], Config.getInit);
router.get("/config/history", [authJwt.verifyToken], Config.getHistory);
router.put("/config/logo/:userId", [authJwt.verifyToken, authorization.isReadOnly], Config.logoUpdate);
router.put("/config/:clientId", [authJwt.verifyToken, authorization.isReadOnly], Config.update);

module.exports = router;
