const fs = require("fs");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const backup = async (req, res) => {
  const { client_id } = req.params;
  let $sql;

  try {
    $sql = `select
        id,
        client_id,
        user_id,
        status,
        firstname,
        middlename,
        lastname,
        preferred_name,
        address,
        address2,
        city,
        state,
        postal,
        country,
        phone_home,
        phone_cell,
        phone_work,
        phone_other,
        phone_note,
        email,
        dob,
        ssn,
        gender,
        emergency_firstname,
        emergency_middlename,
        emergency_lastname,
        emergency_relationship,
        emergency_email,
        emergency_phone,
        insurance_name,
        insurance_group,
        insurance_member,
        insurance_phone,
        insurance_desc,
        login_dt,
        primary_reason,
        admin_note,
        medical_note,
        referred_by,
        height,
        waist,
        weight,
        pharmacy_id,
        pharmacy2_id,
        created,
        created_user_id,
        updated,
        updated_user_id
        from patient
        where client_id=$1 order by 1`;

    const dbResponse = await db.query($sql, [client_id]);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    fs.writeFile("result.txt", JSON.stringify(dbResponse.rows[0]), (err) => {
      if (err) throw err;
      console.log("File successfully written to disk");
    });
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Setup = {
  backup,
};

module.exports = Setup;
