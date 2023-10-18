import React, { useEffect, useState } from "react";

import { colors } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
      fontSize: "16px",
    },
  },
  content: {
    paddingLeft: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(6),
    fontSize: "18px",
    "& p": {
      fontSize: "16px",
    },
  },
  emailDataWrap: {
    paddingTop: theme.spacing(2),
  },
  record: {
    display: "flex",
    marginBottom: theme.spacing(1),
    fontSize: "16px",
    lineHeight: "24px",
    "& p:first-child": {
      fontWeight: "600",
      fontSize: "18px",
      minWidth: "87px",
      marginRight: theme.spacing(1),
    },
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
}));

const ConfirmEmail = ({
  isOpen,
  onClose,
  onSave,
  ...props
}) => {
  const classes = useStyles();
  const [emailData, setEmailData] = useState([]);
  useEffect(() => {
    setEmailData(props.emailData);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.emailData]);

  const handleFormSubmission = () => {
    onSave({ data: emailData });
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
          Email Confirmation
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            It will send email to all patient.
          </DialogContentText>
          <div className={classes.emailDataWrap}>
            {
              emailData && (
                <>
                  <div className={classes.record}>
                    <p>Status:</p>
                    <p>{emailData.emailStatus === "U" ? "Active" : "InActive"}</p>
                  </div>
                  <div className={classes.record}>
                    <p>Subject:</p>
                    <p>{emailData?.subject}</p>
                  </div>
                  <div className={classes.record}>
                    <p>message:</p>
                    <p>{emailData.message}</p>
                  </div>
                </>
              )
            }

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
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

ConfirmEmail.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  emailData: PropTypes.shape({
    emailStatus: PropTypes.string,
    // subject: PropTypes.string,
    message: PropTypes.string,
  }).isRequired,
};

export default ConfirmEmail;
