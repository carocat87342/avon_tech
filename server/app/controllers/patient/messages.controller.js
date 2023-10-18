const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getAllMessages = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    patient_id = req.user_id;
  }
  let $sql;

  try {
    $sql = `select m.id, m.user_id_to, m.user_id_from, m.patient_id_from, m.patient_id_to, m.created
    , concat(u.firstname, ' ', u.lastname) user_to_from
    , concat(u2.firstname, ' ', u2.lastname) user_to_name
    , concat(p.firstname, ' ', p.lastname) patient_to_from
    , concat(p2.firstname, ' ', p2.lastname) patient_to_name
    , m.message
    from message m
    left join users u on u.id=m.user_id_from
    left join users u2 on u2.id=m.user_id_to
    left join patient p on p.id=m.patient_id_from
    left join patient p2 on p2.id=m.patient_id_to
    where (patient_id_from=$1 or patient_id_to=$2)
    order by m.created desc
    limit 50`;

    const dbResponse = await db.query($sql, [patient_id, patient_id]);

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

const getUsers = async (req, res) => {
  try {
    const $sql = `select u.id, u.firstname, u.lastname
      from users u
      where u.client_id=${req.client_id}
      order by u.firstname
      limit 100`;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createMessage = async (req, res) => {
  const formData = req.body.data;
  try {
    const insertResponse = await db.query(
      `insert into message(message, user_id_to, patient_id_from, status, client_id, created, created_user_id) 
      VALUES($1, ${req.user_id}, ${req.user_id}, $2, ${req.client_id}, now(), ${req.user_id}) RETURNING id`,
       [formData.message, formData.status]
    );
    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const updateMessage = async (req, res) => {
  const { messageId } = req.params;
  const {user_id_to, message, msgStatus} = req.body.data;

  try {
    const updateResponse = await db.query(`UPDATE message SET user_id_to=$1, message=$2, status=$3,
     updated=now(), updated_user_id=${req.user_id} WHERE id=$4 RETURNING id`,
     [user_id_to, message, msgStatus, messageId]
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

const deleteMessage = async (req, res) => {
  const { messageId } = req.params;
  try {
    await db.query(`delete from message_history where id=$1`, [messageId]);
    const deleteResponse = await db.query(`delete from message where id=$1 RETURNING id`, [messageId]);

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

const getSingleMessage = async (req, res) => {

  let $sql;
  try {
    $sql = `select cp.id, cp.header
      from client_portal cp
      where cp.id =${req.client_id}`;

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

const Messages = {
  getAllMessages,
  getUsers,
  createMessage,
  updateMessage,
  deleteMessage,
  getSingleMessage,
};

module.exports = Messages;
