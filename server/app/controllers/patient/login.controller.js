const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const moment = require("moment");
const config = require("../../../config");
const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");
/**
 * This function let patient to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {
 
  const { client_id, email } = req.body;
  const patientResponse = await db.query(
    `select p.id, p.client_id, p.firstname, p.lastname, p.password, p.status, p.stripe_customer_id, 
      p.corp_stripe_customer_id, client.code 
      from patient p 
      join client on p.client_id=client.id 
      where p.client_id=$1 and p.email=$2`,
      [client_id, email]
  );

  if (patientResponse.rows.length === 0) {
    errorMessage.message = "Patient not found";
    errorMessage.patient = patientResponse.rows;
    return res.status(status.notfound).send(errorMessage);
  }

  const patient = patientResponse.rows[0];
  
  const isPasswordValid = bcrypt.compareSync(
    req.body.password,
    patient.password
  );

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.patient = patient;
    return res.status(status.unauthorized).send(errorMessage);
  }

  // TODO:: if password not correct, and more than 20 times, then lock for 5 minutes, and print message "Account locked for 5 minutes"
  if (patient.status !== "A") {
    errorMessage.message = "Patient portal status is not active";
    return res.status(status.error).send(errorMessage);
  }

  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  await db.query(`update patient set login_dt='${now}', updated=now() where id=$1`,[patient.id]);

  const token = jwt.sign(
    { id: patient.id, client_id: patient.client_id, role: "PATIENT" },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
      // expiresIn: 5 * 60, // 2minutes
    }
  );

  const resData = {};
  resData.accessToken = token;
  delete patient.password; // delete password from response
  resData.user = patient;
  resData.user.role = "PATIENT";
  resData.user.login_url = `/login/${patient.code}`;
  successMessage.data = resData;
  res.status(status.success).send(successMessage);
};
