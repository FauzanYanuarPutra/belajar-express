const path = require("path");
const express = require("express");
const methodOveride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const app = express();

// Models
const Product = require("./models/product");
const ErrorHandler = require("./ErrorHandler");
const Garment = require("./models/garment");

// connect database
mongoose
  .connect("mongodb://127.0.0.1/shop_db")
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOveride("_method"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000, secure: false },
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.flash_message = req.flash("flash_message");
  next();
});

function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((e) => next(e));
  };
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

// garments

app.get(
  "/garments",
  wrapAsync(async (req, res) => {
    const garments = await Garment.find({});
    res.render("garments/index", { garments });
  })
);

app.get("/garments/create", (req, res) => {
  res.render("garments/create");
});

app.post(
  "/garments",
  wrapAsync(async (req, res) => {
    const garment = new Garment(req.body);
    await garment.save();
    req.flash("flash_message", "Flash is back!");
    res.redirect(`/garments`);
  })
);

app.get(
  "/garments/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const garment = await Garment.findById(id).populate("products");
    res.render("garments/show", { garment });
  })
);

app.get("/garments/:garment_id/products/create", (req, res) => {
  const { garment_id } = req.params;
  res.render("products/create", { garment_id });
});

app.post(
  "/garments/:garment_id/products",
  wrapAsync(async (req, res) => {
    const { garment_id } = req.params;
    const garment = await Garment.findById(garment_id);
    const product = new Product(req.body);
    garment.products.push(product);
    product.garment = garment;
    await garment.save();
    await product.save();
    res.redirect(`/garments/${garment._id}`);
  })
);

app.delete(
  "/garments/:garment_id",
  wrapAsync(async (req, res) => {
    const { garment_id } = req.params;
    await Garment.findOneAndDelete({ _id: garment_id });
    req.flash("flash_message", "Delete Successfully!");
    res.redirect("/garments");
  })
);

// app.get("/garments/products/create", (req, res) => {});

// products

app.get("/products", async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category });
    res.render("products/index", { products, category });
  } else {
    const products = await Product.find({});
    res.render("products/index", { products, category: "All" });
  }
});

app.get("/products/create", (req, res) => {
  res.render("products/create");
});

app.post(
  "/products",
  wrapAsync(async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product._id}`);
  })
);

app.get(
  "/products/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id).populate("garment");
    res.render("products/show", { product });
  })
);

app.get(
  "/products/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render("products/edit", { product });
  })
);

app.patch(
  "/products/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      runValidators: true,
    });
    res.redirect(`/products/${product._id}`);
  })
);

app.delete(
  "/products/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect(`/products`);
  })
);

const validatorHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid ${err.path}: ${errors}`;
  return new ErrorHandler(message, 400);
};

app.use((err, req, res, next) => {
  console.dir(err);
  if (err.name === "ValidationError") err = validatorHandler(err);
  if (err.name === "CastError") {
    err.status = 404;
    err.message = "Product Not Found";
  }
  next(err);
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Someting went wrong" } = err;
  res.status(status).send(message);
});

app.listen(3000, () => {
  console.log("shop app listening on http://127.0.0.1:3000");
});
