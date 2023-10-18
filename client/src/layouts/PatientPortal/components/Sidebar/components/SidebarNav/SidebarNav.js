import React, { forwardRef } from "react";

import {
  List, ListItem, Button, colors,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink as RouterLink, useHistory } from "react-router-dom";

import useAuth from "../../../../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
}));

const CustomRouterLink = forwardRef((props, ref) => (
  <div ref={ref} style={{ flexGrow: 1 }}>
    {/* eslint-disable-next-line react/jsx-props-no-spreading */}
    <RouterLink exact {...props} />
  </div>
));

const SidebarNav = (props) => {
  const {
    pages, className,
  } = props;
  const { user, logout } = useAuth();
  const classes = useStyles();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      history.push(user.login_url || "/login_client");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <List className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.id}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
            onClick={page.logout && handleLogout}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

SidebarNav.defaultProps = {
  className: null,
};

SidebarNav.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.objectOf(PropTypes.any),
    }),
  ).isRequired,
};

export default SidebarNav;
