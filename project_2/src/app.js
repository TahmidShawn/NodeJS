import express from "express";
const app = express();

import productRouter from "./routes/product.route.js";

// use middleware
app.use(express.json());

app.use("/api/v1/products", productRouter);

export default app;
