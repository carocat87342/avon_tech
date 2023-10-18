const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPharmacy = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }

  try {
   const $sql = `select p.id, p.firstname, p.middlename, p.lastname, p.gender, p.dob, p.ssn, p.preferred_name,
     p.referred_by, p.phone_home, p.phone_cell, p.phone_work, p.email, p.client_id
    , ph.id, ph.name, ph.address, ph.address2, ph.city, ph.state, ph.postal, ph.country, ph.phone, ph.fax
    , ph2.id pharmacy2_id, ph2.name pharmacy2_name, ph2.address pharmacy2_address, ph2.address2 pharmacy2_address2, ph2.city pharmacy2_city,
     ph2.state pharmacy2_state, ph2.postal pharmacy2_postal, ph2.country pharmacy2_country, ph2.phone pharmacy2_phone, ph2.fax pharmacy2_fax
    from patient p
    left join pharmacy ph on ph.id=p.pharmacy_id
    left join pharmacy ph2 on ph2.id=p.pharmacy2_id
    where p.id=$1`;

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

// TODO:: This endpoint might not in use. Need to be checked and removed.
const updatePharmacy = async (req, res) => {
  const { id } = req.params;
  const formData = req.body.data;
  formData.updated = new Date();
  formData.updated_user_id = req.user_id;

  try {
    const updateResponse = await db.query(
      `update patient set $1 where id=$2`,
      [formData, id]
    );

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

const searchPharmacy = async (req, res) => {
  const { text } = req.body.data;
  try {
    const dbResponse = await db.query(
      `select id, name, address, address2, city, state, postal, country, phone, fax
      from pharmacy
      where name ilike '${text}%'
      order by name
      limit 20
      `
    );

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Pharmacy = {
  getPharmacy,
  updatePharmacy,
  searchPharmacy,
};

module.exports = Pharmacy;
