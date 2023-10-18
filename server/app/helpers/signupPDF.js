const fs = require("fs");
const moment = require("moment");
const path = require("path");
const PDFDocument = require("pdfkit");

/*
To set file permissions in Linux or a Mac
  sudo mkdir /app/
  sudo mkdir /app/client
  sudo chmod 777 /app/client
*/

const signupPDF = async (content, user, client) => {
  try {
    const fileName = `c${user.client_id}_u${user.id}_${moment().format(
      "YYYY-MM-DD-HHMMSS"
    )}_contract.pdf`;
    const pdfPath = path.join(`${process.env.UPLOAD_DIR}/client`, fileName);
    const pdfDoc = new PDFDocument({ size: "A4", margin: 50 });
    pdfDoc.text(content);

    pdfDoc.text(`Signed: ${user.sign_dt}`, 50, pdfDoc.page.height - 160, {
      width: 410,
      align: "left",
    });
    pdfDoc.text(`Name: ${user.firstname} ${user.lastname}`);
    pdfDoc.text(`IP Address: ${user.sign_ip_address}`);
    pdfDoc.text(`Practice: ${client.name}`);
    pdfDoc.text(`UserID: ${user.id}`);

    pdfDoc.end();
    const writeStream = fs.createWriteStream(pdfPath);
    pdfDoc.pipe(writeStream);

    return {
      filePath: pdfPath,
      fileName,
    };
  } catch (error) {
    console.error("pdfDoc >>>:", error);
    return false;
  }
};

const user = {
  signupPDF,
};

module.exports = user;
