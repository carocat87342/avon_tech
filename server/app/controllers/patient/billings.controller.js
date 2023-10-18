const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getBillings = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  let $sql;
  try {
    $sql = `select t.encounter_id, t.dt, tt.name tran_type, pm.type payment_type, pm.account_number, t.amount
    from tran t
    left join tran_type tt on tt.id=t.type_id
    left join payment_method pm on pm.id=t.payment_method_id
    /*left join encounter e on e.id=t.encounter_id
    left join encounter_type et on et.id=e.type_id*/
    where t.patient_id=$1
    order by t.dt desc
    limit 100`;

    const dbResponse = await db.query($sql, [patient_id]);

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

const getBalance = async (req, res) => {
  let { patient_id } = req.query;
  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  try {
    const dbResponse = await db.query(
      `select sum(t.amount) amount
       from tran t
       where t.patient_id=$1
      `, [patient_id]
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

const createBilling = async (req, res) => {

  const { dt, type_id, amount, note, payment_method_id } = req.body.data;
  let { payment_type } = req.body.data;


  if (!payment_type) {
    payment_type = null;
  } else {
    payment_type = `'${payment_type}'`;
  }

  try {

    const insertResponse = await db.query(
      `INSERT INTO tran (dt, type_id, amount, note, payment_method_id, client_id, created, created_user_id) 
      VALUES ($1, $2, $3, $4, $5, ${req.client_id}, now(), ${req.user_id}) RETURNING id`,
        [dt, type_id, amount, note, payment_method_id]
    );

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Billing = {
  getBillings,
  createBilling,
  getBalance,
};

module.exports = Billing;
