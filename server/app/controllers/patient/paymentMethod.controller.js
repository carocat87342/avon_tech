const Stripe = require("stripe");
const db = require("../../db");
const {
  errorMessage,
  successMessage,
  status,
} = require("../../helpers/status");

const getPaymentMethods = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }

  let $sql;
  try {
    $sql = `select id, patient_id, type, account_number, exp, status, stripe_payment_method_token, corp_stripe_payment_method_token,
      client_id, created, created_user_id, updated, updated_user_id
      from payment_method
      where patient_id=$1
      and (status is null or status <> 'D')
      order by id
    `;

    const dbResponse = await db.query($sql, [patient_id]);

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

const createPaymentMethod = async (req, res) => {
  let { patient_id } = req.query;

  if (typeof patient_id === "undefined") {
    // eslint-disable-next-line prefer-destructuring
    patient_id = req.user_id;
  }
  
  const formData = req.body.data;
  formData.client_id = req.client_id;
  formData.patient_id = patient_id;
  formData.created = new Date();

  const $sql = `select p.id, c.name, c.stripe_api_key from patient p
    left join client c on c.id=p.client_id
    where p.id=$1`;

  const getStripeResponse = await db.query($sql, [patient_id]);
  try {
    // Create payment method for client(Doctor) account
    const stripe = Stripe(getStripeResponse.rows[0].stripe_api_key);
    const cardData = {
      type: "card",
      card: {
        number: formData.account_number,
        exp_month: formData.exp.substring(0, 2),
        exp_year: formData.exp.substring(2, 4),
        cvc: formData.cvc,
      },
      billing_details: {
        address: {
          line1: formData.address,
          line2: formData.address2,
          postal_code: formData.postal,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      },
    };

    const paymentMethod = await stripe.paymentMethods.create(cardData);

    formData.stripe_payment_method_token = paymentMethod.id;

    // Attach payment method to a customer for client(Doctor) account
    await stripe.paymentMethods.attach(paymentMethod.id, {
      customer: formData.stripe_customer_id,
    });
    // End Create payment method for client(Doctor) account

    // Attach this Payment method to corp account as well.
    const corpStripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    const corpPaymentMethod = await corpStripe.paymentMethods.create(
      cardData
    );
    formData.corp_stripe_payment_method_token = corpPaymentMethod.id;
    formData.account_number = formData.account_number.substring(0, 4);

    delete formData.stripe_customer_id; // Delete customer_id as it's not on payment_method table
    delete formData.corp_stripe_customer_id; // Delete customer_id as it's not on payment_method table
    delete formData.cvc; // Delete cvc as it's not on payment_method table

    const insertResponse = await db.query(`INSERT INTO payment_method(patient_id, type, account_number, exp, address, address2,
      city, state, postal, country, phone, status, stripe_payment_method_token, corp_stripe_payment_method_token, client_id) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id`, [patient_id, formData.type, formData.account_number, formData.exp, formData.address,
      formData.address2, formData.city, formData.state, formData.postal, formData.country, formData.phone, formData.status, formData.stripe_payment_method_token,
      formData.corp_stripe_payment_method_token, req.client_id]
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
    errorMessage.message = err.message;
    return res.status(status.error).send(errorMessage);
  }
};

const updatePaymentMethod = async (req, res) => {
  const { id } = req.params;
  const formData = req.body.data;
  // formData.updated_user_id = req.user_id; 
  formData.patient_id = req.user_id;
  formData.updated = new Date();

  const $sql = `select p.id, c.name, c.stripe_api_key from patient p
    left join client c on c.id=p.client_id
    where p.id=${req.user_id}`;

  const getStripeResponse = await db.query($sql);
  try {
    // Create payment method for client(Doctor) account
    const stripe = Stripe(getStripeResponse.rows[0].stripe_api_key);
    const cardData = {
      card: {
        exp_month: formData.exp.substring(0, 2),
        exp_year: formData.exp.substring(2, 4),
      },
      billing_details: {
        address: {
          line1: formData.address,
          line2: formData.address2,
          postal_code: formData.postal,
          city: formData.city,
          state: formData.state,
          country: formData.country,
        },
      },
    };

    // update payment method on stripe account
    stripe.paymentMethods
      .update(formData.stripe_payment_method_token, cardData)
      .then(
        () => {
          // nothing to do with the result
        },
        (error) => {
          console.info("Doctor payment method update error:", error.message);
        }
      );
    // update payment method on corp stripe account
    const corpStripe = Stripe(process.env.STRIPE_PRIVATE_KEY);
    corpStripe.paymentMethods
      .update(formData.stripe_payment_method_token, cardData)
      .then(
        () => {
          // Nothing to do with result
        },
        (error) => {
          console.info("Corp payment method update error:", error.message);
        }
      );

    // formData.account_number = formData.account_number.substring(0, 4);

    delete formData.stripe_customer_id; // Delete customer_id as it's not on payment_method table
    delete formData.corp_stripe_customer_id; // Delete customer_id as it's not on payment_method table
    delete formData.account_number; // We're not allowed to change account number
    delete formData.cvc; // Delete cvc as it's not on payment_method table

    const updateResponse = await db.query(
      `UPDATE payment_method SET type=$1, exp=$2, address=$3, address2=$4,
      city=$5, state=$6, postal=$7, country=$8, phone=$9, status=$10, stripe_payment_method_token=$11, corp_stripe_payment_method_token=$12,
       client_id=$13 where patient_id=$14 and id=$15 RETURNING id`,
      [formData.type, formData.exp, formData.address, formData.address2, formData.city, formData.state, formData.postal, formData.country,
         formData.phone, formData.status, formData.stripe_payment_method_token, formData.corp_stripe_payment_method_token, req.client_id, req.user_id, id
      ]
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

const deletePaymentMethod = async (req, res) => {
  const { id } = req.params;

  try {
    const paymentOnTran = await db.query(
      `select 1 from tran where payment_method_id=$1 limit 1`, [id]
    );
    const paymentOnTranc = await db.query(
      `select 1 from tranc where payment_method_id=$1 limit 1`, [id]
    );

    if (paymentOnTran.rows.length > 0 || paymentOnTranc.rows.length > 0) {
      const updateResponse = await db.query(
        `update payment_method set status='D' where id=$1 and patient_id=${req.user_id}`, [id]
      );
      if (!updateResponse.rows) {
        errorMessage.message = "None found";
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = updateResponse.rows;
    } else {
      const dbResponse = await db.query(
        `delete from payment_method where id=$1 and patient_id=${req.user_id} RETURNING id`, [id]
      );
      if (!dbResponse) {
        errorMessage.message = "None found";
        return res.status(status.notfound).send(errorMessage);
      }
      successMessage.data = dbResponse.rows;
    }

    successMessage.message = "Delete successful";
    return res.status(status.created).send(successMessage);
  } catch (err) {
    console.log("err", err);
    errorMessage.message = "Error deleting payment method";
    return res.status(status.error).send(errorMessage);
  }
};

const PaymentMethod = {
  getPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};

module.exports = PaymentMethod;
