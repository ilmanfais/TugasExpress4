// melakukan import express dan cors
const express = require("express");
const cors = require("cors");

// membuat objek express
const app = express();

// membuat alamat website local
const port = 3000;

const presensiRouter = require("./routes/presensi.router");
const mahasantriRouter = require("./routes/mahasantri.router");

// konfigurasi cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync({ alter: true }); // Untuk mengkonfigurasi dengan database

// routing
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// routing presensi
app.use("/api/presensi", presensiRouter);
app.use("/api/mahasantri", mahasantriRouter);

app.listen(port, () => {
  console.log(`Aplikasi ini berjalan pada ${port}`);
});
