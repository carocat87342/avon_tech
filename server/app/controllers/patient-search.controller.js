const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const search = async (req, res) => {
  const {
    firstname,
    lastname,
    phone,
    email,
    id,
    patientStatus,
    createdFrom,
    createdTo,
    appointmentFrom,
    appointmentTo,
    paymentFrom,
    paymentTo,
  } = req.body.data;

  let $sql;

  try {
    $sql = `select distinct p.id, p.firstname, p.middlename, p.lastname, p.city, p.state, p.postal, p.country, p.phone_cell,
     p.phone_home, p.email, p.gender, p.created from patient p \n`;
    if (appointmentFrom || appointmentTo) {
      $sql += `join user_calendar uc on uc.client_id=${req.client_id} and uc.patient_id=p.id \n`;
    }
    if (appointmentFrom) {
      $sql += `  and uc.start_dt >= '${appointmentFrom}' \n`;
    }
    if (appointmentTo) {
      $sql += `  and uc.start_dt <= '${appointmentTo}' \n`;
    }
    if (paymentFrom || paymentTo) {
      $sql += `join tran t on t.client_id=${req.client_id} and t.patient_id=p.id \n`;
    }
    if (paymentFrom) {
      $sql += `  and t.dt >= '${paymentFrom}' \n`;
    }
    if (paymentTo) {
      $sql += `  and t.dt <= '${paymentTo}' \n`;
    }
    $sql += `where p.client_id=${req.client_id} \n`;
    if (firstname) {
      $sql += `and p.firstname like '${firstname}%' \n`;
    }
    if (lastname) {
      $sql += `and p.lastname like '${lastname}%' \n`;
    }
    if (phone) {
      $sql += `and p.phone_home like '${phone}%' \n`;
    }
    if (email) {
      $sql += `and p.email like '${email}%' \n`;
    }
    if (id) {
      $sql += `and p.id = ${id} \n`;
    }
    if (patientStatus) {
      $sql += `and p.status = '${patientStatus}'  \n`;
    }
    if (createdFrom) {
      $sql += `and p.created => '${createdFrom}' \n`;
    }
    if (createdTo) {
      $sql += `and p.created <= '${createdTo}' \n`;
    }
    $sql += `order by p.firstname \n`;
    $sql += `limit 20 \n`;

    const dbResponse = await db.query($sql);
    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const PatientSearch = {
  search,
};

module.exports = PatientSearch;
