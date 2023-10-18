import React from "react";

import { Container, Box, Typography } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import useAuth from "../../../../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  footer: {
    flex: 0,
    backgroundColor: theme.palette.primary.main,
    color: "#ffffff",
    clear: "both",
    position: "relative",
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
  },
  footerText: {
    color: "#ffffff",
    marginTop: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    "& p": {
      color: "#ffffff",
    },
    fontSize: "11px !important",
  },
}));

const CustomTypography = withStyles(() => ({
  root: {
    fontSize: "11px",
    lineHeight: "4px",
    letterSpacing: ".65px",
  },
}))(Typography);

export default function Footer() {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Container component="footer" maxWidth={false} className={classes.footer}>
      <Box mt={5} className={classes.footerText}>
        <CustomTypography variant="body1" color="textPrimary" align="center">
          {"Copyright © "}
          {" "}
          {new Date().getFullYear()}
          {` ${process.env.REACT_APP_SITE_TITLE}`}
          {" "}
          - User
          {" "}
          {`${user.firstname} ${user.lastname}`}
        </CustomTypography>
      </Box>
    </Container>
  );
}
