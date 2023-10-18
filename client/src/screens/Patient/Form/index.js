import React, { useState } from "react";

import {
  TextField,
  Button,
  Grid,
  Typography,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import SignatureCanvas from "react-signature-canvas";

import CountrySelect from "../../../components/common/CountrySelect";
import RegionSelect from "../../../components/common/RegionSelect";
import usePatientContext from "../../../hooks/usePatientContext";
import { toggleFormsViewDialog } from "../../../providers/Patient/actions";
import { FormFields } from "../../../static/expandForm";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    margin: theme.spacing(3, 0),
  },
  sigCanvas: {
    border: "1px solid grey",
  },
  sigCanvasActions: {
    padding: "0 15px",
  },
}));

const Form = () => {
  const classes = useStyles();
  const { dispatch } = usePatientContext();

  const BasicInfo = FormFields.basicInfo;
  const AddressDetails = FormFields.addressDetails;
  const ContactInfo = FormFields.contactInfo;
  const EmergencyInfo = FormFields.emergencyInfo;
  const InsuranceInfo = FormFields.insuranceInfo;
  const MedicalInfo = FormFields.medicalInfo;
  const UserNamePasswordInfo = FormFields.userNamePasswordDetails;

  const [termsChecked, setTermsChecked] = useState(true);
  const [signatureRef, setSignatureRef] = useState(null);
  const [formFields, setFormFields] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    address1: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    zipPostal: "",
    contactPreference: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setFormFields({
        ...formFields,
        [identifier]: value,
      });
    } else if (identifier === "region") {
      const key = "state";
      setFormFields({
        ...formFields,
        [key]: value,
      });
    }
  };

  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
  };

  const clearSignaturePad = () => {
    signatureRef.clear();
  };

  return (
    <>
      <Grid container justify="space-between">
        <Typography variant="h3" color="textSecondary" gutterBottom>
          Register with Ultrawellnes Center
        </Typography>
        <Button variant="outlined" onClick={() => dispatch(toggleFormsViewDialog())}>
          Close
        </Button>
      </Grid>
      <form>
        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={1}>
            {BasicInfo.map((item) => (
              <Grid key={item.name} item md={4}>
                {item.baseType === "input" ? (
                  <TextField
                    size="small"
                    variant="outlined"
                    label={item.label}
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <TextField
                    // className={classes.select}
                    size="small"
                    variant="outlined"
                    select
                    placeholder={item.label}
                    label={item.label}
                    id={item.id}
                    name={item.name}
                    value={formFields[item.name]}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  >
                    {item.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Address Information
          </Typography>
          <Grid container spacing={1}>
            {AddressDetails.map((item) => (
              <Grid key={item.name} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
            <Grid item lg={4}>
              <CountrySelect
                size="small"
                id="country-select"
                error={null}
                name="country-select"
                helperText=""
                label="Country"
                outlined
                handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                country={formFields.country}
              />
            </Grid>
            <Grid item lg={4}>
              <RegionSelect
                size="small"
                id="state-select"
                error={null}
                name="state-select"
                helperText=""
                label="State"
                outlined
                handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                country={formFields.country}
                region={formFields.state}
              />
            </Grid>
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Contact Information
          </Typography>
          <Grid container spacing={1} alignItems="flex-end">
            {ContactInfo.map((item) => (
              <Grid key={item.name} item md={4}>
                {item.baseType === "input" ? (
                  <TextField
                    size="small"
                    variant="outlined"
                    label={item.label}
                    name={item.name}
                    id={item.id}
                    type={item.type}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                ) : (
                  <TextField
                    size="small"
                    variant="outlined"
                    // className={classes.select}
                    select
                    placeholder={item.label}
                    label={item.label}
                    id={item.id}
                    name={item.name}
                    value={formFields[item.name]}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  >
                    {item.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Emergency Information
          </Typography>
          <Grid container spacing={1}>
            {EmergencyInfo.map((item) => (
              <Grid key={item.name} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Insurance Information
          </Typography>
          <Grid container spacing={1}>
            {InsuranceInfo.map((item) => (
              <Grid key={item.name} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Medical Information
          </Typography>
          <Grid container spacing={1}>
            {MedicalInfo.slice(0, 2).map((item) => (
              <Grid key={item.name} item md={6}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
            {MedicalInfo.slice(2, 3).map((item) => (
              <Grid key={item.name} item md={12}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                  multiline
                  rows={5}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Set Username and Password for Patient Portal
          </Typography>
          <Grid container spacing={1}>
            {UserNamePasswordInfo.map((item) => (
              <Grid key={item.name} item md={4}>
                <TextField
                  size="small"
                  variant="outlined"
                  label={item.label}
                  name={item.name}
                  id={item.id}
                  type={item.type}
                  fullWidth
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Divider />

        <FormControlLabel
          value="end"
          control={(
            <Checkbox
              checked={termsChecked}
              onChange={(e) => handleCheckboxChange(e)}
              color="primary"
            />
          )}
          label="I have read and accept the terms of the privacy policy below."
          labelPlacement="end"
        />

        <Grid className={classes.inputRow}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Signature
          </Typography>
          <Grid container justify="center">
            <Grid item>
              <SignatureCanvas
                ref={(ref) => setSignatureRef(ref)}
                on
                penColor="black"
                canvasProps={{
                  width: 500,
                  height: 200,
                  className: classes.sigCanvas,
                }}
              />
            </Grid>
            <Grid item className={classes.sigCanvasActions}>
              <Button variant="outlined" onClick={() => clearSignaturePad()}>
                Clear
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default Form;
