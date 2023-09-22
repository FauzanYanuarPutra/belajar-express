const mongoose = require("mongoose");
const Product = require("./product");

const GarmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name cannot be null"],
  },
  location: {
    type: String,
  },
  contact: {
    type: Number,
    required: [true, "price cannot be null"],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

GarmentSchema.post("findOneAndDelete", async function (garment) {
  if (garment.products.length) {
    const res = await Product.deleteMany({ _id: { $in: garment.products } });
    console.log(res);
  }
});

const Garment = mongoose.model("Garment", GarmentSchema);

module.exports = Garment;
