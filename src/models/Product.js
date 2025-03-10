import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
});

const model = mongoose.model("Product", productSchema);

export default model;
