const path = require("path");

module.exports = () => {
  return {
    Roboto: {
      normal: path.join(__dirname.concat("/Roboto-Regular.ttf")),
      bold: path.join(__dirname.concat("/Roboto-Medium.ttf")),
      italics: path.join(__dirname.concat("/Roboto-Italic.ttf")),
      bolditalics: path.join(__dirname.concat("/Roboto-MediumItalic.ttf")),
    },
    Calibri: {
      normal: path.join(__dirname.concat("/Calibri-normal.ttf")),
      bold: path.join(__dirname.concat("/Calibri-bold.ttf")),
      italics: path.join(__dirname.concat("/Calibri-italic.ttf")),
      bolditalics: path.join(__dirname.concat("/Calibri-bold-italic.ttf")),
    },
    Carlito: {
      normal: path.join(__dirname.concat("/Carlito-Regular.ttf")),
      bold: path.join(__dirname.concat("/Carlito-Bold.ttf")),
      italics: path.join(__dirname.concat("/Carlito-Italic.ttf")),
      bolditalics: path.join(__dirname.concat("/Carlito-BoldItalic.ttf")),
    },
    Arial: {
      normal: path.join(__dirname.concat("/arial.ttf")),
      bold: path.join(__dirname.concat("/arialbd.ttf")),
      italics: path.join(__dirname.concat("/ariali.ttf")),
      bolditalics: path.join(__dirname.concat("/arialbi.ttf")),
    },
  };
};
