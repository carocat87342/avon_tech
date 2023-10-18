import React from "react";

import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import Logo from "../../../../../../assets/img/Logo.svg";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 175,
    height: 70,
  },
}));

const Profile = (props) => {
  const {
    className, ...rest
  } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={Logo}
        to="/"
      />
    </div>
  );
};

Profile.defaultProps = {
  className: null,
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
