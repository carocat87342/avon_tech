const Stripe = require("stripe");
const moment = require("moment");
const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPurchaseLabs = async (req, res) => {
  try {
    const $sql = `select pc.id patient_procedure_id, c.id procedure_id, c.name procedure_name, c.price, pc.created, lc.name lab_company_name
    from patient_proc pc
    left join tranc t on t.id = pc.tranc_id
    left join proc c on c.id=pc.proc_id
    left join lab_company lc on lc.id=c.lab_company_id
    where pc.patient_id=${req.user_id}
    and pc.tranc_id is null
    order by c.name
    limit 100
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
    errorMessage.message = "Select not successful";
    return res.status(status.error).send(errorMessage);
  }
};

const createPurchaseLabs = async (req, res) => {
  const formData = req.body.data;

  try {
    const stripe = Stripe(process.env.STRIPE_PRIVATE_KEY);

    // if customer_id is null then create a customer
    if (!formData.customer_id) {
      const getPatientDetails = await db.query(
        `select id, email, firstname, lastname, gender from patient where id=${req.user_id}`
      );
      const existingPatient = getPatientDetails.rows[0];

      const customer = await stripe.customers.create({
        email: existingPatient.email,
        name: existingPatient.firstname + existingPatient.lastname,
      });
      formData.customer_id = customer.id;
      // When patient initially signs up, a stripe customer id is created instantly for the doctor.
      // When patient buys a lab, only then is a stripe corp customer id created for the corp (corp means my business), David May 2021.
      await db.query(
        `update patient set corp_stripe_customer_id='${customer.id}' where id=${req.user_id}`
      );
      console.log("customer:", customer);
    }
    // Attach payment method to a customer for client(Doctor) account
    await stripe.paymentMethods.attach(
      formData.corp_stripe_payment_method_token,
      {
        customer: formData.customer_id,
      }
    );

    const intentData = {
      payment_method: formData.corp_stripe_payment_method_token,
      customer: formData.customer_id,
      description: `${JSON.stringify(formData.patient_procedure_ids)}; patient_id: ${req.user_id
        }`,
      amount: Number(formData.amount) * 100, // it accepts cents
      currency: "usd",
      confirmation_method: "manual",
      confirm: true,
    };

    const intent = await stripe.paymentIntents.create(intentData);

    let pp_status = 1;
    let pp_return;
    if (intent.status === "succeeded") {
      pp_return = JSON.stringify(intent);
    } else {
      console.log("error:", intent);
      pp_status = -1;
      pp_return = JSON.stringify(intent);
    }


    const insertResponse = await db.query(`insert into tranc(client_id, patient_id, type_id, dt, created, amount, payment_method_id, pp_status,
      pp_return) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
       [req.client_id, req.user_id, 1, moment().format('YYYY-MM-DD hh:ss'),  moment().format('YYYY-MM-DD hh:ss'), formData.amount * -1,
        formData.payment_method_id, pp_status, pp_return]
      );

    if (!insertResponse.rowCount) {
      errorMessage.message = "Insert not successful";
      return res.status(status.notfound).send(errorMessage);
    }
    const trancId = insertResponse.rows[0].id;

    if (trancId) {
      if (formData.selectedLabs.length > 0) {
        formData.selectedLabs.map(async (lab) => {
          await db.query(`insert into tranc_detail(tranc_id, proc_id, patient_proc_id) VALUES($1, $2, $3)`, [trancId, lab.procedure_id, lab.patient_procedure_id]);
        });
      }

      await db.query(`update patient_proc set tranc_id=${trancId} where id in (${formData.patient_procedure_ids})`);
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

const PurchaseLabs = {
  getPurchaseLabs,
  createPurchaseLabs,
};

module.exports = PurchaseLabs;
