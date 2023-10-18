const express = require("express");
const controller = require("../controllers/auth-email.controller");
const fieldValidation = require("../helpers/fieldValidation");

const router = express.Router();

// verify confirmation
router.get(
  "/email/confirmation/:userId/:token",
  fieldValidation.validate("verifyConfirmationEmail"),
  controller.verifyConfirmation
);

// Send Signup confirmation email
router.post(
  "/email/send/verification",
  [fieldValidation.validate("sendConfirmationEmail")],
  controller.sendSignupConfirmationEmail
);

// Resend Signup confirmation email
router.post(
  "/email/resend/verification",
  [fieldValidation.validate("resendConfirmationEmail")],
  controller.resendSignupConfirmationEmail
);

module.exports = router;
