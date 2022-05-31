const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const fs  = require("fs")

multer
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "images";
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive : true
      });
    }
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimtype === "image/jpg" || "image/png" || "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/doc", express.static(path.join(__dirname, "doc")));
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("gambar")
);

// Route
app.use("/", require("./src/routes/dashboard/dashboard"));
app.use("/barang", require("./src/routes/barang/barang"));
app.use("/auth", require("./src/routes/auth/auth"))
app.use("/generate", require("./src/routes/generate/generateBarang"))

app.listen(8000, function () {
  console.log("Listening port 8000");
});
