import React, {
  useState, useEffect, useCallback, useRef,
} from "react";

import {
  Button,
  Grid,
  TextField,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Tooltip from "../../../../components/common/CustomTooltip";
import { StyledTableRowSm, StyledTableCellSm } from "../../../../components/common/StyledTable";
import useDidMountEffect from "../../../../hooks/useDidMountEffect";
import usePatientContext from "../../../../hooks/usePatientContext";
import { togglePaymentDialog, resetBilling } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  section: {
    padding: theme.spacing(0, 2),
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
  tableContainer: {
    marginTop: theme.spacing(1),
  },
  header: {
    minHeight: 38,
    display: "flex",
    alignItems: "flex-end",
  },
  pointer: {
    cursor: "pointer",
  },
  actionContainer: {
    marginTop: theme.spacing(2),
  },
  menuOption: {
    minHeight: 26,
  },
  amountContainer: {
    padding: theme.spacing(2, 0),
    background: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  nameInput: {
    color: "rgb(158, 158, 158)",
  },
  mb1: {
    marginBottom: theme.spacing(1),
  },
}));

const BillingDialog = (props) => {
  const classes = useStyles();
  const textInput = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { reloadData } = props;
  const [searchText, setSearchText] = useState("");
  const [hasUserSearched, setHasUserSearched] = useState(false);
  const [billings, setBillings] = useState([]);
  const [recentBillings, setRecentBillings] = useState([]);
  const [favoriteBillings, setFavoriteBillings] = useState([]);
  const [selectedBilling, setSelectedBilling] = useState(null);

  const { patientId, billing } = state;
  const { selectedBilling: storeBilling } = billing;

  useEffect(() => {
    if (storeBilling) {
      storeBilling.client_fee = storeBilling.amount;
      storeBilling.name = storeBilling.proc_name;
      setSelectedBilling(storeBilling);
    }
    return () => !!storeBilling && dispatch(resetBilling());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storeBilling]);

  const searchBillings = (e, text) => {
    e.preventDefault();
    const reqBody = {
      data: {
        text,
      },
    };
    PatientService.searchBilling(patientId, reqBody).then((res) => {
      setBillings(res.data);
      setHasUserSearched(true);
    });
  };

  const fetchRecentBillings = useCallback(() => {
    PatientService.getBillingRecents(patientId).then((response) => {
      setRecentBillings(response.data);
    });
  }, [patientId]);

  const fetchFavoriteBillings = useCallback(() => {
    PatientService.getBillingFavorites(patientId).then((response) => {
      setFavoriteBillings(response.data);
    });
  }, [patientId]);

  useEffect(() => {
    fetchRecentBillings();
    fetchFavoriteBillings();
  }, [fetchRecentBillings, fetchFavoriteBillings]);

  const onFormSubmit = (e, selectedTest) => {
    e.preventDefault();
    const reqBody = {
      data: {
        amount: selectedTest.client_fee || selectedTest.proc_price || 0,
        proc_id: storeBilling ? selectedTest.proc_id : selectedTest.id,
        type_id: 1, // the 1 is hardcoded as per CLIN-203
        note: selectedTest.note,
      },
    };
    if (storeBilling) { // edit scenario
      const billingId = storeBilling?.id;
      PatientService.updateBilling(patientId, billingId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(togglePaymentDialog());
        });
    } else {
      PatientService.createNewBilling(patientId, reqBody)
        .then((response) => {
          enqueueSnackbar(`${response.data.message}`, { variant: "success" });
          reloadData();
          dispatch(togglePaymentDialog());
        });
    }
  };

  useDidMountEffect(() => {
    if (!searchText.length) {
      setBillings([]);
      setHasUserSearched(false);
    }
  }, [searchText]);

  const onItemSelect = (item) => {
    textInput.current.focus();
    setSelectedBilling(item);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <form onSubmit={(e) => searchBillings(e, searchText)}>
            <Grid container spacing={2} alignItems="center">
              <Grid item sm={9} xs={8}>
                <TextField
                  autoFocus
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  type="submit"
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </form>
          <TableContainer className={classes.tableContainer}>
            <Table stickyHeader size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCellSm>Name</StyledTableCellSm>
                  <StyledTableCellSm>Price</StyledTableCellSm>
                  <StyledTableCellSm>My Price</StyledTableCellSm>
                  <StyledTableCellSm width="15%">Favorite</StyledTableCellSm>
                </TableRow>
              </TableHead>
              <TableBody>
                {billings.length
                  ? billings.map((item) => (
                    <StyledTableRowSm
                      key={item.name}
                      className={classes.pointer}
                      onClick={() => onItemSelect(item)}
                    >
                      {!!item.name && item.name.length > 30
                        ? (
                          <Tooltip title={item.name}>
                            <StyledTableCellSm
                              className={classes.overFlowControl}
                            >
                              {item.name}
                            </StyledTableCellSm>
                          </Tooltip>
                        )
                        : <StyledTableCellSm>{item.name}</StyledTableCellSm>}
                      <StyledTableCellSm>{item.proc_price ? `$${item.proc_price}` : ""}</StyledTableCellSm>
                      <StyledTableCellSm>{item.client_fee ? `$${item.client_fee}` : ""}</StyledTableCellSm>
                      <StyledTableCellSm>{item.favorite ? "Yes" : ""}</StyledTableCellSm>
                    </StyledTableRowSm>
                  ))
                  : hasUserSearched ? (
                    <StyledTableRowSm>
                      <StyledTableCellSm colSpan={4}>
                        <Typography align="center" variant="body1" className={classes.text}>
                          No Records found...
                        </Typography>
                      </StyledTableCellSm>
                    </StyledTableRowSm>
                  ) : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid className={classes.section}>
            <Grid className={classes.header}>
              <Typography variant="h5" color="textPrimary">
                Favorites
              </Typography>
            </Grid>
            <TableContainer className={classes.tableContainer}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCellSm>Name</StyledTableCellSm>
                    <StyledTableCellSm>Price</StyledTableCellSm>
                    <StyledTableCellSm>My Price</StyledTableCellSm>
                    <StyledTableCellSm width="15%">Favorite</StyledTableCellSm>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {favoriteBillings.length
                    ? favoriteBillings.map((item) => (
                      <StyledTableRowSm
                        key={item.name}
                        className={classes.pointer}
                        onClick={() => onItemSelect(item)}
                      >
                        {!!item.name && item.name.length > 30
                          ? (
                            <Tooltip title={item.name}>
                              <StyledTableCellSm
                                className={classes.overFlowControl}
                              >
                                {item.name}
                              </StyledTableCellSm>
                            </Tooltip>
                          )
                          : <StyledTableCellSm>{item.name}</StyledTableCellSm>}
                        <StyledTableCellSm>{item.proc_price ? `$${item.proc_price}` : ""}</StyledTableCellSm>
                        <StyledTableCellSm>{item.client_fee ? `$${item.client_fee}` : ""}</StyledTableCellSm>
                        <StyledTableCellSm>{item.favorite ? "Yes" : ""}</StyledTableCellSm>
                      </StyledTableRowSm>
                    ))
                    : (
                      <StyledTableRowSm>
                        <StyledTableCellSm colSpan={4}>
                          <Typography align="center" variant="body1" className={classes.text}>
                            No Records found...
                          </Typography>
                        </StyledTableCellSm>
                      </StyledTableRowSm>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Grid className={classes.section}>
            <Grid className={classes.header}>
              <Typography variant="h5" color="textPrimary">
                Recently Used
              </Typography>
            </Grid>
            <TableContainer className={classes.tableContainer}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <StyledTableCellSm>Name</StyledTableCellSm>
                    <StyledTableCellSm>Price</StyledTableCellSm>
                    <StyledTableCellSm>My Price</StyledTableCellSm>
                    <StyledTableCellSm width="15%">Favorite</StyledTableCellSm>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentBillings.length
                    ? recentBillings.map((item) => (
                      <StyledTableRowSm
                        key={item.name}
                        className={classes.pointer}
                        onClick={() => onItemSelect(item)}
                      >
                        {!!item.name && item.name.length > 30
                          ? (
                            <Tooltip title={item.name}>
                              <StyledTableCellSm
                                className={classes.overFlowControl}
                              >
                                {item.name}
                              </StyledTableCellSm>
                            </Tooltip>
                          )
                          : <StyledTableCellSm>{item.name}</StyledTableCellSm>}
                        <StyledTableCellSm>{item.proc_price ? `$${item.proc_price}` : ""}</StyledTableCellSm>
                        <StyledTableCellSm>{item.client_fee ? `$${item.client_fee}` : ""}</StyledTableCellSm>
                        <StyledTableCellSm>{item.favorite ? "Yes" : ""}</StyledTableCellSm>
                      </StyledTableRowSm>
                    ))
                    : (
                      <StyledTableRowSm>
                        <StyledTableCellSm colSpan={4}>
                          <Typography align="center" variant="body1" className={classes.text}>
                            No Records found...
                          </Typography>
                        </StyledTableCellSm>
                      </StyledTableRowSm>
                    )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>

      <Grid item md={4} className={classes.amountContainer}>
        <form onSubmit={(e) => onFormSubmit(e, selectedBilling)}>
          <Grid container spacing={2} className={classes.mb1}>
            <Grid item sm={9} xs={9}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                label="Notes"
                value={selectedBilling?.note || ""}
                onChange={(e) => setSelectedBilling({
                  ...selectedBilling,
                  note: e.target.value,
                })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item sm={6} xs={6}>
              <TextField
                autoFocus={Boolean(storeBilling)}
                inputRef={textInput}
                fullWidth
                size="small"
                variant="outlined"
                value={selectedBilling?.name || ""}
                InputProps={{
                  readOnly: storeBilling === null,
                  classes: {
                    input: storeBilling ? "" : classes.nameInput,
                  },
                }}
              />
            </Grid>
            <Grid item sm={3} xs={3}>
              <TextField
                fullWidth
                required
                type="number"
                size="small"
                variant="outlined"
                label="Amount"
                value={selectedBilling?.client_fee || selectedBilling?.proc_price || ""}
                onChange={(e) => setSelectedBilling({
                  ...selectedBilling,
                  client_fee: e.target.value,
                })}
              />
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                type="submit"
                fullWidth
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </>
  );
};

BillingDialog.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default BillingDialog;
