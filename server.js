const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const stockRoutes = require("./routes/stockRoutes");
const storeRoutes = require("./routes/storeRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/stock", stockRoutes);
app.use("/stores", storeRoutes);

app.get("/", (req, res) => res.send("Inventory System API Running"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
