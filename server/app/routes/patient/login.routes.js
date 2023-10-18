const express = require("express");
const controller = require("../../controllers/patient/login.controller");

const router = express.Router();

// auth Routes
router.post("/auth/patient/login", controller.signin);

module.exports = router;
