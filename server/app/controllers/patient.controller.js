const Stripe = require("stripe");
const multer = require("multer");
const moment = require("moment");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const { validationResult } = require("express-validator");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = `${process.env.UPLOAD_DIR}/patient`;
    // eslint-disable-next-line prefer-arrow-callback
    fs.access(dest, function (error) {
      if (error) {
        console.log("Directory does not exist.");
        return fs.mkdir(dest, (err) => cb(err, dest));
      }
      console.log("Directory exists.");
      return cb(null, dest);
    });
  },
  filename: (req, file, cb) => {
    const fileName = `pid${req.body.patient_id}_${file.originalname
      .split(" ")
      .join("-")}`;
    cb(null, fileName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    if (file.originalname.startsWith("pid")) {
      return cb(new Error("File name should not start with pid"));
    }
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "text/plain" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Allowed only image, .pdf and text"));
    }
  },
});

const getPatient = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select p.firstname, p.middlename, p.lastname, p.gender, p.dob, p.ssn, p.preferred_name, p.referred_by, p.phone_home, p.phone_cell, p.phone_work, p.phone_other, p.phone_note, p.email, concat(u.firstname, ' ', u.lastname) AS provider, p.client_id
        , p.admin_note, p.medical_note, p.address, p.address2, p.country, p.city, p.postal, p.state, p.emergency_firstname, p.emergency_middlename, p.emergency_lastname, p.emergency_relationship, p.emergency_email, p.stripe_customer_id,
        p.emergency_phone, p.insurance_name, p.insurance_group, p.insurance_member, p.insurance_phone, p.insurance_desc, p.height, p.waist, p.weight, p.medical_note, p.pharmacy_id, p.pharmacy2_id
        from patient p
        left join users u on u.id=p.user_id
        where p.client_id=${req.client_id}
        and p.id=$1`, [patient_id]
    );

    // Call DB query without assigning into a variable
    await db.query(`insert into user_log values (1, 1, now(), 1, null)`);

    const functionalRange = await db.query(`select functional_range from client where id=${req.client_id}`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    const resData = { ...dbResponse.rows[0], functional_range: functionalRange.rows[0] };
    successMessage.data = resData;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createPatient = async (req, res) => {
  const formData = req.body.data;
  formData.created = new Date();
  formData.created_user_id = req.user_id;
  formData.client_id = req.client_id;

  let { password } = req.body.data;
  const { firstname, middlename, lastname, phone_home, phone_cell,
  phone_work, phone_other, phone_note, email, dob, gender, ssn, postal, address, address2, city,
  insurance_name, insurance_group, insurance_member, insurance_phone, insurance_desc } = req.body.data;


  if (password && password !== "") {
    password = bcrypt.hashSync(password, 8);
  }

  try {
    const insertResponse = await db.query(`insert into patient(firstname, middlename, lastname, status, phone_home, phone_cell,
      phone_work, phone_other, phone_note, email, dob, gender, ssn, password, postal, address, address2, city,
      insurance_name, insurance_group, insurance_member, insurance_phone, insurance_desc, client_id, created, created_user_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26) RETURNING id`,
       [firstname, middlename, lastname, req.body.data.status, phone_home, phone_cell,
        phone_work, phone_other, phone_note, email, dob, gender, ssn, password, postal, address, address2, city,
        insurance_name, insurance_group, insurance_member, insurance_phone, insurance_desc, req.client_id, moment().format('YYYY-MM-DD hh:ss'), req.user_id]);

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

const updatePatient = async (req, res) => {
  const { patient_id } = req.params;
  const {
    firstname,
    middlename,
    lastname,
    preferred_name,
    email,
    gender,
    dob,
    ssn,
    referred_by,
    phone_home,
    phone_cell,
    phone_work,
    phone_other,
    phone_note,
    admin_note,
    medical_note,
    address,
    address2,
    city,
    postal,
    country,
    state,
    emergency_firstname,
    emergency_middlename,
    emergency_lastname,
    emergency_relationship,
    emergency_email,
    emergency_phone,
    insurance_name,
    insurance_group,
    insurance_member,
    insurance_phone,
    insurance_desc,
    height,
    waist,
    weight,
    pharmacy_id,
    pharmacy2_id,
  } = req.body.data;

  try {
    let $sql;

    $sql = `update patient set firstname='${firstname}', lastname='${lastname}', email='${email}' `;

    if (middlename && typeof middlename !== "undefined") {
      $sql += `, middlename='${middlename}'`;
    }
    if (preferred_name && typeof preferred_name !== "undefined") {
      $sql += `, preferred_name='${preferred_name}'`;
    }
    if (gender && typeof gender !== "undefined") {
      $sql += `, gender='${gender}'`;
    }
    if (dob && typeof dob !== "undefined") {
      $sql += `, dob='${moment(dob).format("YYYY-MM-DD")}'`;
    }
    if (ssn && typeof ssn !== "undefined") {
      $sql += `, ssn='${ssn}'`;
    }
    if (referred_by && typeof referred_by !== "undefined") {
      $sql += `, referred_by='${referred_by}'`;
    }
    if (phone_home && typeof phone_home !== "undefined") {
      $sql += `, phone_home='${phone_home}'`;
    }
    if (phone_cell && typeof phone_cell !== "undefined") {
      $sql += `, phone_cell='${phone_cell}'`;
    }
    if (phone_work && typeof phone_work !== "undefined") {
      $sql += `, phone_work='${phone_work}'`;
    }
    if (phone_other && typeof phone_other !== "undefined") {
      $sql += `, phone_other='${phone_other}'`;
    }
    if (phone_note && typeof phone_note !== "undefined") {
      $sql += `, phone_note='${phone_note}'`;
    }
    if (admin_note && typeof admin_note !== "undefined") {
      $sql += `, admin_note='${admin_note}'`;
    }
    if (medical_note && typeof medical_note !== "undefined") {
      $sql += `, medical_note='${medical_note}'`;
    }
    if (address && typeof address !== "undefined") {
      $sql += `, address='${address}'`;
    }
    if (address2 && typeof address2 !== "undefined") {
      $sql += `, address2='${address2}'`;
    }
    if (city && typeof city !== "undefined") {
      $sql += `, city='${city}'`;
    }
    if (postal && typeof postal !== "undefined") {
      $sql += `, postal='${postal}'`;
    }
    if (country && typeof country !== "undefined") {
      $sql += `, country='${country}'`;
    }
    if (state && typeof state !== "undefined") {
      $sql += `, state='${state}'`;
    }
    if (emergency_firstname && typeof emergency_firstname !== "undefined") {
      $sql += `, emergency_firstname='${emergency_firstname}'`;
    }
    if (emergency_middlename && typeof emergency_middlename !== "undefined") {
      $sql += `, emergency_middlename='${emergency_middlename}'`;
    }
    if (emergency_lastname && typeof emergency_lastname !== "undefined") {
      $sql += `, emergency_lastname='${emergency_lastname}'`;
    }
    if (
      emergency_relationship &&
      typeof emergency_relationship !== "undefined"
    ) {
      $sql += `, emergency_relationship='${emergency_relationship}'`;
    }
    if (emergency_email && typeof emergency_email !== "undefined") {
      $sql += `, emergency_email='${emergency_email}'`;
    }
    if (emergency_phone && typeof emergency_phone !== "undefined") {
      $sql += `, emergency_phone='${emergency_phone}'`;
    }
    if (insurance_name && typeof insurance_name !== "undefined") {
      $sql += `, insurance_name='${insurance_name}'`;
    }
    if (insurance_group && typeof insurance_group !== "undefined") {
      $sql += `, insurance_group='${insurance_group}'`;
    }
    if (insurance_member && typeof insurance_member !== "undefined") {
      $sql += `, insurance_member='${insurance_member}'`;
    }
    if (insurance_phone && typeof insurance_phone !== "undefined") {
      $sql += `, insurance_phone='${insurance_phone}'`;
    }
    if (insurance_desc && typeof insurance_desc !== "undefined") {
      $sql += `, insurance_desc='${insurance_desc}'`;
    }
    if (height && typeof height !== "undefined") {
      $sql += `, height='${height}'`;
    }
    if (waist && typeof waist !== "undefined") {
      $sql += `, waist='${waist}'`;
    }
    if (weight && typeof weight !== "undefined") {
      $sql += `, weight='${weight}'`;
    }
    if (pharmacy_id && typeof pharmacy_id !== "undefined") {
      $sql += `, pharmacy_id='${pharmacy_id}'`;
    }
    if (pharmacy2_id && typeof pharmacy2_id !== "undefined") {
      $sql += `, pharmacy2_id='${pharmacy2_id}'`;
    }
    $sql += `, updated='${moment().format("YYYY-MM-DD HH:mm:ss")}',
      updated_user_id=${req.user_id}
      where id=${patient_id} RETURNING id`;

    const updateResponse = await db.query($sql);
    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.error).send(errorMessage);
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

const search = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id } = req.params;
  const { text } = req.body.data;

  try {
    const dbResponse = await db.query(
      `select 'Encounter', id, dt, notes, client_id
        from encounter
        where patient_id=${patient_id}
        and notes ILIKE '%${text}%'
        union
        select 'Message', id, created, message, client_id
        from message
        where (patient_id_to=${patient_id} or patient_id_from=${patient_id})
        and message ILIKE '%${text}%'
        union
        select 'Admin Note', id, created, admin_note, client_id
        from patient
        where id=${patient_id}
        and admin_note ILIKE '%${text}%'
        union
        select 'Medical Note', id, created, medical_note, client_id
        from patient
        where id=${patient_id}
        and medical_note ILIKE '%${text}%'
        union
        select 'Lab Note', id, created, note, client_id
        from lab
        where patient_id=${patient_id}
        and note ILIKE '%${text}%'
        union
        select 'Lab Assignment Note', id, created, note_assign, client_id
        from lab
        where patient_id=${patient_id}
        and note_assign ILIKE '%${text}%'
        order by 1,2,3
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
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const history = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select
        ph.created
        ,concat(u.firstname, ' ', u.lastname) created_user
        ,concat(u2.firstname, ' ', u2.lastname) provider
        ,ph.firstname
        ,ph.middlename
        ,ph.lastname
        ,ph.preferred_name
        ,ph.address
        ,ph.address2
        ,ph.city
        ,ph.state
        ,ph.postal
        ,ph.country
        ,ph.phone_cell
        ,ph.phone_home
        ,ph.phone_work
        ,ph.phone_other
        ,ph.phone_note
        ,ph.email
        ,ph.dob
        ,ph.ssn
        ,ph.gender
        ,ph.emergency_firstname
        ,ph.emergency_middlename
        ,ph.emergency_lastname
        ,ph.emergency_relationship
        ,ph.emergency_email
        ,ph.emergency_phone
        ,ph.insurance_name
        ,ph.insurance_group
        ,ph.insurance_member
        ,ph.insurance_phone
        ,ph.insurance_desc
        ,ph.admin_note
        ,ph.medical_note
        from patient_history ph
        left join users u on u.id=ph.created_user_id
        left join users u2 on u2.id=ph.user_id
        where ph.id=${patient_id}
        order by ph.created desc
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

