import express from "express";
import { insertSampleProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add", insertSampleProducts);

export default router;
