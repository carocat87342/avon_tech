import React, { useState, useEffect, useCallback } from "react";

import { Button, makeStyles, withStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import { useSnackbar } from "notistack";

import useAuth from "../../../hooks/useAuth";
import PaymentMethodService from "../../../services/patient_portal/payment-method.service";
import { paymentMethodType } from "../../../utils/helpers";
import PaymentMethodsForm from "./components/PaymentMethodsForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  titleSection: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  btn: {
    fontSize: "14px",
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(1),
  },
  actionButtonStyle: {
    minWidth: 0,
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontSize: "14px",
    fontWeight: 700,
    padding: "6px 24px 2px 2px",
    borderBottom: "unset",
  },
  body: {
    fontSize: 14,
    borderBottom: "unset",
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    fontSize: 14,
    "& th": {
      fontSize: 14,
      whiteSpace: "nowrap",
      padding: "0px 16px 2px 2px",
      lineHeight: "16px",
    },
    "& td": {
      fontSize: 14,
      whiteSpace: "nowrap",
      padding: "0px 16px 2px 2px",
      lineHeight: "16px",
    },
    "& button": {
      padding: 0,
      fontSize: 14,
      lineHeight: "16px",
      fontWeight: "normal",

      "&:hover": {
        background: "transparent",
      },
    },
  },
}))(TableRow);

const PaymentMethods = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { lastVisitedPatient } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodDialog, setNewPaymentDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPayment] = useState(null);

  const fetchPaymentMethods = useCallback(() => {
    PaymentMethodService.getPaymentMethods(lastVisitedPatient).then((res) => {
      setPaymentMethods(res.data);
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const onItemEdit = (item) => {
    setSelectedPayment(item);
    setNewPaymentDialog(true);
  };

  const onItemDelete = (item) => {
    PaymentMethodService.deletePaymentMethod(item.id).then(() => {
      enqueueSnackbar(`Payment method deleted successfully!`, {
        variant: "success",
      });
      fetchPaymentMethods();
    });
  };

  const closeDialog = () => {
    setNewPaymentDialog(false);
    if (selectedPaymentMethod) {
      setSelectedPayment(null);
    }
  };

  return (
    <>
      {!!paymentMethodDialog && (
        <PaymentMethodsForm
          isOpen={paymentMethodDialog}
          onClose={closeDialog}
          reloadData={fetchPaymentMethods}
          cardData={selectedPaymentMethod}
        />
      )}
      <div className={classes.root}>
        <div className={classes.titleSection}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            Payment Methods
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            className={classes.btn}
            onClick={() => setNewPaymentDialog(true)}
          >
            New
          </Button>
        </div>
        <Typography
          component="h5"
          variant="body1"
          color="textPrimary"
          className={classes.title}
        >
          This page is used to manage credit cards or bank accounts used to pay invoices.
        </Typography>
        <Grid item md={6} sm={8} xs={12}>
          {Boolean(paymentMethods.length) && (
            <TableContainer className={classes.tableContainer}>
              <Table size="small" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Type</StyledTableCell>
                    <StyledTableCell>Card Number</StyledTableCell>
                    <StyledTableCell>Edit</StyledTableCell>
                    <StyledTableCell>Delete</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paymentMethods.map((item) => (
                    <StyledTableRow key={item.id}>
                      <StyledTableCell>
                        {moment(item.created).format("MMM D YYYY")}
                      </StyledTableCell>
                      <StyledTableCell>{paymentMethodType(item.type)}</StyledTableCell>
                      <StyledTableCell>
                        Ending in
                        {" "}
                        {item.account_number}
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          disableRipple
                          variant="text"
                          onClick={() => onItemEdit(item)}
                          className={classes.actionButtonStyle}
                        >
                          Edit
                        </Button>
                      </StyledTableCell>
                      <StyledTableCell>
                        <Button
                          disableRipple
                          variant="text"
                          onClick={() => onItemDelete(item)}
                          className={classes.actionButtonStyle}
                        >
                          Delete
                        </Button>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </div>
    </>
  );
};

export default PaymentMethods;
