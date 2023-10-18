const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getLabBilling = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  let $sql;
  try {
    $sql = `select t.id, t.dt, t.amount, pc.lab_completed_dt, LEFT(ARRAY_TO_STRING(array_agg(c.name order by c.name), ','), 400) tests
    from tranc t
    left join tranc_detail td on td.tranc_id = t.id
    left join proc c on c.id = td.proc_id
    left join patient_proc pc on pc.tranc_id = t.id
    where t.patient_id = $1
    group by t.id, t.dt, t.amount, pc.lab_completed_dt
    order by t.dt desc
    `;

    const dbResponse = await db.query($sql, [patient_id]);

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

const labBilling = {
  getLabBilling
};

module.exports = labBilling;
