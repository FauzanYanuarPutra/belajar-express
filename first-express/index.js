const express = require("express");

const app = express();
const dataschool = [
  {
    name: "muhammad fauzan",
    kelas: 12,
  },
  {
    name: "monkey d luffy",
    kelas: 12,
  },
  {
    name: "naruto uzumaki",
    kelas: 12,
  },
];

app.get("/", (req, res) => {
  console.log("data rquest berjalan");
  // res.send("<h1>Hello World</h1>");
  // res.send({ message: "Hallo" });
  // res.send("Ini Text Biasa");
  // res.status(404).send("<h1>sorry, cant find it</h1>");
});

app.get("/school", (req, res) => {
  res.json(dataschool);
});

app.get("/school/:id", (req, res) => {
  const { id } = req.params;

  if (isNaN(id) || id < 1 || id > dataschool.length) {
    return res.status(400).send("Id is not registered");
  }

  const student = dataschool[id - 1];
  res.send(`<h1>${student.name}</h1>`);
});

app.post("/school", (req, res) => {
  res.send("this is page post from school");
});

app.get("/siswa/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Mengakses data Siswa dengan ID ${id}`);
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  if (!q) {
    res.send(`Tidak ada data yang dicari`);
  }
  res.send(`Keyword : ${q}`);
});

app.get("*", (req, res) => {
  res.send("404 page not found");
});

app.listen(8080, () => {
  console.log("server is running on http://localhost:8080");
});
