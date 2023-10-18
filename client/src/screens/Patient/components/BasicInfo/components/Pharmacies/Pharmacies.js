import React, { useState, useEffect, useCallback } from "react";

import {
  makeStyles, TextField, Grid, Typography, Box, Divider,
  List,
  ListItem,
} from "@material-ui/core";
import _ from "lodash";
import PropTypes from "prop-types";

import PatientPortalService from "../../../../../../services/patient_portal/patient-portal.service";
import {
  Pharmacies as pharmacies,
} from "../../../../../../static/patientBasicInfoForm";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: 400,
  },
  cardRoot: {
    border: "1px solid",
    margin: theme.spacing(0, 0, 1, 0),
    borderRadius: 0,
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  inputTextRow: {
    marginBottom: theme.spacing(3),
  },
  halfSectionCard: {
    padding: theme.spacing(0.5),
  },
  ml1: {
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const Pharmacies = (props) => {
  const classes = useStyles();
  const { onChange, pharmacy1Id, pharmacy2Id } = props;
  const [selectedPharmacy, setSelectedPharmacy] = useState({
    pharmacy1: null,
    pharmacy2: null,
  });
  const [patientPharmacy, setPatientPharmacy] = useState({
    pharmacy1: null,
    pharmacy2: null,
  });
  const [searchedResults, setSearchedResults] = useState({
    pharmacy1: [],
    pharmacy2: [],
  });

  const fetchAllPharmacies = useCallback(() => {
    const reqBody = {
      data: {
        text: "",
      },
    };
    PatientPortalService.searchPharmacies(reqBody).then((res) => {
      const { data: apiData } = res;
      if (apiData.length) {
        const pharmacyFirst = apiData.filter((x) => x.id === pharmacy1Id);
        const pharmacySecond = apiData.filter((x) => x.id === pharmacy2Id);
        const pharmacy1 = pharmacyFirst.length ? pharmacyFirst[0] : null;
        const pharmacy2 = pharmacySecond.length ? pharmacySecond[0] : null;
        setPatientPharmacy({
          pharmacy1,
          pharmacy2,
        });
      }
    });
  }, [pharmacy1Id, pharmacy2Id]);

  useEffect(() => {
    fetchAllPharmacies();
  }, [fetchAllPharmacies]);

  const debouncedSearchPharmacies = _.debounce((event) => {
    const { name, value } = event.target;
    const reqBody = {
      data: {
        text: value,
      },
    };
    PatientPortalService.searchPharmacies(reqBody).then((res) => {
      setSearchedResults({
        ...searchedResults,
        [name]: res.data,
      });
    });
  }, 1000);

  const saveSelectedPharmacy = (name, item) => {
    const updatedState = {
      ...selectedPharmacy,
      [name]: item,
    };
    setSelectedPharmacy({ ...updatedState });
    onChange(updatedState);
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.halfSectionCard}>
        <Grid container spacing={3}>
          {pharmacies.map((pharmacy, index) => (
            <Grid key={pharmacy.name} item md={4}>
              <Typography variant="h5" color="textPrimary">
                {`Pharmacy # ${index + 1}`}
              </Typography>
              <TextField
                id={pharmacy.id}
                name={pharmacy.name}
                label={pharmacy.label}
                className={classes.inputTextRow}
                onChange={(e) => debouncedSearchPharmacies(e)}
              />
              <List component="ul">
                {
                  searchedResults[pharmacy.name].map((item) => (
                    <ListItem
                      key={item.id}
                      disableGutters
                      button
                      selected={
                        !!selectedPharmacy[pharmacy.name] && selectedPharmacy[pharmacy.name].id === item.id
                      }
                      onClick={() => saveSelectedPharmacy(pharmacy.name, item)}
                    >
                      <Box key={item.id}>
                        <Typography gutterBottom>{item.name}</Typography>
                        <Typography gutterBottom>{item.address}</Typography>
                        <Typography gutterBottom>
                          {`${item.city} ${item.state} ${item.postal}`}
                        </Typography>
                        <Typography gutterBottom>
                          Phone
                          <span className={classes.ml1}>{item.phone}</span>
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
                !!patientPharmacy[pharmacy.name] && (
                  <Grid className={classes.halfSectionCard}>
                    <Typography gutterBottom>{patientPharmacy[pharmacy.name].name}</Typography>
                    <Typography gutterBottom>{patientPharmacy[pharmacy.name].address}</Typography>
                    <Typography gutterBottom>
                      {`${patientPharmacy[pharmacy.name].city || ""} 
                      ${patientPharmacy[pharmacy.name].state || ""} 
                      ${patientPharmacy[pharmacy.name].postal || ""}`}
                    </Typography>
                    {patientPharmacy[pharmacy.name].phone && (
                      <Typography gutterBottom>
                        Phone
                        <span className={classes.ml1}>{patientPharmacy[pharmacy.name].phone}</span>
                      </Typography>
                    )}
                  </Grid>
                )
              }
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

Pharmacies.propTypes = {
  onChange: PropTypes.func.isRequired,
  pharmacy1Id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  pharmacy2Id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};

export default Pharmacies;
