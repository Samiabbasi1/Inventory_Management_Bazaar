const db = require("../config/db");

const getStores = (callback) => {
    const query = "SELECT * FROM stores";
    db.query(query, (err, result) => {
        callback(err, result ? result.rows : null);
    });
};

const getStoreInventory = (store_id, callback) => {
    const query = `
        SELECT p.product_id, p.name, p.category, p.price,
               COALESCE(SUM(CASE WHEN s.movement_type = 'stock-in' THEN s.quantity ELSE 0 END), 0) -
               COALESCE(SUM(CASE WHEN s.movement_type = 'sale' OR s.movement_type = 'remove' THEN s.quantity ELSE 0 END), 0) 
               AS stock
        FROM products p
        LEFT JOIN stock_movements s ON p.product_id = s.product_id
        WHERE s.store_id = $1
        GROUP BY p.product_id;
    `;
    db.query(query, [store_id], (err, result) => {
        callback(err, result ? result.rows : null);
    });
};

module.exports = { getStores, getStoreInventory };
