// TODO: Sample stripe routes to test Stripe APIs. We will remove this file in future.
const express = require("express");
const { authJwt } = require("../middlewares");
const stripeController = require("../controllers/stripe.controller");

const router = express.Router();

router.get(
  "/stripe/customers",
  [authJwt.verifyToken],
  stripeController.listOfCustomers
);

router.post(
  "/stripe/create-customer",
  [authJwt.verifyToken],
  stripeController.createCustomer
);
router.post(
  "/stripe/payment",
  [authJwt.verifyToken],
  stripeController.createPayment
);
router.get(
  "/stripe/payment-method/:id",
  [authJwt.verifyToken],
  stripeController.getPaymentMethod
);
router.post(
  "/stripe/payment-method",
  [authJwt.verifyToken],
  stripeController.createPaymentMethod
);
router.post(
  "/stripe/payment-method/:id/attach",
  [authJwt.verifyToken],
  stripeController.attachPaymentMethod
);

module.exports = router;
