import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, TextField, Grid, Typography, Box, Divider,
  List,
  ListItem,
} from "@material-ui/core";
import { omitBy } from "lodash";
import { useSnackbar } from "notistack";

import useAuth from "../../../hooks/useAuth";
import useDebounce from "../../../hooks/useDebounce";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import {
  Pharmacies as pharmacies,
} from "../../../static/patientBasicInfoForm";
import PharmacyCard from "./components/PharmacyCard";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  inputTextRow: {
    marginBottom: theme.spacing(3),
  },
  halfSectionCard: {
    padding: theme.spacing(1.5, 0, 1, 0),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const Pharmacies = () => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [inputText, setInputText] = useState("");
  const [inputType, setInputType] = useState("");
  const [searchText, setSearchText] = useState({
    pharmacy1: "",
    pharmacy2: "",
  });
  const [patientPharmacy, setPatientPharmacy] = useState({
    pharmacy1: null,
    pharmacy2: null,
  });
  const [searchedResults, setSearchedResults] = useState({
    pharmacy1: [],
    pharmacy2: [],
  });

  const fetchPatienPharmacy = useCallback(() => {
    PatientPortalService.getPharmacies().then((res) => {
      const apiData = res.data.length ? res.data[0] : null;
      if (apiData) {
        setPatientPharmacy({
          pharmacy1: omitBy(apiData, (value, key) => key.startsWith("pharmacy2")),
          pharmacy2: omitBy(apiData, (value, key) => !key.startsWith("pharmacy2")),
        });
      }
    });
  }, []);

  useEffect(() => {
    fetchPatienPharmacy();
  }, [fetchPatienPharmacy]);

  const saveSelectedPharmacy = (pharmacy, pharmacyName) => {
    const patientId = user?.client_id;
    const pharmacy1Id = pharmacyName === "pharmacy1" ? pharmacy.id : patientPharmacy.pharmacy1.id;
    const pharmacy2Id = pharmacyName === "pharmacy2" ? pharmacy.id : patientPharmacy.pharmacy2.pharmacy2_id;
    const reqBody = {
      data: {
        pharmacy_id: pharmacy1Id,
        pharmacy2_id: pharmacy2Id,
      },
    };
    PatientPortalService.updatePharmacy(patientId, reqBody).then((response) => {
      enqueueSnackbar(`${response.message}`, { variant: "success" });
      fetchPatienPharmacy();
      // clear searched results on selection after 1 sec
      setTimeout(() => {
        setSearchedResults({
          ...searchedResults,
          [pharmacyName]: [],
        });
        setSearchText({
          ...searchText,
          [pharmacyName]: "",
        });
      }, 500);
    });
  };

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSearchText({
      ...searchText,
      [name]: value,
    });
    setInputText(value);
    setInputType(name);
  };

  const debouncedSearchTerm = useDebounce(inputText, 1000);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length > 3) {
      const reqBody = {
        data: {
          text: debouncedSearchTerm,
        },
      };
      PatientPortalService.searchPharmacies(reqBody).then((res) => {
        setSearchedResults({
          ...searchedResults,
          [inputType]: res.data,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Pharmacies
      </Typography>
      <Grid item xs={6}>
        <Grid className={classes.halfSectionCard}>
          <Grid container spacing={3}>
            {pharmacies.map((pharmacy, index) => (
              <Grid key={pharmacy.name} item md={6}>
                <Typography variant="h4" color="textPrimary">
                  Pharmacy #
                  {" "}
                  {index + 1}
                </Typography>
                <TextField
                  id={pharmacy.id}
                  name={pharmacy.name}
                  label={pharmacy.label}
                  className={classes.inputTextRow}
                  value={searchText[pharmacy.name]}
                  onChange={(e) => handleInputChange(e)}
                  inputProps={{
                    autoComplete: "off",
                  }}
                />
                <List component="ul">
                  {
                    searchedResults[pharmacy.name].map((item) => (
                      <ListItem
                        key={item.id}
                        disableGutters
                        button
                        selected={
                          !!patientPharmacy[pharmacy.name]
                          && (patientPharmacy[pharmacy.name].id === item.id
                            || patientPharmacy[pharmacy.name].pharmacy2_id === item.id)
                        }
                        onClick={() => saveSelectedPharmacy(item, pharmacy.name)}
                      >
                        <Box key={item.id}>
                          <Typography gutterBottom>{item.name}</Typography>
                          <Typography gutterBottom>{item.address}</Typography>
                          <Typography gutterBottom>
                            {`${item.city} ${item.state} ${item.postal}`}
                          </Typography>
                          <Typography gutterBottom>
                            Phone
                            {item.phone}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))
                  }
                </List>
                {
                  searchedResults[pharmacy.name].length || searchedResults[pharmacy.name].length ? (
                    <Divider className={classes.divider} />
                  )
                    : null
                }
                {
                  !!patientPharmacy.pharmacy1 && index === 0 && (
                    <PharmacyCard
                      name={patientPharmacy.pharmacy1?.name}
                      address={patientPharmacy.pharmacy1?.address}
                      city={patientPharmacy.pharmacy1?.city}
                      state={patientPharmacy.pharmacy1?.state}
                      postal={patientPharmacy.pharmacy1?.postal}
                      phone={patientPharmacy.pharmacy1?.phone}
                    />
                  )
                }
                {
                  !!patientPharmacy.pharmacy2 && index === 1 && (
                    <PharmacyCard
                      name={patientPharmacy.pharmacy2?.pharmacy2_name}
                      address={patientPharmacy.pharmacy2?.pharmacy2_address}
                      city={patientPharmacy.pharmacy2?.pharmacy2_city}
                      state={patientPharmacy.pharmacy2?.pharmacy2_state}
                      postal={patientPharmacy.pharmacy2?.pharmacy2_postal}
                      phone={patientPharmacy.pharmacy2?.pharmacy2_phone}
                    />
                  )
                }
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Pharmacies;
