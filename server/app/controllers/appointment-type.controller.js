const { validationResult } = require("express-validator");
const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select at.id, at.appointment_type, at.descr, at.length,
       at.fee, at.allow_patients_schedule, at.sort_order, at.note, at.active, at.client_id
      , at.created
      , concat(u.firstname, ' ', u.lastname) created_user
      , at.updated
      , concat(u2.firstname, ' ', u2.lastname) updated_user
      from appointment_type at
      left join users u on u.id=at.created_user_id
      left join users u2 on u2.id=at.updated_user_id
      where at.client_id=${req.client_id}
      order by at.sort_order, at.appointment_type
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
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const {appointment_type, length, allow_patients_schedule, descr, fee, sort_order, note, active} = req.body.data;

  try {
    const dbResponse = await db.query(
      `insert into appointment_type(appointment_type, length, allow_patients_schedule, descr, fee, sort_order, note, active, created, created_user_id, client_id) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, '${moment().format("YYYY-MM-DD hh:ss")}', ${req.user_id}, ${req.client_id}) RETURNING id`,
      [appointment_type, length, allow_patients_schedule, descr, fee, sort_order, note, active]
    );

    if (!dbResponse) {
      errorMessage.message = "Creation not successful";
      res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Creation successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.error(err);
    errorMessage.message = "Creation not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const { id } = req.params;
  const {appointment_type, length, allow_patients_schedule, descr, fee, sort_order, note, active} = req.body.data;

  try {
    const updateResponse = await db.query(
      `update appointment_type set appointment_type=$1, length=$2, allow_patients_schedule=$3, sort_order=$4, note=$5,
       active=$6, descr=$7, fee=$8, client_id=${req.client_id}, updated=now(), updated_user_id=${req.user_id} where id =$9 RETURNING id`,
      [appointment_type, length, allow_patients_schedule, sort_order, note, active, descr, fee, id]
    );

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

const deleteAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }
  const { id } = req.params;

  try {
    await db.query(
      `DELETE FROM appointment_type_user WHERE appointment_type_id=$1`, [id]
    );

    const deleteResponse = await db.query(
      `DELETE FROM appointment_type WHERE id=$1 RETURNING id`, [id]
    );

    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deleteResponse.rows;
    successMessage.message = "Deletion successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.log('error:', error);
    errorMessage.message = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const appointmentTypes = {
  getAll,
  create,
  update,
  deleteAppointment,
};

module.exports = appointmentTypes;
