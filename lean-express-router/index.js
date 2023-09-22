const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3000;

// use middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret-key"));
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

app.get("/count", (req, res) => {
  if (req.session.count) {
    req.session.count += 1; // Menggunakan operator +=
  } else {
    req.session.count = 1;
  }
  res.send(`count: ${req.session.count}`);
});

app.get("/register", (req, res) => {
  const { name = "anonimous" } = req.query;
  req.session.name = name;
  res.redirect("/dashboard");
});

app.get("/dashboard", (req, res) => {
  const { name } = req.session;
  res.send(`Hello ${name}`);
});

app.get("/signedCookies", (req, res) => {
  res.cookie("paket", "ransel", { signed: true });
  res.send(`signed cookies`);
});

app.get("/verifyCookies", (req, res) => {
  const { paket } = req.signedCookies;
  res.send(`verify cookies: ${paket}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/admin", require("./routes/admin"));
app.use("/theater", require("./routes/theater"));
app.use("/movies", require("./routes/movies"));

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
