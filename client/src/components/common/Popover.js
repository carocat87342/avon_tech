import React from "react";

import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  paper: {
    padding: theme.spacing(1.5),
    pointerEvents: "auto",
  },
}));

const MouseOverPopover = (props) => {
  const classes = useStyles();
  const {
    open, anchorEl, children, handlePopoverClose,
  } = props;

  return (
    <Popover
      id="mouse-over-popover"
      className={classes.popover}
      classes={{
        paper: classes.paper,
      }}
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      onClose={handlePopoverClose}
      disableRestoreFocus
      // keep the paopover open if hover on popover content
      PaperProps={{ onMouseLeave: handlePopoverClose }}
    >
      {children}
    </Popover>
  );
};

MouseOverPopover.propTypes = {
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.shape({}).isRequired,
  children: PropTypes.node.isRequired,
  handlePopoverClose: PropTypes.func.isRequired,
};

export default MouseOverPopover;
