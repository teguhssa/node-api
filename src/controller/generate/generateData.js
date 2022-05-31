const fs = require("fs");
const Pdfmake = require("pdfmake");
const fonts = require("../../routes/utils/fonts");
const moment = require("moment");
// const path = require("path");

exports.generateData = async (req, res) => {
  try {
    const { data_barang } = req.body;
    let jumlah = 0;
    // console.log(fonts())
    const printer = new Pdfmake(fonts());

    var docDefinition = {
      content: [
        { image: "./assets/logo.jpg", width: 150, alignment: "right" },
        { text: "INVOICE", fontSize: 20, bold: true },
        moment().format("MM/DD/YYYY, h:mm:ss"),
        {
          columns: [
            {
              text: "Invoice No.",
              width: "auto",
            },
            moment().format("MMDDYYYYhmmss") + "-" + "1",
          ],
        },
        {
          text: "Jhon Doe",
          bold: true,
          margin: [0, 20, 0, 0],
        },
        {
          text: "Florida Steet",
        },
        {
          text: "United States",
        },
        {
          style: "tableMargin",
          table: {
            widths: [150, 100, 100, 100],
            headerRows: 1,
            body: [
              [
                { text: "Produk", bold: true },
                { text: "Keterangan", bold: true, alignment: "center" },
                { text: "Qty", bold: true, alignment: "center" },
                { text: "Harga", bold: true, alignment: "center" },
              ],
              ...data_barang.map((barang) => {
                return [
                  { text: barang.nama_barang },
                  { text: barang.keterangan, alignment: "center" },
                  { text: barang.qty, alignment: "center" },
                  {
                    text: new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(barang.harga * barang.qty),
                    alignment: "center",
                  },
                ];
              }),
            ],
          },
          layout: "lightHorizontalLines",
        },
        {
          columns: [
            {
              text: "Total :",
              bold: true,
              width: "*",
              alignment: "right",
              margin: [0, 0, 20, 0],
            },
            ...data_barang
              .map((item) => {
                return [
                  {
                    text: new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format((jumlah += item.harga * item.qty)),
                    margin: [0, 0, 30, 0],
                    bold: true,
                    alignment: "right",
                  },
                ];
              })
              .slice(-1),
          ],
        },
        {
          text: "TERMS AND CONDITIONS",
          bold: true,
          margin: [0, 30, 0, 10],
        },
        {
          table: {
            body: [
              [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
              ],
            ],
          },
        },
      ],
      styles: {
        tableMargin: {
          margin: [0, 20, 0, 30],
        },
        textBold: {
          bold: true,
        },
      },
    };

    // const docFile = "../../../doc/doc.pdf"

    const pdf = printer.createPdfKitDocument(docDefinition);
    const dir = "doc";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {
        recursive: true,
      });
    }
    pdf.pipe(fs.createWriteStream("./doc/doc.pdf"));
    pdf.end();

    console.log({
      filepath: dir + "/",
      filename: "doc.pdf",
    });

    res.send({
      filepath: dir + "/",
      filename: "doc.pdf",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};
