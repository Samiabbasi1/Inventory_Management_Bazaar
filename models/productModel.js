const db = require("../config/db");

const addProduct = (name, category, price, callback) => {
    const query = 'INSERT INTO products (name, category, price) VALUES ($1, $2, $3) RETURNING *';
    db.query(query, [name, category, price], (err, result) => {
        callback(err, result ? result.rows[0] : null);
    });
};

const getAllProducts = (callback) => {
    db.query('SELECT * FROM products', (err, result) => {
        callback(err, result ? result.rows : null);
    });
};

module.exports = { addProduct, getAllProducts };
