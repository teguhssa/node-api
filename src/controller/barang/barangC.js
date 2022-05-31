const pool = require("../../../db/db");
const fs = require("fs");

exports.addBarang = async (req, res) => {
  try {
    if (!req.file) {
      const err = new Error("Gambar harus diupload");
      err.errorStatus = 422;
      throw err;
    }

    const nama_barang = req.body.nama_barang;
    const keterangan = req.body.keterangan;
    const qty = req.body.qty;
    const harga = req.body.harga;
    const gambar = req.file.path;
    // const gambar = req.body.gambar;

    // console.log("gambar", gambar);

    const newData = await pool.query(
      "INSERT INTO barang (nama_barang, keterangan, qty, harga, gambar) VALUES ($1,$2,$3,$4,$5) RETURNING*",
      [nama_barang, keterangan, qty, harga, gambar]
    );
    res.json(newData);
    // console.log(newData.rows);
  } catch (err) {
    console.error(err.message);
  }
};

exports.getBarang = async (req, res) => {
  try {
    const getData = await pool.query("SELECT * FROM barang");

    res.json(getData.rows);
    // console.log(getData.rows);
  } catch (err) {
    console.error(err.message);
  }
};

exports.hapusBarang = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id yang akan dihapus", id);

    // query get gambar
    const getGambar = await pool.query(
      "SELECT gambar FROM barang WHERE id_barang = $1",
      [id]
    );

    console.log("Hasil getGambar here :", getGambar.rows[0]);
    const images = getGambar.rows[0].gambar;

    fs.unlinkSync(images, (err) => {
      if (err) throw err;

      console.log("sukses delete image");
    });

    const deleteData = await pool.query(
      "DELETE FROM barang WHERE id_barang = $1",
      [id]
    );

    res.status(200).json("Data deleted");
    console.log("Data Deleted");
  } catch (err) {
    console.error("Error : ", err.message);
  }
};

exports.editBarang = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_barang, keterangan, qty, harga } = req.body;
    const gambar = req.file?.path;
    console.log(gambar);
    let query =
      "UPDATE barang SET nama_barang = $1, keterangan = $2, qty=$3, harga = $4";
    const paramsQry = [nama_barang, keterangan, qty, harga];

    if (gambar) {
      const getGambar = await pool.query(
        "SELECT gambar FROM barang WHERE id_barang = $1",
        [id]
      );

      const images = getGambar.rows[0].gambar;

      fs.unlinkSync(images, (err) => {
        if (err) throw err;
      });
      query += ", gambar = $5";
    }

    if (gambar) {
      query += " WHERE id_barang = $6";
      paramsQry.push(gambar);
    } else {
      query += " WHERE id_barang = $5";
    }

    paramsQry.push(id);

    const editData = await pool.query(query, paramsQry);

    res.status(200).json(editData);
    console.log("Data Edited");
    console.log("gambar hasil update", gambar);
  } catch (err) {
    console.error("Error is here bro : ", err.message);
  }
};
