const moment = require("moment");
const db = require("../db");
const { errorMessage, successMessage, status } = require("../helpers/status");

const getEncountersPrescriptions = async (req, res) => {

  try {
    const dbResponse = await db.query(
      `select d.name, d.id, pd.expires, pd.generic, pd.drug_frequency_id, pd.amount, pd.refills, pd.start_dt, pd.patient_instructions, pd.pharmacy_instructions,
      concat(ds.strength, ds.unit) strength, case when ds.form='T' then 'Tablets' end form, pd.created, case when df.drug_id then true end favorite
      from patient_drug pd
      join drug d on d.id=pd.drug_id
      left join client_drug df on df.client_id=${req.client_id}
          and df.drug_id=d.id
      join drug_strength ds on ds.drug_id=d.id and ds.id=pd.drug_strength_id
      where pd.user_id=${req.user_id}
      order by pd.created desc
      limit 20`
    );
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

const getEncountersPrescriptionsFrequencies = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select id, descr
      from drug_frequency
      order by id
      limit 100`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getEncountersPrescriptionsStrength = async (req, res) => {
  const { drug_id } = req.params;
  try {
    const dbResponse = await db.query(`select id, strength, unit, form from drug_strength where drug_id=$1`, [drug_id]);
    if (!dbResponse || dbResponse.rows.length===0) {
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

// TODO:: inComplete code, need to pass drug_id, drug_strength_id
const encountersPrescriptionsEdit = async (req, res) => {
  const { encounter_id } = req.params;
  try {
    const dbResponse = await db.query(
      `select d.name, concat(ds.strength, ds.unit) strength, case when ds.form='T' then 'Tablets' end form
      , df.descr, pd.start_dt, pd.expires, pd.amount, pd.refills
      , pd.generic, pd.patient_instructions, pd.pharmacy_instructions
      from patient_drug pd
      left join drug d on d.id=pd.drug_id
      left join drug_strength ds on ds.drug_id=d.id
        and ds.id=pd.drug_strength_id left join drug_frequency df on df.id=pd.drug_frequency_id
      where pd.encounter_id=$1
      and pd.drug_id=1
      and pd.drug_strength_id=1`, [encounter_id]
    );
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

const encountersRecentProfiles = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select d.name, concat(ds.strength, ds.unit) strength, case when ds.form='T' then 'Tablets' end form, df.descr, pd.expires, pd.amount, pd.refills, pd.generic, pd.patient_instructions, pd.pharmacy_instructions, pd.created last_used_dt, pd.count from (
        select drug_id, drug_strength_id, drug_frequency_id, expires, amount, refills, generic, patient_instructions, pharmacy_instructions, max(created) created, count(*) count
        from patient_drug pd
        where pd.client_id=1
        and pd.drug_id=1
        and pd.encounter_id<>1
        and pd.created > date_sub(now(), interval 90 day)
        group by drug_id, drug_strength_id, drug_frequency_id, expires, amount, refills, generic, patient_instructions, pharmacy_instructions
        ) pd
        left join drug d on d.id=pd.drug_id
        left join drug_strength ds on ds.drug_id=d.id
            and ds.id=pd.drug_strength_id
        left join drug_frequency df on df.id=pd.drug_frequency_id
        order by count desc
        limit 10`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
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

// TODO:: Not in use, need to be refactor in future in needed.
const createEncounter = async (req, res) => {
  const { patient_id } = req.params;
  const formData = req.body.data;
  formData.client_id = req.client_id;
  formData.user_id = req.user_id;
  formData.patient_id = patient_id;
  formData.dt = moment(formData.dt).format("YYYY-MM-DD HH:mm:ss");
  formData.read_dt = moment(formData.read_dt).format("YYYY-MM-DD HH:mm:ss");
  formData.created = new Date();
  formData.created_user_id = req.user_id;

  try {
    const insertResponse = await db.query(`insert into encounter set ?`, [formData]);

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (excepErr) {
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

// TODO:: Not in use, need to be refactor in future in needed.
const updateEncounter = async (req, res) => {
  const { patient_id, id } = req.params;

  const formData = req.body.data;
  formData.dt = moment(formData.dt).format("YYYY-MM-DD HH:mm:ss");
  formData.read_dt = moment(formData.read_dt).format("YYYY-MM-DD HH:mm:ss");
  formData.updated = new Date();
  formData.updated_user_id = req.user_id;

  try {
    const $sql = `update encounter set ? where patient_id=${patient_id} and id=${id}`;
    const updateResponse = await db.query($sql, [formData, patient_id, id]);

    if (!updateResponse.affectedRows) {
      errorMessage.message = "Update not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = updateResponse;
    successMessage.message = "Update successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Update not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const deleteEncounter = async (req, res) => {
  const { id } = req.params;

  try {
    // Call DB query without assigning into a variable
    const deleteResponse = await db.query(`delete from encounter where id=?`, [id]);

    if (!deleteResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = deleteResponse.rows;
    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Delete not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getEncounterTypes = async (req, res) => {
  try {
    const dbResponse = await db.query(
      `select et.id, et.name
      from encounter_type et
      where (et.client_id is null or et.client_id=1)
      order by et.sort_order
      limit 100`
    );
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

const getDiagnoses = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select i.name, concat('(', pi.icd_id, ' ICD-10)') id
      from patient_icd pi
      join icd i on i.id=pi.icd_id
      where pi.encounter_id=$1
      and pi.active=true
      order by i.name
      limit 20`, [encounter_id]
    );
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

const getRecentDiagnoses = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select i.name, concat('(', pi.icd_id, ' ICD-10)') id
      from patient_icd pi
      join icd i on i.id=pi.icd_id
      where pi.encounter_id<>$1
      and pi.user_id=${req.client_id}
      order by pi.created desc
      limit 20`, [encounter_id]
    );
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

const searchDiagnosesICDs = async (req, res) => {
  const { text } = req.body.data;
  try {
    const $sql = `select i.id, i.name, ci.favorite
    from icd i
    left join client_icd ci on ci.client_id=${req.client_id}
        and ci.icd_id=i.id
    where i.name ilike '${text}%'
    order by i.name
    limit 20`;
    const dbResponse = await db.query($sql);

    if (!dbResponse || dbResponse.rows.length===0) {
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

// TODO:: Not in use, need to be refactor in future in needed.
const createNewPrescription = async (req, res) => {
  const { patient_id, encounter_id } = req.params;
  const {
    drug_id,
    drug_frequency_id,
    drug_strength_id,
    start_dt,
    expires,
    amount,
    refills,
    generic,
    patient_instructions,
    pharmacy_instructions,
  } = req.body.data;

  try {
    const insertResponse = await db.query(
      `insert into patient_drug (patient_id, drug_id, drug_frequency_id, drug_strength_id, start_dt, expires, amount, refills, generic,
         patient_instructions, pharmacy_instructions, encounter_id, client_id, user_id, created, created_user_id)
       values (${patient_id}, '${drug_id}', '${drug_frequency_id}', '${drug_strength_id}', '${moment(
        start_dt
      ).format("YYYY-MM-DD HH:mm:ss")}', '${expires}', '${amount}',
       '${refills}', '${generic}', '${patient_instructions}', '${pharmacy_instructions}', ${encounter_id}, ${req.client_id
      }, ${req.user_id}, now(), ${req.user_id})`
    );

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const searchDrugAndType = async (req, res) => {
  const { text } = req.body.data;

  try {
    const dbResponse = await db.query(
      `select d.name, concat(ds.strength, ds.unit) strength, case when ds.form='T' then 'Tablets' end form
      from drug d
      left join drug_strength ds on ds.drug_id=d.id
      where d.name ilike '${text}%'`
    );

    if (!dbResponse || dbResponse.rows.length===0) {
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

const searchDrug = async (req, res) => {
  const { text } = req.body.data;

  try {
    const dbResponse = await db.query(
      `select d.name, d.id, concat(ds.strength, ds.unit) strength
      , case when ds.form='T' then 'Tablets' end form
      , cd.favorite
      from drug d
      left join client_drug cd on cd.client_id=${req.client_id}
      and cd.drug_id=d.id
      left join drug_strength ds on ds.drug_id=d.id
      where d.name ilike '${text}%'
      order by d.name, ds.strength
      limit 50`
    );

    if (!dbResponse || dbResponse.rows.length===0) {
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

const createEncounter_ICD = async (req, res) => {
  const { patient_id, encounter_id } = req.params;
  const { icd_id } = req.body.data;

  try {
    const insertResponse = await db.query(
      `insert into patient_icd (patient_id, icd_id, active, client_id, user_id, encounter_id, created, created_user_id)
       values (${patient_id}, '${icd_id}', true, ${req.client_id}, ${req.user_id}, ${encounter_id}, now(), ${req.user_id}) RETURNING id`
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

const getEncounterPlan = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select type, name, strength, unit from (
        select 1 sort, 'Rx' AS type, d.name, ds.strength, ds.unit
        from patient_drug pd
        left join drug d on d.id=pd.drug_id
        left join drug_strength ds on ds.id=pd.drug_strength_id
        where pd.encounter_id=${encounter_id}
        union
        select 2 sort, 'Lab' AS type, c.name, null, null
        from patient_proc pc
        join proc c on c.id=pc.proc_id
        where pc.encounter_id=${encounter_id}
      ) d
      order by sort
      limit 50`
    );
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

const searchNewPrescriptionDrug = async (req, res) => {
  const { text } = req.body.data;

  try {
    const $sql = `select d.name, concat(ds.strength, ds.unit) strength
    , case when ds.form='T' then 'Tablets' end form
    , cd.favorite
    from drug d
    left join client_drug cd on cd.client_id=${req.client_id}
        and cd.drug_id=d.id
    left join drug_strength ds on ds.drug_id=d.id
    where d.name ilike '${text}%'
    order by d.name, ds.strength
    limit 50`;

    const dbResponse = await db.query($sql);

    if (!dbResponse || dbResponse.rows.length===0) {
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

const getDrugOrder = async (req, res) => {
  const { patient_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select p.id, p.firstname, p.middlename, p.lastname, p.gender, p.dob, p.ssn, p.preferred_name, p.referred_by, p.phone_home, p.phone_cell, p.phone_work, p.email
      , ph.id, ph.name, ph.address, ph.address2, ph.city, ph.state, ph.postal, ph.country, ph.phone, ph.fax
      , ph2.id, ph2.name, ph2.address, ph2.address2, ph2.city, ph2.state, ph2.postal, ph2.country, ph2.phone, ph2.fax
      from patient p
      left join pharmacy ph on ph.id=p.pharmacy_id
      left join pharmacy ph2 on ph2.id=p.pharmacy2_id
      where p.id=${patient_id}`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getDrugOrderPrescriptions = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select d.name
      , concat(ds.strength, ds.unit) strength
      , case when ds.form='T' then 'Tablets' end form
      from patient_drug pd
      join drug d on d.id=pd.drug_id
      join drug_strength ds on ds.id=pd.drug_strength_id
      where encounter_id=${encounter_id}
      order by d.name
      limit 100`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getNewLabDiagnoses = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select i.name
      from patient_icd pi
      join icd i on i.id=pi.icd_id
      left join patient_proc_exception_icd pcei on pcei.encounter_id=pi.encounter_id
        and pcei.icd_id=pi.icd_id
      where pi.encounter_id=${encounter_id}
      and pi.active=true
      and pcei.icd_id is null
      order by i.name
      limit 100`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
      errorMessage.message = "None found";
      return res.status(status.notfound).send(errorMessage);
    }

    successMessage.data = dbResponse;
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getOrderedTests = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const dbResponse = await db.query(
      `select c.name, c.id
      from patient_proc pc
      join proc c on c.id=pc.proc_id
      where pc.encounter_id=${encounter_id}
      order by c.name
      limit 100`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
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

const deleteOrderedTests = async (req, res) => {
  const { encounter_id } = req.params;
  const { procedure_id } = req.body.data;
  try {
    const deleteOrderTestsResponse = await db.query(
      `delete
      from patient_proc
      where encounter_id=$1
      and proc_id=$2`, [encounter_id, procedure_id]
    );

    if (!deleteOrderTestsResponse.rowCount) {
      errorMessage.message = "Deletion not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = deleteOrderTestsResponse.rows;
    successMessage.message = "Deletion successful";
    return res.status(status.success).send(successMessage);
  } catch (error) {
    console.log("error", error);
    errorMessage.message = "Deletion not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const getNewLabLaboratories = async (req, res) => {

  try {
    const dbResponse = await db.query(
      `select id, name
      from lab_company
      order by name
      limit 100`
    );
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getNewLabFavorites = async (req, res) => {
  const { tab } = req.query;

  try {
    let $sql;

    $sql = `select c.id, lc.name lab_name, c.name, case when cc.proc_id<>'' then true end favorite
    from proc c
    join client_proc cc on cc.client_id=${req.client_id}
        and cc.proc_id=c.id
    left join lab_company lc on lc.id=c.lab_company_id \n`;

    if (tab !== "All") {
      $sql += "where lc.id in (7,8,9) \n";
    }
    $sql += `order by lc.name, c.name limit 50`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getNewLabSearch = async (req, res) => {
  const { text } = req.body.data;
  const { tab } = req.query;

  try {
    let $sql;

    $sql = `select c.id, lc.name lab_name, c.name, case when cc.proc_id<>'' then true end favorite, group_concat(ci.procedure2_id) procedure_items
    from proc c left join client_proc cc on cc.client_id=${req.client_id} and cc.proc_id=c.id
    left join lab_company lc on lc.id=c.lab_company_id
    left join proc_item ci on ci.proc_id=c.id
    where c.type='L' /*L=Lab*/
    and c.name ilike '%${text}%'`;

    if (tab !== "All") {
      $sql += `and lc.id in (7,8,9) \n`;
    }
    $sql += `group by c.id, lc.name, c.name
    order by lc.name, c.name
    limit 20`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getNewLabRequestedLabs = async (req, res) => {

  try {
    const $sql = `select pc.procid, c.name
    from patient_proc pc
    join proc c on c.id=pc.proc_id
    where encounter_id=1
    order by c.name
    limit 100`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getBilling = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const $sql = `select c.id, c.name, t.amount
    from tran t
    join proc c on c.id=t.proc_id
    where t.encounter_id=${encounter_id}
    order by c.name
    limit 100`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getBillingDiagnoses = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const $sql = `select i.name, i.id
    from patient_icd pi
    join icd i on i.id=pi.icd_id
    where pi.encounter_id=${encounter_id}
    and pi.active=true
    order by i.name
    limit 100`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getBillingProcedsures = async (req, res) => {
  const { encounter_id } = req.params;

  try {
    const $sql = `select c.id, c.name, t.amount, cc.fee
    from proc c
    join client_proc cc on cc.proc_id=c.id
    left join tran t on t.encounter_id=${encounter_id} and t.proc_id=cc.proc_id
    where cc.client_id=1
    and cc.billable=true
    order by c.id
    limit 100`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const getBillingPayment = async (req, res) => {
  const { patient_id, encounter_id } = req.params;

  try {
    const $sql = `select t.dt, t.amount, t.payment_type, pm.account_number
    from tran t
    left join payment_method pm on pm.id=t.payment_method_id
    where t.patient_id=${patient_id}
    and t.encounter_id=${encounter_id}
    and t.type_id=3 /*3=Payment*/`;

    const dbResponse = await db.query($sql);
    if (!dbResponse || dbResponse.rows.length===0) {
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

const createBillingPayment = async (req, res) => {
  const { dt, type_id, amount } = req.body.data;
  const { encounter_id, patient_id } = req.params;

  try {
    const insertResponse = await db.query(
      `insert into tran (dt, type_id, amount, encounter_id, client_id, patient_id, created, created_user_id) values
        ('${dt}', ${type_id}, ${amount}, ${encounter_id}, ${req.client_id}, ${patient_id}, now(), ${req.user_id}) RETURNING id`
    );

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    successMessage.data = insertResponse.rows;
    successMessage.message = "Insert successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log(err);
    errorMessage.message = "Insert not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const patientEncounter = {
  getEncountersPrescriptions,
  getEncountersPrescriptionsFrequencies,
  getEncountersPrescriptionsStrength,
  encountersPrescriptionsEdit,
  encountersRecentProfiles,
  createEncounter,
  updateEncounter,
  deleteEncounter,
  getEncounterTypes,
  getDiagnoses,
  getRecentDiagnoses,
  searchDiagnosesICDs,
  searchDrugAndType,
  createNewPrescription,
  searchDrug,
  createEncounter_ICD,
  getEncounterPlan,
  searchNewPrescriptionDrug,
  getDrugOrder,
  getDrugOrderPrescriptions,
  getNewLabDiagnoses,
  getOrderedTests,
  deleteOrderedTests,
  getNewLabLaboratories,
  getNewLabFavorites,
  getNewLabSearch,
  getNewLabRequestedLabs,
  getBilling,
  getBillingDiagnoses,
  getBillingProcedsures,
  getBillingPayment,
  createBillingPayment,
};

module.exports = patientEncounter;
