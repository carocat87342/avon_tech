const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const controller = require("../controllers/myself.controller");

const router = express.Router();

router.get(
  "/myself/profile/:userId",
  [authJwt.verifyToken],
  controller.getProfile
);

router.put(
  "/myself/profile/:userId",
  [authJwt.verifyToken, authorization.isReadOnly],
  controller.updateProfile
);

router.get(
  "/myself/forward-email/:userId",
  [authJwt.verifyToken],
  controller.getForwardEmail
);

router.get(
  "/myself/logins/:userId",
  [authJwt.verifyToken],
  controller.getLogins
);

router.get(
  "/myself/activity-history/:userId",
  [authJwt.verifyToken],
  controller.getActivityHistory
);

module.exports = router;
