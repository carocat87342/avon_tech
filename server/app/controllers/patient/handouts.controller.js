const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllHandouts = async (req, res) => {
  let { client_id, patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }

  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
  }

  let $sql;

  try {
    $sql = `select ph.created, ph.handout_id, h.filename, concat(u.firstname, ' ', u.lastname) created_by
    from patient_handout ph
    left join handout h on h.id=ph.handout_id
    left join users u on u.id=ph.created_user_id
    where ph.client_id=$1
    and ph.patient_id=$2
    order by h.filename
    limit 100`;

    const dbResponse = await db.query($sql, [client_id, patient_id]);

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

const Handouts = {
  getAllHandouts,
};

module.exports = Handouts;
