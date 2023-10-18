import React, {
  useCallback, useState, useEffect, useRef,
} from "react";

import {
  makeStyles, Typography, Grid, Box, withStyles, TextField, MenuItem,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useSnackbar } from "notistack";
import { Link } from "react-router-dom";

import Alert from "../../../components/Alert";
import useAuth from "../../../hooks/useAuth";
import PaymentMethodService from "../../../services/patient_portal/payment-method.service";
import PurchaseLabsService from "../../../services/patient_portal/purchase-lab.service";
import { paymentMethodType } from "../../../utils/helpers";
import AddressConfirmationForm from "./components/AddressConfirmationForm";
import PaymentMethodsForm from "./components/PaymentMethodsForm";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "40px 0px",
  },
  customSelect: {
    width: "220px",
    marginTop: theme.spacing(2.5),
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  table: {
    "& th": {
      fontWeight: 600,
    },
  },
  selectCheckbox: {
    padding: 0,
  },
  Total: {
    marginTop: theme.spacing(2),
    "& span": {
      fontWeight: 600,
      marginRight: theme.spacing(1 / 2),
    },
  },
  purchaseButton: {
    display: "block",
    width: "220px",
    marginTop: theme.spacing(2.5),
  },
  link: {
    padding: theme.spacing(0, 0.5),
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    whiteSpace: "nowrap",
    fontSize: 14,
    fontWeight: 700,
    padding: "6px 24px 6px 2px",
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
    cursor: "pointer",
    "& th": {
      fontSize: 14,
      whiteSpace: "nowrap",
      padding: "0px 16px 0px 2px",
      lineHeight: "16px",
    },
    "& td": {
      fontSize: 14,
      whiteSpace: "nowrap",
      padding: "0px 16px 0px 2px",
      lineHeight: "16px",
    },
  },
}))(TableRow);


