const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Theater Index");
});

router.get("/create", (req, res) => {
  res.send("Theater Create");
});

router.get("/:id", (req, res) => {
  res.send("Theater Detail");
});

router.get("/:id/edit", (req, res) => {
  res.send("Theater Edit");
});

module.exports = router;
