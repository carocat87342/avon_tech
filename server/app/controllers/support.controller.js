const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getInit = async (req, res) => {
  const { cStatus } = req.query;
  let $sql;
  try {
    $sql = `select s.id, c.name client_name, s.subject, cs.name case_status, s.created,
      concat(u.firstname, ' ', u.lastname) AS created_user, s.updated from support s
      left join client c on c.id=s.client_id
      left join case_status cs on cs.id=s.status_id
      left join users u on u.id=s.created_user_id
      where s.client_id=${req.client_id} \n`;
    if (cStatus) {
      $sql += `and s.status_id='${cStatus}' \n`;
    }
    $sql += `order by s.created desc \n`;
    $sql += `limit 100 \n`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log('err:', err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getStatus = async (req, res) => {
  let $sql;
  try {
    $sql = `select id, name
      from case_status
      order by name desc
      limit 10 \n`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log('err:', err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Support = {
  getInit,
  getStatus,
};

module.exports = Support;
