const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeController");

// Get all stores
router.get("/", storeController.getStores);

// Get inventory for a specific store
router.get("/inventory", storeController.getStoreInventory);

module.exports = router;
