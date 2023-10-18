const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllencounters = async (req, res) => {
  let { patient_id } = req.query;
  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  let $sql;

  try {
    $sql = `select e.dt, concat(u.firstname, ' ', u.lastname) user_from, concat(p.firstname, ' ', p.lastname) patient_to, e.treatment
    from encounter e
    left join patient p on p.id=e.patient_id
    left join users u on u.id=e.user_id
    where e.patient_id=$1
    order by e.dt desc
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

const updateEncounter = async (req, res) => {
  const { encounterId } = req.params;

  try {
    const $sql = `update encounter
    set read_dt=now(), updated=now(), updated_user_id=${req.user_id}
    where client_id=${req.client_id}
    and patient_id=${req.user_id}
    and read_dt is null and id=$1 RETURNING id`;

    const updateResponse = await db.query($sql, [encounterId]);

    if (!updateResponse.rowCount) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse.rows;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Encounter = {
  getAllencounters,
  updateEncounter,
};

module.exports = Encounter;
