import dotenv from "dotenv";
import dbConnection from "./db.js";
import express from "express";

import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
dbConnection();

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server runs on port ${port}.`);
});
