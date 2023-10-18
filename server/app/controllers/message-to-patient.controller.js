const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await db.query(
      `select id, message, unread_notify_dt, created, client_id from message where id=$1`, [id]
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

const createMessage = async (req, res) => {
  const { message, unread_notify_dt } = req.body.data;

  try {
    const insertResponse = await db.query(`insert into message(client_id, message, unread_notify_dt, created, created_user_id) 
    VALUES(${req.client_id}, $1, $2, now(), ${req.user_id}) RETURNING id`, [message, moment(unread_notify_dt).format("YYYY-MM-DD")]);

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

const updateMessage = async (req, res) => {
  const { id } = req.params;
  const {message, unread_notify_dt} = req.body.data;

  try {
    const updateResponse = await db.query(`update message set client_id=${req.client_id}, message=$1, unread_notify_dt=$2, updated=now(), updated_user_id=${req.user_id} where id=$3 RETURNING id`,
     [message, moment(unread_notify_dt).format("YYYY-MM-DD"), id]);

    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse.rows;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const messageToPatient = {
  getMessageById,
  createMessage,
  updateMessage,
};

module.exports = messageToPatient;
