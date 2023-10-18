const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getClientRanges = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select cr.id, cr.marker_id, c.name marker_name, cr.seq, cr.compare_item, cr.compare_operator,
     cr.compare_to, cr.range_low, cr.range_high
    , cr.created, concat(u.firstname, ' ', u.lastname) created_user, cr.updated
    , concat(u2.firstname, ' ', u2.lastname) updated_user 
    from client_range cr
    left join marker c on c.id=cr.marker_id
    left join users u on u.id=cr.created_user_id
    left join users u2 on u2.id=cr.updated_user_id
    where cr.client_id=${req.client_id}
    order by c.name, cr.seq`);

    if (!dbResponse.rowCount) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log("error:", error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const deleteClientRange = async (req, res) => {
  const { id } = req.params;
  const { marker_name } = req.body.data;
  try {
    const deleteResponse = await db.query(`delete from client_range where id=$1 RETURNING id`, [id]);

    await db.query(
      `insert into user_log values (${req.client_id}, ${req.user_id}, now(), null, 'Deleted marker range ${marker_name}')`
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

const resetClientRange = async (req, res) => {
  try {
    await db.query(`delete from client_range where client_id=${req.client_id}`);
    const insertResponse = await db.query(`insert into client_range
      select null, ${req.client_id}, marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high, now(), ${req.user_id}, now(), ${req.user_id}
      from client_range 
      where client_id=1 RETURNING id`);
    await db.query(
      `insert into user_log values (${req.client_id}, ${req.user_id}, now(), null, 'Reset all custom marker ranges')`
    );

    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateClientRange = async (req, res) => {
  const { id } = req.params;
  const {marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high} = req.body.data;
  try {
    const updateResponse = await db.query(`update client_range set marker_id=$1, seq=$2, compare_item=$3, compare_operator=$4, compare_to=$5,
     range_low=$6, range_high=$7, updated=now(), updated_user_id=${req.user_id} where id=$8 RETURNING id`,
      [marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high, id]);

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

const getClientRange = async (req, res) => {
  const { marker_id, seq, compare_item, compare_operator, compare_to } = req.query;
  try {
    const dbResponse = await db.query(`
      select cr.marker_id, c.name marker_name, cr.seq, cr.compare_item, cr.compare_operator, cr.compare_to, cr.range_low, cr.range_high
      , cr.created, concat(u.firstname, ' ', u.lastname) created_user
      , cr.updated, concat(u2.firstname, ' ', u2.lastname) updated_user
      from client_range cr
      left join marker c on c.id=cr.marker_id
      left join users u on u.id=cr.created_user_id
      left join users u2 on u2.id=cr.updated_user_id
      where cr.client_id=${req.client_id}
      and cr.marker_id=$1
      and cr.seq=$2
      and cr.compare_item=$3
      and cr.compare_operator=$4
      and cr.compare_to=$5`,
      [marker_id, seq, compare_item, compare_operator, compare_to]
    );

    if (!dbResponse.rowCount) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log("error:", error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createClientRange = async (req, res) => {

const { marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high } = req.body.data;
  try {
    const insertResponse = await db.query(
      `insert into client_range(client_id, marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high, created, created_user_id) 
      VALUES(${req.client_id}, $1, $2, $3, $4, $5, $6, $7, now(), ${req.user_id}) RETURNING id, client_id`,
      [marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high]
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

const searchTests = async (req, res) => {
  const { query } = req.query;
  let $sql;
  try {
    $sql = `
      select c.id, c.name
      from proc c
      where c.type='L'
      and c.name like '%${query}%'
      order by c.name
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

const testReport = {
  getClientRanges,
  deleteClientRange,
  resetClientRange,
  updateClientRange,
  getClientRange,
  createClientRange,
  searchTests,
};

module.exports = testReport;
