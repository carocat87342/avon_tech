import React, { useEffect, useState, useCallback } from "react";

import {
  makeStyles, Grid, Divider, Typography,
} from "@material-ui/core";
import moment from "moment";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  mainContainer: {
    margin: theme.spacing(2, 0),
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  block: {
    width: 100,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  text12: {
    fontSize: 12,
  },
}));

const Encounters = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const [encounters, setEncounters] = useState([]);

  const fetchEncounters = useCallback(() => {
    PatientPortalService.getEncounters(lastVisitedPatient).then((res) => {
      setEncounters(res.data);
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchEncounters();
  }, [fetchEncounters]);

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Encounters
      </Typography>
      <Typography
        component="h5"
        variant="body1"
        color="textPrimary"
        className={classes.title}
      >
        This page is used to view your treatment plans.
      </Typography>
      {
        encounters.length
          ? encounters.map((item, index) => (
            <Grid
              item
              md={5}
              key={moment(item.dt).format("MMM D YYYY")}
              className={classes.mainContainer}
            >
              <Grid className={classes.inputRow} container>
                <Typography component="p" variant="body2" color="textPrimary">
                  <span style={{ fontWeight: "bold" }}>Date: </span>
                  {` ${moment(item.dt).format("ll, h:mmA")} `}
                  <span style={{ fontWeight: "bold" }}>From: </span>
                  {` ${item?.user_from || item?.patient_from} `}
                  <span style={{ fontWeight: "bold" }}>To: </span>
                  {item?.patient_to ? item.patient_to : "You"}
                  <br />
                  {/* {item.treatment ? item.treatment: "No treatment found..."} */}
                  {item.treatment}
                </Typography>
              </Grid>
              {index + 1 !== encounters.length && <Divider className={classes.divider} />}
            </Grid>
          ))
          : <Typography>No Encounters found...</Typography>
      }
    </div>
  );
};

export default Encounters;
