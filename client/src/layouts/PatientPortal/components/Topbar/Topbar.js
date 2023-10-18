import React from "react";

import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import clsx from "clsx";
import PropTypes from "prop-types";

import useAuth from "../../../../hooks/useAuth";

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#FFFFFF",
  },
  LogoWrapper: {
    display: "block",
    textAlign: "center",
    width: "100%",
    "& img": {
      width: "auto",
      height: "50px",
    },
  },
}));

const ElevationScroll = (props) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 1 : 0,
  });
};

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

const Topbar = (props) => {
  const {
    className, onSidebarOpen, ...rest
  } = props;
  const classes = useStyles();
  const { user } = useAuth();

  return (
    <ElevationScroll {...props}>
      <AppBar {...rest} className={clsx(classes.root, className)}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.LogoWrapper}>
            <img
              src={`${process.env.REACT_APP_API_URL}static/client/c${user.client_id}_logo.png`}
              alt="Client portal logo"
            />
          </div>
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

Topbar.defaultProps = {
  className: null,
  onSidebarOpen: () => { },
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
