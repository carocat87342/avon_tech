const express = require("express");
const controller = require("../../controllers/patient/password-reset.controller");

const router = express.Router();

// Reset password email
router.post(
  "/auth/patient/reset_password/:email",
  controller.sendPasswordResetEmail
);

// Forget password reset
router.post(
  "/auth/patient/reset/:patientId/:token",
  controller.receiveNewPassword
);

module.exports = router;
