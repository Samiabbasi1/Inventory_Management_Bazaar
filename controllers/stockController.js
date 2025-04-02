const Stock = require("../models/stockModel");

// Add stock (stock-in)
const stockIn = (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    Stock.addStockMovement(product_id, quantity, "stock-in", (err, movement) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(movement);
    });
};

// Sell stock (deduct stock)
const sale = (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    Stock.addStockMovement(product_id, quantity, "sold", (err, movement) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(movement);
    });
};

// Remove stock manually
const removeStock = (req, res) => {
    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
        return res.status(400).json({ error: "Product ID and quantity are required" });
    }

    Stock.addStockMovement(product_id, quantity, "removed", (err, movement) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(movement);
    });
};

// View current inventory
const getInventory = (req, res) => {
    Stock.getInventory((err, inventory) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ inventory });
    });
};

module.exports = {
    stockIn,
    sale,
    removeStock,
    getInventory
};
