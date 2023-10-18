const { validationResult } = require("express-validator");
const multer = require("multer");
const fs = require("fs");
const moment = require("moment");
const { errorMessage, successMessage, status } = require("../helpers/status");
const db = require("../db");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req:", req.body);
    const dest = `${process.env.UPLOAD_DIR}/client`;
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
    const fileName = `c${req.params.userId}_logo.png`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only image"));
    }
  },
});

const getInit = async (req, res) => {
  let $sql;

  try {
    $sql = `select id, name, code, address, address2, city, state, postal, country, phone, fax, 
    website, email, ein, npi, calendar_start_time, calendar_end_time from client where id=$1`;

    const dbResponse = await db.query($sql, [req.client_id]);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getHistory = async (req, res) => {
  let $sql;

  try {
    $sql = `select 
      ch.created
      ,ch.name
      ,ch.code
      ,ch.address
      ,ch.address2
      ,ch.city
      ,ch.state
      ,ch.postal
      ,ch.country
      ,ch.phone
      ,ch.fax
      ,ch.email
      ,ch.website
      ,ch.calendar_start_time
      ,ch.calendar_end_time
      ,ch.functional_range
      ,ch.ein
      ,ch.npi
      from client_history ch
      where ch.id=${req.client_id}
      order by ch.created desc
      limit 50`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const imageUpload = upload.single("file");

const logoUpdate = async (req, res) => {
  // eslint-disable-next-line prefer-arrow-callback
  imageUpload(req, res, function (err) {
    if (err) {
      console.info("documentUpload Error:", err.message);
      errorMessage.message = err.message;
      return res.status(status.error).send(errorMessage);
    }
    if (!req.file) {
      errorMessage.message = "File content can not be empty!";
      return res.status(status.error).send(errorMessage);
    }
    return res.status(status.success).send("success");
  });
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const {address, address2, city, state, website, country, calendar_start_time, calendar_end_time, email, ein, npi, postal, phone, fax} = req.body.data;

  const client = req.body;

  client.updated = new Date();
  client.updated_user_id = req.user_id;

  /**
   *  "address": "Dakshin Word",
        "address2": "Dakshin Word 2",
        "city": "Naogaon",
        "state": "Rajshahi",
        "website": "www.dd.dd",
        "country": "BD",
        "calendar_start_time": "10:00:00",
        "calendar_end_time": "16:00:00",
        "email": "dd@dd.com",
        "ein": "ein",
        "npi": "npi",
        "postal": "12345",
        "phone": "0303221212",
        "fax": "03032212122"
   */

  try {
    let $sql;
    $sql = `update client set email='${email}'`;
    if(address){
      $sql +=`, address='${address}'`
    }
    if(address2){
      $sql +=`, address2='${address2}'`
    }
    if(city){
      $sql +=`, city='${city}'`
    }
    if(state){
      $sql +=`, state='${state}'`
    }
    if(website){
      $sql +=`, website='${website}'`
    }
    if(country){
      $sql +=`, country='${country}'`
    }
    if(calendar_start_time){
      $sql +=`, calendar_start_time='${calendar_start_time}'`
    }
    if(calendar_end_time){
      $sql +=`, calendar_end_time='${calendar_end_time}'`
    }
    if(ein){
      $sql +=`, ein='${ein}'`
    }
    if(npi){
      $sql +=`, npi='${npi}'`
    }
    if(postal){
      $sql +=`, postal='${postal}'`
    }
    if(phone){
      $sql +=`, phone='${phone}'`
    }
    if(fax){
      $sql +=`, fax='${fax}'`
    }

    $sql += `, updated='${moment().format('YYYY-MM-DD hh:ss')}', updated_user_id=${req.user_id} where id =${req.params.clientId} RETURNING id`

    const updateResponse = await db.query($sql);

    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = updateResponse.rows;
    successMessage.message = "Update successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Config = {
  getInit,
  getHistory,
  update,
  logoUpdate,
};

module.exports = Config;
