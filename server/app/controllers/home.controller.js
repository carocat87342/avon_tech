const { validationResult } = require("express-validator");
const moment = require("moment");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const db = require('../db')
const { errorMessage, successMessage, status } = require("../helpers/status");
const {
  transporter,
  newAppointmentTemplate,
  cancelAppointmentTemplate,
  updateAppointmentTemplate,
} = require("../helpers/email");

const getAll = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select uc.id, uc.user_id, uc.patient_id, uc.start_dt, uc.end_dt, uc.status, uc.title, uc.notes, uc.client_id, uc.approved, uc.declined
        , concat(au.firstname, ' ', au.lastname) "approved_user"
        , concat(du.firstname, ' ', du.lastname) "declined_user"
        , p.firstname, p.lastname, p.email, concat(u.firstname, ' ', u.lastname) "provider_name"
        from user_calendar uc
        left join patient p on p.id=uc.patient_id
        left join users u on u.id=uc.user_id
        left join users au on au.id=uc.approved_user_id
        left join users du on du.id=uc.declined_user_id
        where uc.client_id=${req.client_id}
        and uc.user_id=${req.user_id}
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

const getAppointmentHistory = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select concat(p.firstname, ' ', p.lastname) patient, concat(u2.firstname, ' ', u2.lastname) provider
      , uc.start_dt, uc.end_dt, uc.status
      , uc.updated, concat(u.firstname, ' ', u.lastname) updated_by
      from user_calendar uc
      left join patient p on p.id=uc.patient_id
      left join users u on u.id=uc.updated_user_id
      left join users u2 on u2.id=uc.user_id
      where uc.updated_user_id=${req.user_id}
      order by uc.updated desc
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

