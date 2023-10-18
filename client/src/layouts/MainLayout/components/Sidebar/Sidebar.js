import React from "react";

import { Divider, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LockOpenIcon from "@material-ui/icons/LockOpenOutlined";
import LockIcon from "@material-ui/icons/LockOutlined";
import clsx from "clsx";
import PropTypes from "prop-types";

import useAuth from "../../../../hooks/useAuth";
import { SidebarNav, GeneralSidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 65,
      height: "calc(100% - 65px)",
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar = (props) => {
  const {
    open, variant, onClose, className, ...rest
  } = props;
  const { isAuthenticated } = useAuth();
  const classes = useStyles();

  const pages = [];

  const publicPages = [
    {
      title: "Login",
      href: "/login_client",
      icon: <LockIcon />,
    },
    {
      title: "Signup",
      href: "/signup_client",
      icon: <LockOpenIcon />,
    },
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div {...rest} className={clsx(classes.root, className)}>
        {!isAuthenticated && (
          <>
            <Divider className={classes.divider} />
            <GeneralSidebarNav className={classes.nav} pages={publicPages} />
          </>
        )}
        <Divider className={classes.divider} />
        {isAuthenticated && <SidebarNav className={classes.nav} pages={pages} />}
      </div>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  className: "",
  onClose: () => { },
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
