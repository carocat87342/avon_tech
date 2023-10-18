const express = require("express");
const Catalog = require("../controllers/catalog.controller");

const router = express.Router();

router.post("/catalog/search", [], Catalog.searchCatalog);

module.exports = router;
