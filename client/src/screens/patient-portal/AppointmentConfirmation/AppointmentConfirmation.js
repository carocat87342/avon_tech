import React from "react";

import { makeStyles, Typography } from "@material-ui/core";
import moment from "moment";
import { useLocation } from "react-router-dom";

import { dateFormat } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(2),
  },
}));

const AppointmentConfirmation = () => {
  const classes = useStyles();
  const location = useLocation();
  const {
    practitioner, date, time, reschedule,
  } = location.state;

  const { timeStart, timeEnd } = time;
  const startTime = moment(timeStart, ["HH.mm"]).format("h:mm A");
  const endTime = moment(timeEnd, ["HH.mm"]).format("h:mm A");

  return (
    <div className={classes.root}>
      <Typography
        component="p"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        {`Appointment ${reschedule ? "Reschedule" : "Request"} Confirmation`}
      </Typography>
      <Typography
        component="h1"
        variant="body1"
        color="textPrimary"

      >
        {`An appointment on ${dateFormat(date)} at ${startTime} to ${endTime}
         with ${practitioner} has been
          ${reschedule ? "Rescheduled" : "Requested"}.`}
      </Typography>
    </div>
  );
};

export default AppointmentConfirmation;
