const express = require("express");
const { authJwt } = require("../middlewares");
const formsController = require("../controllers/forms.controller.js");

const router = express.Router();

router.get("/forms", [authJwt.verifyToken], formsController.getAll);
router.get("/forms/:id", [authJwt.verifyToken], formsController.getSingleForm);

module.exports = router;
