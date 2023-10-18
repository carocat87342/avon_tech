const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getFunctionalRange = async (req, res) => {
  let $sql;

  try {
    $sql = `select functional_range
    from client
    where id=${req.client_id}`;

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

const getPageTitle = async (req, res) => {
  const { markerId } = req.params;

  try {
    const dbResponse = await db.query(`select name from marker where id = $1`, [markerId]);

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

const getLabMarkerByLabId = async (req, res) => {
  const { patientId, labId } = req.params;

  try {
    const $sql = `select marker_id
   from lab_marker
   where patient_id=${req.patient_id || patientId}
   and lab_id=$1
   order by line_nbr
   limit 200`;

    const dbResponse = await db.query($sql, [labId]);

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

const getLabMarker = async (req, res) => {
  const { patientId } = req.params;

  try {
    const $sql = `select c.id, c.name from (
    select distinct lc.marker_id
    from lab_marker lc
    where lc.patient_id=${req.patient_id || patientId}
    ) lc
    left join marker c on c.id=lc.marker_id
    order by c.name
    limit 200`;

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

const getTestGraph = async (req, res) => {
  const { patientId, markerId } = req.params;

  try {
    const $sql = `select lc.lab_id, lc.lab_dt, lc.marker_id, lc.value, lc.range_low,
     lc.range_high, lc.unit, l.filename, lc.client_id
    from lab_marker lc
    left join lab l on l.id=lc.lab_id
    where lc.patient_id=${req.patient_id || patientId}
    and lc.marker_id=$1
    order by lc.lab_dt, lc.lab_id
    limit 200`;

    const dbResponse = await db.query($sql, [markerId]);

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

const getConventionalRange = async (req, res) => {
  const { patientId, markerId } = req.params;
  try {
    const $sql = `select lc.lab_id, lc.lab_dt, lc.marker_id, lc.value, lc.range_low, lc.range_high, lc.unit, l.filename, lc.client_id
    from lab_marker lc
    left join lab l on l.id=lc.lab_id
    where lc.patient_id=${req.patient_id || patientId}
    and lc.marker_id=$1 order by lc.lab_dt, lc.lab_id
    limit 200`;

    const dbResponse = await db.query($sql, [markerId]);

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

const testReport = {
  getFunctionalRange,
  getPageTitle,
  getLabMarkerByLabId,
  getLabMarker,
  getTestGraph,
  getConventionalRange,
};

module.exports = testReport;
