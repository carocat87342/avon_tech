const moment = require("moment");
const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllPractitioner = async (req, res) => {
  let { client_id } = req.query;

  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
  }
  let $sql;

  try {
    $sql = `select u.id user_id, concat(u.firstname, ' ', u.lastname) AS name
    from users u
    where u.client_id=${client_id}
    order by name
    limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getPractitionerDates = async (req, res) => {
  let { client_id } = req.query;

  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
  }
  let $sql;

  try {
    $sql = `select id, user_id, start_date_time, end_date_time, log_tz, monday, tuesday, wednesday, thursday, friday, active
    from user_schedule where client_id=$1 and current_date between start_date_time and end_date_time`;

    const dbResponse = await db.query($sql, [client_id]);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getBookedAppointments = async (req, res) => {
  let { client_id } = req.query;
  const { practitioner_id } = req.query;

  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
  }
  let $sql;

  try {
    $sql = `select start_dt, end_dt, patient_id, user_id
    from user_calendar
    where client_id=${req.client_id}
    and user_id=$1
    and status in ('A', 'R')
    and start_dt>now()`;

    const dbResponse = await db.query($sql, [practitioner_id]);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getAppointmentTypes = async (req, res) => {
  const { practitioner_id } = req.body.data;

  let $sql;

  try {
    $sql = `select at.id, at.appointment_type, at.descr, at.length, at.fee
    from appointment_type at 
    where at.client_id=${req.client_id} 
    /*and atu.user_id=${practitioner_id}*/
    and at.active=true
    and at.allow_patients_schedule=true
    order by at.sort_order 
    limit 100
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.info("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createAppointment = async (req, res) => {
  const {
    start_dt,
    end_dt,
    user_id,
    status: apptStatus,
    patient_id,
    appointment_type_id,
  } = req.body.data;
  
  try {
    const insertResponse = await db.query(`insert into user_calendar(client_id, user_id, patient_id, appointment_type_id, start_dt, end_dt, status, created, created_user_id)
    VALUES (${req.user_id}, $1, $2, $3, $4, $5, $6, now(), ${req.user_id}) RETURNING id`, [user_id, patient_id, appointment_type_id, moment(start_dt).format("YYYY-MM-DD HH:mm:ss"),
     moment(end_dt).format("YYYY-MM-DD HH:mm:ss"), apptStatus])
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

// TODO:: Not in use. Need to be refactored in future in needed.
const updateAppointment = async (req, res) => {
  const appointmentId = req.params.id;
  const formData = req.body.data;
  formData.updated = new Date();
  formData.updated_user_id = req.user_id;

  try {
    const updateResponse = await db.query(`update user_calendar set ? where id=?`, [formData, appointmentId]);
    if (!updateResponse.affectedRows) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = updateResponse;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

// TODO:: Not in use. Need to be refactored in future in needed.
const cancelRequestRescheduleAppointment = async (req, res) => {
  // TODO: The logic of this controller might change later. 
  const appointmentId = req.params.id;
  try {
    const deletedResponse = await db.query(
      `delete from user_calendar where id=?`, [appointmentId]
    );
    if (!deletedResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deletedResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Appointments = {
  getAllPractitioner,
  getPractitionerDates,
  getBookedAppointments,
  getAppointmentTypes,
  createAppointment,
  updateAppointment,
  cancelRequestRescheduleAppointment,
};

module.exports = Appointments;
