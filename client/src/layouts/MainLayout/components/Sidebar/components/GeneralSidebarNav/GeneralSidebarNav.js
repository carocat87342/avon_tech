import React, { forwardRef } from "react";

import Button from "@material-ui/core/Button";
import blueGrey from "@material-ui/core/colors/blueGrey";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { NavLink as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0,
  },
  button: {
    color: blueGrey[800],
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
    <RouterLink {...props} />
  </div>
));

const GeneralSidebarNav = (props) => {
  const { pages, className, ...rest } = props;

  const classes = useStyles();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <List {...rest} className={clsx(classes.root, className)}>
      {pages.map((page) => (
        <ListItem className={classes.item} disableGutters key={page.title}>
          <Button
            activeClassName={classes.active}
            className={classes.button}
            component={CustomRouterLink}
            to={page.href}
          >
            <div className={classes.icon}>{page.icon}</div>
            {page.title}
          </Button>
        </ListItem>
      ))}
    </List>
  );
};

GeneralSidebarNav.propTypes = {
  className: PropTypes.string.isRequired,
  pages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node,
    }),
  ).isRequired,
};

export default GeneralSidebarNav;
