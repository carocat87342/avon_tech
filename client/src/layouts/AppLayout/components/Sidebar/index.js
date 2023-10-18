import React from "react";

import { Button, Divider, Drawer } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

import { APP_LOGIN_LINK } from "../../../../static/catalog";
import { catalog_pages } from "../../../../static/nav-pages";
import { Profile, SidebarNav } from "./components";

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up("lg")]: {
      marginTop: 64,
      height: "calc(100% - 64px)",
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
  link: {
    textDecoration: "none",
  },
}));

const Sidebar = (props) => {
  const {
    open,
    variant,
    onClose,
    className,
    ...rest
  } = props;
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={catalog_pages} />
        <a className={classes.link} href={APP_LOGIN_LINK}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disableElevation
          >
            Sign In
          </Button>
        </a>
      </div>
    </Drawer>
  );
};

Sidebar.defaultProps = {
  className: null,
  onClose: () => { },
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
