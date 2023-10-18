const express = require("express");
const { authJwt } = require("../middlewares");
const Client = require("../controllers/accounting-search.controller.js");

const router = express.Router();

router.get("/client/accounting", [authJwt.verifyToken], Client.getAll);
router.post("/client/accounting/search", [authJwt.verifyToken], Client.search);

module.exports = router;
