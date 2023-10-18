const multer = require("multer");
const fs = require("fs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select h.id, h.filename, h.created, concat(u.firstname, ' ', u.lastname) AS name, h.client_id
      from handout h
      left join users u on u.id=h.created_user_id
      where h.client_id=${req.client_id}
      order by h.filename
      limit 100`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = `${process.env.UPLOAD_DIR}/handouts`;
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
    const fileName = `c${req.client_id}_${file.originalname
      .split(" ")
      .join("_")}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "text/*" ||
      file.mimetype === "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only image, .pdf and text"));
    }
  },
});

const handoutUpload = upload.single("file");

const removeFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(file.path, "removed successfully!");
  });
};

const addHandouts = async (req, res) => {
  handoutUpload(req, res, async (err) => {
    if (err) {
      console.log("handoutUpload Error:", err.message);
      errorMessage.message = err.message;
      return res.status(status.error).send(errorMessage);
    }
    if (!req.file) {
      errorMessage.message = "File content can not be empty!";
      return res.status(status.error).send(errorMessage);
    }

    const uploadedFilename = req.file.originalname.replace(/\s/g, '_');
    try {
      const existingHandout = await db.query(
        `select 1
        from handout
        where client_id=${req.client_id}
        and filename='${uploadedFilename}'
        limit 1`
      );
      if (existingHandout.length > 0) {
        removeFile(req.file);
        errorMessage.message = "Same file is already in our database system!";
        return res.status(status.error).send(errorMessage);
      }

      const { notes } = req.body;

      const insertResponse = await db.query(
        `insert into handout(filename, notes, client_id, created, created_user_id) 
        VALUES($1, $2, ${req.client_id}, now(), ${req.user_id}) RETURNING id`, [uploadedFilename, notes]
      );

      if (!insertResponse.rowCount) {
        removeFile(req.file);
        errorMessage.message = "Insert not successful";
        return res.status(status.notfound).send(errorMessage);
      }

      // It's limitation of Multer to pass variable to use as filename.
      // Got this idea from https://stackoverflow.com/a/52794573/1960558
      fs.renameSync(
        req.file.path,
        req.file.path.replace("undefined", req.client_id)
      );

      successMessage.data = insertResponse.rows;
      successMessage.message = "Insert successful";
      return res.status(status.created).send(successMessage);
    } catch (excepErr) {
      console.log("excepErr", excepErr);
      errorMessage.message = "Insert not successful";
      return res.status(status.error).send(errorMessage);
    }
  });
};

const deleteHandout = async (req, res) => {
  const { id } = req.params;

  try {
    // Call DB query without assigning into a variable
    const deletePatientHandoutResponse = await db.query(`DELETE FROM patient_handout WHERE handout_id=$1 RETURNING handout_id`, [id]);

    const deleteHandoutResponse = await db.query(`DELETE FROM handout WHERE id=$1 RETURNING id`, [id]);

    if (!deletePatientHandoutResponse.rowCount) {
      console.info("Patient Handout deletion not successful");
    }
    if (!deleteHandoutResponse.rowCount) {
      errorMessage.message = "Handout deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteHandoutResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const handouts = {
  getAll,
  addHandouts,
  deleteHandout,
};

module.exports = handouts;
