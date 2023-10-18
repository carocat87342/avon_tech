const { validationResult } = require("express-validator");
const moment = require("moment");
const db = require('../db')
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAllUsers = async (req, res) => {
  try {
    const dbResponse = await db.query(`select u.id, u.firstname, u.lastname, u.title, u.email, u.status, u.type, u.schedule, u.appointments, u.admin, u.note
        , u.phone, u.login_dt, u.email_forward_user_id, u.timezone
        , u.created, concat(u2.firstname, ' ', u2.lastname) created_user
        , u.updated, concat(u3.firstname, ' ', u3.lastname) updated_user
        , u.updated, concat(u3.firstname, ' ', u3.lastname) forward_user
        from users u
        left join users u2 on u2.id=u.created_user_id
        left join users u3 on u3.id=u.updated_user_id
        left join users u4 on u4.id=u.email_forward_user_id
        where u.client_id=${req.client_id}
        order by u.created
        limit 100`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getUser = async (req, res) => {
  try {
    const $sql = `SELECT u.id, u.admin, u.client_id, u.firstname, u.lastname, u.email, u.sign_dt, u.email_confirm_dt, c.name, c.calendar_start_time, c.calendar_end_time 
    from users u
    left join client c on c.id=u.client_id 
    where u.id=${req.user_id}
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const user = dbResponse[0];
    if (user.admin) {
      user.permissions = ["ADMIN"];
    }
    successMessage.data = { user };
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  } 
};

const getUsersByClientId = async (req, res) => {
  try {
    const $sql = `select id, firstname, lastname 
    from users
    where client_id=${req.client_id} 
    /*and status='A'*/
    order by 1, 2
    limit 50
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getLastVisitedPatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const dbResponse = await db.query(`select id, client_id, firstname, lastname from patient where id=$1`, [patientId]);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows[0];
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getForwardEmailList = async (req, res) => {
  try {
    const dbResponse = await db.query(`select u.id, concat(u.firstname, ' ', u.lastname) as name
        from users u 
        where u.client_id=${req.client_id}
        and u.id<>${req.user_id}
        and status<>'D'
        order by name
        limit 100`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createNewUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const {firstname, lastname, title, email, phone, note, timezone, appointments, type, schedule, admin, email_forward_user_id} = req.body.data;
 
  try {
    const dbResponse = await db.query(`insert into users(client_id, firstname, lastname, title, email, phone, timezone,
       note, status, appointments, type, schedule, admin, email_forward_user_id, created, created_user_id) 
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING id, email`,
        [req.client_id, firstname, lastname, title, email, phone, timezone, note, req.body.data.status, appointments, type, schedule, admin, email_forward_user_id,
           moment().format('YYYY-MM-DD hh:ss'), req.user_id]);

    if (!dbResponse.rowCount) {
      errorMessage.message = "Creation not successful";
      res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Creation successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Creation not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const {firstname, lastname, title, email, phone, note, timezone, appointments, type, schedule, admin, email_forward_user_id} = req.body.data;

  try {
    let $sql;
    $sql = `update users set email='${email}'`;

    if(firstname) {
      $sql += `, firstname='${firstname}'`
    }
    if(lastname) {
      $sql += `, lastname='${lastname}'`
    }
    if(title) {
      $sql += `, title='${title}'`
    }
    if(phone) {
      $sql += `, phone='${phone}'`
    }
    if(note) {
      $sql += `, note='${note}'`
    }
    if(timezone) {
      $sql += `, timezone='${timezone}'`
    }
    if(req.body.data.status) {
      $sql += `, status='${req.body.data.status}'`
    }
    if(appointments) {
      $sql += `, appointments=${appointments}`
    }
    if(type) {
      $sql += `, type='${type}'`
    }
    if(schedule) {
      $sql += `, schedule='${schedule}'`
    }
    if(admin) {
      $sql += `, admin=${admin}`
    }
    if(email_forward_user_id) {
      $sql += `, email_forward_user_id='${email_forward_user_id}'`
    }

    $sql += `, updated='${moment().format('YYYY-MM-DD hh:ss')}', updated_user_id=${req.user_id} where id=${req.params.id} RETURNING id, email`


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

const users = {
  getAllUsers,
  getForwardEmailList,
  getLastVisitedPatient,
  getUser,
  getUsersByClientId,
  createNewUser,
  updateUser,
};

module.exports = users;