const PurchaseLabs = () => {
  const classes = useStyles();
  const selectInputRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const { lastVisitedPatient, user } = useAuth();
  const [selected, setSelected] = useState([]);
  const [selectedLabs, setSelectedLabs] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [total, setTotal] = useState(0);
  const [labs, setLabs] = useState([]);
  const [isNewPaymentMethodOpen, setIsNewPaymentMethodOpen] = useState(false);
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [showPurchaseConfirmation, setShowPurchaseConfirmation] = useState(false);
  const [showAddressConfirmation, setShowAddressConfirmation] = useState(false);
  const [specialtyLabsCount, setSpecialtyLabsCount] = useState(0);
  const [conventionalLabsCount, setConventionalLabs] = useState(0);

  const fetchPaymentMethods = useCallback(() => {
    PaymentMethodService.getPaymentMethods(lastVisitedPatient).then((res) => {
      setPaymentMethods(
        [...res.data, {
          id: 999,
          type: "new",
          account_number: "000",
        }],
      );
    });
  }, [lastVisitedPatient]);

  useEffect(() => {
    PurchaseLabsService.getAll().then((res) => {
      setLabs(res.data);
    });
    fetchPaymentMethods();
  }, [fetchPaymentMethods]);

  const handlePaymentMethodChange = (newPaymentMethod) => {
    if (Number(newPaymentMethod) === 999) {
      setIsNewPaymentMethodOpen(true);
    } else {
      setSelectedPaymentMethod(newPaymentMethod);
    }
  };

  const calculateTotal = (selectedLabIds) => {
    const sLabs = labs.filter((lab) => selectedLabIds.includes(lab.patient_procedure_id));
    setSelectedLabs(sLabs);
    const sumOfSelectedLabs = sLabs.reduce((acc, lab) => (acc + lab.price), 0);
    const sumOfSpecialityLabs = sLabs.filter((x) => Boolean(x.specialty_lab)).length;
    const sumOfConventionalLabs = sLabs.filter((x) => Boolean(!x.specialty_lab)).length;
    setSpecialtyLabsCount(sumOfSpecialityLabs);
    setConventionalLabs(sumOfConventionalLabs);
    setTotal(sumOfSelectedLabs);
  };

  const handleClick = (event, id) => {
    event.stopPropagation();
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
    calculateTotal(newSelected);
  };

  const handleOnSubmit = () => {
    const paymentMethodForStripe = paymentMethods.filter((p) => p.id === Number(selectedPaymentMethod));
    const payload = {
      data: {
        payment_method_id: selectedPaymentMethod,
        corp_stripe_payment_method_token: paymentMethodForStripe[0].corp_stripe_payment_method_token,
        customer_id: user.corp_stripe_customer_id,
        amount: total,
        patient_procedure_ids: selected,
        selectedLabs,
      },
    };

    PurchaseLabsService.create(payload).then(() => {
      enqueueSnackbar(`Lab purchased successfully!`, {
        variant: "success",
      });
      setIsConfirmDialog(false);
      setShowPurchaseConfirmation(true);
      setSelected([]);
      setSelectedPaymentMethod(null);
    });
  };

  const isSelected = (patient_procedure_id) => selected.indexOf(patient_procedure_id) !== -1;

  useEffect(() => {
    if (paymentMethods.length > 1) {
      const firstPaymentMethod = paymentMethods[0].id;
      selectInputRef.current.focus();
      setSelectedPaymentMethod(firstPaymentMethod);
    }
  }, [paymentMethods]);

  return (
    <>
      <Alert
        open={isConfirmDialog}
        title="Purchase Confirmation"
        message={`Confirm purchase of $${Number(total)?.toFixed(2)}?`}
        applyButtonText="Confirm"
        cancelButtonText="Cancel"
        applyForm={() => handleOnSubmit()}
        cancelForm={() => setIsConfirmDialog(false)}
      />
      <div className={classes.root}>
        {
          showPurchaseConfirmation
            ? (
              <>
                <Typography
                  component="h1"
                  variant="h2"
                  color="textPrimary"
                  className={classes.title}
                >
                  Purchase Confirmation
                </Typography>
                <Box mt={2}>
                  <Typography variant="h5" gutterBottom>
                    This is a confirmation that you have purchased lab(s) for $
                    {Number(total)?.toFixed(2)}
                    .
                  </Typography>
                  {conventionalLabsCount > 0 && (
                    <Typography variant="h5" gutterBottom>
                      Next step is to
                      <Link
                        className={classes.link}
                        to="/patient/labs-requisition"
                      >
                        click here
                      </Link>
                      to print your lab requisition.
                    </Typography>
                  )}
                  {specialtyLabsCount > 0 && (
                    <Typography variant="h5" gutterBottom>
                      We will send you an email once your lab kit has been mailed to you.
                    </Typography>
                  )}
                </Box>
              </>
            )
            : (
              showAddressConfirmation
                ? (
                  <AddressConfirmationForm
                    onSubmit={() => setIsConfirmDialog(true)}
                    onClose={() => setShowAddressConfirmation(false)}
                  />
                )
                : (
                  <>
                    <Typography
                      component="h1"
                      variant="h2"
                      color="textPrimary"
                      className={classes.title}
                    >
                      Purchase Lab Tests
                    </Typography>
                    <Grid item md={6} sm={12} xs={12}>
                      <TableContainer className={classes.tableContainer}>
                        <Table size="small" className={classes.table} aria-label="a dense table">
                          <TableHead>
                            <TableRow>
                              <StyledTableCell width="5%">Select</StyledTableCell>
                              <StyledTableCell>Lab Company</StyledTableCell>
                              <StyledTableCell>Lab Name</StyledTableCell>
                              <StyledTableCell width="5%">Price</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {labs.map((lab) => {
                              const isChecked = isSelected(lab.patient_procedure_id);
                              return (
                                <StyledTableRow
                                  hover
                                  key={lab.patient_procedure_id}
                                  onClick={(event) => handleClick(event, lab.patient_procedure_id)}
                                  role="checkbox"
                                >
                                  <StyledTableCell scope="item">
                                    <Checkbox
                                      onClick={(event) => handleClick(event, lab.patient_procedure_id)}
                                      className={classes.selectCheckbox}
                                      checked={isChecked}
                                    />
                                  </StyledTableCell>
                                  <StyledTableCell scope="item">{lab.lab_company_name}</StyledTableCell>
                                  <StyledTableCell scope="item">{lab.procedure_name}</StyledTableCell>
                                  <StyledTableCell scope="item">
                                    {lab.price ? `$${Number(lab.price).toFixed(2)}` : ""}
                                  </StyledTableCell>
                                </StyledTableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <div className={classes.Total}>
                        <span>Total:</span>
                        $
                        {Number(total)?.toFixed(2)}
                      </div>
                      <FormControl
                        variant="outlined"
                        className={classes.customSelect}
                        size="small"
                      >
                        <TextField
                          select
                          label="Select Payment Method"
                          value={selectedPaymentMethod || ""}
                          onChange={(event) => handlePaymentMethodChange(event.target.value)}
                          variant="outlined"
                          size="small"
                          inputRef={selectInputRef}
                        >
                          {paymentMethods.map((pm) => (
                            <MenuItem key={pm.id} value={pm.id}>
                              {paymentMethodType(pm.type)}
                              {pm.id !== 999 ? (
                                ` (${pm.account_number})`
                              ) : ""}
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                      <Button
                        disabled={(!total || !selectedPaymentMethod)}
                        variant="outlined"
                        color="primary"
                        size="medium"
                        onClick={() => {
                          if (specialtyLabsCount > 0) {
                            setShowAddressConfirmation(true);
                          } else {
                            setIsConfirmDialog(true);
                          }
                        }}
                        className={classes.purchaseButton}
                      >
                        Purchase
                      </Button>
                    </Grid>
                  </>
                )
            )
        }
        <PaymentMethodsForm
          isOpen={isNewPaymentMethodOpen}
          onClose={() => setIsNewPaymentMethodOpen(false)}
          reloadData={() => fetchPaymentMethods()}
        />
      </div>
    </>
  );
};

export default PurchaseLabs;
