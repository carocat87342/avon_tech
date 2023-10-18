import React from "react";

import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => createStyles({
  titleContainer: {
    minHeight: 50,
    backgroundColor: theme.palette.primary.main,
    "& h5": {
      color: theme.palette.common.white,
    },
  },
  content: {
    padding: "1rem 1.5rem",
  },
  actionsContainer: {
    padding: "1rem 1.5rem",
    justifyContent: "space-between",
  },
  w100: {
    minWidth: 100,
  },
}));

const DialogForm = ({
  title,
  open,
  message,
  applyForm,
  cancelForm,
  applyButtonText,
  cancelButtonText,
  size,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={cancelForm}
      fullWidth
      maxWidth={size}
      disableBackdropClick
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          applyForm();
        }
        if (event.key === "Escape") {
          cancelForm();
        }
      }}
    >
      <DialogTitle disableTypography className={classes.titleContainer} id="form-dialog-title">
        <Typography variant="h5">{title}</Typography>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Typography variant="h5">{message}</Typography>
      </DialogContent>
      <DialogActions classes={{ root: classes.actionsContainer }}>
        <Button
          className={classes.w100}
          onClick={cancelForm}
          type="submit"
          variant="outlined"
          disableElevation
        >
          {cancelButtonText}
        </Button>
        <Button
          className={classes.w100}
          onClick={applyForm}
          type="submit"
          variant="outlined"
          color="primary"
          disableElevation
        >
          {applyButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogForm.defaultProps = {
  title: "",
  message: "",
  applyForm: () => { },
  cancelForm: () => { },
  applyButtonText: "Continue",
  cancelButtonText: "Cancel",
  size: "xs",
};

DialogForm.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string,
  applyForm: PropTypes.func,
  cancelForm: PropTypes.func,
  applyButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  size: PropTypes.string,
};

export default DialogForm;
