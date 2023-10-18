const nodemailer = require("nodemailer");
const config = require("../../config");

let mailConfig;
if (process.env.NODE_ENV === "production") {
  // all emails are delivered to destination
  mailConfig = {
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "real.user",
      pass: "verysecret",
    },
  };
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.emailConfig.user,
      pass: config.emailConfig.pass,
    },
  };
}

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport(mailConfig);

const signUpConfirmationTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Signup Confirmation";
  const html = `
  <p>Hi ${user.displayName || user.email},</p>
  <p>Thank you for signing up</p>
  <p>To confirm your email address click or copy the following link:</p>
  <a href=${url}>${url}</a>
  `;

  return { from, to, subject, html };
};

const getEmailVerificationURL = (user, token) =>
  `${process.env.CLIENT_URL}/email/confirmation/${user.id}/${token}`;

const getPasswordResetURL = (user, userType, token) => {
  if (userType === "patient") {
    return `${process.env.CLIENT_URL}/patient/password/reset/${user.id}/${token}`;
  }
  if (userType === "corporate") {
    return `${process.env.CLIENT_URL}/corporate/password/reset/${user.id}/${token}`;
  }
  return `${process.env.CLIENT_URL}/password/reset/${user.id}/${token}`;
};

const resetPasswordTemplate = (user, url) => {
  const from = process.env.EMAIL_LOGIN;
  const to = user.email;
  const subject = "Password Reset";
  const html = `
  <p>Hi ${user.firstname || user.email},</p>
  <p>You can use the following link to reset your password.  It will expire in one hour.</p>
  <a href=${url}>${url}</a>
  `;

  return { from, to, subject, html };
};

/**
 * @param {object} patient
 * @param {date object} appointmentDate
 * @param {string} providerName
 * @returns {object} from, to, subject, html
 */
const newAppointmentTemplate = (patient, appointmentDate, provider) => {
  const from = process.env.EMAIL_LOGIN;
  const to = patient.email;
  const subject = "New Appointment";
  const html = `
    <p>Hi ${patient.firstname},</p>
    <p>A new appointment was created for you on <b>${appointmentDate}</b> with ${provider.name}.</p>
  `;
  return { from, to, subject, html };
};

/**
 * @param {object} patient
 * @param {date object} appointmentDate
 * @param {string} providerName
 * @returns {object} from, to, subject, html
 */
const cancelAppointmentTemplate = (patient, appointmentDate, providerName) => {
  const from = process.env.EMAIL_LOGIN;
  const to = patient.email;
  const subject = "Cancel Appointment";
  const html = `
    <p>Hi ${patient.firstname},</p>
    <p>Your appointment on <b>${appointmentDate}</b> with ${providerName}  was cancelled.</p>
  `;
  return { from, to, subject, html };
};

/**
 * @param {object} patient
 * @param {date object} appointmentDate
 * @param {string} providerName
 * @returns {object} from, to, subject, html
 */
const updateAppointmentTemplate = (
  patient,
  old_appointment_date,
  providerName,
  new_appointment_date
) => {
  const from = process.env.EMAIL_LOGIN;
  const to = patient.email;
  const subject = "Update Appointment";
  const html = `
    <p>Hi ${patient.firstname},</p>
    <p>Your appointment on <b>${old_appointment_date}</b> with ${providerName}  was changed to <b>${new_appointment_date}</b>.</p>
  `;
  return { from, to, subject, html };
};

const email = {
  transporter, // for development only
  getEmailVerificationURL,
  getPasswordResetURL,
  resetPasswordTemplate,
  signUpConfirmationTemplate,
  newAppointmentTemplate,
  cancelAppointmentTemplate,
  updateAppointmentTemplate,
};

module.exports = email;
