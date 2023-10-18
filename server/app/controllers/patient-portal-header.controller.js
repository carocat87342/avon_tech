const { validationResult } = require("express-validator");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getClientPortalHeader = async (req, res) => {
  try {
    const dbResponse = await db.query(`select cp.id, cp.header, cp.updated, concat(u.firstname, ' ', u.lastname) updated_user
    from client_portal cp
    left join users u on u.id=cp.updated_user_id
    where cp.id=${req.client_id}`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    console.log(error);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const editClientPortalHeader = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.error).send(errorMessage);
  }

  const { header } = req.body.data;

  try {
    const updateResponse = await db.query(
      `update client_portal set header=$1, updated=now(), updated_user_id=${req.user_id} where id=$2 RETURNING id`,
      [header, req.params.id]
    );

    if (!updateResponse.rows) {
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

const clientPortalHeader = {
  getClientPortalHeader,
  editClientPortalHeader,
};

module.exports = clientPortalHeader;
