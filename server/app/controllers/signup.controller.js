const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");
const { signupPDF } = require("../helpers/signupPDF");

/**
 * This function validate the records value in database.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.fieldValiate = async (req, res) => {
  if (!req.body.fieldName && !req.body.value) {
    errorMessage.message = "body content must be provided!";
    return res.status(status.error).send(errorMessage);
  }
  let tableName = "client"; // By default let if look into client table
  if (req.body.target) {
    tableName = req.body.target;
  }
  try {
    const selectResponse = await db.query(
      `SELECT id, ${req.body.fieldName} FROM ${tableName} WHERE ${req.body.fieldName} = $1`,
      [req.body.value]
    );
    if (selectResponse.rows.length > 0) {
      errorMessage.message = {
        value: req.body.value,
        msg: `${req.body.value} already taken.`,
        param: `${tableName}.${req.body.fieldName}`,
      };
      return res.status(status.bad).send(errorMessage);
    }
    successMessage.message = {
      value: req.body.value,
      msg: `${req.body.value} can be used.`,
      param: `${tableName}.${req.body.fieldName}`,
    };
    res.status(status.success).send(successMessage);
  } catch (error) {
    return res.status(status.notfound).send(JSON.stringify(error));
  }
};

/**
 * This function let client and user to signup into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signup = async (req, res) => {
  const pgClient = await db.getClient();
  await pgClient.query('BEGIN')
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }

  const { client } = req.body;
  client.created = new Date();
  client.calendar_start_time = "8:00";
  client.calendar_end_time = "18:00";
  client.functional_range = true;

  const { user } = req.body;
  user.password = bcrypt.hashSync(user.password, 8);

  const existingClientRows = await pgClient.query(
    `SELECT 1 FROM client WHERE name=$1 OR phone=$2  OR fax=$3 OR website=$4 OR email=$5 OR ein=$6 OR npi=$7 OR code=$8 LIMIT 1`,
    [client.name, client.phone, client.fax, client.website, client.email, client.ein, client.npi, client.code]
  );

  if (existingClientRows.length > 0) {
    errorMessage.message = [
      {
        value: JSON.stringify(client),
        msg: "Client is already in our system. Try with different values",
        param: "client.body",
      },
    ];
    return res.status(status.error).send(errorMessage);
  }

  const existingUserRows = await pgClient.query(
    `SELECT 1 FROM users WHERE email=$1 OR npi=$2 OR medical_license=$3 LIMIT 1`,
    [user.email, user.npi, user.medical_license]
  );

  if (existingUserRows.length > 0) {
    errorMessage.message =
      "User is already in our system. Try different values";
    return res.status(status.error).send(errorMessage);
  }
  try {
    const clientResponse = await pgClient.query(`INSERT INTO client(name, code, phone, website, calendar_start_time, calendar_end_time, functional_range, created) 
    VALUES ('${client.name}', '${client.code}', '${client.phone}', '${client.website}', '8:00', '18:00', true, now()) RETURNING id`);

    if (!clientResponse.rowCount) {
      errorMessage.message = "Client Cannot be registered";
      res.status(status.notfound).send(errorMessage);
    }

    if (clientResponse.rowCount) {
      user.client_id = clientResponse.rows[0].id; // add user foreign key client_id from clientResponse
      user.admin = 1;
      user.sign_dt = new Date();
      const forwarded = req.headers["x-forwarded-for"];
      const userIP = forwarded
        ? forwarded.split(/, /)[0]
        : req.connection.remoteAddress;
      // TODO: for localhost ::1 might be taken. Need further test
      user.sign_ip_address = userIP;
      const userResponse = await pgClient.query(`INSERT INTO users(firstname, lastname, client_id, email, password, admin, sign_dt, sign_ip_address, created) 
        VALUES ('${user.firstname}', '${user.lastname}', ${clientResponse.rows[0].id}, '${user.email}', '${user.password}', true, now(), '${userIP}', now()) RETURNING id`);
      const clientRows = await pgClient.query(
        "SELECT id, name, email FROM client WHERE id = $1", [clientResponse.rows[0].id]
      );
      const userRows = await pgClient.query(
        "SELECT id, client_id, firstname, lastname, email, sign_ip_address, sign_dt FROM users WHERE id = $1", [userResponse.rows[0].id]
      );
      successMessage.message = "User succesfullly registered!";
      const responseData = {
        user: userRows.rows[0],
        client: clientRows.rows[0],
      };
      // Create contract PDF
      const contractRows = await pgClient.query(
        "SELECT id, contract, created FROM contract WHERE created=(select max(created) from contract)"
      );
      const contractContent = contractRows.rows[0];

      if (process.env.NODE_ENV !== "production") {
        const pdf = await signupPDF(
          contractContent.contract,
          userRows.rows[0],
          clientRows.rows[0]
        );
        if (pdf) {
          await pgClient.query(
            `insert into user_contract (client_id, user_id, contract_id, filename, created) 
              values (${clientResponse.rows[0].id}, ${userResponse.rows[0].id}, ${contractContent.id}, '${pdf.fileName}', now())`
          );
        }
        responseData.contractLink = pdf;
        // end Create contract PDF
      }
      successMessage.data = clientResponse.rows[0].id;
      successMessage.data = responseData;

      // run database procedure to set up basic data for the new Client
      // clientSetup(responseData.user.client_id, responseData.user.id);
      try {
       /* const clientSetupRows = await db.query("CALL clientSetup($1, $2)", [
          responseData.user.client_id,
          responseData.user.id,
        ]); */
        await pgClient.query(
          `insert into appointment_type (client_id,appointment_type,descr,length,fee,allow_patients_schedule,sort_order,active,note,created,created_user_id,updated,updated_user_id)
          select ${responseData.user.client_id}, appointment_type, descr, length, fee, allow_patients_schedule, sort_order, active, note, now(), ${responseData.user.id}, null, null
          from appointment_type
          where client_id=1;`
        );
        await pgClient.query(
          `insert into appointment_type_user
          select ${responseData.user.client_id}, ${responseData.user.id}, appointment_type_id, active, amount, now(), ${responseData.user.id}, null, null
          from appointment_type_user
          where client_id=1;`
        );
        await pgClient.query(
          `insert into client_proc
          select ${responseData.user.client_id}, proc_id, favorite, billable, fee, null, now(), ${responseData.user.id}, null, null
          from client_proc
          where client_id=1;`
        );
        await pgClient.query(
          `insert into client_form (client_id,active,type,title,form,notes,created,created_user_id,updated,updated_user_id)
          select ${responseData.user.client_id}, active, type, title, form, notes, now(), ${responseData.user.id}, null, null
          from client_form
          where client_id=1
          and type='S';`
        );
        await pgClient.query(
          `insert into user_schedule  (client_id,user_id,start_date_time,end_date_time,log_tz,monday,tuesday,wednesday,thursday,friday,active,note,created,created_user_id,updated,updated_user_id)
          select ${responseData.user.client_id}, ${responseData.user.id}, (current_date + interval '9 hour')::date, (current_date + interval '761 hour')::date, log_tz, monday, tuesday, wednesday, thursday, friday, active, null, now(), ${responseData.user.id}, null, null
          from user_schedule
          where client_id=1;`
        );
        await pgClient.query(
          `insert into client_range (client_id,marker_id,seq,compare_item,compare_operator,compare_to,range_low,range_high,created,created_user_id,updated,updated_user_id)
          select ${responseData.user.client_id}, marker_id, seq, compare_item, compare_operator, compare_to, range_low, range_high, now(), ${responseData.user.id}, now(), ${responseData.user.id}
          from client_range where client_id=1;`
        );
        
      } catch (error) {
        console.log("error", error);
      } 

      await pgClient.query('COMMIT')
      res.status(status.created).send(successMessage);
    }  
  } catch (err) {
    // handle the error
    await pgClient.query('ROLLBACK')
    console.log('err:', err)
    errorMessage.message = err.message;
    res.status(status.error).send(errorMessage);
  } finally {
    pgClient.release()
  }
};
