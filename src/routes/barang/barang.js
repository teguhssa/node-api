const express = require("express");
const router = express.Router();

const barangC = require("../../controller/barang/barangC");

router.get("/info-barang", barangC.getBarang);
router.post("/tambah-barang", barangC.addBarang)
router.delete("/hapus-barang/:id", barangC.hapusBarang)
router.put("/edit-barang/:id", barangC.editBarang)

module.exports = router;
