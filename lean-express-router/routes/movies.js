const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const { user = "no-name", token = "no-token" } = req.cookies;
  res.send(`Hello ${user}, token: ${token}`);
});

router.get("/create", (req, res) => {
  res.send("movies Create");
});

router.get("/:id", (req, res) => {
  res.send("movies Detail");
});

router.get("/:id/edit", (req, res) => {
  res.send("movies Edit");
});

module.exports = router;
