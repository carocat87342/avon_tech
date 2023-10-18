const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const deletePatient = async (req, res) => {
  const tables = {
    encounter: "encounter",
    lab: "lab",
    lab_proc: "lab procedure",
    patient_allergy: "patient allergy",
    patient_proc: "patient procedure",
    patient_drug: "patient drug",
    patient_form: "patient form",
    patient_handout: "patient handout",
    patient_icd: "patient icd",
    payment_method: "payment method",
    tran: "transaction",
    user_calendar: "user calendar",
  };

  const { id } = req.params;
  try {
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in tables) {
      // eslint-disable-next-line no-await-in-loop
      const dbResponse = await db.query(
        `select 1
        from ${key}
        where patient_id=${id}
        limit 1`
      );

      if (dbResponse.rows.length > 0) {
        errorMessage.message = `Patient can't be deleted because there is ${tables[key]} data for this patient`;
        return res.status(status.error).send(errorMessage);
      }
      // eslint-disable-next-line no-await-in-loop
      const deleteResponse = await db.query(`delete from patient where id=$1 RETURNING id, client_id`, [id]);

      // eslint-disable-next-line no-await-in-loop
      await db.query(`delete from user_log where patient_id=$1`, [id]);

      // eslint-disable-next-line no-await-in-loop
      await db.query(
        `insert into user_log values (${req.client_id}, ${req.user_id}, now(), null, 'Deleted patient {patient.id} {patient.firstname} {patient.lastname}')`
      );

      if (!deleteResponse.rowCount) {
        errorMessage.message = "Deletion not successful";
        return res.status(status.notfound).send(errorMessage);
      }

      successMessage.data = deleteResponse.rows;
      successMessage.message = "Delete successful";
      return res.status(status.created).send(successMessage);
    }
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const patientDelete = {
  deletePatient,
};

module.exports = patientDelete;
