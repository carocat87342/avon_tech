import React, { useCallback, useEffect, useState } from "react";

import { Button, Grid, Typography } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import usePatientContext from "../../../../hooks/usePatientContext";
import { toggleDiagnosesDialog } from "../../../../providers/Patient/actions";
import PatientService from "../../../../services/patient.service";

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
  switchAction: {
    minWidth: 135,
  },
  statusButton: {
    position: "absolute",
    right: "15%",
    top: "10px",
    display: "flex",
    alignItems: "center",
  },
  mr1: {
    marginRight: theme.spacing(1),
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

const DiagnosesDetails = (props) => {
  const { reloadData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [status, setStatus] = useState(true);
  const [activeState, setActiveState] = useState({});

  const { state, dispatch } = usePatientContext();
  const { data, activeData } = state.diagnoses;

  const cardData = status ? activeData : data;
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

  const mapStateForRows = useCallback(() => {
    const stateObj = {};
    cardData.forEach((item) => {
      stateObj[item.name] = !!item.active;
    });
    setActiveState({ ...stateObj });
  }, [cardData]);

  useEffect(() => {
    mapStateForRows();
  }, [mapStateForRows]);

  const deleteItemHandler = (item) => {
    const icdId = item.icd_id;
    PatientService.deleteDiagnoses(patientId, icdId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
  };

  const updateStatusHandler = (event, icdId) => {
    const { name, checked } = event.target;
    setActiveState({ ...activeState, [name]: checked });
    const reqBody = {
      data: {
        active: checked,
      },
    };
    PatientService.updateDiagnoses(patientId, icdId, reqBody)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, {
          variant: "success",
        });
        reloadData();
      });
  };

  const toggleStatus = () => {
    reloadData();
    setStatus((prevState) => !prevState);
  };

  return (
    <>
      <Alert
        open={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this diagnoses?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedItem)}
        cancelForm={closeDeleteDialog}
      />
      <Grid className={classes.statusButton}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => toggleStatus()}
          className={classes.mr1}
        >
          {`${status ? "Show" : "Hide"} Inactive`}
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(toggleDiagnosesDialog())}
        >
          New Diagnoses
        </Button>
      </Grid>
      <TableContainer className={classes.tableContainer}>
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!cardData
              && cardData.length
              ? cardData.map((row) => (
                <StyledTableRow key={`${row.created}_${row.icd_id}`}>
                  <TableCell component="th" scope="row">
                    {moment(row.created).format("MMM D YYYY")}
                  </TableCell>
                  <TableCell>{row.icd_id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className={classes.switchAction}>
                    <FormControlLabel
                      control={(
                        <Switch
                          checked={!!activeState[row.name]}
                          onChange={(e) => updateStatusHandler(e, row.icd_id)}
                          name={row.name}
                          color="primary"
                          size="small"
                        />
                      )}
                      label={activeState[row.name] ? "Active" : "Inactive"}
                    />
                  </TableCell>
                  <TableCell className={classes.actions}>
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
                  <TableCell colSpan={5}>
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

DiagnosesDetails.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default DiagnosesDetails;
