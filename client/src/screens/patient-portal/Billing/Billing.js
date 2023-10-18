import React, { useState, useEffect, useCallback } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import ViewIcon from "@material-ui/icons/VisibilityOutlined";
import clsx from "clsx";
import moment from "moment";

import useAuth from "../../../hooks/useAuth";
import PatientPortalService from "../../../services/patient_portal/patient-portal.service";
import { hasValue } from "../../../utils/helpers";
import NewTransactionForm from "./components/NewTransactionForm";
import ViewTransactionDetails from "./components/ViewTransactionDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  subTitle: {
    fontSize: "14px",
  },
  viewIcon: {
    cursor: "pointer",
    fontSize: "1rem",
  },
  centered: {
    textAlign: "center",
  },
  borderTop: {
    borderTop: "1px solid",
  },
  shiftContent: {
    paddingTop: "10px !important",
  },
  textButton: {
    cursor: "pointer",
  },
  makePaymentButton: {
    marginLeft: theme.spacing(4),
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontSize: "12px",
    fontWeight: 700,
    padding: "6px 24px 6px 2px",
    borderBottom: "unset",
  },
  body: {
    fontSize: 12,
    borderBottom: "unset",
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    fontSize: 14,
    "& th": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      lineHeight: "14px",
    },
    "& td": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 16px 2px 2px",
      lineHeight: "14px",
    },
  },
}))(TableRow);

const Billing = () => {
  const classes = useStyles();
  const { lastVisitedPatient } = useAuth();
  const [billings, setBillings] = useState([]);
  const [newPaymentDialog, setNewPaymentDialog] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [balance, setBalance] = useState(null);

  const fetchBillings = useCallback(() => {
    PatientPortalService.getBillings(lastVisitedPatient).then((res) => {
      setBillings(res.data);
    });
  }, [lastVisitedPatient]);

  const fetchBalance = useCallback(() => {
    PatientPortalService.getBalance(lastVisitedPatient).then((res) => {
      setBalance(res.data && res.data.length ? res.data[0].amount : "");
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchBillings();
    fetchBalance();
  }, [fetchBillings, fetchBalance]);

  return (
    <>
      {!!newPaymentDialog && (
        <NewTransactionForm
          isOpen={newPaymentDialog}
          onClose={() => setNewPaymentDialog(false)}
          reloadData={fetchBillings}
        />
      )}
      {!!selectedPayment && (
        <ViewTransactionDetails
          isOpen={Boolean(selectedPayment)}
          onClose={() => setSelectedPayment(null)}
          data={selectedPayment}
        />
      )}
      <div className={classes.root}>
        <Grid
          item
          sm={7}
          xs={12}
        >
          <Grid
            container
            justify="flex-start"
          >
            <Typography
              component="h1"
              variant="h2"
              color="textPrimary"
              className={classes.title}
            >
              Provider Billing
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setNewPaymentDialog(true)}
              className={classes.makePaymentButton}
            >
              Make Payment
            </Button>
          </Grid>
        </Grid>

        <Typography
          variant="h5"
          color="textPrimary"
          className={classes.subTitle}
        >
          This page is used to view billings.
        </Typography>
        <Grid item md={10} sm={12} xs={12}>
          {Boolean(billings.length) && (
            <TableContainer className={classes.tableContainer}>
              <Table size="small" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Transaction Type</StyledTableCell>
                    <StyledTableCell>Account Number</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell align="center">View</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billings.map((item) => (
                    <StyledTableRow key={`${item.dt}_${item.amount}_${item.tran_type}`}>
                      <StyledTableCell component="th" scope="item">
                        {moment(item.dt).format("MMM D YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>{item.tran_type}</StyledTableCell>
                      <StyledTableCell>{item.account_num || "-"}</StyledTableCell>
                      <StyledTableCell>
                        $
                        {Number(item.amount)?.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.centered}
                      >
                        <ViewIcon
                          className={classes.viewIcon}
                          onClick={() => setSelectedPayment(item)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {(hasValue(balance) && billings.length) ? (
                    <StyledTableRow>
                      <StyledTableCell colSpan={2} />
                      <StyledTableCell
                        align="right"
                        classes={{ body: classes.shiftContent }}
                      >
                        <Typography className={classes.resMessage}>
                          Balance
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={clsx(
                          classes.borderTop,
                          classes.shiftContent,
                        )}
                      >
                        <Typography className={classes.resMessage}>
                          $
                          {Number(balance)?.toFixed(2)}
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  ) : null}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </div>
    </>
  );
};

export default Billing;
