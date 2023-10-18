import React, { useEffect, useState } from "react";

import { colors } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import EmailPatient from "../../../../../services/manage/emailPatient.service";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
  },
  statusWrapper: {
    display: "block",
  },
  status: {
    display: "inline",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.text.secondary,
    "& .MuiSelect-select": {
      minWidth: 120,
    },
  },
  formLabel: {
    fontSize: "14px",
    fontWeight: "600",
    width: "220px",
  },
  formHelperText: {
    // width: "230px",
    fontSize: "12px",
    paddingLeft: "16px",
  },
  formField: {
    flex: 1,
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  formFieldLarge: {
    maxWidth: "270px",
    flex: 1,
    width: "300px",
  },
  formFieldSmall: {
    maxWidth: "100px",
    flex: 1,
  },
  textArea: {
    marginTop: "12px",
  },
}));

const EditEmail = ({
  isOpen,
  onClose,
  onUpdate,
  ...props
}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [emailData, setEmailData] = useState([]);

  useEffect(() => {
    setEmailData(props.selectedEmail);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.selectedEmail]);

  const handleFormSubmission = () => {
    EmailPatient.updateEmailHistory({ data: { emailData } }).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      onUpdate();
      onClose();
    });
  };

  const handleOnChange = (event) => {
    setEmailData({
      ...emailData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className={classes.title}>
          Edit Email
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            Edit the following for this email
          </DialogContentText>
          <div className={classes.root}>
            <FormControl component="div" className={classes.formControl}>
              <TextField
                autoFocus
                className={classes.formFieldLarge}
                variant="outlined"
                label="Subject"
                margin="normal"
                fullWidth
                name="subject"
                id="subject"
                autoComplete="subject"
                onChange={(event) => handleOnChange(event)}
                value={emailData.subject}
                size="small"
              />
            </FormControl>
            <div className={classes.statusWrapper}>
              <Typography component="p" variant="body2" color="textPrimary">
                Patient Status:
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="status"
                  name="status"
                  value={emailData.status}
                  onChange={handleOnChange}
                  className={classes.status}
                >
                  <FormControlLabel value="U" control={<Radio />} label="Active" />
                  <FormControlLabel value="R" control={<Radio />} label="Inactive" />
                </RadioGroup>
              </FormControl>
            </div>
            <FormControl
              component="div"
              className={`${classes.formControl} ${classes.textArea}`}
            >
              <TextField
                fullWidth
                variant="outlined"
                label="Message"
                multiline
                name="message"
                InputProps={{
                  classes: classes.normalOutline,
                  inputComponent: TextareaAutosize,
                  rows: 8,
                }}
                value={emailData.message}
                onChange={(event) => handleOnChange(event)}
              />
            </FormControl>
          </div>
        </DialogContent>
        <DialogActions className={classes.modalAction}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onClose()}
            style={{
              borderColor: colors.orange[600],
              color: colors.orange[600],
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleFormSubmission()}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

EditEmail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isConfirmView: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  selectedEmail: PropTypes.shape({
    id: PropTypes.number,
    created: PropTypes.string,
    created_user: PropTypes.string,
    message: PropTypes.string,
    status: PropTypes.string,
    subject: PropTypes.string,
  }).isRequired,
};

export default EditEmail;
