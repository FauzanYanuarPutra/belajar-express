const path = require("path");
const express = require("express");
const app = express();
var methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "src/views"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));

app.use(express.static("src/assets"));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

let comments = [
  {
    id: uuidv4(),
    username: "Fauzan",
    text: "Everything i have i one to this job",
  },
  {
    id: uuidv4(),
    username: "Biduman",
    text: "I have experience",
  },
  {
    id: uuidv4(),
    username: "Blok",
    text: "Do you have any block?",
  },
  {
    id: uuidv4(),
    username: "Miskur",
    text: "can you donate me?",
  },
  {
    id: uuidv4(),
    username: "Satima",
    text: "im the most stronger in the word",
  },
];

app.get("/comments", (req, res) => {
  res.render("comments/index", { comments });
});

app.get("/comments/create", (req, res) => {
  res.render("comments/create");
});

app.post("/comments", (req, res) => {
  const { username, text } = req.body;
  comments.push({ username, text, id: uuidv4() });
  // console.log(comment);
  res.redirect("/comments");
});

app.get("/comments/:id/edit", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/edit", { comment });
});

app.patch("/comments/:id", (req, res) => {
  const { id } = req.params;
  const newTitle = req.body.username;
  const oldTitle = comments.find((c) => c.id === id);
  oldTitle.username = newTitle;
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const { id } = req.params;
  const comment = comments.find((c) => c.id === id);
  res.render("comments/show", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const { id } = req.params;
  comments = comments.filter((c) => c.id !== id);
  res.redirect("/comments");
});

app.post("/order", (req, res) => {
  const { item, qty } = req.body;
  res.send(`item ${item}, Qty ${qty}`);
});

app.listen(8080, () => {
  console.log("port started at http://localhost:8080");
});
