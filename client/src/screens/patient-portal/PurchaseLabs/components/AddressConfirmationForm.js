import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, Typography, Grid, Box, TextField, useMediaQuery, useTheme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { CountryRegionData } from "react-country-region-selector";

import CountrySelect from "../../../../components/common/CountrySelect";
import RegionSelect from "../../../../components/common/RegionSelect";
import useAuth from "../../../../hooks/useAuth";
import PatientPortalService from "../../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  mt2: {
    marginTop: theme.spacing(2),
  },
  ml2: {
    marginLeft: theme.spacing(2),
  },
}));

const AddressConfirmationForm = (props) => {
  const { onSubmit, onClose } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"), {
    defaultMatches: true,
  });

  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [formFields, setFormFields] = useState({
    address: "",
    address2: "",
    country: "",
    state: "",
    city: "",
    postal: "",
  });

  const fetchProfile = useCallback(() => {
    PatientPortalService.getProfile().then((res) => {
      const profile = res.data?.[0];
      setFormFields((formFieldValues) => ({
        ...formFieldValues,
        ...profile,
      }));
    });
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

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

  const onFormSubmit = (e) => {
    e.preventDefault();
    // * Deleting these fields as they don't exists in database structure.
    delete formFields.code;
    delete formFields.role;
    delete formFields.login_url;
    delete formFields.dob;
    delete formFields.provider;
    delete formFields.created_user_id;

    const payload = {
      data: {
        ...formFields,
        country: country[1],
        state: region,
      },
    };

    PatientPortalService.updateProfile(payload, user.id).then((res) => {
      enqueueSnackbar(res.data.message, {
        variant: "success",
      });
      onSubmit();
    });
  };

  return (
    <>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
        gutterBottom
      >
        Confirm Mailing Address
      </Typography>
      <Typography variant="h5" gutterBottom>
        Please confirm your mailing address for the kit that will be mailed to you.
      </Typography>

      <form onSubmit={onFormSubmit}>
        <Grid item md={4} sm={6} xs={12}>
          <TextField
            size="small"
            variant="outlined"
            className={classes.mt2}
            label="Address 1"
            name="address1"
            id="address1"
            type="text"
            fullWidth
            required
            value={formFields.address}
            onChange={(e) => handleInputChange(e)}
          />
          <TextField
            size="small"
            variant="outlined"
            className={classes.mt2}
            label="Address 2"
            name="address2"
            id="address2"
            type="text"
            fullWidth
            required
            value={formFields.address2}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid container>
          <Grid item md={4} sm={6} xs={12}>
            <TextField
              size="small"
              variant="outlined"
              className={classes.mt2}
              label="City"
              name="city"
              id="city"
              type="text"
              fullWidth
              required
              value={formFields.city}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Box ml={isDesktop ? 2 : 0} mt={2}>
              <TextField
                size="small"
                variant="outlined"
                label="Zip/Postal"
                name="postal"
                id="postal"
                type="text"
                fullWidth
                required
                value={formFields.postal}
                onChange={(e) => handleInputChange(e)}
              />
            </Box>
          </Grid>
          <Grid container>
            <Grid item md={4} sm={6} xs={12}>
              <Box mt={2}>
                <CountrySelect
                  size="small"
                  id="country-select"
                  error={null}
                  name="country-select"
                  helperText=""
                  label="Country"
                  outlined
                  handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                  country={country}
                  className={classes.mt2}
                />
              </Box>
            </Grid>
            <Grid item md={4} sm={6} xs={12}>
              <Box ml={isDesktop ? 2 : 0} mt={2}>
                <RegionSelect
                  size="small"
                  id="state-select"
                  error={null}
                  name="state-select"
                  helperText=""
                  label="State"
                  outlined
                  handleChange={(identifier, value) => handleCountryRegion(identifier, value)}
                  country={country}
                  region={region}
                />
              </Box>
            </Grid>
          </Grid>
          <Grid item md={8} sm={8} xs={12}>
            <Grid container justify="space-between">
              <Button
                type="submit"
                variant="outlined"
                className={classes.mt2}
              >
                Save
              </Button>
              <Button
                variant="outlined"
                className={classes.mt2}
                onClick={onClose}
              >
                Back
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

AddressConfirmationForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddressConfirmationForm;
