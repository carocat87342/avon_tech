const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Users = require("../controllers/users.controller");

const router = express.Router();

router.get("/allusers", [authJwt.verifyToken], Users.getAllUsers);
router.get("/forwardemail", [authJwt.verifyToken], Users.getForwardEmailList);
router.get("/user", [authJwt.verifyToken], Users.getUser);
router.get(
  "/user/by-client-id",
  [authJwt.verifyToken],
  Users.getUsersByClientId
);
router.get(
  "/user/last-visited-patient/:patientId",
  [authJwt.verifyToken],
  Users.getLastVisitedPatient
);
router.post("/user", [authJwt.verifyToken, authorization.isReadOnly], Users.createNewUser);
router.put("/user/:id", [authJwt.verifyToken, authorization.isReadOnly], Users.updateUser);

module.exports = router;
