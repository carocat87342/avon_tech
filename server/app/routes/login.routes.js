const express = require("express");
const controller = require("../controllers/login.controller");

const router = express.Router();

// auth Routes
router.post(
  "/auth/login",
  controller.signin
);

module.exports = router;
