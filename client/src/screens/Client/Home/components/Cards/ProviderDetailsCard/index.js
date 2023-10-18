import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import { isEmpty } from "../../../../../../utils/helpers";
// eslint-disable-next-line import/order
import Colors from "../../../../../../theme/colors";
import ProcessLab from "../../../../../Lab";
import ProcessMessage from "../../../../../ProcessMessage";

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
}));

const ProviderDetailsCard = ({ selectedProvider, providerDetails, fetchProviderDetails }) => {
  const classes = useStyles();
  const [showMessagesModal, setShowMessagesModal] = useState(false);
  const [showLabsModal, setShowLabsModal] = useState(false);

  const patientLabsCount = !!providerDetails
    && providerDetails.patientLabs
    && providerDetails.patientLabs["count(l.id)"];

  const patientLabsDate = !!providerDetails
    && providerDetails.patientLabs
    && providerDetails.patientLabs["min(l.created)"];


  const dateValidation = (date, jsx) => {
    if (!moment(date).isValid()) return null;
    return jsx;
  };

  const toggleMessagesModal = () => {
    setShowMessagesModal((prevState) => !prevState);
  };

  const toggleLabsModal = () => {
    setShowLabsModal((prevState) => !prevState);
  };

  return (
    <>
      {!!showMessagesModal && (
        <Dialog
          fullHeight
          open={showMessagesModal}
          title="Message From Patient"
          message={(
            <ProcessMessage
              fetchProviderDetails={fetchProviderDetails}
              selectedProvider={selectedProvider}
            />
          )}
          cancelForm={() => toggleMessagesModal()}
          size="xl"
          hideActions
        />
      )}
      {!!showLabsModal && (
        <Dialog
          fullHeight
          open={showLabsModal}
          title="Documents"
          message={(
            <ProcessLab
              fromHome
              userId={selectedProvider.id}
              fetchProviderDetails={fetchProviderDetails}
              onClose={toggleLabsModal}
            />
          )}
          cancelForm={() => toggleLabsModal()}
          size="xl"
          hideActions
        />
      )}
      <Card className={classes.providerDetails} variant="outlined">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
        >
          <Typography className={classes.title}>
            User Details
            {" "}
            {!isEmpty(selectedProvider) && `- ${selectedProvider?.name}`}
          </Typography>
        </Grid>

        <CardContent>
          <ul className={classes.providers}>
            <li className={classes.providersLabel}>
              <div>Type</div>
              <div className={classes.count}>Count</div>
              <div>Since</div>
            </li>
            <li onClick={() => (patientLabsCount ? toggleLabsModal() : {})} aria-hidden="true">
              <>
                <div>Patient Labs</div>
                <div className={classes.count}>
                  {patientLabsCount}
                </div>
                <div>
                  {dateValidation(patientLabsDate, (patientLabsDate !== undefined && patientLabsDate)
                    ? `${moment(patientLabsDate).format("ll")}
                          (${moment(patientLabsDate).startOf("day").fromNow()})`
                    : "")}
                </div>
              </>
            </li>

            <li onClick={() => toggleMessagesModal()} aria-hidden="true">
              {/* <Link to={`/process-message/${selectedProvider.id}`}> */}
              <div>Messages from Patients</div>
              <div className={classes.count}>
                {!!providerDetails
                  && providerDetails.messageFromPatients
                  && providerDetails.messageFromPatients["count(m.id)"]}
              </div>
              <div>
                {dateValidation(providerDetails.messageFromPatients?.["min(m.created)"],
                  !!providerDetails
                  && providerDetails.messageFromPatients
                  && `${moment(providerDetails.messageFromPatients["min(m.created)"]).format("ll")}
                    (${moment(providerDetails.messageFromPatients["min(m.created)"])
      .startOf("day").fromNow()})`)}
              </div>
              {/* </Link> */}
            </li>
            { /* Comment out by Ruhul as per #CLIN-18 */}
            <li style={{ display: "none" }}>
              <div>Messages To Patients Unread</div>
              <div className={classes.count}>
                {!!providerDetails
                  && providerDetails.messageToPatientsNotRead
                  && providerDetails.messageToPatientsNotRead["count(m.id)"]}
              </div>
              <div>
                {dateValidation(providerDetails.messageToPatientsNotRead?.["min(m.unread_notify_dt)"],
                  !!providerDetails
                    && providerDetails.messageToPatientsNotRead
                    && providerDetails.messageToPatientsNotRead[
                      "min(m.unread_notify_dt)"
                    ]
                    ? `${moment(
                      providerDetails.messageToPatientsNotRead[
                        "min(m.unread_notify_dt)"
                      ],
                    ).format("ll")} (${moment(
                      providerDetails.messageToPatientsNotRead[
                        "min(m.unread_notify_dt)"
                      ],
                    )
                      .startOf("day")
                      .fromNow()})`
                    : "")}
              </div>
            </li>
            <li>
              <div>Patient Appointment Requests</div>
              <div className={classes.count}>
                {!!providerDetails
                  && providerDetails.patientAppointmentRequest
                  && providerDetails.patientAppointmentRequest["count(uc.client_id)"]}
              </div>
              <div>
                {dateValidation(providerDetails.patientAppointmentRequest?.["min(uc.created)"],
                  !!providerDetails
                    && providerDetails.patientAppointmentRequest
                    && providerDetails.patientAppointmentRequest[
                      "min(uc.created)"
                    ]
                    ? `${moment(
                      providerDetails.patientAppointmentRequest[
                        "min(uc.created)"
                      ],
                    ).format("ll")} (${moment(
                      providerDetails.patientAppointmentRequest[
                        "min(uc.created)"
                      ],
                    )
                      .startOf("day")
                      .fromNow()})`
                    : "")}
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

ProviderDetailsCard.propTypes = {
  fetchProviderDetails: PropTypes.func.isRequired,
  selectedProvider: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  providerDetails: PropTypes.shape({
    patientLabs: PropTypes.shape({
      "count(l.id)": PropTypes.number,
      "min(l.created)": PropTypes.number,
      "min(m.created)": PropTypes.number,
    }),
    messageFromPatients: PropTypes.shape({
      "count(m.id)": PropTypes.number,
      "min(m.created)": PropTypes.number,
    }),
    messageToPatientsNotRead: PropTypes.shape({
      "count(m.id)": PropTypes.number,
      "min(m.unread_notify_dt)": PropTypes.string,
    }),
    patientAppointmentRequest: PropTypes.shape({
      "count(uc.client_id)": PropTypes.number,
      "min(uc.created)": PropTypes.string,
    }),
  }).isRequired,
};

export default ProviderDetailsCard;
