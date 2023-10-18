import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { KeyboardDatePicker } from "@material-ui/pickers";
import moment from "moment";

import ReportFinanceService from "../../../../services/reportFinance.service";
import { Reports } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 180,
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(1),
  },
  formElments: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "500px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: "20px",
    maxWidth: "440px",
  },
  customSelect: {
    width: "200px",
  },
  type: {
    marginTop: "20px",
  },
  paper: {
    maxWidth: "456px",
  },
  textField: {
    width: "200px",
  },
  amount: {
    marginTop: "18px",
  },
  datePicker: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function ReportFinance() {
  const classes = useStyles();
  const [dateFrom, setDateFrom] = useState(
    moment().subtract(3, "months").format("YYYY-MM-DD"),
  );
  const [dateTo, setDateTo] = useState(moment().format("YYYY-MM-DD"));
  const [reports, setReports] = useState([]);

  const fetchReportFinance = () => {
    ReportFinanceService.getAll(dateFrom, dateTo).then((res) => {
      setReports(res.data);
    });
  };

  useEffect(() => {
    fetchReportFinance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnEnterClick = () => {
    ReportFinanceService.getAll(dateFrom, dateTo).then((res) => {
      setReports(res.data);
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.paper}>
        <CssBaseline />
        <Container maxWidth={false} className={classes.root}>
          <div className={classes.title}>
            <Typography component="h1" variant="h2" color="textPrimary">
              Report Finance
            </Typography>
          </div>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to create a finance report by month
          </Typography>
          <Grid container direction="column" justify="center">
            <div className={classes.datePicker}>
              <Grid container>
                <Grid item xs={12} sm={6} spacing={2}>
                  <KeyboardDatePicker
                    clearable
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="dd/MM/yyyy"
                    inputVariant="outlined"
                    id="date"
                    label="Date From"
                    value={dateFrom}
                    className={classes.textField}
                    onChange={(date) => setDateFrom(moment(date).format("YYYY-MM-DD"))}
                    size="small"
                    autoOk
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <KeyboardDatePicker
                    clearable
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                    format="dd/MM/yyyy"
                    inputVariant="outlined"
                    id="date"
                    label="Date To"
                    value={dateTo}
                    className={classes.textField}
                    onChange={(date) => setDateTo(moment(date).format("YYYY-MM-DD"))}
                    size="small"
                    autoOk
                  />
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            component="span"
            onClick={() => handleOnEnterClick()}
          >
            Enter
          </Button>
          <Grid container justify="center" spacing={2}>
            <Grid item md={12} xs={12}>
              <Reports
                reports={reports}
                dateFrom={dateFrom}
                dateTo={dateTo}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
