const Stock = require("../models/stockModel");

exports.stockIn = (req, res) => {
    const { product_id, store_id, quantity } = req.body;  // Now includes store_id
    if (!product_id || !store_id || !quantity) {  // Check for store_id as well
        return res.status(400).json({ error: "Product ID, Store ID, and quantity are required" });
    }

    Stock.addStockMovement(product_id, store_id, quantity, "stock-in", (err, movement) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(movement);
    });
};

exports.sale = (req, res) => {
    const { product_id, store_id, quantity } = req.body;
    if (!product_id || !store_id || !quantity) {
        return res.status(400).json({ error: "Product ID, Store ID, and quantity are required" });
    }

    // Ensure movement_type matches DB constraint
    const movementType = "sale"; // Ensure correct lowercase format

    Stock.addStockMovement(product_id, store_id, quantity, movementType, (err, movement) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(movement);
    });
};


exports.getInventory = (req, res) => {
    Stock.getInventory((err, inventory) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ inventory });
    });
};
