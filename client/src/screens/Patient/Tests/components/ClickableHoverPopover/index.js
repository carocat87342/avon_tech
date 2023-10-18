// This component was designed specifically for the All Markers card; This custom component
// allows the user to click popover body and achieves mouse-over-popover functionality as well.
// Reference: https://stackoverflow.com/questions/54705254

import React, { useState, useRef } from "react";

import { Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
    padding: theme.spacing(1.5),
  },
}));

const ClickableHoverPopover = (props) => {
  const {
    children,
    bodyElement,
  } = props;
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  const popoverEnter = () => {
    setOpenedPopover(true);
  };

  const popoverLeave = () => {
    setOpenedPopover(false);
  };

  const classes = useStyles();

  return (
    <div>
      <span
        ref={popoverAnchor}
        aria-owns="mouse-over-popover"
        aria-haspopup="true"
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {children}
      </span>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{ onMouseEnter: popoverEnter, onMouseLeave: popoverLeave }}
      >
        {bodyElement}
      </Popover>
    </div>
  );
};

ClickableHoverPopover.propTypes = {
  children: PropTypes.node.isRequired,
  bodyElement: PropTypes.node.isRequired,
};


export default ClickableHoverPopover;
