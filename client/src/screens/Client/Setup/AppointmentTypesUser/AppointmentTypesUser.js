import React, {
  useEffect, useCallback, useState, useMemo,
} from "react";

import {
  Box, Typography, TextField, FormControlLabel,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import _ from "lodash";

import AppointmentTypeUserService from "../../../../services/appointmentTypeUser.service";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  labels: {
    fontWeight: 500,
    fontSize: 15,
    color: theme.palette.text.primary,
  },
  box: {
    minHeight: 75,
    display: "flex",
    alignItems: "center",
  },
  feesInput: {
    maxWidth: 80,
  },
}));

const AppointmentTypesUser = () => {
  const classes = useStyles();
  const [transformedData, setTransformedData] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const fetchAppointmentTypes = useCallback(() => {
    AppointmentTypeUserService.getAll().then((res) => {
      const { data } = res.data;
      const appointmentTypes = _.orderBy(res.data.appointment_types, "id");
      const usersArray = res.data.user;

      const groupedByUser = _.mapValues(_.groupBy(data, "user_id"));
      setUsers([...usersArray]);
      setAppointments([...appointmentTypes]);
      setTransformedData({ ...groupedByUser });
    });
  }, []);

  useEffect(() => {
    fetchAppointmentTypes();
  }, [fetchAppointmentTypes]);

  const updateStatusHandler = (event, key, index) => {
    const { checked } = event.target;
    const tempData = { ...transformedData };
    tempData[key][index].active = checked ? 1 : 0;
    setTransformedData({ ...tempData });
  };

  const updateFeesHandler = (event, key, index) => {
    const { value } = event.target;
    const tempData = { ...transformedData };
    tempData[key][index].amount = value;
    setTransformedData({ ...tempData });
  };

  const userColumns = useMemo(() => Object.keys(transformedData), [transformedData]);

  const getUserName = (usersState, key) => {
    let name = "";
    const nameArray = usersState.filter((x) => String(x.id) === String(key));
    if (nameArray.length) {
      name = nameArray[0].name;
    }
    return name;
  };

  return (
    <Container maxWidth={false} className={classes.root}>
      <Box mb={2}>
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          gutterBottom
        >
          Appointment Types User Assignment
        </Typography>
        <Typography component="p" variant="body2" color="textPrimary" gutterBottom>
          This page is used to select which appointment types are used by
          which providers
        </Typography>
      </Box>
      <Grid container spacing={1}>
        <Grid item xs={2}>
          <Grid className={classes.box} />
          {
            appointments.map((appt) => (
              <Grid className={classes.box} key={appt.id || Math.random()}>
                <Typography className={classes.labels}>{appt.appointment_type}</Typography>
              </Grid>
            ))
          }
        </Grid>
        {
          userColumns.length
            ? userColumns.map((key) => (
              <Grid item xs={2} key={key}>
                <Grid className={classes.box}>
                  <Typography className={classes.labels}>
                    {getUserName(users, key)}
                  </Typography>
                </Grid>
                {transformedData[key].map((item, index) => {
                  const hasValue = item.appointment_type_id === appointments[index].id;
                  return (
                    hasValue
                      ? (
                        <Grid
                          container
                          alignItems="center"
                          className={classes.box}
                          key={`${key}_${item.appointment_type_id}`}
                        >
                          <TextField
                            value={item.amount}
                            variant="outlined"
                            margin="dense"
                            label="Fee"
                            className={classes.feesInput}
                            onChange={(e) => updateFeesHandler(e, key, index)}
                          />
                          <FormControlLabel
                            value="top"
                            control={(
                              <Switch
                                color="primary"
                                checked={Boolean(item.active)}
                                onChange={(e) => updateStatusHandler(e, key, index)}
                              />
                            )}
                            label={item.active ? "Active" : "Inactive"}
                            labelPlacement="top"
                          />
                        </Grid>
                      )
                      : ""
                  );
                })}
              </Grid>
            ))
            : "Fetching Data..."
        }
      </Grid>
    </Container>
  );
};

export default AppointmentTypesUser;
