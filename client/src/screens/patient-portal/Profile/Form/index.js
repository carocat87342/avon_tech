import React, { useState, useEffect, useCallback } from "react";

import {
  Grid,
  Paper,
  TextField,
  Button,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import { CountryRegionData } from "react-country-region-selector";

import CountrySelect from "../../../../components/common/CountrySelect";
import RegionSelect from "../../../../components/common/RegionSelect";
import useAuth from "../../../../hooks/useAuth";
import PatientPortalService from "../../../../services/patient_portal/patient-portal.service";
import {
  ProfileFormFields,
  InsuranceForm,
  PortalForm,
} from "../../../../static/patient-portal/ProfileFormFields";


const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(1),
  },
  sectionCard: {
    padding: theme.spacing(1.5, 1),
  },
  halfSectionCard: {
    padding: theme.spacing(1.5, 1),
    minHeight: 198,
  },
  root: {
    border: "1px solid",
    margin: theme.spacing(0, 0, 1, 0),
    borderRadius: 0,
  },
  inputTextRow: {
    marginBottom: theme.spacing(3),
  },
  select: {
    lineHeight: "2.30em",
  },
  table: {
    background: "white",
  },
  submitBtn: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
}));

const ProfileForm = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const FirstRow = ProfileFormFields.firstRow;
  const SecondRow = ProfileFormFields.secondRow;
  const ThirdRow = ProfileFormFields.thirdRow;

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [formFields, setFormFields] = useState({
    firstname: "",
    middlename: "",
    lastname: "",
    gender: "",
    phone_home: "",
    phone_cell: "",
    phone_work: "",
    phone_other: "",
    phone_note: "",
    ssn: "",
    address: "",
    address2: "",
    city: "",
    postal: "",
    insurance_name: "",
    insurance_group: "",
    insurance_member: "",
    insurance_phone: "",
    insurance_desc: "",
    email: "",
    password: "",

  });

  function formatformFeilds(data = {}) {
    return {
      ...data,
      ...(data.gender && { gender: data.gender ? data.gender : "M" }),
      ...(data.dob && { dob: data.dob ? data.dob : moment().format("YYYY-MM-DD") }),
    };
  }

  useEffect(() => {
    const selectedCountry = CountryRegionData.filter(
      (countryArray) => countryArray[1] === formFields.country,
    );
    if (selectedCountry.length) { // country and state is present in the db
      setCountry(selectedCountry[0]);
      const regions = selectedCountry[0][2].split("|").map((regionPair) => {
        const [regionName = null, regionInShort] = regionPair.split("~");
        return [regionName, regionInShort];
      });
      const selectedRegion = regions.filter((x) => x[1] === formFields.state);
      setRegion(selectedRegion[0][1]);
    }
  }, [formFields]);

  const fetchProfile = useCallback(() => {
    PatientPortalService.getProfile().then((res) => {
      const profile = res.data?.[0];
      setFormFields((formFieldValues) => ({
        ...formFieldValues,
        ...formatformFeilds(profile),
      }));
    });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCountryRegion = (identifier, value) => {
    if (identifier === "country") {
      setCountry(value);
    } else if (identifier === "region") {
      setRegion(value);
    }
  };

  const onFormSubmit = () => {
    // * Deleting these fields as they don't exists in database structure.
    delete formFields.code;
    delete formFields.role;
    delete formFields.login_url;
    delete formFields.dob;
    delete formFields.provider;
    delete formFields.created_user_id;

    // * status is in need to be formated back to it's original state.
    // formFields.status = formFields?.status === "active" ? "A" : null;

    const payload = {
      data: {
        ...formFields,
        country: country[1],
        state: region,
      },
    };

    PatientPortalService.updateProfile(payload, user.id).then(
      (res) => {
        enqueueSnackbar(res.data.message, {
          variant: "success",
        });
      },
    );
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Grid container spacing={1} className={classes.inputRow}>
                {FirstRow.map((item) => (
                  <Grid key={item.name} item md={3}>
                    {item.baseType === "input" ? (
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={formFields[item.name]}
                        id={item.id}
                        type={item.type}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                        InputProps={{
                          readOnly: item.readOnly,
                        }}
                      />
                    ) : (
                      <TextField
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
              <Grid container spacing={1} className={classes.inputRow} alignItems="flex-end">
                {SecondRow.map((item) => (
                  <Grid key={item.name} item md={3}>
                    {item.baseType === "input" ? (
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={
                          item.type === "date"
                            ? moment(formFields[item.name]).format("YYYY-MM-DD")
                            : formFields[item.name]
                        }
                        id={item.id}
                        type={item.type}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <TextField
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
              <Grid container spacing={1} className={classes.inputRow}>
                {ThirdRow.map((item) => (
                  <Grid key={item.name} item md={3}>
                    {item.baseType === "input" ? (
                      <TextField
                        label={item.label}
                        name={item.name}
                        value={formFields[item.name]}
                        id={item.id}
                        type={item.type}
                        fullWidth
                        onChange={(e) => handleInputChange(e)}
                      />
                    ) : (
                      <TextField
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
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid item xs={10} className={classes.halfSectionCard}>
              <Grid container spacing={1}>
                <Grid item lg={12}>
                  <TextField
                    label="Address"
                    name="address"
                    value={formFields.address}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={12}>
                  <TextField
                    label="Address Line 2"
                    name="address2"
                    value={formFields.address2}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="City"
                    name="city"
                    value={formFields.city}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <TextField
                    label="Zip/Postal"
                    name="postal"
                    value={formFields.postal}
                    fullWidth
                    onChange={(e) => handleInputChange(e)}
                  />
                </Grid>
                <Grid item lg={3}>
                  <CountrySelect
                    id="country-select"
                    error={null}
                    name="country-select"
                    helperText=""
                    label="Country"
                    handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                    country={country}
                    margin="dense"
                  />
                </Grid>
                <Grid item lg={3}>
                  <RegionSelect
                    id="state-select"
                    error={null}
                    name="state-select"
                    helperText=""
                    label="State"
                    handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                    country={country}
                    region={region}
                    margin="dense"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Grid container spacing={1} className={classes.inputRow}>
                {InsuranceForm.map((item) => (
                  <Grid key={item.name} item md={3}>
                    <TextField
                      label={item.label}
                      name={item.name}
                      id={item.id}
                      type={item.type}
                      value={formFields[item.name]}
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* <Grid container>  //TODO:: might be used later
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Typography variant="h5" color="textPrimary">
                Payment Methods
                <span className={classes.ml1}>
                  <Button size="small" variant="outlined">
                    New
                  </Button>
                </span>
              </Typography>
              <Table size="small" className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell align="center">Last Four</TableCell>
                    <TableCell align="center">Expires</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {PaymentData.map((row) => (
                    <TableRow key={row.type}>
                      <TableCell component="th" scope="row">
                        {row.type}
                      </TableCell>
                      <TableCell align="center">{row.lastFour}</TableCell>
                      <TableCell align="center">{row.expires}</TableCell>
                      <TableCell align="center">
                        <Button>Edit</Button>
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
 */}
      <Grid container>
        <Grid item xs={12}>
          <Paper className={classes.root} variant="outlined">
            <Grid className={classes.sectionCard}>
              <Grid container spacing={1} className={classes.inputRow}>
                {PortalForm.map((item) => (
                  <Grid key={item.name} item md={3}>
                    <TextField
                      label={item.label}
                      name={item.name}
                      id={item.id}
                      type={item.type}
                      value={formFields[item.name]}
                      fullWidth
                      onChange={(e) => handleInputChange(e)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Button
        onClick={() => onFormSubmit()}
        variant="contained"
        color="primary"
        className={classes.submitBtn}
      >
        Save
      </Button>
    </>
  );
};

export default ProfileForm;
