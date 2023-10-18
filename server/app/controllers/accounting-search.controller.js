const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select id, name
       from tran_type tt
       where (client_id is null or client_id=${req.client_id})
       order by 1
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

const search = async (req, res) => {
  const { amount1, amount2, dateFrom, dateTo, typeID } = req.body.data;
  let $sql;

  try {
    $sql = `select t.dt, tt.name, t.amount, e.title encounter_title, t.note, t.patient_id, concat(u.firstname, ' ', u.lastname) patient_name, t.created, t.client_id
      from tran t
      left join tran_type tt on tt.id=t.type_id
      left join users u on u.id=t.patient_id
      left join encounter e on e.id=t.encounter_id
      where t.client_id=${req.client_id} \n`;
    if (amount1) {
      $sql += `and abs(t.amount) >= ${amount1} \n`;
    }
    if (amount2) {
      $sql += `and abs(t.amount) <= ${amount2} \n`;
    }
    if (dateFrom) {
      $sql += `and t.dt >= '${dateFrom}' \n`;
    }
    if (dateTo) {
      $sql += `and t.dt <= '${dateTo}' \n`;
    }
    if (typeID) {
      $sql += `and t.type_id = ${typeID} \n`;
    }
    $sql += `order by t.dt desc \n`;
    $sql += `limit 100 \n`;

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

const appointmentTypes = {
  getAll,
  search,
};

module.exports = appointmentTypes;
