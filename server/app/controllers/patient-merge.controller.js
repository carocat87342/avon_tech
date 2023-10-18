const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const mergePatient = async (req, res) => {
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

  const { patient_id_to_keep, patient_id_to_delete } = req.body.data;

  try {
    const patientToKeepResponse = await db.query(
      `select id, client_id, firstname, lastname from patient where id=$1`, [patient_id_to_keep]
    );
    const patientToKeep = patientToKeepResponse.rows[0];
    const patientToDeleteResponse = await db.query(
      `select id, client_id, firstname, lastname from patient where id=$1`, [patient_id_to_delete]
    );
    const patientToDelete = patientToDeleteResponse.rows[0];

    if (!patientToKeep || !patientToDelete) {
      errorMessage.message = `We couldn't find both or one of them patient.`;
      return res.status(status.error).send(errorMessage);
    }

    if (patientToKeep.firstname !== patientToDelete.firstname) {
      errorMessage.message = "Firstnames must be the same";
      return res.status(status.error).send(errorMessage);
    }

    if (patientToKeep.lastname !== patientToDelete.lastname) {
      errorMessage.message = "Lastnames must be the same";
      return res.status(status.error).send(errorMessage);
    }

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in tables) {
      // eslint-disable-next-line no-await-in-loop
      await db.query(
        `update ${key} set patient_id=$1 where patient_id=$2 `,
         [patient_id_to_keep, patient_id_to_delete]
      );
    }

    // eslint-disable-next-line no-await-in-loop
    const deleteResponse = await db.query(`delete from patient where id=$1`, [patient_id_to_delete]);

    // eslint-disable-next-line no-await-in-loop
    await db.query(
      `delete from user_log where patient_id=$1 `, [patient_id_to_delete]
    );

    const now = moment().format("YYYY-MM-DD HH:mm:ss");
    // eslint-disable-next-line no-await-in-loop
    db.query(
      `insert into user_log values (${req.client_id}, ${req.user_id}, '${now}', ${patient_id_to_keep}, 'Merged patient keep')`
    );
    db.query(
      `insert into user_log values (${req.client_id}, ${req.user_id}, '${moment(
        now
      )
        .add(1, "s")
        .format(
          "YYYY-MM-DD HH:mm:ss"
        )}', null, 'Merged patient delete ${patient_id_to_delete}')`
    );

    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const patientMerge = {
  mergePatient,
};

module.exports = patientMerge;
