const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../../../config");
const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

/**
 * This function let Corporate user to signin into the system.
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
exports.signin = async (req, res) => {
  const { email } = req.body;
  const queryResponse = await db.query(`select id, admin, firstname, lastname, password from users where email=$1 and client_id is null`, [email]);

  const user = queryResponse.rows[0];
  if (!user) {
    errorMessage.message = "User not found";
    errorMessage.user = user;
    return res.status(status.notfound).send(errorMessage);
  }

  const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

  if (!isPasswordValid) {
    errorMessage.message = "Wrong password!";
    errorMessage.user = user;
    return res.status(status.unauthorized).send(errorMessage);
  }

  const token = jwt.sign(
    { id: user.id, role: "CORPORATE" },
    config.authSecret,
    {
      expiresIn: 86400, // 24 hours
    }
  );

  const resData = {};
  resData.accessToken = token;
  delete user.password; // delete password from response
  resData.user = user;
  if (user.admin) {
    resData.user.permissions = ["ADMIN"];
  }
  resData.user.role = "CORPORATE";
  resData.user.login_url = `/login_corp`;
  successMessage.data = resData;
  res.status(status.success).send(successMessage);
};
