const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Schedule = require("../controllers/schedule.controller");

const router = express.Router();

router.get("/setup/schedule/users", [authJwt.verifyToken], Schedule.getAllUser);
router.post("/setup/schedule/search", [authJwt.verifyToken], Schedule.search);
router.post(
  "/setup/schedule",
  [authJwt.verifyToken, authorization.isReadOnly],
  Schedule.createNewSchedule
);
router.put(
  "/setup/schedule/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Schedule.updateSchedule
);
router.delete(
  "/setup/schedule/:id",
  [authJwt.verifyToken, authorization.isReadOnly],
  Schedule.deleteSchedule
);

module.exports = router;
