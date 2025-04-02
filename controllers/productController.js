const Product = require("../models/productModel");

exports.createProduct = (req, res) => {
    const { name, category, price } = req.body;
    if (!name || !category || !price) {
        return res.status(400).json({ error: "All fields are required" });
    }

    Product.addProduct(name, category, price, (err, product) => {
        if (err) return res.status(500).json({ error: "Failed to add product" });
        res.json(product);
    });
};

exports.getProducts = (req, res) => {
    Product.getAllProducts((err, products) => {
        if (err) return res.status(500).json({ error: "Failed to fetch products" });
        res.json(products);
    });
};
