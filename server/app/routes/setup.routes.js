const express = require("express");
const { authJwt } = require("../middlewares");
const Setup = require("../controllers/setup.controller.js");

const router = express.Router();

// TODO:: Incomplete, need to be completed
router.get("/backup/:client_id", [authJwt.verifyToken], Setup.backup);

module.exports = router;
