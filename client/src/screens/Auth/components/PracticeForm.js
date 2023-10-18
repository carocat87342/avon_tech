/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-console */

import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import _ from "lodash";
import PropTypes from "prop-types";

import AuthService from "../../../services/auth.service";
import * as API from "../../../utils/API";
import { getAcronym, removeSpecialCharFromString } from "../../../utils/helpers";
import CommonModal from "../../Modal";
import TextFieldWithError from "./TextFieldWithError";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formSectionTitle: {
    marginBottom: theme.spacing(1),
  },
  personalFormTitle: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  checkbox: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  meta: {
    textAlign: "right",
    "& a": {
      color: theme.palette.text.secondary,
      fontSize: 12,
    },
  },
}));

const PracticeForm = ({ onFormSubmit, ...props }) => {
  const { errors } = props;
  const classes = useStyles();
  const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [address2, setAddress2] = useState("");
  // const [city, setCity] = useState("");
  // const [state, setState] = useState("");
  // const [zipCode, setZipCode] = useState("");
  const [phone, setPhone] = useState("");
  // const [fax, setFax] = useState("");
  const [url, setUrl] = useState("");
  // const [practiceEmail, setPracticeEmail] = useState("");
  // const [ein, setEin] = useState("");
  // const [npi, setNpi] = useState("");
  const [clientCode, setClientCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  // const [personalNPI, setPersonalNPI] = useState("");
  // const [medicalLicenseNumber, setMedicalLicenseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([]);
  const [agreement, setAgreement] = useState("");

  const modalTitle = "Customer Agreement";

  useEffect(() => {
    const nameWithoutSpeChar = removeSpecialCharFromString(name);
    const clientCodeAcc = getAcronym(nameWithoutSpeChar.trim());
    setClientCode(clientCodeAcc);
  }, [name]);

  useEffect(() => {
    async function fetchAgreement() {
      await API.fetchClientAgreement().then((res) => {
        setAgreement(res.data.contract);
      });
    }
    fetchAgreement();
  }, []);

  const handleFormSubmission = (e) => {
    e.preventDefault();

    const formData = {
      client: {
        name: name.trim(),
        // address: address.trim(),
        // address2: address2.trim(),
        // city: city.trim(),
        // state: state.trim(),
        // postal: zipCode.trim(),
        phone: phone.trim(),
        // fax: fax.trim(),
        // email: practiceEmail.trim(),
        website: url.trim(),
        // ein: ein.trim(),
        // npi: npi.trim(),
        code: clientCode.trim(),
      },
      user: {
        firstname: firstName.trim(),
        lastname: lastName.trim(),
        email: email.trim(),
        // npi: personalNPI.trim(),
        // medical_license: medicalLicenseNumber.trim(),
        password: password.trim(),
      },
    };

    onFormSubmit(formData);
  };

  const validatePassword = (event) => {
    if (event.target.value.length < 8) {
      setFieldErrors([
        ...fieldErrors,
        {
          value: event.target.value,
          msg: "Too Weak. Must be atleast 8 Characters",
          param: "users.password",
        },
      ]);
    } else {
      const updatedErrors = fieldErrors.filter(
        (error) => error.param !== "users.password",
      );
      setFieldErrors(updatedErrors);
    }
  };

  const practiceErrors = Array.isArray(errors) && errors.filter((err) => err?.param.includes("client"));
  const userErrors = Array.isArray(errors) && errors.filter((err) => err?.param.includes("user"));

  const getFieldError = (target, fieldName) => {
    let value = `client.${fieldName}`;
    if (target) {
      value = `${target}.${fieldName}`;
    }
    return fieldErrors && fieldErrors.filter((err) => err?.param === value);
  };
  const handleAjaxValidation = (event, target) => {
    if (!event.target) {
      return;
    }

    AuthService.validate({
      fieldName: event.target.name,
      value: event.target.value,
      target: target || "client",
    })
      .then(
        (response) => {
          // Remove errors record with param
          const updatedErrors = fieldErrors.filter(
            (error) => error.param !== response.data.message.param,
          );
          setFieldErrors(updatedErrors);
        },
        (error) => {
          if (!error.response) {
            // network error
            console.error(error);
          } else {
            const uniqueFieldErrors = _.uniqWith(
              [...fieldErrors, error.response.data.message],
              _.isEqual,
            );
            setFieldErrors(uniqueFieldErrors);
          }
        },
      )
      .catch((err) => {
        console.error("catch err", err);
      });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <form className={classes.form} noValidate onSubmit={(event) => handleFormSubmission(event)}>
      {practiceErrors
        // eslint-disable-next-line react/no-array-index-key
        && practiceErrors.map((error, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
      {
        modalOpen
          ? <CommonModal title={modalTitle} body={agreement} isModalOpen isModalClose={handleModalClose} />
          : null
      }
      <Typography
        component="h3"
        variant="h4"
        color="textPrimary"
        className={classes.formSectionTitle}
      >
        Practice Information
      </Typography>
      <TextFieldWithError
        fieldName="name"
        label="Practice Name"
        value={name}
        autoFocus
        handleOnChange={(event) => setName(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "name")}
        inputProps={{ maxLength: 35 }}
        helperText={`${name.length >= 35 ? "Enter a name between 35 charecter" : ""
        }`}
      />
      {/* <TextFieldWithError
        fieldName="code"
        label="Practice Code"
        value={clientCode}
        handleOnChange={(event) => setClientCode(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "code")}
        inputProps={{ maxLength: 35 }}
      /> */}
      {/* <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="address"
        label="Practice Address"
        id="address"
        autoComplete="current-address"
        onChange={(event) => setAddress(event.target.value)}
        value={address}
        inputProps={{ maxLength: 90 }}
        helperText={`${
          address.length >= 90 ? "Enter a adress between 90 charecter" : ""
        }`}
      /> */}
      {/* <TextField
        variant="outlined"
        margin="dense"
        fullWidth
        name="address2"
        label="Practice Address Line Two"
        id="address2"
        autoComplete="current-address2"
        onChange={(event) => setAddress2(event.target.value)}
        value={address2}
        inputProps={{ maxLength: 90 }}
        helperText={`${
          address2.length >= 90 ? "Enter a adress between 90 charecter" : ""
        }`}
      /> */}
      {/* <TextField
        value={city}
        variant="outlined"
        margin="dense"
        fullWidth
        id="city"
        label="Practice City"
        name="city"
        autoComplete="city"
        onChange={(event) => setCity(event.target.value)}
        inputProps={{ maxLength: 45 }}
        helperText={`${
          city.length >= 45 ? "Enter a city between 45 charecter" : ""
        }`}
      /> */}
      {/* <TextField
        value={state}
        variant="outlined"
        margin="dense"
        fullWidth
        id="state"
        label="Practice State"
        name="state"
        autoComplete="state"
        onChange={(event) => setState(event.target.value)}
        inputProps={{ maxLength: 45 }}
        helperText={`${
          state.length >= 45 ? "Enter a state between 45 charecter" : ""
        }`}
      /> */}
      {/* <TextField
        value={zipCode}
        variant="outlined"
        margin="dense"
        fullWidth
        id="zipcode"
        label="Practice Zipcode"
        name="zipcode"
        autoComplete="zipcode"
        onChange={(event) => setZipCode(event.target.value)}
        inputProps={{ maxLength: 20 }}
        helperText={`${
          zipCode.length >= 20 ? "Enter a zip between 20 charecter" : ""
        }`}
      /> */}
      <TextFieldWithError
        fieldName="phone"
        label="Practice Phone"
        value={phone}
        handleOnChange={(event) => setPhone(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "phone")}
        inputProps={{ maxLength: 15 }}
        helperText={`${phone.length >= 15 ? "Enter a number between 15 charecter" : ""
        }`}
      />
      {/* <TextFieldWithError
        fieldName="fax"
        label="Practice Fax"
        value={fax}
        handleOnChange={(event) => setFax(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "fax")}
        inputProps={{ maxLength: 15 }}
        helperText={`${
          fax.length >= 15 ? "Enter a number between 15 charecter" : ""
        }`}
      /> */}
      <TextFieldWithError
        fieldName="website"
        label="Practice Website URL"
        value={url}
        handleOnChange={(event) => setUrl(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "website")}
        inputProps={{ maxLength: 1000 }}
        helperText={`${url.length >= 1000 ? "Enter an url between 1000 charecter" : ""
        }`}
      />
      {/* <TextFieldWithError
        fieldName="email"
        label="Practice Email"
        value={practiceEmail}
        handleOnChange={(event) => setPracticeEmail(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "email")}
        inputProps={{ maxLength: 255 }}
        helperText={`${
          practiceEmail.length >= 255
            ? "Enter an email between 255 charecter"
            : ""
        }`}
      /> */}
      {/* <TextFieldWithError
        fieldName="ein"
        label="Practice EIN Number"
        value={ein}
        handleOnChange={(event) => setEin(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "ein")}
        inputProps={{ maxLength: 15 }}
        helperText={`${
          ein.length >= 15 ? "Enter a number between 15 charecter" : ""
        }`}
      /> */}
      {/* <TextFieldWithError
        fieldName="npi"
        label="Practice NPI Number"
        value={npi}
        handleOnChange={(event) => setNpi(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event)}
        errors={getFieldError("client", "npi")}
        inputProps={{ maxLength: 15 }}
        helperText={`${
          npi.length >= 15 ? "Enter a number between 15 charecter" : ""
        }`}
      /> */}
      <Typography
        component="h3"
        variant="h4"
        color="textPrimary"
        className={classes.personalFormTitle}
      >
        Your Personal Information
      </Typography>
      {userErrors
        && userErrors.map((error, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Alert severity="error" key={index}>
            {error.msg}
          </Alert>
        ))}
      <TextField
        value={firstName}
        variant="outlined"
        margin="dense"
        fullWidth
        id="firstName"
        label="Your Firstname"
        name="firstName"
        autoComplete="firstName"
        onChange={(event) => setFirstName(event.target.value)}
        inputProps={{ maxLength: 35 }}
        helperText={`${firstName.length >= 35
          ? "Enter a first name between 35 charecter"
          : ""
        }`}
      />
      <TextField
        value={lastName}
        variant="outlined"
        margin="dense"
        fullWidth
        id="lastName"
        label="Your Lastname"
        name="lastName"
        autoComplete="lastName"
        onChange={(event) => setLastName(event.target.value)}
        inputProps={{ maxLength: 35 }}
        helperText={`${lastName.length >= 35 ? "Enter a last name between 35 charecter" : ""
        }`}
      />
      <TextFieldWithError
        id="userEmail"
        fieldName="email"
        label="Your Email Address"
        value={email}
        handleOnChange={(event) => setEmail(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "users")}
        errors={getFieldError("users", "email")}
        inputProps={{ maxLength: 255 }}
        helperText={`${email.length >= 255 ? "Enter an email between 255 charecter" : ""
        }`}
      />
      {/* <TextFieldWithError
        id="userNPI"
        fieldName="npi"
        label="Your NPI Number"
        value={personalNPI}
        handleOnChange={(event) => setPersonalNPI(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "user")}
        errors={getFieldError("user", "npi")}
        inputProps={{ maxLength: 15 }}
        helperText={`${
          personalNPI.length >= 15 ? "Enter a number between 15 charecter" : ""
        }`}
      /> */}
      {/* <TextFieldWithError
        fieldName="medical_license"
        label="Your Medical License Number"
        value={medicalLicenseNumber}
        handleOnChange={(event) => setMedicalLicenseNumber(event.target.value)}
        handleOnBlur={(event) => handleAjaxValidation(event, "user")}
        errors={getFieldError("user", "medical_license")}
        inputProps={{ maxLength: 35 }}
        helperText={`${
          medicalLicenseNumber.length >= 35
            ? "Enter a numbner between 35 charecter"
            : ""
        }`}
      /> */}
      <TextFieldWithError
        fieldName="password"
        label="Your Password"
        type="password"
        value={password}
        handleOnChange={(event) => setPassword(event.target.value)}
        handleOnBlur={(event) => validatePassword(event)}
        errors={getFieldError("users", "password")}
        inputProps={{ maxLength: 90 }}
        helperText={`${password.length >= 90 ? "Enter a password between 90 charecter" : ""
        }`}
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={(
          <div>
            <span>
              Check here to indicate that you have read and agree to the terms
              of the
              {" "}
              <a style={{ color: "#2979ff" }} onClick={handleModalOpen}>
                Customer Agreement
              </a>
            </span>
          </div>
        )}
        className={classes.checkbox}
        onChange={() => setTermsAndConditions(!termsAndConditions)}
      />
      <Button
        disabled={fieldErrors.length > 0 || !termsAndConditions}
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        type="submit"
      >
        Sign up
      </Button>
      <Grid container className={classes.meta}>
        <Grid item xs>
          <Link href="/login_client" variant="body2">
            Already a member? Login here
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

PracticeForm.defaultProps = {
  onFormSubmit: () => { },
  errors: null,
};

PracticeForm.propTypes = {
  onFormSubmit: PropTypes.func,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
    }),
  ),
};
export default PracticeForm;
