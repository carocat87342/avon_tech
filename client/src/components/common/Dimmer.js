import React from "react";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

// TODO:: Add local fetching indicator https://www.basefactor.com/react-how-to-display-a-loading-indicator-on-fetch-calls
const Dimmer = ({ isOpen }) => {
  const classes = useStyles();
  const handleClose = () => {
  };

  return (
    <Backdrop className={classes.backdrop} open={isOpen} onClick={handleClose}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

Dimmer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
};

export default Dimmer;
