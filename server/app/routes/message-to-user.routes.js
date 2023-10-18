const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const userMessagesController = require("../controllers/message-to-user.controller.js");

const router = express.Router();

router.get(
  "/user/messages/:id",
  [authJwt.verifyToken],
  userMessagesController.getUserMessageById
);
router.get(
  "/user/:provider_id/messages",
  [authJwt.verifyToken],
  userMessagesController.getUserMessage
);
router.get(
  "/user/by-client-id",
  [authJwt.verifyToken],
  userMessagesController.getMessageAssignUser
);
router.post(
  "/user/message",
  [authJwt.verifyToken, authorization.isReadOnly],
  userMessagesController.createMessage
);
router.put(
  "/user/messages/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  userMessagesController.updateMessage
);
router.get(
  "/user/messages/history/:messageId",
  [authJwt.verifyToken],
  userMessagesController.getUserMessageHistory
);
router.get(
  "/user/history",
  [authJwt.verifyToken],
  userMessagesController.getMessageUserHistory
);

module.exports = router;
