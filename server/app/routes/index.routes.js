const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const IndexController = require("../controllers/index.controller");

const router = express.Router();

router.get("/auth/user", [authJwt.verifyToken], IndexController.getUser);
router.get("/auth/client", [authJwt.verifyToken], IndexController.getClient);
router.get(
  "/auth/user/contracts",
  [authJwt.verifyToken],
  IndexController.getUserContracts
);
router.get(
  "/auth/client/functional-range",
  [authJwt.verifyToken],
  IndexController.getFunctionalRange
);
router.put(
  "/auth/client/functional-range",
  [authJwt.verifyToken, authorization.isReadOnly],
  IndexController.updateFunctionalRange
);
router.get("/auth/patient", [authJwt.verifyToken], IndexController.getPatient);
router.get(
  "/auth/corporate-user",
  [authJwt.verifyToken],
  IndexController.getCorporateUser
);

module.exports = router;
