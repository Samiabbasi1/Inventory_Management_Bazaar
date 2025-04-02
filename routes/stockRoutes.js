const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// Stock-in (add stock)
router.post("/stock-in", stockController.stockIn);

// Sale (deduct stock)
router.post("/sale", stockController.sale);

// Remove stock manually
router.post("/remove", stockController.removeStock);

// View current inventory
router.get("/", stockController.getInventory);

module.exports = router;
