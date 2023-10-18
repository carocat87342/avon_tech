const jwt = require("jsonwebtoken");

/**
 * `secret` is passwordHash concatenated with user's created,
 * so if someones gets a user token they still need a timestamp to intercept.
 * @param {object} user
 * @returns {string} token
 */
const usePasswordHashToMakeToken = (user) => {
  const passwordHash = user.password;
  const userId = user.id;
  const secret = `${passwordHash}-${user.created}`;
  const token = jwt.sign({ userId }, secret, {
    expiresIn: 3600, // 1 hour
  });
  return token;
};

const passwordReset = {
  usePasswordHashToMakeToken,
};

module.exports = passwordReset;
