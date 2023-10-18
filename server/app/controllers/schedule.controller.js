const { validationResult } = require("express-validator");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAllUser = async (req, res) => {
  try {
    const dbResponse = await db.query(`select u.id, u.firstname, u.lastname
        from users u
        where u.client_id=${req.client_id}
        /*and u.status='A'
        and u.appointments=true*/
        order by u.firstname
        limit 100`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.error(error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const search = async (req, res) => {
  const { userId } = req.body.data;
  let $sql;
  try {
    $sql = `select us.id, us.user_id, concat(u.firstname, ' ', u.lastname) AS user_name, u.timezone, us.start_date_time,
    us.end_date_time, us.monday, us.tuesday, us.wednesday, us.thursday, us.friday, us.active, us.created,
    concat(u2.firstname, ' ', u2.lastname) AS created_name, us.updated, concat(u3.firstname, ' ', u3.lastname) AS updated_name
    from user_schedule us
    left join users u on u.id=us.user_id
    left join users u2 on u2.id=us.created_user_id
    left join users u3 on u3.id=us.updated_user_id
    where us.client_id=${req.client_id} \n`;
    if (userId) {
      $sql += `and us.user_id=${userId} \n`;
    }
    $sql += `limit 500`;

    const dbResponse = await db.query($sql);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.error(error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createNewSchedule = async (req, res) => {

  let {user_id} = req.body.data;
  const {start_date_time, end_date_time, log_tz, active, note, monday, tuesday, wednesday, thursday, friday} = req.body.data;
  user_id = user_id || req.user_id;

  try {
    const dbResponse = await db.query(
      `insert into user_schedule(user_id, client_id, start_date_time, end_date_time, log_tz, active, note, monday, tuesday, wednesday, thursday, friday, created, created_user_id) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, now(), ${req.user_id}) RETURNING id`,
      [user_id, req.client_id, start_date_time, end_date_time, log_tz, active, note, monday, tuesday, wednesday, thursday, friday]
    );

    if (!dbResponse.rowCount) {
      errorMessage.message = "Creation not successful";
      res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Creation successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.error(err);
    errorMessage.message = "Creation not not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateSchedule = async (req, res) => {

  const { user_id, monday, tuesday, wednesday, thursday, friday, note } = req.body.data;
  const userId = user_id || req.user_id;
  try {
    const updateResponse = await db.query(
      `UPDATE user_schedule SET client_id=${req.client_id}, user_id=$1, monday=$2, tuesday=$3, wednesday=$4, thursday=$5, friday=$6, note=$7,
       updated=now(), updated_user_id=${req.user_id} WHERE id=$8 RETURNING id`,
      [userId, monday, tuesday, wednesday, thursday, friday, note, req.params.id]
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

const deleteSchedule = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  try {
    const deleteResponse = await db.query(`delete from user_schedule where id=$1 RETURNING id`, [req.params.id]);

    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deleteResponse.rows;
    successMessage.message = "Deletion successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.error(error);
    errorMessage.message = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const schedule = {
  getAllUser,
  search,
  createNewSchedule,
  updateSchedule,
  deleteSchedule,
};
module.exports = schedule;
