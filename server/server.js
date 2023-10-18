const express = require("express");
const cors = require("cors");
const path = require("path");
const config = require("./config");

const app = express();

// Add middleware for parsing URL encoded bodies (which are usually sent by browser)
app.use(cors());
// Add middleware for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use("/static", express.static("app/static"));
app.use(express.static('public'))
app.set("trust proxy", true);

// app.use(express.static('public'));
app.get('*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, './public/')});
});

// app.get("/", (req, res) => {
//   const help = `
//     <pre>
//       Welcome to the API!
//       Use an x-access-token header to work with your own data:
//       fetch(url, { headers: { 'x-access-token': 'whatever-you-want' }})
//       The following endpoints are available:
//     </pre>
//   `;

//   res.send(help);
// });

const baseAPIPath = "/api/v1";
app.use(baseAPIPath, require("./app/routes/accounting-search.routes"));
app.use(baseAPIPath, require("./app/routes/accounting-types.routes"));
app.use(baseAPIPath, require("./app/routes/appointment-type-user.routes"));
app.use(baseAPIPath, require("./app/routes/appointment-type.routes"));
app.use(baseAPIPath, require("./app/routes/auth-email.routes"));
app.use(baseAPIPath, require("./app/routes/catalog.routes"));
app.use(baseAPIPath, require("./app/routes/client-agreement.routes"));
app.use(baseAPIPath, require("./app/routes/client-range.routes"));
app.use(baseAPIPath, require("./app/routes/config.routes"));
app.use(baseAPIPath, require("./app/routes/drug.routes"));
app.use(baseAPIPath, require("./app/routes/email-patient.routes"));
app.use(baseAPIPath, require("./app/routes/forms.routes"));
app.use(baseAPIPath, require("./app/routes/handouts.routes"));
app.use(baseAPIPath, require("./app/routes/home.routes"));
app.use(baseAPIPath, require("./app/routes/icd.routes"));
app.use(baseAPIPath, require("./app/routes/index.routes"));
app.use(baseAPIPath, require("./app/routes/integrations.routes"));
app.use(baseAPIPath, require("./app/routes/login.routes"));
app.use(baseAPIPath, require("./app/routes/marker-report.routes"));
app.use(baseAPIPath, require("./app/routes/message-to-patient.routes"));
app.use(baseAPIPath, require("./app/routes/message-to-user.routes"));
app.use(baseAPIPath, require("./app/routes/myself.routes"));
app.use(baseAPIPath, require("./app/routes/password-reset.routes"));
app.use(baseAPIPath, require("./app/routes/patient-delete.routes"));
app.use(baseAPIPath, require("./app/routes/patient-encounter.routes"));
app.use(baseAPIPath, require("./app/routes/patient-merge.routes"));
app.use(baseAPIPath, require("./app/routes/patient-portal-header.routes"));
app.use(baseAPIPath, require("./app/routes/patient-search.routes"));
app.use(baseAPIPath, require("./app/routes/patient.routes"));
app.use(baseAPIPath, require("./app/routes/procedure.routes"));
app.use(baseAPIPath, require("./app/routes/process-lab.routes"));
app.use(baseAPIPath, require("./app/routes/report-finance-detail.routes"));
app.use(baseAPIPath, require("./app/routes/report-finance.routes"));
app.use(baseAPIPath, require("./app/routes/schedule.routes"));
app.use(baseAPIPath, require("./app/routes/search.routes"));
app.use(baseAPIPath, require("./app/routes/setup.routes"));
app.use(baseAPIPath, require("./app/routes/signup.routes"));
app.use(baseAPIPath, require("./app/routes/stripe.routes"));
app.use(baseAPIPath, require("./app/routes/support.routes"));
app.use(baseAPIPath, require("./app/routes/users.routes"));

// Patient Portal
app.use(baseAPIPath, require("./app/routes/patient/allergy.routes"));
app.use(baseAPIPath, require("./app/routes/patient/appointment.routes"));
app.use(baseAPIPath, require("./app/routes/patient/billings.routes"));
app.use(baseAPIPath, require("./app/routes/patient/encounters.routes"));
app.use(baseAPIPath, require("./app/routes/patient/handouts.routes"));
app.use(baseAPIPath, require("./app/routes/patient/home.routes"));
app.use(baseAPIPath, require("./app/routes/patient/invoice.routes"));
app.use(baseAPIPath, require("./app/routes/patient/lab_billing.routes"));
app.use(baseAPIPath, require("./app/routes/patient/lab_requisitions.routes"));
app.use(baseAPIPath, require("./app/routes/patient/labs.routes"));
app.use(baseAPIPath, require("./app/routes/patient/login.routes"));
app.use(baseAPIPath, require("./app/routes/patient/messages.routes"));
app.use(baseAPIPath, require("./app/routes/patient/password-reset.routes"));
app.use(baseAPIPath, require("./app/routes/patient/payment-method.routes"));
app.use(baseAPIPath, require("./app/routes/patient/pharmacy.routes"));
app.use(baseAPIPath, require("./app/routes/patient/prescription.routes"));
app.use(baseAPIPath, require("./app/routes/patient/profile.routes"));
app.use(baseAPIPath, require("./app/routes/patient/purchase-labs.routes"));
app.use(baseAPIPath, require("./app/routes/patient/signup.routes"));

// Corporate Portal
app.use(baseAPIPath, require("./app/routes/corporate/case.routes"));
app.use(baseAPIPath, require("./app/routes/corporate/index.routes"));
app.use(baseAPIPath, require("./app/routes/corporate/login.routes"));
app.use(baseAPIPath, require("./app/routes/corporate/myself.routes"));
app.use(baseAPIPath, require("./app/routes/corporate/password-reset.routes"));

// Database Status
app.use(baseAPIPath, require("./app/routes/database-status.routes"));

app.listen(config.port).on("listening", () => {
  console.log(`API is live on ${config.port}`);
});
