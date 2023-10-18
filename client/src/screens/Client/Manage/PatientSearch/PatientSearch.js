import React, { useState } from "react";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

import SearchPatient from "../../../../services/patientSearch.service";
import PatientSearchResults from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "20px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  submit: {
    maxWidth: "200px",
    marginTop: "15px",
  },
  paper: {
    maxWidth: "900px",
  },
  textField: {
    width: "200px",
  },
  customSelect: {
    width: "200px",
  },
  inputGroup: {
    marginTop: "14px",
  },
  form: {
    marginTop: theme.spacing(1),
  },
}));

function NumberFormatCustom(props) {
  const {
    inputRef, onChange, name, ...other
  } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name,
            value: values.value,
          },
        });
      }}
      isNumericString
    />
  );
}
NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function PatientSearch() {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [patientId, setPatientId] = useState("");
  const [createdFrom, setCreatedFrom] = useState(null);
  const [createdTo, setCreatedTo] = useState(null);
  const [appointmentFrom, setAppointmentFrom] = useState(null);
  const [appointmentTo, setAppointmentTO] = useState(null);
  const [paymentFrom, setPaymentFrom] = useState("");
  const [paymentTo, setPaymentTo] = useState("");

  const [searchResults, setSearchResults] = useState([]);
  const [selectStatus, setSelectedStatus] = useState("");

  const handleChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const serchPatients = (e) => {
    e.preventDefault();

    const payload = {
      data: {
        firstname: firstName,
        lastname: lastName,
        phone,
        email,
        createdFrom: createdFrom
          ? moment(createdFrom).format("YYYY-MM-DD")
          : null,
        createdTo: createdTo ? moment(createdTo).format("YYYY-MM-DD") : null,
        appointmentFrom: appointmentFrom
          ? moment(appointmentFrom).format("YYYY-MM-DD")
          : null,
        appointmentTo: appointmentTo
          ? moment(appointmentTo).format("YYYY-MM-DD")
          : null,
        paymentFrom,
        paymentTo,
        id: patientId,
        patientStatus: selectStatus,
      },
    };
    SearchPatient.search(payload).then((res) => {
      setSearchResults(res.data.data);
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <Grid container direction="column">
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Patient Search
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is to search for patients
          </Typography>
          <form className={classes.form} onSubmit={(e) => serchPatients(e)}>
            <div className={classes.inputGroup}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={firstName}
                    variant="outlined"
                    autoFocus
                    name="firstName"
                    label="First Name"
                    type="firstName"
                    id="firstName"
                    autoComplete="firstName"
                    size="small"
                    onChange={(event) => setFirstName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={lastName}
                    variant="outlined"
                    size="small"
                    name="lastName"
                    label="Last Name"
                    type="lastName"
                    id="lastName"
                    autoComplete="lastName"
                    onChange={(event) => setLastName(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <KeyboardDatePicker
                    clearable
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                    id="createdFrom"
                    label="Created From"
                    value={createdFrom ? moment(createdFrom) : null}
                    className={classes.textField}
                    onChange={(date) => setCreatedFrom(date)}
                    size="small"
                    autoOk
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <KeyboardDatePicker
                    clearable
                    autoOk
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                    variant="outlined"
                    id="createdTo"
                    label="Created To"
                    value={createdTo ? moment(createdTo) : null}
                    className={classes.textField}
                    onChange={(date) => setCreatedTo(date)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={phone}
                    variant="outlined"
                    name="phone"
                    label="Phone"
                    size="small"
                    type="phone"
                    id="phone"
                    autoComplete="phone"
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={email}
                    variant="outlined"
                    name="email"
                    size="small"
                    label="Email"
                    type="email"
                    id="email"
                    autoComplete="email"
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <KeyboardDatePicker
                    clearable
                    autoOk
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                    className={classes.textField}
                    value={appointmentFrom ? moment(appointmentFrom) : null}
                    variant="outlined"
                    name="appointmentFrom"
                    size="small"
                    label="Appointment From"
                    id="appointmentFrom"
                    autoComplete="appointmentFrom"
                    onChange={(date) => setAppointmentFrom(date)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <KeyboardDatePicker
                    clearable
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    autoOk
                    format="yyyy/MM/dd"
                    inputVariant="outlined"
                    className={classes.textField}
                    value={appointmentTo ? moment(appointmentFrom) : null}
                    variant="outlined"
                    name="appointmentTO"
                    size="small"
                    label="Appointment To"
                    id="appointmentTO"
                    autoComplete="appointmentTO"
                    onChange={(date) => setAppointmentTO(date)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    className={classes.textField}
                    value={patientId}
                    variant="outlined"
                    name="patientId"
                    size="small"
                    label="Patient ID"
                    type="patientId"
                    id="patientId"
                    autoComplete="patientId"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      maxLength: 16,
                    }}
                    error={patientId.length >= 13}
                    helperText={
                      patientId
                      && patientId.length >= 13
                      && "Enter between 12 digit"
                    }
                    onChange={(event) => setPatientId(event.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <FormControl
                    variant="outlined"
                    className={classes.customSelect}
                    size="small"
                  >
                    <InputLabel htmlFor="age-native-simple">Status</InputLabel>
                    <Select
                      native
                      value={selectStatus}
                      onChange={handleChange}
                      inputProps={{
                        name: "type",
                        id: "age-native-simple",
                      }}
                      label="Status"
                    >
                      <option aria-label="None" value="" />
                      <option value="A">Active</option>
                      <option value="I">Inactive</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    className={classes.textField}
                    value={paymentFrom}
                    variant="outlined"
                    name="paymentFrom"
                    label="Payment From"
                    id="paymentFrom"
                    autoComplete="paymentFrom"
                    onChange={(event) => setPaymentFrom(event.target.value)}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      maxLength: 16,
                    }}
                    error={paymentFrom.length >= 13}
                    helperText={
                      paymentFrom
                      && paymentFrom.length >= 13
                      && "Enter between 12 digit"
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    className={classes.textField}
                    value={paymentTo}
                    variant="outlined"
                    name="paymentTo"
                    label="Payment To"
                    type="paymentTo"
                    id="paymentTo"
                    autoComplete="paymentTo"
                    onChange={(event) => setPaymentTo(event.target.value)}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                      maxLength: 16,
                    }}
                    error={paymentTo.length >= 13}
                    helperText={
                      paymentTo
                      && paymentTo.length >= 13
                      && "Enter between 12 digit"
                    }
                  />
                </Grid>
              </Grid>
            </div>
            <Grid item xs={12} sm={3}>
              <Button
                size="small"
                fullWidth
                variant="contained"
                color="primary"
                type="subhmit"
                className={classes.submit}
              >
                Search
              </Button>
            </Grid>
          </form>
        </Grid>
      </div>
      <div className={classes.serachResults}>
        {searchResults.length > 0 && (
          <PatientSearchResults results={searchResults} />
        )}
      </div>
    </div>
  );
}
