const db = require("../db");
const { status } = require("../helpers/status");

const getDatabaseStatus = async (_, res) => {
  try {
    const databaseStatus = await db.query("select now()");
    res.status(status.success).json(databaseStatus.rows[0].now);
  } catch (err) {
    res.status(status.error).send('Database status error');
  }
};

module.exports = {
  getDatabaseStatus,
};