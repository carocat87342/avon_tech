import React, { useEffect, useMemo, useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import usePatientContext from "../../../hooks/usePatientContext";
import { toggleMessageDialog, resetSelectedMessage } from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";


const useStyles = makeStyles((theme) => ({
  formInput: {
    marginBottom: theme.spacing(4),
  },
  dateInput: {
    marginBottom: theme.spacing(2),
  },
  actionContainer: {
    marginTop: theme.spacing(4),
  },
}));

const NewMessage = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { reloadData } = props;

  const { state, dispatch } = usePatientContext();
  const { patientId } = state;
  const { selectedMessage, messageType } = state.messages;

  const [formFields, setFormFields] = useState({
    subject: "",
    message: "",
  });

  const isReplyDialog = useMemo(() => {
    if (messageType && messageType.includes("Reply")) {
      return true;
    }
    return false;
  }, [messageType]);

  useEffect(() => {
    if (selectedMessage) { // message is selected
      if (!isReplyDialog) { // not reply message
        formFields.message = selectedMessage.message;
      }
      formFields.subject = selectedMessage.subject;
      setFormFields({ ...formFields });
    }
    return () => !!selectedMessage && dispatch(resetSelectedMessage());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMessage]);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onMessageSend = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        message: formFields.message,
        subject: formFields.subject,
        unread_notify_dt: moment().format("YYYY-MM-DD"),
      },
    };
    if (selectedMessage && !isReplyDialog) { // edit case
      const messageId = selectedMessage.id;
      PatientService.updateMessage(patientId, messageId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(toggleMessageDialog());
        });
    } else {
      PatientService.createMessage(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(toggleMessageDialog());
        });
    }
  };

  return (
    <>
      <form onSubmit={onMessageSend}>
        {/* Commented out as per CLIN-114 */}
        {/* <Grid className={classes.formInput} item md={4}>
          <TextField
            autoFocus
            required
            variant="standard"
            name="subject"
            id="subject"
            label="Subject"
            type="text"
            fullWidth
            value={formFields.subject}
            onChange={(e) => handleInputChange(e)}
            InputProps={{
              readOnly: isReplyDialog,
            }}
          />
        </Grid> */}
        <Grid item lg={2}>
          <Typography gutterBottom variant="body1" color="textPrimary">
            Message
          </Typography>
        </Grid>
        <Grid className={classes.formInput} item md={12}>
          <TextField
            autoFocus
            required
            variant="outlined"
            name="message"
            id="message"
            type="text"
            fullWidth
            value={formFields.message}
            onChange={(e) => handleInputChange(e)}
            multiline
            rows={5}
          />
        </Grid>

        <Grid
          className={classes.actionContainer}
          container
          justify="space-between"
        >
          <Button variant="outlined" type="submit">
            Send
          </Button>
        </Grid>
      </form>
    </>
  );
};

NewMessage.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default NewMessage;
