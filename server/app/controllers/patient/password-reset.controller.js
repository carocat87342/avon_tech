const bcrypt = require("bcryptjs");
const moment = require("moment");
const { validationResult } = require("express-validator");
const sgMail = require("@sendgrid/mail");
const db = require("../../db");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");
const {
  transporter,
  getPasswordResetURL,
  resetPasswordTemplate,
} = require("../../helpers/email");

const { usePasswordHashToMakeToken } = require("../../helpers/password-helper");

/**
 * Calling this function with a user will send email with URL
 * @param {object} user
 * @param {object} res
 * @returns {object} response
 */

const sendRecoveryEmail = async (user, res) => {
  const accesstToken = usePasswordHashToMakeToken(user);
  const url = getPasswordResetURL(user, "patient", accesstToken);
  const emailTemplate = resetPasswordTemplate(user, url);

  if (process.env.NODE_ENV === "development") {
    transporter.sendMail(emailTemplate, (err, info) => {
      if (err) {
        console.log(`Error occurred. ${err.message}`);
        errorMessage.message = err.message;
        return res.status(status.error).send(errorMessage);
      }

      successMessage.message =
        "We have sent an email with instructions to reset your credentials.";
      successMessage.data = info;
      return res.status(status.success).send(successMessage);
    });
  } else {
    sgMail.send(emailTemplate).then(
      (info) => {
        console.log(`** Email sent **`, info);
        return res.status(200).json({
          status: "success",
          message:
            "We have sent an email with instructions to reset your credentials.",
        });
      },
      (error) => {
        console.error(error);
        if (error.response) {
          console.error("error.response.body:", error.response.body);
        }
        return res.status(500).json({
          status: "error",
          message: "Something went wrong while sending a reset email.",
        });
      }
    );
  }
};

/**
 * Send password reset email
 * Calling this function with a user's email sends an email URL to reset password
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.sendPasswordResetEmail = async (req, res) => {
  // Check where user already signed up or not
  const { email } = req.params;
  // const data = req.body.patient;

  const patientResponse = await db.query(
    "SELECT id, firstname, lastname, email, password, login_dt, created FROM patient WHERE email = $1 LIMIT 1",
    [email]
  );
  if (patientResponse.rows.length < 1) {
    errorMessage.message = "We couldn't find any record with that email address.";
    return res.status(status.notfound).send(errorMessage);
  }

  const patient = patientResponse.rows[0];
  if (!patient) {
    errorMessage.message = "Patient not found";
    errorMessage.patient = patient;
    return res.status(status.notfound).send(errorMessage);
  }

  if (patient) {
    const token = usePasswordHashToMakeToken(patient);
    const token_expires = moment()
      .add(1, "hours")
      .format("YYYY-MM-DD HH:mm:ss"); // 1 hour

    // update user table for password reset token and expires time
    const patientUpdate = await db.query(
      `UPDATE patient SET reset_password_token='${token}', reset_password_expires='${token_expires}', updated= now()
        WHERE id =${patient.id} RETURNING id`
    );
    if (patientUpdate.rowCount) {
      sendRecoveryEmail(patient, res);
    }
  }
};

/**
 * Calling this function with correct url will let user to reset password
 * @param {object} user
 * @param {object} res
 * @returns {object} response
 */
exports.receiveNewPassword = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const { patientId, token } = req.params;
  const { password } = req.body;

  // find patient with reset_password_token AND patientId
  // check token expires validity
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  const patientResponse = await db.query(
    `SELECT id, email, client_id, reset_password_token, reset_password_expires FROM patient WHERE id=$1
    AND reset_password_token=$2 AND reset_password_expires > '${now}'`, [patientId, token]
  );
  const patient = patientResponse.rows[0];

  if (!patient) {
    errorMessage.message = "Patient not found";
    errorMessage.patient = patient;
    return res.status(status.notfound).send(errorMessage);
  }

  const client = await db.query(
    `SELECT id, name, code from client WHERE id=${patient.client_id}`
  );
  // if all set then accept new password
  const hashedPassword = bcrypt.hashSync(password, 8);

  const updatePatientResponse = await db.query(
    `UPDATE patient SET password=$1, reset_password_token=NULL, reset_password_expires=NULL, updated= now() WHERE id =${patient.id}`, [hashedPassword]
  );

  if (updatePatientResponse.rowCount) {
    successMessage.message = "Password changed succesfullly!";
    successMessage.data = { client: client.rows[0] };
    return res.status(status.success).send(successMessage);
  }
};
