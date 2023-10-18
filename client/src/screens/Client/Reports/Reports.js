import * as React from "react";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
  mainContent: {
    marginTop: theme.spacing(3),
  },
  finance: {
    cursor: "pointer",
    color: theme.palette.text.link,
  },
}));

const Reports = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Reports
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This page is used to list reports
      </Typography>
      <div className={classes.mainContent}>
        <Typography
          onClick={() => history.push("/reports/report-finance")}
          component="p"
          variant="body1"
          color="textPrimary"
          className={classes.finance}
        >
          Finance Report
        </Typography>
      </div>
    </div>
  );
};

export default Reports;
