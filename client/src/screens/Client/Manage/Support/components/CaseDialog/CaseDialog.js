import React, { useState } from "react";

import {
  TextField, Button, Grid, Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";
import SupportAPI from "../../../../../../services/supportStatus.service";

const useStyles = makeStyles((theme) => ({
  formInput: {
    marginBottom: theme.spacing(4),
  },
}));

const NewMessage = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { isOpen, onClose } = props;

  const [formFields, setFormFields] = useState({
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const reqBody = {
      data: {
        message: formFields.message,
        subject: formFields.subject,
      },
    };
    SupportAPI.createCase(reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.message}`, { variant: "success" });
        onClose();
      });
  };

  return (
    <Dialog
      open={isOpen}
      title="New Case"
      message={(
        <form onSubmit={onFormSubmit}>
          <Grid className={classes.formInput} item md={4}>
            <TextField
              required
              autoFocus
              variant="standard"
              name="subject"
              id="subject"
              label="Subject"
              type="text"
              fullWidth
              value={formFields.subject}
              onChange={(e) => handleInputChange(e)}
            />
          </Grid>
          <Grid item lg={2}>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Message
            </Typography>
          </Grid>
          <Grid className={classes.formInput} item md={12}>
            <TextField
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

          <Grid>
            <Button variant="outlined" type="submit">
              Save
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
};

export default NewMessage;
