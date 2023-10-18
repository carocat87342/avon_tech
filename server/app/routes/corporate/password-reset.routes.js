const express = require("express");
const controller = require("../../controllers/corporate/password-reset.controller");
const fieldValidation = require("../../helpers/fieldValidation");

const router = express.Router();

// Reset password email
router.post(
  "/auth/reset_password/corporate/:email",
  fieldValidation.validate("resetPassword"),
  controller.sendPasswordResetEmail
);

// Forget password reset
router.post(
  "/auth/reset/corporate/:corporateId/:token",
  controller.receiveNewPassword
);

module.exports = router;
