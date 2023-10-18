import React, { useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../components/Dialog";
import useAuth from "../../../../hooks/useAuth";
import MessageToUserService from "../../../../services/message-to-user.service";

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
  const { user } = useAuth();
  const {
    isOpen, onClose, fileName,
  } = props;

  const [formFields, setFormFields] = useState({
    subject: fileName,
    message: "",
  });

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
        user_id_from: user.id,
      },
    };
    MessageToUserService.createMessage(reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        onClose();
      });
  };

  return (
    <Dialog
      open={isOpen}
      title="New Message"
      message={(
        <form onSubmit={onMessageSend}>
          {/* Commented out as per CLIN-114 */}
          {/* <Grid className={classes.formInput} item md={4}>
            <TextField
              required
              variant="standard"
              name="subject"
              id="subject"
              label="Subject"
              type="text"
              fullWidth
              value={formFields.subject}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid> */}
          <Grid item lg={2}>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Message
            </Typography>
          </Grid>
          <Grid className={classes.formInput} item md={12}>
            <TextField
              required
              autoFocus
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
      )}
      cancelForm={() => onClose()}
      hideActions
      size="md"
    />
  );
};

NewMessage.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fileName: PropTypes.string.isRequired,
};

export default NewMessage;
