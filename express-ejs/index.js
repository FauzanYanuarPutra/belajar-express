const path = require("path");
const express = require("express");
const app = express();

const data = require("./data.json");
// const e = require("express");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/rand", (req, res) => {
  const random = Math.floor(Math.random() * 10) + 1;
  res.render("random", { random });
});

app.get("/t/:tag", (req, res) => {
  const { tag } = req.params;
  const dataTag = data[tag];
  if (dataTag) {
    res.render("tags", { tag, dataTag });
  } else {
    res.render("notfound", { tag });
  }
});

app.get("/cats", (req, res) => {
  const cats = ["jonshon", "sapi", "kitty", "silucu"];
  res.render("cats", { cats });
});

app.listen(8080, () => {
  console.log("port started at http://localhost:8080");
});
