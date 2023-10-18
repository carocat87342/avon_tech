const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getLabById = async (req, res) => {
  const { labId } = req.params;

  try {
    const dbResponse = await db.query(
      `select l.id, l.filename, l.created, l.status, lab_dt, l.source, lc.name lab_company, concat(p.firstname, ' ', p.lastname) patient_name, p.id patient_id, p.gender, p.dob, l.type, l.note, l.user_id assigned_to, l.note_assign, l.client_id
      from lab l
      left join lab_company lc on lc.id=l.lab_company_id
      left join patient p on p.id=l.patient_id
      where l.id=$1`, [labId]
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

const getAll = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select l.id, l.filename, l.created, l.status, lab_dt, l.source, lc.name lab_company, concat(p.firstname, ' ', p.lastname) patient_name,
        p.id patient_id, p.gender, p.dob, l.type, l.note, l.user_id assigned_to, l.note_assign, l.client_id from lab l
        left join lab_company lc on lc.id=l.lab_company_id
        left join patient p on p.id=l.patient_id
        where l.user_id = ${req.user_id}
        and l.status = 'R'
        order by l.created
        limit 1`
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

const createLab = async (req, res) => {
  const { lab_id } = req.body.data;
  let { type, note_assign } = req.body.data;

  try {
    // Call DB query without assigning into a variable
    if (typeof type === "undefined") {
      type = null;
    }
    if (typeof note_assign === "undefined") {
      note_assign = null;
    }
    await db.query(`insert into lab_history(id, type, note_assign, created, created_user_id) VALUES($1, $2, $3, now(), ${req.user_id})`, [lab_id, type, note_assign]);
    const updateResponse = await db.query(`update lab set type=$1, note_assign=$2, updated=now(), updated_user_id=${req.user_id} where user_id=$3 and id=$4 RETURNING id`,
     [type, note_assign, req.user_id, lab_id]);

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

const updateLabStatus = async (req, res) => {
  const { labId } = req.params;
  const { labStatus } = req.body.data;
  try {
    const $sql = `update lab set status=$1, updated=now(), updated_user_id=${req.user_id} where user_id=${req.user_id} and id=$2 RETURNING id`;
    const updateResponse = await db.query($sql, [labStatus, labId]);

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

const updateLab = async (req, res) => {
  const { labId } = req.params;
  const { type, note, note_assign, user_id, patient_id } = req.body.data;

  try {
    await db.query(`insert into lab_history(id, type, note, note_assign, user_id, patient_id, created, created_user_id) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8)`,
    [labId, type, note, note_assign, user_id, patient_id, moment().format('YYYY-MM-DD hh:ss'), req.user_id]
    );

    const updateResponse = await db.query(`update lab set type=$1, note=$2, note_assign=$3, user_id=$4, patient_id=$5, updated=$6, updated_user_id=$7 where id=$8 RETURNING id`,
     [type, note, note_assign, user_id, patient_id, moment().format('YYYY-MM-DD hh:ss'), req.user_id, labId]
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

const getLabHistory = async (req, res) => {
  const { labId } = req.params;

  try {
    const dbResponse = await db.query(
      `select lh.created
      , concat(u.firstname, ' ', u.lastname) created_by
      , lh.status
      , lh.type
      , concat(u2.firstname, ' ', u2.lastname) assigned_to
      , lh.note_assign assignment_note
      , concat(p.firstname, ' ', p.lastname) patient
      , lh.note
      from lab_history lh
      left join users u on u.id=lh.created_user_id
      left join users u2 on u2.id=lh.user_id
      left join patient p on p.id=lh.patient_id
      where lh.client_id=${req.client_id}
      and lh.id=$1
      order by lh.created desc
      limit 50`, [labId]
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

const getLabUserHistory = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select lh.created, lh.id
      , concat(u.firstname, ' ', u.lastname) created_name
      , concat(u2.firstname, ' ', u2.lastname) assigned_name
      , lh.patient_id, lh.type, lh.note, lh.note_assign, lh.status
      from lab_history lh
      left join users u on u.id=lh.created_user_id
      left join users u2 on u2.id=lh.user_id
      where lh.created_user_id=${req.user_id}
      order by lh.created desc
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

const getLabValues = async (req, res) => {
  const { labId } = req.params;
  try {
    const dbResponse = await db.query(
      `select c.id, c.name, lc.value, lc.range_low, lc.range_high, lc.unit
      from lab_marker lc
      left join marker c on c.id=lc.marker_id
      where lc.lab_id=$1 and lc.client_id=${req.client_id}
      order by lc.line_nbr
      limit 200`, [labId]
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

const getAssignUser = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select concat(firstname, ' ', lastname) AS name, id from users 
      where client_id=${req.client_id} and status<>'D' order by 1 limit 50`
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

const processLab = {
  getAll,
  getLabById,
  createLab,
  updateLab,
  updateLabStatus,
  getLabHistory,
  getLabUserHistory,
  getLabValues,
  getAssignUser,
};

module.exports = processLab;
