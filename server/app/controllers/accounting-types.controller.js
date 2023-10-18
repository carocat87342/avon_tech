const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getAccountingTypes = async (req, res) => {
  try {
    const dbResponse = await db.query(`select tt.id, tt.name, tt.amount, tt.note, tt.client_id, tt.status
    , c.name client_name
    , tt.created, concat(u.firstname, ' ', u.lastname) created_user
    , tt.updated, concat(u2.firstname, ' ', u2.lastname) updated_user
    from tran_type tt
    left join users u on u.id=tt.created_user_id
    left join users u2 on u2.id=tt.updated_user_id
    left join client c on c.id=tt.client_id
    where (tt.client_id is null or tt.client_id=${req.client_id})
    order by 1
    limit 100`);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (error) {
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const accountingTypes = {
  getAccountingTypes,
};
module.exports = accountingTypes;
