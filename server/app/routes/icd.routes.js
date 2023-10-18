const express = require("express");
const { authJwt, authorization } = require("../middlewares");
const Icd = require("../controllers/icd.controller");

const router = express.Router();

router.post("/icd", [authJwt.verifyToken], Icd.search);
router.post("/icd/:id/:userId", [authJwt.verifyToken, authorization.isReadOnly], Icd.addFavorite);
router.delete("/icd/:id", [authJwt.verifyToken, authorization.isReadOnly], Icd.deleteFavorite);

module.exports = router;
