import React, { useEffect, useState } from "react";

import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import { useSnackbar } from "notistack";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";

import useAuth from "../../../hooks/useAuth";
import HomeService from "../../../services/patient_portal/home.service";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(5),
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
  },
  Logo: {
    backgroundColor: "grey",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "transparent",
    color: theme.palette.text.secondary,
  },
  BoxStyle: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.borderColor,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: theme.spacing(1),
    margin: "10px 0",
  },
  formBox: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.borderColor,
    borderWidth: "1px",
    borderStyle: "solid",
    padding: theme.spacing(1),
    margin: "5px 0 10px 0",
    "& p": {
      lineHeight: "21px",
    },
  },
  pageTitle: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  withErrors: {
    opacity: 0.9,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  rescheduleLink: {
    marginLeft: theme.spacing(1),
    fontSize: 14,
    color: "rgb(85, 26, 139)",
    letterSpacing: "-0.05px",
    lineHeight: "21px",
    margin: 0,
    padding: 0,
    textDecorationLine: "underline",
  },
  linkTag: {
    margin: theme.spacing(0, 0.5),
  },
}));

const Home = () => {
  const classes = useStyles();
  const [header, setHeader] = useState({});
  const { lastVisitedPatient } = useAuth();
  const [clientForms, setClientForms] = useState({});
  const [upcomingAppointments, setUpcomingAppointments] = useState({});
  const [purchaseLabs, setPurchaseLabs] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    HomeService.getPurchaseLabs(lastVisitedPatient).then(
      (response) => {
        setPurchaseLabs(response.data);
      },
      (error) => {
        console.error("error", error);
      },
    );
    HomeService.getClientHeader(lastVisitedPatient).then(
      (response) => {
        setHeader(response.data[0]);
      },
      (error) => {
        console.error("error", error);
      },
    );
    HomeService.getClientForms(lastVisitedPatient).then(
      (response) => {
        setClientForms(response.data[0]);
      },
      (error) => {
        console.error("error", error);
      },
    );
    HomeService.getUpcomingAppointments(lastVisitedPatient).then(
      (response) => {
        setUpcomingAppointments(response.data);
      },
      (error) => {
        console.error("error", error);
      },
    );
  }, [lastVisitedPatient]);

  const handleCancelRequestRescheduleAppointmentCancel = (appointmentId) => {
    PatientPortalService.cancelRequestRescheduleAppointment(appointmentId).then(
      () => {
        enqueueSnackbar(`Appointment canceled successfully`, {
          variant: "success",
        });
      },
      (error) => {
        console.error("error", error);
      },
    );
  };

  const formatAppointmentType = (status) => {
    if (status === "A") {
      return "scheduled";
    }
    if (status === "R") {
      return "requested";
    }
    return "";
  };

  const renderAppointmentRowText = ({
    provider, start_dt, end_dt, status,
  }) => {
    const formattedStatus = formatAppointmentType(status);
    const formattedStartDate = moment(start_dt).format("MMM Do YYYY, h:mm a");
    const formattedEndDate = moment(end_dt).format("h:mm  a");

    return `Appointment ${formattedStatus} with ${provider} on ${formattedStartDate} - ${formattedEndDate}`;
  };

  return (
    <div className={classes.paper}>
      <CssBaseline />
      <Typography component="h1" variant="h2" className={classes.pageTitle}>
        Portal Home
      </Typography>
      <Alert icon={false} variant="filled" severity="info">
        {header && ReactHtmlParser(header.header)}
      </Alert>
      {Boolean(upcomingAppointments?.length)
        && upcomingAppointments?.filter(((appointment) => appointment?.status !== "D")).map((appointment) => (
          <Box component="div" className={classes.BoxStyle} key={appointment.id}>
            <Typography>
              {renderAppointmentRowText(appointment)}
              {appointment?.reschedule_id === null && (
                <Link
                  to={{ pathname: "/patient/appointments", state: { appointment } }}
                  className={classes.rescheduleLink}
                >
                  Request Reschedule Appointment
                </Link>
              )}
              {appointment?.reschedule_id !== null && (
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    handleCancelRequestRescheduleAppointmentCancel(appointment?.id);
                  }}
                  className={classes.rescheduleLink}
                >
                  Cancel Request Reschedule Appointment
                </Button>
              )}
            </Typography>
          </Box>
        ))}

      {clientForms && (
        <Box component="div" className={classes.formBox}>
          <Typography>
            Please fill out the following forms:
            <Link to="/" className={classes.linkTag}>{clientForms.title}</Link>
          </Typography>
        </Box>
      )}

      {Boolean(purchaseLabs?.length) && (
        <Box component="div" className={classes.formBox}>
          <Typography>
            There is a new lab requisition for you,
            <Link
              className={classes.linkTag}
              to="/patient/purchase-labs"
            >
              click here
            </Link>
            to proceed.
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default Home;
