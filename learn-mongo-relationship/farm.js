const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1/relationship")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ["Spring", "Summer", "Fall", "Winter"],
  },
});

const farmSchema = new mongoose.Schema({
  name: String,
  city: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  // products: [productSchema],
});

const Product = mongoose.model("Product", productSchema);
const Farm = mongoose.model("Farm", farmSchema);

// Product.insertMany([
//   {
//     name: "Melon",
//     price: 7,
//     season: "Summer",
//   },
//   {
//     name: "Apple",
//     price: 5,
//     season: "Fall",
//   },
//   {
//     name: "Banana",
//     price: 2,
//     season: "Winter",
//   },
// ]);

// const addFarm = async (idProduct) => {
//   dataFarm = new Farm({
//     name: "Farm 2",
//     city: "Bogor",
//   });
//   const dataProduct = await Product.findById(idProduct);
//   dataFarm.products.push(dataProduct);
//   // console.log(dataFarm);
//   await dataFarm.save();
// };

// addFarm("6502b548b9f53d23195bfb29");

// const editFarm = async (idFarm, idProduct) => {
//   const farm = await Farm.findById(idFarm);
//   const dataProduct = await Product.findById(idProduct);
//   // console.log(dataProduct);
//   farm.products.push(dataProduct);
//   // console.log(farm);
//   // await farm.save();
// };

// editFarm("6502bd849e96f393e5217879", "6502b548b9f53d23195bfb2a");

const productIdsToFind = ["6502b548b9f53d23195bfb29"];

Farm.find({ products: { $in: productIdsToFind } })
  .populate("products")
  .then((farms) => {
    farms.forEach((farm) => {
      console.log("Farm: ", farm.name);
      farm.products.forEach((product, index) => {
        console.log(`Product ${index + 1}: ${product._id}`);
      });
    });
  })
  .catch((error) => {
    console.error(error);
  });
