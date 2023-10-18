const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const formsController = require("../controllers/message-to-patient.controller.js");

const router = express.Router();

router.get(
  "/message/:id",
  [authJwt.verifyToken],
  formsController.getMessageById
);
router.post("/message", [authJwt.verifyToken, authorization.isReadOnly], formsController.createMessage);
router.put(
  "/message/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  formsController.updateMessage
);

module.exports = router;
