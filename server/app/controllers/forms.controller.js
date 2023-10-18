const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select cf.id, cf.title, cf.notes, cf.active, cf.client_id
        , cf.created
        , concat(u.firstname, ' ', u.lastname) created_user
          , cf.updated
          , concat(u2.firstname, ' ', u2.lastname) updated_user
          from client_form cf
        left join users u on u.id=cf.created_user_id
          left join users u2 on u2.id=cf.updated_user_id
          where cf.client_id=${req.client_id}
          order by cf.title
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

const getSingleForm = async (req, res) => {
  const { id } = req.params;
  try {
    const dbResponse = await db.query(
      `select cf.id, cf.title, cf.notes, cf.active, cf.client_id
        , cf.created
        , concat(u.firstname, ' ', u.lastname) created_user
          , cf.updated
          , concat(u2.firstname, ' ', u2.lastname) updated_user
          from client_form cf
        left join users u on u.id=cf.created_user_id
          left join users u2 on u2.id=cf.updated_user_id
          where cf.client_id=${req.client_id}
          and cf.id=$1
      `, [id]
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

const appointmentTypes = {
  getAll,
  getSingleForm,
};

module.exports = appointmentTypes;
