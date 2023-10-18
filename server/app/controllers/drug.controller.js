const { validationResult } = require("express-validator");
const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const search = async (req, res) => {
  const { searchTerm, checkBox } = req.body.data;
  let $sql;

  try {
    $sql = `select d.id, d.name, cd.favorite, cd.updated, concat(u.firstname, ' ', u.lastname) updated_name
      from drug d
      left join client_drug cd on cd.client_id=1
      and cd.drug_id=d.id
      left join users u on u.id=cd.updated_user_id
      where true \n`;
    if (searchTerm) {
      $sql += `and d.name ILIKE '%${searchTerm}%' \n`;
    }
    if (checkBox === true) {
      $sql += `and cd.favorite = true \n`;
    }
    $sql += `order by d.name \n`;
    $sql += `limit 20 \n`;

    const dbResponse = await db.query($sql);

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

const addFavorite = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { drug_id } = req.body.data;

  try {
    const dbResponse = await db.query(
      `insert into client_drug(client_id, drug_id, favorite, created, created_user_id) 
      VALUES(${req.client_id}, $1, true, '${moment().format('YYYY-MM-DD hh:ss')}', ${req.user_id}) RETURNING client_id, drug_id`,
      [drug_id]
    );

    if (!dbResponse) {
      errorMessage.message = "Creation not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    successMessage.message = "Creation successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Creation not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const deleteFavorite = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }
  const { id } = req.params
  try {
    const deleteResponse = await db.query(`delete from client_drug where client_id=${req.client_id} and drug_id=$1 RETURNING client_id, drug_id`, [id]);
    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deleteResponse.rows;
    successMessage.message = "Deletion successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.message = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const drug = {
  search,
  addFavorite,
  deleteFavorite,
};

module.exports = drug;
