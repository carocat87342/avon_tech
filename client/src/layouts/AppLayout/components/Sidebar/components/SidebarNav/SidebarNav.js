import React from "react";

import {
  Button, List, ListItem, Divider, ListSubheader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  NavLink as RouterLink, matchPath, useHistory,
} from "react-router-dom";

import useAuth from "../../../../../../hooks/useAuth";
import NavItem from "./NavItem";

const useStyles = makeStyles((theme) => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: "#546e7a",
    padding: "10px 0px",
    justifyContent: "flex-start",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium,
    "& span": {
      display: "block",
    },
    "& a": {
      color: "#546e7a",
      display: "block",
      width: "100%",
      textDecoration: "none",
      textAlign: "left",
    },
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

function renderNavItems({
  items,
  pathname,
  depth = 0,
}) {
  return (
    <List disablePadding>
      {items.reduce(
          // eslint-disable-next-line no-use-before-define
        (acc, item) => reduceChildRoutes({
          acc, item, pathname, depth,
        }),
        [],
      )}
    </List>
  );
}


function reduceChildRoutes({
  acc,
  pathname,
  item,
  depth,
}) {
  const key = item.title + depth;

  if (item.items) {
    const open = matchPath(pathname, {
      path: item.href,
      exact: false,
    });

    acc.push(
      <NavItem
        depth={depth}
        icon={item.icon}
        info={item.info}
        key={key}
        open={Boolean(open)}
        title={item.title}
      >
        {renderNavItems({
          depth: depth + 1,
          pathname,
          items: item.items,
        })}
      </NavItem>,
    );
  } else {
    acc.push(
      <NavItem
        depth={depth}
        href={item.href}
        icon={item.icon}
        info={item.info}
        key={key}
        title={item.title}
      />,
    );
  }

  return acc;
}

const SidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
  const history = useHistory();
  const { user, logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      history.push(user.login_url || "/login_client");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <List {...rest} className={clsx(classes.root, className)}>
      {pages && pages.map((page) => (
        <List
          key={page.href}
          subheader={page.subMenus ? (
            <ListSubheader
              disableGutters
              disableSticky
            >
              {page.title}
            </ListSubheader>
          ) : null}
        >
          {page.subMenus
            ? renderNavItems({
              items: page.subMenus,
              pathname: page.pathname,
            })
            : (
              <ListItem
                className={clsx(classes.item, className)}
                disableGutters
                key={page.href}
              >
                <Button className={classes.button}>
                  <RouterLink
                    to={page.href}
                    className={classes.link}
                    onClick={page.logout && handleLogout}
                  >
                    {page.title}
                  </RouterLink>
                </Button>
              </ListItem>
            )}
          <Divider />
        </List>
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
      icon: PropTypes.node,
    }),
  ).isRequired,
};

export default SidebarNav;
