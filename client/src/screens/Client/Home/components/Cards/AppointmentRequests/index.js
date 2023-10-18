import React from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Colors from "../../../../../../theme/colors";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "600",
    fontSize: "1em",
    "& h2": {
      color: "#fff",
    },
  },
  titleContainer: {
    padding: "0 0 0 1em",
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 47,
    justifyContent: "flex-start",
  },
  historyButton: {
    marginLeft: theme.spacing(2),
  },
  providers: {
    display: "block",
    listStyle: "none",
    width: "100%",
    "& li": {
      fontSize: "13px",
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: "3px 0px",
      cursor: "pointer",
      "&:hover": {
        background: "#fafafa",
      },
      "& div": {
        flex: 2,
      },
    },
    "& a": {
      fontSize: "13px",
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: "0px 0px",
      cursor: "pointer",
      textDecoration: "none",
      width: "100%",
      color: theme.palette.text.primary,
      "&:hover": {
        background: "#fafafa",
      },
      "& div": {
        flex: 2,
      },
    },
  },
  providersLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  count: {
    width: "30px",
    flex: "1 !important",
  },
  PatientsApptRequest: {
    marginTop: theme.spacing(1),
    "& li": {
      fontSize: "13px",
      listStyle: "none",
      lineHeight: "19px",
      marginBottom: theme.spacing(1.5),
    },
  },
  unreadMsgActions: {
    display: "flex",
    width: "138px",
    justifyContent: "space-between",
    fontSize: "13px",
    marginTop: "3px",
    lineHeight: 1.75,

    "& a": {
      textDecoration: "none",
      fontSize: "13px",
      color: theme.palette.text.primary,
    },
    "& button": {
      border: "none",
      padding: 0,
      fontSize: "13px",
    },
  },
  patientIconLink: {
    display: "inline-block",
    color: "rgba(0, 0, 0, 0.38)",
  },
  patientIcon: {
    width: "1rem !important",
    height: "1rem !important",
    marginBottom: "-5px",
    marginLeft: "4px",
  },
}));

const AppointmentRequests = ({
  appointmentRequests,
  selectedProvider,
  onHistoryClick,
  onMessageClick,
  onReject,
  onAccept,
}) => {
  const classes = useStyles();
  const handleRejectCall = (_, appt) => {
    const payload = {
      data: {
        id: appt.id,
        providerName: selectedProvider.name,
        patient: {
          id: appt.patient_id,
          firstname: appt.name,
          email: appt.patient_email,
        },
        appointmentDate: moment(appt.start_dt).format("YYYY-MM-DD HH:mm"),
      },
    };
    onReject(payload);
  };

  const handleAccept = (_, appt) => {
    const payload = {
      data: {
        id: appt.id,
        ApptStatus: "A",
        start_dt: appt.start_dt,
        end_dt: appt.end_dt,
      },
    };
    onAccept(payload);
  };

  return (
    <Card className={classes.PatientsApptRequest} variant="outlined">
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography className={classes.title}>
          Patient Appointment Requests
        </Typography>
        <Button className={classes.historyButton} onClick={onHistoryClick}>History</Button>
      </Grid>
      <CardContent>
        <ul>
          {appointmentRequests.length > 0 ? (
            appointmentRequests.map((appt) => {
              const {
                name, end_dt, start_dt, reschedule, appointment_type, patient_id,
              } = appt;
              const appointmentRequestType = reschedule ? "Reschedule Appointment" : "New Appointment";
              const formattedStartDate = moment(start_dt).format("ll, h:mm");
              const formattedEndDate = moment(end_dt).format("h:mm");
              return (
                <li key={appt.id}>
                  {name}
                  <Link
                    to={`/patients/${patient_id}`}
                    className={classes.patientIconLink}
                    target="_blank"
                  >
                    <Icon
                      className={classes.patientIcon}
                      path={mdiOpenInNew}
                      size={1}
                      horizontal
                      vertical
                      rotate={180}
                    />
                  </Link>
                  {` , ${appointmentRequestType}, ${appointment_type ? `${appointment_type}` : ""}`}
                  <br />
                  {`${selectedProvider.name}, ${formattedStartDate} - ${formattedEndDate}`}
                  <div className={classes.unreadMsgActions}>
                    <Button onClick={(_) => handleAccept(_, appt)}>Accept</Button>
                    <Button onClick={(_) => handleRejectCall(_, appt)}>
                      Reject
                    </Button>
                    <Button onClick={(_) => onMessageClick(_, appt.patient_id)}>
                      Message
                    </Button>
                  </div>
                </li>
              );
            })
          ) : (
            <p />
          )}
        </ul>
      </CardContent>
    </Card>
  );
};

AppointmentRequests.propTypes = {
  appointmentRequests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      patient_id: PropTypes.number,
      name: PropTypes.string,
      start_dt: PropTypes.string,
      end_dt: PropTypes.string,
      created: PropTypes.string,
    }),
  ).isRequired,
  selectedProvider: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onHistoryClick: PropTypes.func.isRequired,
  onMessageClick: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};
export default AppointmentRequests;
