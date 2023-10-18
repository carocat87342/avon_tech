import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../components/Alert";
import usePatientContext from "../../../hooks/usePatientContext";
import { toggleMedicationDialog, setSelectedMedication } from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
  },
  tableContainer: {
    minWidth: 650,
  },
  actions: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
  newButton: {
    position: "absolute",
    right: "20%",
    top: "10px",

    [theme.breakpoints.down("md")]: {
      right: "15%",
    },
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey,
    color: theme.palette.grey,
    fontSize: "12px",
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    fontSize: 14,
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "& th": {
      fontSize: 12,
    },
    "& td": {
      fontSize: 12,
      height: "50px",
    },
  },
}))(TableRow);

const MedicationsDetails = (props) => {
  const { reloadData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const { state, dispatch } = usePatientContext();
  const { data } = state.medications;
  const { patientId } = state;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const closeDeleteDialog = () => {
    setSelectedItem(null);
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const deleteItemHandler = (item) => {
    const drug_id = item.id;
    PatientService.deleteMedications(patientId, drug_id)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
  };

  const editItemHandler = (item) => {
    dispatch(setSelectedMedication(item));
    dispatch(toggleMedicationDialog());
  };

  return (
    <>
      <Alert
        open={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this medication?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedItem)}
        cancelForm={closeDeleteDialog}
      />
      <Button
        variant="outlined"
        className={classes.newButton}
        size="small"
        onClick={() => dispatch(toggleMedicationDialog())}
      >
        New
      </Button>
      <TableContainer className={classes.tableContainer}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Expires</StyledTableCell>
              <StyledTableCell>Strength</StyledTableCell>
              <StyledTableCell>Unit</StyledTableCell>
              <StyledTableCell>Amount</StyledTableCell>
              <StyledTableCell>Refills</StyledTableCell>
              <StyledTableCell>Patient Instructions</StyledTableCell>
              <StyledTableCell>Pharmacy Instructions</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!data
              && data.length
              ? data.map((row) => (
                <StyledTableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {moment(row.start_dt).format("MMM D YYYY")}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.expires}</TableCell>
                  <TableCell>{row.strength}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell>{row.amount}</TableCell>
                  <TableCell>{row.refills}</TableCell>
                  <TableCell>{row.patient_instructions}</TableCell>
                  <TableCell>{row.pharmacy_instructions}</TableCell>

                  <TableCell className={classes.actions}>
                    <IconButton
                      className={classes.button}
                      onClick={() => editItemHandler(row)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      className={classes.button}
                      onClick={() => openDeleteDialog(row)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              ))
              : (
                <StyledTableRow>
                  <TableCell colSpan={10}>
                    <Typography align="center" variant="body1">
                      No Records Found...
                    </Typography>
                  </TableCell>
                </StyledTableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

MedicationsDetails.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default MedicationsDetails;
