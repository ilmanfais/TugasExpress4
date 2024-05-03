const { where } = require("sequelize");
const db = require("../models");
const Presensi = db.presensis;

exports.index = (req, res) => {
  Presensi.findAll()
    .then((data) => {
      res.json({
        message: "Data presensi ditemukan",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Data presensi tidak ditemukan",
      });
    });
};

exports.show = (req, res) => {
  const id = req.params.id; // Mengambil id dari permintaan HTTP

  Presensi.findByPk(id)
    .then((data) => {
      res.json({
        message: "Data presensi ditemukan",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Data presensi tidak ditemukan",
      });
    });
};

exports.create = (req, res) => {
  const presensi = {
    idmhs: req.body.idmhs,
    status: req.body.status,
  };

  Presensi.create(presensi)
    .then((data) => {
      res.json({
        message: "Data presensi berhasil ditambahkan",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Gagal ditambahkan",
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id; // Mengambil id dari permintaan HTTP

  Presensi.update(req.body, {
    where: { id: id }, // Menentukan kondisi untuk memperbarui data dengan id yang sesuai
  })
    .then((data) => {
      res.json({
        message: "Data presensi berhasil diupdate",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Gagal diupdate",
      });
    });
};

exports.destroy = (req, res) => {
  const id = req.params.id; // Mengambil id dari permintaan HTTP

  Presensi.destroy({
    where: { id: id }, // Menentukan kondisi untuk menghapus data dengan id yang sesuai
  })
    .then((data) => {
      res.json({
        message: "Data presensi berhasil dihapus",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Gagal dihapus",
      });
    });
};


exports.Mhs = (req, res) => {
  const id = req.params.id; // Mengambil id dari permintaan HTTP

  // Mengambil data presensi
  Presensi.findByPk(id)
    .then((presensi) => {
      if (!presensi) {
        return res.status(404).json({ message: "Data presensi tidak ditemukan" });
      }

      // Mengambil data mahasantri terkait
      Mahasantri.findByPk(presensi.idmhs)
        .then((mahasantri) => {
          if (!mahasantri) {
            return res.status(404).json({ message: "Data mahasantri tidak ditemukan" });
          }

          // Menggabungkan informasi presensi dan mahasantri
          const presensiInfo = {
            idmhs: presensi.idmhs,
            status: presensi.status,
            nama: mahasantri.nama,
            asal: mahasantri.asal,
            umur: mahasantri.umur,
            telepon: mahasantri.telepon,
          };

          // Mengembalikan hasil sebagai respons JSON
          res.json({
            message: "Data presensi ditemukan",
            data: presensiInfo,
          });
        })
        .catch((err) => {
          res.status(500).json({
            message: err.message || "Terjadi kesalahan saat mencari data mahasantri",
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Terjadi kesalahan saat mencari data presensi",
      });
    });
};
