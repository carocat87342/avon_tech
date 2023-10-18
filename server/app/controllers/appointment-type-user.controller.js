const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAppointmentTypesUsers = async (req, res) => {
  try {
    const userResponse = await db.query(
      `select u.id, concat(u.firstname, ' ', u.lastname) AS name from users u where u.client_id=${req.client_id} and u.appointments=true order by name limit 100`
    );
    const apptTypeResponse = await db.query(
      `select at.id, at.appointment_type from appointment_type at where at.client_id=${req.client_id} order by at.appointment_type limit 100`
    );
    const dbResponse = await db.query(
      `select atu.user_id, atu.appointment_type_id, atu.active, atu.amount from appointment_type_user atu where atu.client_id=${req.client_id} 
      order by atu.user_id, atu.appointment_type_id limit 100`
    );
    const result = {
      user: userResponse.rows,
      appointment_types: apptTypeResponse.rows,
      data: dbResponse.rows,
    };
    if (!userResponse.rows) {
      errorMessage.message = "No appointment types users found.";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = result;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message =
      "Operation was not successful for Appointment types User.";
    return res.status(status.error).send(errorMessage);
  }
};

const appointmentTypes = {
  getAppointmentTypesUsers,
};

module.exports = appointmentTypes;