const getAppointmenthistory = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select concat(p.firstname, ' ', p.lastname) patient, concat(u2.firstname, ' ', u2.lastname) provider,
       uc.start_dt, uc.end_dt, uc.status , uc.updated, concat(u.firstname, ' ', u.lastname) updated_by from user_calendar uc
       left join patient p on p.id=uc.patient_id left join users u on u.id=uc.updated_user_id
       left join users u2 on u2.id=uc.user_id where uc.patient_id=${patient_id}
       order by uc.start_dt desc limit 40`
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

const nextAppointment = async (req, res) => {
  const { patient_id } = req.params;
  const now = moment().format("YYYY-MM-DD HH:mm:ss");
  try {
    const dbResponse = await db.query(
      `select
        min(start_dt) start_dt
        from user_calendar
        where patient_id=${patient_id}
        and start_dt>'${now}'
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

const balance = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select sum(t.amount) amount from tran t
        where t.patient_id=$1`, [patient_id]
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

const AdminNotehistory = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.admin_note, concat(u.firstname, ' ', u.lastname) AS name
        from patient_history ph
        left join users u on u.id=ph.created_user_id
        where ph.id=$1 and ph.admin_note is not null
        order by ph.created desc
        limit 50`, [patient_id]);

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

const adminNoteupdate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { admin_note, old_admin_note } = req.body.data;
  const { patient_id } = req.params;

  try {
    // Call DB query without assigning into a variable
    await db.query(
      `insert into patient_history (id, admin_note, created, created_user_id) values (${patient_id}, '${old_admin_note}', now(), ${req.user_id})`
    );
    const updateResponse = await db.query(`update patient set admin_note=$1 where id=$2 RETURNING id`, [admin_note, patient_id]);

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

const getForms = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select pf.form_id, pf.created, cf.title, pf.form
        from patient_form pf
        left join client_form cf on cf.id=pf.form_id
        where pf.client_id=${req.client_id}
        and pf.patient_id=$1
        order by pf.created
      `, [patient_id]
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getFormById = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id, patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select pf.form_id, pf.created, cf.title, pf.form
        from patient_form pf
        left join client_form cf on cf.id=pf.form_id
        where pf.patient_id=$1 and pf.form_id=$2`,
      [patient_id, id]);

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

