const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const ProcessLab = require("../controllers/process-lab.controller.js");

const router = express.Router();

router.get("/labs", [authJwt.verifyToken], ProcessLab.getAll);
router.get("/labs/:labId", [authJwt.verifyToken], ProcessLab.getLabById);
router.get("/lab/assign-user", [authJwt.verifyToken], ProcessLab.getAssignUser);
router.get(
  "/labs/:labId/values",
  [authJwt.verifyToken],
  ProcessLab.getLabValues
);
router.get(
  "/labs/:labId/history",
  [authJwt.verifyToken],
  ProcessLab.getLabHistory
);
router.get(
  "/labs/:labId/user-history/",
  [authJwt.verifyToken],
  ProcessLab.getLabUserHistory
);
router.post("/labs", [authJwt.verifyToken, authorization.isReadOnly], ProcessLab.createLab);
router.put("/labs/:labId", [authJwt.verifyToken, authorization.isReadOnly], ProcessLab.updateLabStatus);
router.put("/labs/:labId/update", [authJwt.verifyToken, authorization.isReadOnly], ProcessLab.updateLab);

module.exports = router;
