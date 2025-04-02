const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/stock", stockRoutes);

// Default route for /
app.get("/", (req, res) => {
    res.send("Inventory API is running! Use /api/products or /api/stock");
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));




// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const productRoutes = require('./routes/productRoutes');
// const stockRoutes = require('./routes/stockRoutes');

// const app = express();
// const PORT =  5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.use('/api/products', productRoutes);
// app.use('/api/stock', stockRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });