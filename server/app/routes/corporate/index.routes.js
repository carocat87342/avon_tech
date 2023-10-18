const express = require("express");
const { authJwt, authorization } = require("../../middlewares");
const indexController = require("../../controllers/corporate/index.controller");

const router = express.Router();

router.post(
  "/corporate/supports",
  [authJwt.verifyToken, authorization.isReadOnly],
  indexController.getSupports
);

module.exports = router;
