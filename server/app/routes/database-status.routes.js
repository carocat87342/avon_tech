const express = require("express");
const DatabaseStatusController = require("../controllers/database-status.controller");

const router = express.Router();

router.get(
  "/database-status",
  DatabaseStatusController.getDatabaseStatus
);

module.exports = router;