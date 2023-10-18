const express = require("express");
const controller = require("../controllers/password-reset.controller");
const fieldValidation = require("../helpers/fieldValidation");
const { authorization } = require("../middlewares");

const router = express.Router();

// Reset password email
router.post(
  "/auth/reset_password/user/:email",
  [fieldValidation.validate("resetPassword"), authorization.isReadOnly],
  controller.sendPasswordResetEmail
);

// Forget password reset
router.post(
  "/auth/reset/:userId/:token",
  [fieldValidation.validate("resetPasswordNew"), authorization.isReadOnly],
  controller.receiveNewPassword
);

module.exports = router;
