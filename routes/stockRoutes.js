const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");


router.post("/stock-in", stockController.stockIn);

router.post("/sale", stockController.sale);


// router.post("/remove", stockController.removeStock);

router.get("/", stockController.getInventory);

module.exports = router;
