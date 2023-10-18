const { validationResult } = require("express-validator");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getHistory = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select e.created, e.message, e.subject, concat(u.firstname, ' ', u.lastname) created_user,
       e.status_active, e.status_inactive, e.send_status, e.client_id
        from email_bulk_history e
        left join users u on u.id=e.created_user_id
        where e.client_id=${req.client_id}
        order by e.created desc 
        limit 50`
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

const createEmailHistory = async (req, res) => {
  const {subject, status_active, message} = req.body.data;

  try {
    const insertResponse = await db.query(
      `insert into email_bulk_history(subject, message, status_active, client_id, created, created_user_id) 
      VALUES($1, $2, $3, ${req.client_id}, now(), ${req.user_id}) RETURNING client_id`, [subject, message, status_active]
    );

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateEmailHistory = async (req, res) => {
  const { date } = req.params;
  const { message, subject, status_active } = req.body.data;
  try {
    const updateResponse = await db.query(`update email_bulk_history set message=$1, subject=$2, status_active=$3
    where client_id=$4 and created=$5 RETURNING client_id`,
    [message, subject, status_active, req.client_id, date]);

    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = updateResponse.rows;
    successMessage.message = "Update successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.error(error);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const deleteHistory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { date } = req.params;
  try {
    const deleteResponse = await db.query(`delete from email_bulk_history where client_id=${req.client_id} and created=$1`, [date]);

    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const appointmentTypes = {
  getHistory,
  createEmailHistory,
  updateEmailHistory,
  deleteHistory,
};

module.exports = appointmentTypes;
