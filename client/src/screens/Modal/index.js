/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseOutlined";


const useStyles = makeStyles((theme) => createStyles({
  titleContainer: {
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    minHeight: 53,
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: theme.spacing(1),
  },
  content: {
    padding: "1rem 1.5rem",
    whiteSpace: "pre-line",
  },
  actionsContainer: {
    padding: "1rem 1.5rem",
    justifyContent: "space-between",
  },
  w100: {
    minWidth: 100,
  },
}));


export default function CustomizedDialogs(params) {
  const {
    title, body, isModalOpen, isModalClose,
  } = params;
  const [open, setOpen] = React.useState(isModalOpen);
  const classes = useStyles();

  return (
    <div>
      <Dialog fullWidth maxWidth="md" onClose={isModalClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={isModalClose} className={classes.titleContainer}>
          {title}
          <IconButton aria-label="Close" className={classes.closeButton} onClick={isModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className={classes.content} dividers>
          {body}

        </DialogContent>
      </Dialog>
    </div>
  );
}
