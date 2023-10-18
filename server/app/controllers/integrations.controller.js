const { validationResult } = require("express-validator");
const moment = require('moment');
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getIntegrations = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select id, labcorp_api_key, quest_api_key, doctors_data_username, doctors_data_password, stripe_api_key
      from client
      where id=${req.client_id}`
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

const update = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const { labcorp_api_key, quest_api_key, doctors_data_username, doctors_data_password, stripe_api_key} = req.body.data;

  try {
    const updateResponse = await db.query(
      `update client set labcorp_api_key=$1, quest_api_key=$2, doctors_data_username=$3, doctors_data_password=$4,
       stripe_api_key=$5, updated=$6, updated_user_id=$7 where id=$8 RETURNING id`,
      [labcorp_api_key, quest_api_key, doctors_data_username, doctors_data_password, stripe_api_key, moment().format('YYYY-MM-DD hh:ss'), req.user_id, req.client_id]
    );

    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = updateResponse.rows;
    successMessage.message = "Update successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const integrations = {
  getIntegrations,
  update,
};

module.exports = integrations;
