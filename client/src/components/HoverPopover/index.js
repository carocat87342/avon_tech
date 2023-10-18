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

const HoverPopover = (props) => {
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
        disableAutoFocus
        disableEnforceFocus
      >
        {bodyElement}
      </Popover>
    </div>
  );
};

HoverPopover.propTypes = {
  children: PropTypes.node.isRequired,
  bodyElement: PropTypes.node.isRequired,
};


export default HoverPopover;
