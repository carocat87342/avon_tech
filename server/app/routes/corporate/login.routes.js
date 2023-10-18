const express = require("express");
const controller = require("../../controllers/corporate/login.controller");

const router = express.Router();

// auth Routes
router.post("/auth/corporate/login", controller.signin);

module.exports = router;
