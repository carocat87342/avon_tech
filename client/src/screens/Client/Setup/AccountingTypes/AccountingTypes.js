import React, { useEffect, useState } from "react";

import {
  Container, CssBaseline, Grid, makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import AccountingTypesService from "../../../../services/accountingTypes.service";
import AccountingTypesTable from "./component/AccountingTypesTable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(1),
  },
}));

export default function AccountingTypes() {
  const classes = useStyles();
  const [accountingTypes, setAccountingTypes] = useState([]);

  const getAccountingTypes = () => {
    AccountingTypesService.getAccountingTypes().then((res) => setAccountingTypes(res.data.data));
  };

  useEffect(() => {
    getAccountingTypes();
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} className={classes.root}>
        <Grid container justify="center" spacing={2}>
          <Grid item md={12} xs={12}>
            <Typography
              component="h1"
              variant="h2"
              color="textPrimary"
              className={classes.title}
            >
              Accounting Types
            </Typography>
            <Typography component="p" variant="body2" color="textPrimary">
              This page is used to manage accounting types
            </Typography>
            <AccountingTypesTable result={accountingTypes} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
