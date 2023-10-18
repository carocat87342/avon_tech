const express = require("express");
const { authJwt, authorization } = require("../../middlewares");
const PaymentMethodController = require("../../controllers/patient/paymentMethod.controller");

const router = express.Router();

router.get(
  "/patient-portal/payment-methods",
  [authJwt.verifyToken],
  PaymentMethodController.getPaymentMethods
);
router.post(
  "/patient-portal/payment-methods",
  [authJwt.verifyToken, authorization.isReadOnly],
  PaymentMethodController.createPaymentMethod
);
router.put(
  "/patient-portal/payment-methods/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  PaymentMethodController.updatePaymentMethod
);
router.delete(
  "/patient-portal/payment-methods/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  PaymentMethodController.deletePaymentMethod
);
module.exports = router;
