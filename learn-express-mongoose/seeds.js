const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://127.0.0.1/shop_db")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const ProductSeeder = [
  {
    name: "Topi Baseball",
    brand: "Nike",
    price: 150000,
    color: "Hitam",
    category: "Topi",
  },
  {
    name: "Kaos Polos",
    brand: "Adidas",
    price: 250000,
    color: "Putih",
    category: "Baju",
  },
  {
    name: "Celana Jeans",
    brand: "Levi's",
    price: 450000,
    color: "Biru",
    category: "Celana",
  },
  {
    name: "Sepatu Sneakers",
    brand: "Puma",
    price: 600000,
    color: "Merah",
    category: "Sepatu",
  },
  {
    name: "Topi Trucker",
    brand: "Vans",
    price: 120000,
    color: "Biru",
    category: "Topi",
  },
  {
    name: "Kemeja Kaus",
    brand: "Gap",
    price: 350000,
    color: "Hijau",
    category: "Baju",
  },
  {
    name: "Celana Panjang",
    brand: "Zara",
    price: 500000,
    color: "Abu-abu",
    category: "Celana",
  },
  {
    name: "Sneakers Running",
    brand: "New Balance",
    price: 800000,
    color: "Hitam",
    category: "Sepatu",
  },
  {
    name: "Kemeja Denim",
    brand: "Tommy Hilfiger",
    price: 700000,
    color: "Biru",
    category: "Baju",
  },
  {
    name: "Topi Bucket",
    brand: "Converse",
    price: 90000,
    color: "Putih",
    category: "Topi",
  },
];

Product.insertMany(ProductSeeder)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
