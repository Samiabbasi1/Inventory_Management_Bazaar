const db = require("../config/db");

// Function to add stock movement, including store_id
const addStockMovement = (product_id, store_id, quantity, movement_type, callback) => {
    const query = 'INSERT INTO stock_movements (product_id, store_id, quantity, movement_type) VALUES ($1, $2, $3, $4) RETURNING *';
    db.query(query, [product_id, store_id, quantity, movement_type], (err, result) => {
        callback(err, result ? result.rows[0] : null);
    });
};

// Function to get inventory including store_id and stock calculations
const getInventory = (callback) => {
    const query = `
        SELECT p.product_id, p.name, p.category, p.price, s.store_id,
            COALESCE(SUM(CASE WHEN s.movement_type = 'stock-in' THEN s.quantity ELSE 0 END), 0) - 
            COALESCE(SUM(CASE WHEN s.movement_type = 'sold' OR s.movement_type = 'removed' THEN s.quantity ELSE 0 END), 0) AS stock
        FROM products p
        LEFT JOIN stock_movements s ON p.product_id = s.product_id
        GROUP BY p.product_id, s.store_id, p.name, p.category, p.price;
    `;

    db.query(query, (err, result) => {
        callback(err, result ? result.rows : null);
    });
};

module.exports = { addStockMovement, getInventory };
 