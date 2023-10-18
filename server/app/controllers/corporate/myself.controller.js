const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getProfile = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select firstname, lastname, email, title, created, email_forward_user_id, phone, status, timezone
      from users 
      where id=${req.params.userId}
      `
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows[0];
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const { firstname, lastname, email, title, email_forward_user_id, phone, password, created } = req.body.data;

  try {
    let $sql;
    $sql = `update users set firstname='${firstname}', lastname='${lastname}', email='${email}', title='${title}'`;

    if(email_forward_user_id){
      $sql += `, email_forward_user_id=${email_forward_user_id}`;
    }
    if(phone){
      $sql += `, phone='${phone}'`;
    }
    if(password){
      $sql += `, password=${bcrypt.hashSync(password, 8)}`;
    }
    if(created){
      $sql += `, created='${moment(created).format("YYYY-MM-DD HH:mm:ss")}'`;
    }
    
    $sql += `, updated='${moment().format('YYYY-MM-DD hh:ss')}', updated_user_id=${req.user_id} where id =${req.params.userId} RETURNING id`;


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

const getForwardEmail = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select u.id, concat(u.firstname, ' ', u.lastname) AS name
      from users u 
      where u.id<>${req.params.userId}
      order by name
      limit 100
      `
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("error:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getLogins = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select dt, ip
      from user_login 
      where user_id=${req.params.userId}
      order by dt desc
      limit 20
      `
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("error:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getActivityHistory = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select ul.dt, concat(p.firstname, ' ', p.lastname) patient, p.id patient_id, ul.action
      from user_log ul
      left join patient p on p.id=ul.patient_id
      where ul.user_id=${req.params.userId}
      order by ul.dt desc
      limit 20
      `
    );

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

const myself = {
  getProfile,
  updateProfile,
  getForwardEmail,
  getLogins,
  getActivityHistory,
};

module.exports = myself;
