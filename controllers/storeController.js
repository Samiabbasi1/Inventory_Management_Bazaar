const Store = require("../models/storeModel");

exports.getStores = (req, res) => {
    Store.getStores((err, stores) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ stores });
    });
};

exports.getStoreInventory = (req, res) => {
    const { store_id } = req.query;
    if (!store_id) {
        return res.status(400).json({ error: "Store ID is required" });
    }

    Store.getStoreInventory(store_id, (err, inventory) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ inventory });
    });
};
