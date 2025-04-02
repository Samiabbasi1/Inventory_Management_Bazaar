const db = require("../config/db");

// Add stock movement (stock-in, sale, removal)
exports.addStockMovement = (product_id, quantity, type, callback) => {
    if (!["stock-in", "sold", "removed"].includes(type)) {
        return callback(new Error("Invalid stock movement type"));
    }

    // Ensure product exists
    db.get("SELECT id FROM products WHERE id = ?", [product_id], (err, product) => {
        if (err) return callback(err);
        if (!product) return callback(new Error("Product not found"));

        // Insert stock movement
        const query = "INSERT INTO stock_movements (product_id, quantity, type) VALUES (?, ?, ?)";
        db.run(query, [product_id, quantity, type], function (err) {
            if (err) return callback(err);

            callback(null, { id: this.lastID, product_id, quantity, type });
        });
    });
};

// Fetch inventory details
exports.getInventory = (callback) => {
    const query = `
        SELECT p.id, p.name, p.category, p.price,
            COALESCE(SUM(CASE WHEN s.type = 'stock-in' THEN s.quantity ELSE 0 END), 0) -
            COALESCE(SUM(CASE WHEN s.type = 'sold' OR s.type = 'removed' THEN s.quantity ELSE 0 END), 0)
            AS stock
        FROM products p
        LEFT JOIN stock_movements s ON p.id = s.product_id
        GROUP BY p.id`;

    db.all(query, (err, rows) => callback(err, rows));
};

module.exports = {
    addStockMovement: exports.addStockMovement,
    getInventory: exports.getInventory
};
