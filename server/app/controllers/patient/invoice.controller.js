const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getInvoice = async (req, res) => {

  let $sql;
  try {
    $sql = `select c.name, lc.name, c.price, t.id
    from patient_proc pc
    join proc c on c.id=pc.proc_id
    join lab_company lc on lc.id=c.lab_company_id
    left join tran t on t.patient_id=pc.patient_id
        and t.encounter_id=pc.encounter_id
        and t.proc_id=pc.proc_id
    where pc.encounter_id=1`;

    const dbResponse = await db.query($sql);

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

const Invoices = {
  getInvoice,
};

module.exports = Invoices;
