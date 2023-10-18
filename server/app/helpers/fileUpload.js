const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = `${process.env.UPLOAD_DIR}/patient`;
    // eslint-disable-next-line prefer-arrow-callback
    fs.access(dest, function (error) {
      if (error) {
        console.log("Directory does not exist.");
        return fs.mkdir(dest, (err) => cb(err, dest));
      }
      console.log("Directory exists.");
      return cb(null, dest);
    });
  },
  filename: (req, file, cb) => {
    const fileName = `pid${req.body.patient_id}_${file.originalname
      .split(" ")
      .join("_")}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.originalname.startsWith("pid")) {
      return cb(new Error("File name should not start with pid"));
    }
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "text/plain" ||
      file.mimetype === "image/png" || 
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only image, .pdf and text"));
    }
  },
});

const documentUpload = upload.single("file");

const removeFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(file.path, "removed successfully!");
  });
};

module.exports = { documentUpload, removeFile };
