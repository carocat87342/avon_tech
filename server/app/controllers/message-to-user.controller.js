const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getUserMessageById = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await db.query(
      `select m.id, m.created
      , concat(p.firstname, ' ', p.lastname) patient_from_name
      , concat(u.firstname, ' ', u.lastname) user_to_name
      , m.status, m.message, m.note_assign
      , m.patient_id_from, m.user_id_to
      from message m
      left join patient p on p.id=m.patient_id_from
      left join users u on u.id=m.user_id_to
      where m.id=$1`, [id]
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

const getUserMessage = async (req, res) => {
  const { provider_id } = req.params;
  try {
    const dbResponse = await db.query(
      `/*Message To User*/
      select m.id, m.created
      , concat(p.firstname, ' ', p.lastname) patient_from_name
      , concat(u.firstname, ' ', u.lastname) user_to_name
      , m.status, m.message, m.note_assign
      , m.patient_id_from, m.user_id_to
      from message m
      left join patient p on p.id=m.patient_id_from
      left join users u on u.id=m.user_id_to
      where m.patient_id_from=(
          select m.patient_id_from
          from message m
          where m.id=(
              select min(m.id) id
              from message m
              where m.user_id_to=$1
              and m.status='O'
              )
      )
      and m.user_id_to=$2
      and m.status='O'
      order by m.created
      limit 10`, [provider_id, provider_id]
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

const getMessageAssignUser = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select firstname, lastname 
      from users 
      where client_id=${req.client_id} 
      /*and status='A'*/
      order by 1, 2
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

const createMessage = async (req, res) => {
  const { patient_id, message, user_id_from } = req.body.data;

  try {
    const insertResponse = await db.query(`insert into message(patient_id_from, message, user_id_from, client_id, created, created_user_id) 
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id`, [patient_id, message, user_id_from, req.client_id, moment().format('YYYY-MM-DD hh:ss'), req.user_id]);

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
  const { user_id_to, message_status, note_assign } = req.body.data;

  try {
    const updateResponse = await db.query(`update message set user_id_to=$1, status=$2, note_assign=$3, updated=$4, updated_user_id=$5 where id=$6 RETURNING id`,
    [user_id_to, message_status, note_assign, moment().format('YYYY-MM-DD hh:ss'), req.user_id, id]);

    await db.query(`insert into message_history(id, user_id_to, note_assign, status, created, created_user_id) 
    VALUES ($1, $2, $3, $4, $5, $6)`, [id, user_id_to, note_assign, message_status, moment().format('YYYY-MM-DD hh:ss'), req.user_id]);

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

const getUserMessageHistory = async (req, res) => {
  const { messageId } = req.params;
  try {
    const dbResponse = await db.query(
      `select concat(u2.firstname, ' ', u2.lastname) assigned_to
      , mh.status, mh.created updated
      , concat(u.firstname, ' ', u.lastname) updated_by
      from message_history mh
      left join users u on u.id=mh.created_user_id
      left join users u2 on u2.id=mh.user_id_to
      where mh.client_id=${req.client_id}
      and mh.id=$1 order by mh.created desc limit 50`, [messageId]
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

const getMessageUserHistory = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select l.updated, concat(u.firstname, ' ', u.lastname) updated_name
      , concat(p.firstname, ' ', p.lastname) patient_name
      , concat(u2.firstname, ' ', u2.lastname) assigned_name
      , l.note_assign, l.id
      from message l
      left join patient p on p.id=l.patient_id_from
      left join users u on u.id=l.updated_user_id
      left join users u2 on u2.id=l.user_id_to
      where l.client_id=${req.client_id}
      and l.updated_user_id=${req.user_id}
      order by l.updated desc 
      limit 50
      `
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

const messageToPatient = {
  getUserMessageById,
  getUserMessage,
  getMessageAssignUser,
  createMessage,
  updateMessage,
  getUserMessageHistory,
  getMessageUserHistory,
};

module.exports = messageToPatient;