const getEventsByProvider = async (req, res) => {
  const { providerId } = req.params;

  try {
    const $sql = `select uc.id, uc.user_id, uc.patient_id, uc.start_dt, uc.end_dt, uc.status, uc.title, uc.notes, uc.client_id, uc.approved, uc.declined
    , concat(au.firstname, ' ', au.lastname) approved_user
    , concat(du.firstname, ' ', du.lastname) declined_user
    , p.firstname, p.lastname, p.email, concat(u.firstname, ' ', u.lastname) provider_name
    from user_calendar uc
    left join patient p on p.id=uc.patient_id
    left join users u on u.id=uc.user_id
    left join users au on au.id=uc.approved_user_id
    left join users du on du.id=uc.declined_user_id
    where uc.client_id=${req.client_id}
    and uc.user_id=$1
    `;

    const dbResponse = await db.query($sql, [providerId]);

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

const sendEmailOnAppointmentCreationAndChange = async (
  emailTemplate,
  logMessage
) => {
  if (process.env.NODE_ENV === "development") {
    const info = await transporter.sendMail(emailTemplate);
    console.info(logMessage, info);
  } else {
    console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);
    sgMail.send(emailTemplate).then(
      (info) => {
        console.log(`** ${logMessage}! **`, info);
      },
      (error) => {
        console.error(error);
        if (error.response) {
          console.error("error.response.body:", error.response.body);
        }
      }
    );
  }
};

const createAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { title, notes, ApptStatus, patient, start_dt, end_dt, provider } = req.body.data;
  try {
    const insertResponse = await db.query(`insert into user_calendar(client_id, user_id, patient_id, start_dt, end_dt, status, title, notes, created, created_user_id ) 
    VALUES (${req.client_id}, ${provider.id}, ${patient.id}, '${moment(start_dt).format("YYYY-MM-DD HH:mm:ss")}', '${moment(end_dt).format("YYYY-MM-DD HH:mm:ss")}',
     '${ApptStatus}', '${title}', '${notes}', now(), ${req.user_id}) RETURNING id`);

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    if (patient.email) {
      const emailTemplate = newAppointmentTemplate(
        patient,
        moment(start_dt).format("YYYY-MM-DD HH:mm:ss"),
        provider
      );
      const logInfo = "Email for new appointment has bees sent!";
      sendEmailOnAppointmentCreationAndChange(emailTemplate, logInfo); // Call to send email notifcation
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

const cancelAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id } = req.params;
  const { patient, appointmentDate, providerName } = req.body.data;

  try {
    const updateResponse = await db.query(
      `update user_calendar set status='D', declined=now(), updated= now(),
       updated_user_id='${req.user_id}' where id=$1 RETURNING id`, [id]
    );
    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    if (patient.email) {
      const emailTemplate = cancelAppointmentTemplate(
        patient,
        moment(appointmentDate).format("YYYY-MM-DD HH:mm:ss"),
        providerName
      );
      // Call to send email notifcation
      sendEmailOnAppointmentCreationAndChange(
        emailTemplate,
        "Email for cancel appointment has bees sent!"
      );
    }

    successMessage.data = updateResponse.rows;
    successMessage.message = "Cancel successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Cancel not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateAppointment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id } = req.params;
  const {
    title,
    notes,
    patient,
    provider,
    providerName,
    ApptStatus,
    new_start_dt,
    new_end_dt,
    old_start_dt,
  } = req.body.data;

  try {
    let $sql = `update user_calendar
    set status='${ApptStatus}'`;

    if (title && title !== undefined) {
      $sql += `, title='${title}'`;
    }
    if (provider && provider.id) {
      $sql += `, user_id=${provider.id}`;
    }

    if (notes && notes !== undefined) {
      $sql += `, notes='${notes}'`;
    }
    if (patient && patient.id) {
      $sql += `, patient_id=${patient.id}`;
    }
    if (new_start_dt) {
      $sql += `, start_dt='${new_start_dt}'`;
    }
    if (new_end_dt) {
      $sql += `, end_dt='${new_end_dt}'`;
    }
    if (ApptStatus === "D") {
      $sql += `, declined=now(), declined_user_id=${req.user_id}`;
    }
    if (ApptStatus === "A") {
      $sql += `, approved=now(), approved_user_id=${req.user_id}`;
    }
    $sql += `, updated=now(), updated_user_id='${req.user_id}'
    where id=$1 RETURNING id`;

    const updateResponse = await db.query($sql, [id]);
    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    if (patient && patient.email) {
      let emailTemplate;
      if (ApptStatus === "D") {
        emailTemplate = cancelAppointmentTemplate(
          patient,
          moment(old_start_dt).format("YYYY-MM-DD HH:mm:ss"),
          providerName
        );
      } else {
        emailTemplate = updateAppointmentTemplate(
          patient,
          moment(old_start_dt).format("YYYY-MM-DD HH:mm:ss"),
          providerName,
          moment(new_start_dt).format("YYYY-MM-DD HH:mm:ss")
        );
      }
      // Call to send email notifcation
      sendEmailOnAppointmentCreationAndChange(
        emailTemplate,
        "Email for update appointment has bees sent!"
      );
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

const getAppointmentRequest = async (req, res) => {
  const { providerId } = req.params;
  try {
    const dbResponse = await db.query(
      `select uc.id, uc.client_id, at.appointment_type, uc.start_dt, uc.end_dt, concat(p.firstname, ' ', p.lastname) "name",
       uc.title, uc.reschedule, p.id patient_id, p.email patient_email
        from user_calendar uc
        join patient p on p.id=uc.patient_id
        left join appointment_type at on at.id=uc.appointment_type_id
        where uc.client_id=${req.client_id}
        and uc.user_id=$1
        and uc.status='R' /*R=Requested*/
        order by uc.created
        limit 2
      `, [providerId]
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

const getUnreadMessages = async (req, res) => {
  const { providerId } = req.params;
  try {
    const dbResponse = await db.query(
      `select m.id, m.created, m.unread_notify_dt, p.id patient_id, concat(p.firstname, ' ', p.lastname) AS name, m.message
        from message m
        left join patient p on p.id=m.patient_id_to
        where m.client_id=${req.client_id}
        and m.user_id_from=$1
        and m.read_dt is null
        and m.unread_notify_dt<=CURRENT_DATE
        order by m.unread_notify_dt
      `, [providerId]
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

const getProviders = async (req, res) => {
  console.log('req - 1 - -----', req);
  try {
    const dbResponse = await db.query(
      `/*Users card at upper right*/
      select u.id, concat(u.firstname, ' ', u.lastname) "name", u.timezone, d.count, d.dt
      from users u
      left join (
        select d.user_id, sum(d.count) count, min(d.dt) dt from (
        /*Patient Labs*/
        select l.user_id user_id, count(l.id) count, min(l.created) dt
        from lab l
        where l.client_id=${req.client_id}
        and l.status='R' /*R=Requested*/
        group by l.user_id
        union
        /*Messages from Patients*/
        select m.user_id_to user_id, count(m.id) count, min(m.created) dt
        from message m
        where client_id=${req.client_id}
        and m.status='O' /*O=Open*/
        group by m.user_id_to
        union
        /*Messages Unread By Patients*/
        select m.user_id_from user_id, count(m.id) count, min(m.unread_notify_dt) dt
        from message m
        where m.client_id=${req.client_id}
        and m.read_dt is null
        and m.unread_notify_dt<=current_date
        group by m.user_id_from
        union
        /*Patient Appointment Requests*/
        select uc.user_id user_id, count(uc.client_id) count, min(uc.created) dt
        from user_calendar uc
        where uc.client_id=${req.client_id}
        and uc.status='R' /*R=Requested*/
        group by uc.user_id
        ) d
        where d.user_id is not null
        group by d.user_id
      ) d on d.user_id=u.id
      where u.client_id=${req.client_id}
      /*and u.status='A'*/
      order by name
      limit 100
      `
    );
    if (!dbResponse) {
      errorMessage.message = "None found";
      console.log('req - 2 - -----', res.status(status.notfound).send(errorMessage));

      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    console.log('req - 3 - -----', res.status(status.created).send(successMessage));
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    console.log('req - 4 - -----', res.status(status.error).send(errorMessage));
    return res.status(status.error).send(errorMessage);
  }
};

const getProviderDetails = async (req, res) => {
  const { providerId } = req.params;
  try {
    const patientLabs = await db.query(
      `select count(l.id), min(l.created)
        from lab l
        where l.client_id=${req.client_id}
        and l.user_id=$1
        and l.status='R' /*R=Requested*/
        /*and (l.pend_dt is null or l.pend_dt<=current_date)*/
      `, [providerId]
    );
    const messageFromPatients = await db.query(
      `select count(m.id), min(m.created)
        from message m
        where m.client_id=${req.client_id}
        and m.user_id_to=$1
        and m.status='O' /*O=Open*/
        /*and (m.pend_dt is null or m.pend_dt<=current_date)*/
      `, [providerId]
    );
    const messageToPatientsNotRead = await db.query(
      `select count(m.id), min(m.unread_notify_dt)
        from message m
        where m.client_id=${req.client_id}
        and m.user_id_from=$1
        and m.read_dt is null
        and m.unread_notify_dt<=current_date
      `, [providerId]
    );

    const patientAppointmentRequest = await db.query(
      `select count(uc.client_id), min(uc.created)
        from user_calendar uc
        where uc.client_id=${req.client_id}
        and uc.user_id=$1
        and uc.status='R' /*R=Requested*/
      `, [providerId]
    );

    if (!patientLabs) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = {
      patientLabs: patientLabs.rows[0],
      messageFromPatients: messageFromPatients.rows[0],
      messageToPatientsNotRead: messageToPatientsNotRead.rows[0],
      patientAppointmentRequest: patientAppointmentRequest.rows[0],
    };
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const appointmentTypes = {
  getAll,
  getAppointmentHistory,
  getEventsByProvider,
  createAppointment,
  cancelAppointment,
  updateAppointment,
  getProviders,
  getProviderDetails,
  getAppointmentRequest,
  getUnreadMessages,
};

module.exports = appointmentTypes;
