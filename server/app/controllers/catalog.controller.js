const { validationResult } = require("express-validator");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const searchCatalog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errorMessage.message = errors.array();
    return res.status(status.bad).send(errorMessage);
  }
  const { text, labCompanyId } = req.body.data;
  try {
    let $sql = `select p.id proc_id, lc.id lab_id, lc.name lab_name, p.name proc_name, p.price
      , ARRAY_TO_STRING(ARRAY_AGG('"' || q.id || '","' || q.name || '"' order by q.name), ',') detail
      from proc p 
      left join lab_company lc on lc.id=p.lab_company_id
      left join proc_item pi on pi.proc_id=p.id
      left join quest q on pi.quest_id=q.id
      where p.type='L'
      and p.name ilike '%${text}%'`;

    if (labCompanyId) {
      $sql += `and lc.id in (${labCompanyId}) \n`;
    }

    $sql += ` group by p.id, lc.id, lc.name, p.name, p.price
    order by lc.name, p.name 
    limit 20
    `;

    const dbResponse = await db.query($sql);

    if (!dbResponse) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse.rows;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err)
    errorMessage.message = "Search not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const Catalog = {
  searchCatalog,
};

module.exports = Catalog;
