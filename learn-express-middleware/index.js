const express = require("express");
const app = express();
const port = 3000;

const morgan = require("morgan");
const ErrorHandler = require("./ErrorHandler");

// app.use(morgan("dev"));

app.use((req, res, next) => {
  req.timeRequest = Date.now();
  console.log(req.method, req.url);
  next();
});

const auth = (req, res, next) => {
  const { password } = req.query;
  if (password === "123") {
    next();
  }
  // res.send("Perlu Masukan Password");
  throw new ErrorHandler("Perlu Masukan Password", 401);
};

app.use("/hello", (req, res, next) => {
  res.send("Hello World");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/halaman", (req, res) => {
  console.log(req.timeRequest);
  res.send("HALAMAN");
});

app.get("/admin", auth, (req, res) => {
  res.send("Halaman Admin");
});

app.get("/halaman/error", (req, res) => {
  throw new ErrorHandler();
});

app.get("/error", (req, res) => {
  bird.fly();
});

// app.use((err, req, res, next) => {
//   console.log("*****************");
//   console.log("******error******");
//   console.log("*****************");
//   // console.log(err.message);
//   next(err);
// });

app.use((err, req, res, next) => {
  const { status = 500, message = "Someting went wrong" } = err;
  res.status(status).send(message);
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(port, () => {
  console.log("Listening on port 3000");
});
