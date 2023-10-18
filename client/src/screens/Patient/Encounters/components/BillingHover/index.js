import React, { useState } from "react";

import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Dialog from "../../../../../components/Dialog";
import BillingDialogContent from "../Billng";

const useStyles = makeStyles(() => ({
  textButton: {
    cursor: "pointer",
    padding: "3px 5px",
    "&:hover": {
      backgroundColor: "#f1f1f1 !important",
    },
  },
  minWidth100: {
    minWidth: 100,
  },
}));

const BillingHover = (props) => {
  const classes = useStyles();
  const { closePopover } = props;

  const [showBillingDialog, setShowBillingDialog] = useState(false);

  const toggleBillingDialog = () => {
    setShowBillingDialog((prevState) => !prevState);
  };

  const closeBillingDialogWithPopover = () => {
    setShowBillingDialog(false);
    closePopover();
  };

  return (
    <>
      {!!showBillingDialog && (
        <Dialog
          open={showBillingDialog}
          title="Billing"
          message={<BillingDialogContent onClose={closeBillingDialogWithPopover} />}
          applyForm={() => toggleBillingDialog()}
          cancelForm={() => closeBillingDialogWithPopover()}
          hideActions
          size="lg"
        />
      )}
      <Box minWidth={150}>
        <Typography
          variant="h5"
          className={classes.textButton}
          onClick={() => toggleBillingDialog()}
        >
          View Billing
        </Typography>
      </Box>
    </>
  );
};

BillingHover.defaultProps = {
  closePopover: () => { },
};

BillingHover.propTypes = {
  closePopover: PropTypes.func,
};


export default BillingHover;
