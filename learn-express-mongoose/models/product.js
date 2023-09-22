const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be null"],
  },
  brand: {
    type: String,
    required: [true, "brand cannot be null"],
  },
  price: {
    type: Number,
    required: [true, "price cannot be null"],
  },
  color: {
    type: String,
    required: [true, "color cannot be null"],
  },
  category: {
    type: String,
    enum: ["Topi", "Baju", "Celana", "Sepatu", "Aksesoris"],
    required: [true, "category cannot be null"],
  },
  garment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Garment",
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
