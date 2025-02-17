import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    price: Number,
    isStock: Boolean,
    tags: [String],
});

const Product =
    mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
