import React, { useCallback, useEffect, useState } from "react";

import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Dialog from "../../../../../components/Dialog";
import FaxLab from "../FaxLab";
import FaxPrescription from "../FaxPrescription";
import NewRequisitions from "../NewLabRequisitions";
import NewPrescription from "../NewPrescription";

const useStyles = makeStyles((theme) => ({
  keyText: {
    fontSize: 14,
    marginLeft: theme.spacing(1),
  },
  textButton: {
    cursor: "pointer",
    padding: "3px 5px",
    "&:hover": {
      backgroundColor: "#f1f1f1 !important",
    },
  },
}));

const PlanHover = (props) => {
  const classes = useStyles();
  const { closePopover } = props;
  const [showNewPrescriptionDialog, setShowNewPrescriptionDialog] = useState(false);
  const [showNewRequisitionDialog, setShowNewRequisitionDialog] = useState(false);
  const [showFaxPrescriptionDialog, setShowFaxPrescriptionDialog] = useState(false);
  const [showFaxLabRequisitionDialog, setShowFaxLabRequisitionDialog] = useState(false);

  const toggleNewPrescriptionDialog = () => {
    setShowNewPrescriptionDialog((prevState) => !prevState);
  };

  const toggleNewRequisitionDialog = () => {
    setShowNewRequisitionDialog((prevState) => !prevState);
  };

  const toggleFaxPrescriptionDialog = () => {
    setShowFaxPrescriptionDialog((prevState) => !prevState);
  };

  const toggleFaxLabRequisitionDialog = () => {
    setShowFaxLabRequisitionDialog((prevState) => !prevState);
  };

  const handleKeyPress = useCallback((event) => {
    if (event.code === "KeyP") {
      setShowNewPrescriptionDialog((prevState) => !prevState);
      window.removeEventListener("keydown", handleKeyPress);
    }
    if (event.code === "KeyL") {
      setShowNewRequisitionDialog((prevState) => !prevState);
      window.removeEventListener("keydown", handleKeyPress);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const closePrescriptionDialogWithPopover = () => {
    setShowNewPrescriptionDialog(false);
    closePopover();
  };

  const closeRequisitionDialogWithPopover = () => {
    setShowNewRequisitionDialog(false);
    closePopover();
  };

  const closeFaxPrescriptionDialogWithPopover = () => {
    setShowFaxPrescriptionDialog(false);
    closePopover();
  };

  const closeFaxLabRequisitionDialogWithPopover = () => {
    setShowFaxLabRequisitionDialog(false);
    closePopover();
  };

  const removeKeyListener = () => {
    window.removeEventListener("keydown", handleKeyPress);
  };

  return (
    <>
      {!!showNewPrescriptionDialog && (
        <Dialog
          open={showNewPrescriptionDialog}
          title="New Prescription"
          message={<NewPrescription onClose={closePrescriptionDialogWithPopover} />}
          applyForm={() => toggleNewPrescriptionDialog()}
          cancelForm={() => closePrescriptionDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      {!!showNewRequisitionDialog && (
        <Dialog
          open={showNewRequisitionDialog}
          title="New Requisition"
          message={<NewRequisitions onClose={closeRequisitionDialogWithPopover} />}
          applyForm={() => toggleNewRequisitionDialog()}
          cancelForm={() => closeRequisitionDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      {!!showFaxPrescriptionDialog && (
        <Dialog
          open={showFaxPrescriptionDialog}
          title="Fax Prescription"
          message={<FaxPrescription onClose={closeFaxPrescriptionDialogWithPopover} />}
          applyForm={() => toggleFaxPrescriptionDialog()}
          cancelForm={() => closeFaxPrescriptionDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      {!!showFaxLabRequisitionDialog && (
        <Dialog
          open={showFaxLabRequisitionDialog}
          title="Fax Lab Requisition"
          message={<FaxLab onClose={closeFaxLabRequisitionDialogWithPopover} />}
          applyForm={() => toggleFaxLabRequisitionDialog()}
          cancelForm={() => closeFaxLabRequisitionDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      <Typography
        variant="h5"
        gutterBottom
        className={classes.textButton}
        onClick={() => {
          toggleNewPrescriptionDialog();
          removeKeyListener();
        }}
      >
        New Prescription
        <span className={classes.keyText}>
          (P on keyboard)
        </span>
      </Typography>

      <Typography
        variant="h5"
        gutterBottom
        className={classes.textButton}
        onClick={() => {
          toggleNewRequisitionDialog();
          removeKeyListener();
        }}
      >
        New Lab Requisitions
        <span className={classes.keyText}>
          (L on keyboard)
        </span>
      </Typography>

      <Typography
        variant="h5"
        gutterBottom
        className={classes.textButton}
        onClick={() => toggleFaxPrescriptionDialog()}
      >
        Fax Prescription
      </Typography>

      <Typography
        variant="h5"
        gutterBottom
        className={classes.textButton}
        onClick={() => toggleFaxLabRequisitionDialog()}
      >
        Fax Lab Requisitions
      </Typography>
    </>
  );
};

PlanHover.defaultProps = {
  closePopover: () => { },
};

PlanHover.propTypes = {
  closePopover: PropTypes.func,
};

export default PlanHover;
