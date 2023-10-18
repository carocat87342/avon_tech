const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllergy = async (req, res) => {
  let { client_id, patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }

  if (typeof client_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    client_id = req.client_id;
  }

  try {
    const $sql = `select pa.created, d.name
    from patient_allergy pa
    left join drug d on d.id=pa.drug_id
    where pa.client_id=${client_id}
    and pa.patient_id=${patient_id}
    order by d.name
    limit 100`;

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

const Allergy = {
  getAllergy,
};

module.exports = Allergy;