const searchHandouts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text } = req.body.data;

  try {
    const dbResponse = await db.query(
      `select id, filename, created
        from handout
        where filename ILIKE '%${text}%'
        order by filename
        limit 100`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const handouts = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.handout_id, h.filename
        from patient_handout ph
        left join handout h on h.id=ph.handout_id
        where ph.client_id=${req.client_id}
        and ph.patient_id=$1
        order by h.filename
        limit 100`, [patient_id]
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

const handoutDelete = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id, patient_id } = req.params;

  try {
    const deleteResponse = await db.query(
      `delete from patient_handout where patient_id=$1 and handout_id=$2`,
      [patient_id, id]
    );

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

const CreatePatientHandouts = async (req, res) => {
  const { patient_id } = req.params;
  const {handout_id} = req.body.data;

  try {
    const insertResponse = await db.query(`insert into patient_handout(patient_id, client_id, handout_id, created, created_user_id)
    VALUES(${patient_id}, ${req.client_id}, ${handout_id}, now(), ${req.user_id}) RETURNING patient_id, handout_id`);

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

const patientHandouts = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select h.id, h.filename, h.created, concat(u.firstname, ' ', u.lastname) AS name
        from handout h
        left join patient_handout ph on h.id=ph.handout_id
        left join users u on u.id=ph.created_user_id
        where h.client_id=${req.client_id}
        order by h.filename
        limit 100`
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

const DeletePatientHandouts = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id, handout_id } = req.params;

  try {
    const dbResponse = await db.query(
      `delete from patient_handout where patient_id=$1 and handout_id=$2`,
      [patient_id, handout_id]
    );

    if (!dbResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getTranType = async (req, res) => {
  try {
    const dbResponse = await db.query(`select id, name, amount, note, status from tran_type`);

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

const getBilling = async (req, res) => {
  const { patient_id } = req.params;
  let { limit } = req.query;
  if (typeof limit === "undefined") {
    limit = 100;
  }
  try {
    const dbResponse = await db.query(
      `select t.id, t.dt, t.amount, tt.name tran_type, e.title encounter_title, t.note, pm.type payment_type, pm.account_number
        from tran t
        left join encounter e on e.id=t.encounter_id
        left join tran_type tt on tt.id=t.type_id
        left join payment_method pm on pm.id=t.payment_method_id
        where t.client_id=${req.client_id}
        and t.patient_id=$1
        order by t.dt desc
        limit ${limit}`, [patient_id]
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

const updateBilling = async (req, res) => {
  const { patient_id, id } = req.params;
  const { type_id, amount, note } = req.body.data;

  try {
    const updateResponse = await db.query(`update tran set dt=now(), type_id=$1, amount=$2, note=$3,
     updated='${moment().format('YYYY-MM-DD hh:ss')}', updated_user_id=${req.user_id} where patient_id=$4 and id=$5 RETURNING id`, [type_id, amount, note, patient_id, id]
    );

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

const deleteBilling = async (req, res) => {
  const { patient_id, id } = req.params;
  try {
    const deleteResponse = await db.query(`delete from tran where patient_id=$1 and id=$2`, [patient_id, id]);

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

const getBillingTransactionTypes = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select id, name
      from tran_type tt
      where (client_id is null or client_id=${req.client_id})
      order by 1
      limit 100`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getBillingPaymentOptions = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select id, type, account_number, exp, stripe_payment_method_token, created
      from payment_method
      where patient_id=$1 and (status is null or status <> 'D')
      order by 1`, [patient_id]
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

const searchBilling = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text } = req.body.data;

  try {
    const dbResponse = await db.query(
      `select p.id, p.name, cp.billable favorite_billing, p.price proc_price, cp.fee client_fee
        from proc p
        left join client_proc cp on cp.proc_id = p.id
        and cp.billable=True
        and cp.client_id=${req.client_id}
        where p.name ILIKE '%${text}%'
        order by p.name desc
        limit 20`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};


const getBillingFavorites = async (req, res) => {
  // const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select p.id, p.name, cp.billable favorite_billing, p.price proc_price, cp.fee client_fee
      from client_proc cp
      join proc p on p.id = cp.proc_id
      where cp.client_id=${req.client_id}
      and cp.billable=True
      order by p.name
      limit 20`
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

const getBillingRecents = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select p.id, p.name, cp.billable favorite_billing, p.price proc_price, cp.fee client_fee
      from tran t
      join proc p on p.id = t.proc_id
      left join client_proc cp on cp.proc_id = t.proc_id
      and cp.billable=True
      and cp.client_id=${req.client_id}
      where t.client_id=${req.client_id}
      order by t.dt desc
      limit 10`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.error('err:', err)
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createNewBilling = async (req, res) => {
  const { patient_id } = req.params;
  const { amount, proc_id, type_id, note } = req.body.data;

  try {
    const insertResponse = await db.query(`insert into tran(amount, proc_id, type_id, note, dt, patient_id, client_id, created, created_user_id)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
    [amount, proc_id, type_id, note, moment().format('YYYY-MM-DD hh:ss'), patient_id, req.client_id, moment().format('YYYY-MM-DD hh:ss'), req.user_id]);

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

const createBilling = async (req, res) => {
  const { patient_id } = req.params;
  const { type_id } = req.body.data;

  let { amount } = req.body.data;
  const { stripe_payment_method_token, customer_id, note, payment_method_id } = req.body.data;

  const $sql = `select p.id, c.name, c.stripe_api_key from patient p
    left join client c on c.id=p.client_id where p.id=$1`;

  const getStripeResponse = await db.query($sql, [patient_id]);

  let pp_status;
  let pp_return;
  // transaction type 3 'Payment' and 3 'Payment refund' goes to stripe
  if (type_id === 3 || type_id === 4) {
    const stripe = Stripe(getStripeResponse.rows[0].stripe_api_key);
    const intentData = {
      payment_method: stripe_payment_method_token,
      customer: customer_id,
      description: `${note}; patient_id: ${patient_id}`,
      amount: Number(amount) * 100, // it accepts cents
      currency: "usd",
      confirmation_method: "manual",
      confirm: true,
    };
    const intent = await stripe.paymentIntents.create(intentData);
    if (intent.status === "succeeded") {
      pp_status = 1;
      pp_return = JSON.stringify(intent);
    } else {
      console.log("error:", intent);
      pp_status = -1;
      pp_return = JSON.stringify(intent);
    }
  }

  // transaction type 2 'Service Credit' and 3 'Payment' are stored in the database as negative numbers, david march 2021
  if (type_id === 2 || type_id === 3) {
    // Change for localdatabase
    amount *= -1;
  }

  try {
    const insertResponse = await db.query(`insert into tran(dt, type_id, payment_method_id, amount, note, patient_id, client_id, pp_status, pp_return)
    VALUES (now(), $1, $2, $3, $4, $5, ${req.client_id}, $6, $7) RETURNING id`, [type_id, payment_method_id, amount, note, patient_id, pp_status, pp_return]);

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

const getAllergies = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select pa.created, pa.drug_id, d.name
        from patient_allergy pa
        left join drug d on d.id=pa.drug_id
        where pa.client_id=${req.client_id}
        and pa.patient_id=$1
        order by d.name
        limit 100`,
      [patient_id]);

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

const deleteAllergy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id, drug_id } = req.params;

  try {
    const dbResponse = await db.query(`delete from patient_allergy where patient_id=$1 and drug_id=$2 RETURNING patient_id, drug_id`, [patient_id, drug_id]);

    if (!dbResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const searchAllergies = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text } = req.body.data;

  try {
    const dbResponse = await db.query(
      `select d.id, d.name
        from drug d
        where d.name like '%${text}%'
        order by d.name
        limit 15`
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createPatientAllergy = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { patient_id } = req.params;
  const { drug_id } = req.body.data;


  try {
    const selectQueryRes = await db.query(`select 1 from patient_allergy where drug_id=$1`, [drug_id]);
    if (selectQueryRes.rows.length > 0) {
      errorMessage.message = "This patient allergy already exists.";
      return res.status(status.notfound).send(errorMessage);
    }
    const insertResponse = await db.query(`insert into patient_allergy(drug_id, patient_id, client_id, created, created_user_id)
    VALUES($1, $2, $3, now(), ${req.user_id}) RETURNING drug_id`, [drug_id, patient_id, req.client_id]);

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

const getDocuments = async (req, res) => {
  const { patient_id } = req.params;
  try {
   const $sql = `select l.id, l.created, l.filename, right(l.filename,3) filetype, l.status, l.type, l.lab_dt, l.physician, l.note
      , ARRAY_TO_STRING(ARRAY_AGG('"' || lc.marker_id || '","' || c.name || '","' || lc.value || '","' || lc.range_low || '","' || lc.range_high  || '"' order by c.name), ',') tests
      from lab l
      left join lab_marker lc on lc.lab_id=l.id
      left join marker c on c.id=lc.marker_id
      where l.client_id=${req.client_id}
      and l.patient_id=${patient_id}
      group by l.id, l.created, l.filename, right(l.filename,3), l.status, l.lab_dt, l.physician, l.note
      order by l.created desc
      limit 200
      `;

    const dbResponse = await db.query($sql);
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

const updateDocuments = async (req, res) => {
  if (!req.body.data) {
    errorMessage.message = "Body content can not be empty";
    return res.status(status.error).send(errorMessage);
  }
  const { id } = req.params;
  const { type } = req.body.data;

  try {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    let $sql = `update lab set status='${type}'`;
    if (type === "D") {
      $sql += `, deleted_dt='${now}', `;
    } else if (type === "A") {
      $sql += `, deleted_dt=null, `;
    }

    $sql += `updated=now(), updated_user_id=${req.user_id} where id=$1 RETURNING id`;

    const updateResponse = await db.query($sql, [id]);

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

const checkDocument = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(`select 1 from lab where patient_id=$1 and filename=filename limit 1`, [patient_id]);
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

const documentUpload = upload.single("file");

const removeFile = (file) => {
  fs.unlink(file.path, (err) => {
    if (err) {
      console.error('unlink error:', err);
    }
    console.log(file.path, "removed successfully!");
  });
};

const createDocuments = async (req, res) => {
  documentUpload(req, res, async (err) => {
    if (err) {
      console.log("documentUpload Error:", err.message);
      errorMessage.message = err.message;
      return res.status(status.error).send(errorMessage);
    }
    if (!req.file) {
      errorMessage.message = "File content can not be empty!";
      return res.status(status.error).send(errorMessage);
    }

    const { patient_id } = req.params;
    const uploadedFilename = req.file.originalname;
    try {
      const existingLabDocument = await db.query(
        `select 1
        from lab
        where patient_id=${patient_id}
        and filename='${uploadedFilename}'
        limit 1`
      );

      if (existingLabDocument.rows.length > 0) {
        removeFile(req.file);
        errorMessage.message = "Same file is already in our database system!";
        return res.status(status.error).send(errorMessage);
      }

      const insertResponse = await db.query(
        `insert into lab (client_id, user_id, patient_id, filename, source, status, created, created_user_id) values
          (${req.client_id}, ${req.user_id}, ${patient_id}, '${uploadedFilename}', 'U', 'R', now(), ${req.user_id}) RETURNING id`
      );

      if (!insertResponse.rowCount) {
        removeFile(req.file);
        errorMessage.message = "Insert not successful";
        return res.status(status.notfound).send(errorMessage);
      }

      // It's limitation of Multer to pass variable to use as filename.
      // Got this idea from https://stackoverflow.com/a/52794573/1960558
      fs.renameSync(
        req.file.path,
        req.file.path.replace("undefined", patient_id)
      );

      successMessage.data = insertResponse.rows;
      successMessage.message = "Insert successful";
      return res.status(status.created).send(successMessage);
    } catch (excepErr) {
      console.log('excepErr', excepErr)
      errorMessage.message = "Insert not successful";
      return res.status(status.error).send(errorMessage);
    }
  });
};

const getEncounters = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select e.dt, e.id, e.title, et.name encounter_type, concat(u.firstname, ' ', u.lastname) AS name, notes, treatment
      from encounter e
      left join encounter_type et on et.id=e.type_id
      left join users u on u.id=e.user_id
      where e.patient_id=$1
      order by e.dt desc
      limit 50`, [patient_id]
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

const createEncounter = async (req, res) => {
  const { patient_id } = req.params;
  const { dt, title, notes, treatment, type_id, read_dt } = req.body.data;

  try {
    const insertResponse = await db.query(`insert into encounter(client_id, user_id, patient_id, dt, title, notes, treatment, type_id, read_dt, created, created_user_id )
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
     [req.client_id, req.user_id, patient_id, moment(dt).format("YYYY-MM-DD HH:mm:ss"), title, notes, treatment,
     type_id, moment(read_dt).format("YYYY-MM-DD HH:mm:ss"), moment().format("YYYY-MM-DD HH:mm:ss"), req.user_id]);

    if (!insertResponse.rowCount) {
      removeFile(req.file);
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (excepErr) {
    console.error('excepErr:', excepErr)
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateEncounter = async (req, res) => {
  const { patient_id, id } = req.params;
  const { title, type_id, notes, treatment, dt, read_dt } = req.body.data;

  try {
    const updateResponse = await db.query(`update encounter set title=$1, type_id=$2, notes=$3, treatment=$4, dt=$5, read_dt=$6,
    updated=$7, updated_user_id=$8 where patient_id=$9 and id=$10 RETURNING id`,
     [title, type_id, notes, treatment, dt, read_dt, moment().format('YYYY-MM-DD hh:ss'), req.user_id, patient_id, id]);
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

const deleteEncounter = async (req, res) => {
  const { id } = req.params;

  try {
    // Call DB query without assigning into a variable
    const deleteResponse = await db.query(`delete from encounter where id=$1 RETURNING id`, [id]);

    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getMedicalNotesHistory = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select ph.created, ph.medical_note, concat(u.firstname, ' ', u.lastname) AS name
        from patient_history ph
        left join users u on u.id=ph.created_user_id
        where ph.id=$1
        and ph.medical_note is not null
        order by ph.created desc
        limit 50`, [patient_id]
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

const medicalNotesHistoryUpdate = async (req, res) => {
  const { medical_note, old_medical_note } = req.body.data;
  const { patient_id } = req.params;

  try {
    // Call DB query without assigning into a variable
     await db.query(`insert into patient_history (id, medical_note, created, created_user_id) VALUES ($1, $2, now(), ${req.user_id})`,
     [patient_id, old_medical_note]);
    const updateResponse = await db.query(`update patient set medical_note=$1 where id=$2 RETURNING id`, [medical_note, patient_id]);

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

const getMessages = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select m.id, m.created, m.patient_id_from, m.patient_id_to, m.user_id_from, m.user_id_to
        , concat(u.firstname, ' ', u.lastname) user_to_from
        , concat(u2.firstname, ' ', u2.lastname) user_to_name
        , m.read_dt, m.message
        from message m
        left join users u on u.id=m.user_id_from
        left join users u2 on u2.id=m.user_id_to
        where (patient_id_from=$1 or patient_id_to=$2)
        order by m.created desc
        limit 50`, [patient_id, patient_id]
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
  const { patient_id } = req.params;
  const { message, unread_notify_dt } = req.body.data;

  try {
    const insertResponse = await db.query(`insert into message(client_id, user_id_from, patient_id_to, message, unread_notify_dt, created, created_user_id)
    VALUES(${req.client_id}, ${req.user_id}, $1, $2, $3, now(), ${req.user_id}) RETURNING id`, [patient_id, message, moment(unread_notify_dt).format("YYYY-MM-DD")]);

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
  const formData = req.body.data;
  const { message, unread_notify_dt } = req.body.data;

  formData.unread_notify_dt = moment(formData.unread_notify_dt).format("YYYY-MM-DD");
  formData.updated = new Date();
  formData.updated_user_id = req.user_id;

  try {
    const updateResponse = await db.query(`update message set message=$1, unread_notify_dt=$2,
     updated='${moment(formData.unread_notify_dt).format("YYYY-MM-DD")}', updated_user_id=${req.user_id} where id=$3 RETURNING id`,
     [message, unread_notify_dt, id]
    );

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

const deleteMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { id } = req.params;
  try {
    // Call DB query without assigning into a variable
    await db.query(`delete from message_history where id=$1`, [id]);
    const deleteMsgResponse = await db.query(`delete from message where id=$1 RETURNING id`, [id]);

    if (!deleteMsgResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteMsgResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getAllTests = async (req, res) => {
  const { patient_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select lc.marker_id, c.name, date(lc2.lab_dt) lab_dt, lc2.value, lc2.range_high, lc2.range_low, lc2.unit, lc.count from (
        select lc.marker_id, max(lc2.lab_id) lab_id, count from (
        select marker_id, max(lab_dt) lab_dt, count( * ) count
        from lab_marker
        where patient_id=$1
        group by marker_id
        ) lc
        left join lab_marker lc2 on lc2.marker_id=lc.marker_id and lc2.lab_dt=lc.lab_dt
        group by lc.marker_id, count
        ) lc
        left join lab_marker lc2 on lc2.lab_id=lc.lab_id and lc2.marker_id=lc.marker_id
        left join marker c on c.id=lc2.marker_id
        order by c.name
        limit 500
        `, [patient_id]
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

const getDiagnoses = async (req, res) => {
  const { patient_id } = req.params;
  const { active } = req.query;
  try {
    let $sql;
    $sql = `select pi.created, pi.icd_id, pi.active, i.name
    from patient_icd pi
    left join icd i on i.id=pi.icd_id
    where pi.patient_id=${patient_id}`;
    if (active && typeof active !== "undefined") {
      $sql += ` and pi.active=${active}`;
    }
    $sql += ` order by i.name limit 50`;

    const dbResponse = await db.query($sql);

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

const getRecentDiagnoses = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select i.name, i.id, ci.favorite
      from patient_icd pi
      join icd i on i.id=pi.icd_id
      left join client_icd ci on ci.icd_id=i.id
      where pi.user_id=${req.user_id}
      order by pi.created desc
      limit 20`
    );
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getFavoriteDiagnoses = async (req, res) => {

  try {
    const dbResponse = await db.query(
      `select i.name, i.id, ci.favorite
      from icd i
      join client_icd ci on ci.icd_id=i.id
      where ci.client_id=${req.client_id}
      order by i.name
      limit 20`
    );
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const searchTests = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text, company_id } = req.body.data;

  try {
    let $sql = `select c.id marker_id, lc.name lab_name, c.name, case when cc.proc_id is not null then true end favorite
      from proc c
      left join lab_company lc on lc.id=c.lab_company_id
      left join client_proc cc on cc.client_id=${req.client_id}
      and cc.proc_id=c.id
      where c.type='L'
      and c.name ILIKE '%${text}%'
    `;

    if (typeof company_id !== "undefined") {
      $sql += `and lc.id=${company_id} \n`;
    }

    $sql += `order by lc.name, c.name
    limit 30
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getRecentTests = async (req, res) => {

  try {
    const dbResponse = await db.query(
      `select distinct c.id marker_id, lc.name lab_name, c.name, case when cc.proc_id is not null then true end favorite, c.price
      from patient_proc pc
      left join proc c on c.id=pc.proc_id
      left join lab_company lc on lc.id=c.lab_company_id
      left join client_proc cc on cc.client_id=${req.client_id}
        and cc.proc_id=c.id
      where pc.client_id=${req.client_id}
      /* and pc.created > date_sub(current_date, interval 30 day) */
      and pc.created > NOW() - '30 MINUTES'::INTERVAL
      order by lc.name, c.name
      limit 20`
    );
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getFavoriteTests = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select c.id marker_id, lc.name lab_name, c.name, case when cc.proc_id is not null then true end favorite, c.price
      from proc c
      left join lab_company lc on lc.id=c.lab_company_id
      join client_proc cc on cc.client_id=${req.client_id}
      and cc.proc_id=c.id
      where c.type='L'
      order by lc.name, c.name
      limit 20`
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

const updateDiagnose = async (req, res) => {
  const { patient_id, icd_id } = req.params;
  const { is_primary, active, encounter_id} = req.body.data;

  try {
    const updateResponse = await db.query(
      `UPDATE patient_icd SET is_primary=$1, active=$2, encounter_id=$3, updated=$4, updated_user_id=$5 WHERE patient_id=$6 AND icd_id=$7 RETURNING id`,
      [is_primary, active, encounter_id, new Date(), req.user_id, patient_id, icd_id]
    );
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

const deleteDiagnose = async (req, res) => {
  const { patient_id, icd_id } = req.params;
  try {
    const deleteResponse = await db.query(`DELETE FROM patient_icd WHERE patient_id=$1 AND icd_id=$2 RETURNING id`,
      [patient_id, icd_id]
    );

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

const createDiagnoses = async (req, res) => {
  const { patient_id } = req.params;
  const { icd_id } = req.body.data;

  try {
    const insertResponse = await db.query(
      `insert into patient_icd(patient_id, icd_id, active, client_id, user_id, encounter_id, created, created_user_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`, [patient_id, icd_id, true, req.client_id, req.user_id, 1, new Date(), req.user_id]);

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

const getMedications = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select pd.id, pd.start_dt, pd.amount, pd.refills, d.name, ds.strength, ds.unit, df.descr, pd.expires
        , pd.patient_instructions, pd.pharmacy_instructions
        from patient_drug pd
        left join drug d on d.id=pd.drug_id
        left join drug_strength ds on ds.id=pd.drug_strength_id
        left join drug_frequency df on df.id=pd.drug_frequency_id
        where pd.patient_id=$1 order by d.name limit 50`,
      [patient_id]
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

const createMedications = async (req, res) => {
  const { patient_id } = req.params;
  const {drug_id, drug_frequency_id, drug_strength_id, start_dt,
     expires, amount, refills, generic, patient_instructions, pharmacy_instructions} = req.body.data;

  try {
    const insertResponse = await db.query(
      `insert into patient_drug(patient_id, drug_id, drug_frequency_id, drug_strength_id, start_dt, expires,
         amount, refills, generic, patient_instructions, pharmacy_instructions, created, created_user_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING id`,
          [patient_id, drug_id, drug_frequency_id, drug_strength_id, moment(start_dt).format("YYYY-MM-DD"), expires, amount, refills,
          generic, patient_instructions, pharmacy_instructions, moment().format("YYYY-MM-DD hh:ss"), req.user_id]
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

const updateMedications = async (req, res) => {
  const { patient_id, id } = req.params;
  const {drug_id, drug_frequency_id, drug_strength_id, start_dt,
    expires, amount, refills, generic, patient_instructions, pharmacy_instructions} = req.body.data;

  try {
    const updateResponse = await db.query(
      `update patient_drug set patient_id=$1, drug_id=$2, drug_frequency_id=$3, drug_strength_id=$4, start_dt=$5, expires=$6,
         amount=$7, refills=$8, generic=$9, patient_instructions=$10, pharmacy_instructions=$11, updated=$12, updated_user_id=$13 WHERE patient_id=$14 AND id=$15 RETURNING id`,
          [patient_id, drug_id, drug_frequency_id, drug_strength_id, moment(start_dt).format("YYYY-MM-DD"), expires, amount, refills,
         generic, patient_instructions, pharmacy_instructions, new Date(), req.user_id, patient_id, id]
    );

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

const getMedicationById = async (req, res) => {
  const { medication_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select d.id, d.name, ds.id drug_strength_id, ds.strength, ds.unit, ds.form
      , df.descr frequency, pd.start_dt, pd.expires, pd.amount, pd.refills
      , pd.generic, pd.patient_instructions, pd.pharmacy_instructions
      from patient_drug pd
      left join drug d on d.id=pd.drug_id
      left join drug_strength ds on ds.drug_id=pd.drug_id
          and ds.id=pd.drug_strength_id
      left join drug_frequency df on df.id=pd.drug_frequency_id
      where pd.id=$1`, [medication_id]
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

const getMedicationFavorites = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select cd.drug_id, d.name, cd.favorite, pd.start_dt, pd.expires, pd.amount, pd.refills
      , pd.generic, pd.patient_instructions, pd.pharmacy_instructions
      from client_drug cd
      left join patient_drug pd on cd.drug_id=pd.drug_id
      left join drug d on cd.drug_id=d.id
      where cd.client_id=${req.client_id}
      and cd.favorite = true
      order by d.name
      limit 20`
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

const getMedicationRecents = async (req, res) => {

  try {
    const dbResponse = await db.query(
      `select d.id, d.name, ds.id drug_strength_id, ds.strength, ds.unit, ds.form, df.descr frequency, pd.expires, pd.amount, pd.refills, pd.generic, pd.patient_instructions, pd.pharmacy_instructions
      from patient_drug pd
      left join drug d on d.id=pd.drug_id
      left join drug_strength ds on ds.drug_id=pd.drug_id
      and ds.id=pd.drug_strength_id
      left join drug_frequency df on df.id=pd.drug_frequency_id
      where pd.created_user_id=${req.user_id}
      order by pd.created desc
      limit 20
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

const deleteMedications = async (req, res) => {
  const { drug_id } = req.params;
  try {
    const deleteResponse = await db.query(`delete from patient_drug where id= $1 RETURNING id`, [drug_id]);

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

const getRequisitions = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select pc.created, pc.id, c.name marker_name, c.id marker_id, lc.name lab_name
        , t.dt, t.amount, pc.lab_order_received_dt, pc.lab_sample_received_dt, pc.lab_completed_dt
        from patient_proc pc
        left join proc c on c.id=pc.proc_id
        left join lab_company lc on lc.id=c.lab_company_id
        left join tranc t on t.id = pc.tranc_id
        where pc.patient_id=$1
        order by pc.created desc
        limit 500`,
         [patient_id]
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

const createRequisitions = async (req, res) => {
  const { patient_id } = req.params;
  const {marker_id} = req.body.data;

  try {
    const insertResponse = await db.query(`insert into patient_proc (client_id, patient_id, proc_id, created, created_user_id)
    VALUES(${req.client_id}, ${patient_id}, '${marker_id}', now(), ${req.user_id}) RETURNING proc_id`);

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

const deleteRequisitions = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteResponse = await db.query(`delete from patient_proc where id=$1`, [id]);

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

const getLayout = async (req, res) => {
  const { user_id } = req.params;

  try {
    const dbResponse = await db.query(`select * from user_grid where user_id=$1`, [user_id]);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "No Layout found";
    return res.status(status.error).send(errorMessage);
  }
};

const deleteLayout = async (req, res) => {
  const { user_id } = req.params;

  try {
    const dbResponse = await db.query(`delete from user_grid where user_id=$1`, [user_id]);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Error deleting layout";
    return res.status(status.error).send(errorMessage);
  }
};

const createPaymentMethod = async (req, res) => {
  const { patient_id } = req.params;
  // const { type, account_number, exp } = req.body.data;
  const formData = req.body.data;
  formData.client_id = req.client_id;
  formData.created_user_id = req.user_id;
  formData.patient_id = patient_id;
  formData.created = new Date();

  const $sql = `select p.id, c.name, c.stripe_api_key from patient p
  left join client c on c.id=p.client_id
  where p.id=${patient_id}`;

  const getStripeResponse = await db.query($sql);
  try {
    const stripe = Stripe(getStripeResponse.rows[0].stripe_api_key);
    const card = {
      number: formData.account_number,
      exp_month: formData.exp.substring(0, 2),
      exp_year: formData.exp.substring(2, 4),
      cvc: formData.cvc,
    };

    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card,
    });

    formData.stripe_payment_method_token = paymentMethod.id;

    // Attach payment method to a customer
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: formData.customer_id,
    });

    // Attach this payment method to corp account as well.
    const corpStripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    const corpPaymentMethod = await corpStripe.paymentMethods.create({
      type: "card",
      card,
    });
    formData.corp_stripe_payment_method_token = corpPaymentMethod.id;
    formData.account_number = formData.account_number.substring(0, 4);

    delete formData.customer_id; // Delete customer_id as it's not on payment_method table
    const insertResponse = await db.query("insert into payment_method set $1 ", [
      formData,
    ]);

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = err.message;
    return res.status(status.error).send(errorMessage);
  }
};

// TODO:: inComplete but not in use at this moment
const updatePaymentMethod = async (req, res) => {
  const { patient_id, id } = req.params;
  const formData = req.body.data;
  formData.updated = new Date();
  formData.updated_user_id = req.user_id;

  try {
    const $sql = `update payment_method set $1 where patient_id=$2 and id=$3`;
    const updateResponse = await db.query($sql, [formData, patient_id, id]);
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

const deletePaymentMethod = async (req, res) => {
  const { patient_id, id } = req.params;

  try {
    const dbResponse = await db.query(`delete from payment_method where id=$1 and patient_id=$2`, [id, patient_id]);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Error deleting payment method.";
    return res.status(status.error).send(errorMessage);
  }
};

const saveLayout = async (req, res) => {
  const { user_id } = req.params;
  const { layout } = req.body.data;

  try {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    const insertResponse = await db.query(
      `insert into user_grid
      (
        user_id,
        layout,
        created
      ) values
      (
        ${user_id},
        '${layout}',
        '${now}'
      )
      ON CONFLICT (user_id) DO UPDATE SET
        layout='${layout}',
        updated='${now}'
      `
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

const getPaymentMethods = async (req, res) => {

  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select id, type, account_number, exp, stripe_payment_method_token, created
      from payment_method
      where patient_id=$1
      and (status is null or status <> 'D')
      order by 1`, [patient_id]
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.error("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getDrugs = async (req, res) => {
  const { query } = req.query;
  let $sql;
  try {
    $sql = `select id, name
    from drug
    where name ILIKE '${query}%'
    order by name
    limit 10`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.error("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getIcds = async (req, res) => {

  const { query } = req.query;
  let $sql;
  try {
    $sql = `select i.name, i.id, ci.favorite
    from icd i
    left join client_icd ci on ci.icd_id=i.id
    where (i.name ILIKE '%${query}%' or i.id ILIKE '%${query}%')
    order by i.name
    limit 20`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.error("err:", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const appointmentTypes = {
  getPatient,
  createPatient,
  updatePatient,
  search,
  history,
  getAppointmenthistory,
  balance,
  nextAppointment,
  AdminNotehistory,
  adminNoteupdate,
  getForms,
  getFormById,
  searchHandouts,
  handouts,
  handoutDelete,
  CreatePatientHandouts,
  patientHandouts,
  DeletePatientHandouts,
  getTranType,
  getBilling,
  updateBilling,
  deleteBilling,
  getBillingTransactionTypes,
  getBillingPaymentOptions,
  searchBilling,
  getBillingFavorites,
  getBillingRecents,
  createNewBilling,
  createBilling,
  getAllergies,
  deleteAllergy,
  searchAllergies,
  createPatientAllergy,
  getDocuments,
  updateDocuments,
  checkDocument,
  createDocuments,
  getEncounters,
  createEncounter,
  updateEncounter,
  deleteEncounter,
  getMedicalNotesHistory,
  medicalNotesHistoryUpdate,
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
  getAllTests,
  getDiagnoses,
  getRecentDiagnoses,
  getFavoriteDiagnoses,
  searchTests,
  getRecentTests,
  getFavoriteTests,
  deleteDiagnose,
  updateDiagnose,
  createDiagnoses,
  getMedications,
  createMedications,
  updateMedications,
  getMedicationById,
  getMedicationFavorites,
  getMedicationRecents,
  deleteMedications,
  createRequisitions,
  getRequisitions,
  deleteRequisitions,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
  getLayout,
  saveLayout,
  deleteLayout,
  getPaymentMethods,
  getDrugs,
  getIcds,
};

module.exports = appointmentTypes;
