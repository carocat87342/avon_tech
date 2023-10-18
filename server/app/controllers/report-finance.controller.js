const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAll = async (req, res) => {
  const { from, to } = req.query;
  try {
    const dbResponse = await db.query(
      `select extract(year from dt) as year, extract(month from dt) as month
      , sum(amount) Total
      , sum(case when type_id=1 then amount end) Service
      , sum(case when type_id=2 then amount end) Credit
      , sum(case when type_id=3 then amount end) Payment
      , sum(case when type_id=4 then amount end) Refund
      from tran
      where client_id=${req.client_id}
      and dt between '${from}' and '${to}'
      group by (extract (year from dt), extract (month from dt))
      order by (extract (year from dt), extract (month from dt))
      limit 100`
    )

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

const reportFinance = {
  getAll,
};

module.exports = reportFinance;
