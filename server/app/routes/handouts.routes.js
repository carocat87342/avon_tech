const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const handouts = require("../controllers/handouts.controller.js");

const router = express.Router();

router.get("/handouts", [authJwt.verifyToken], handouts.getAll);
router.post("/handouts", [authJwt.verifyToken, authorization.isReadOnly], handouts.addHandouts);
router.delete("/handouts/:id", [authJwt.verifyToken, authorization.isReadOnly], handouts.deleteHandout);

module.exports = router;
