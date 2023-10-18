const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getReportFinanceDetail = async (req, res) => {
  try {
    const dbResponse = await db.query(`select t.dt, tt.name, t.amount, e.title encounter_title, t.note, t.patient_id hyperlink
    , concat(p.firstname, ' ', p.lastname) patient_name, t.created
    from tran t
    left join tran_type tt on tt.id=t.type_id
    left join patient p on p.id=t.patient_id
    left join encounter e on e.id=t.encounter_id
    where t.client_id=${req.client_id}
    and t.dt>='${req.query.dateFrom}'
    and t.dt<='${req.query.dateTo}'
    order by t.dt desc
    limit 100`);

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

const reportFinanceDetail = {
  getReportFinanceDetail,
};
module.exports = reportFinanceDetail;
