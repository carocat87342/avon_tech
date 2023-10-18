import React, { useState } from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../components/Alert";
import usePatientContext from "../../../hooks/usePatientContext";
import { setSelectedMedication, toggleMedicationDialog } from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  text12: {
    fontSize: 12,
  },
  block: {
    width: 90,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  fullWidth: {
    width: "41%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  blockAction: {
    "& button": {
      padding: 2,
    },
    "& svg": {
      fontSize: "1rem",
      cursor: "pointer",
    },
  },
}));

const MedicationsContent = (props) => {
  const classes = useStyles();
  const { reloadData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { patientId } = state;
  const { data } = state.medications;

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

  const editItemHandler = (item) => {
    dispatch(setSelectedMedication(item));
    dispatch(toggleMedicationDialog());
  };

  const deleteItemHandler = (item) => {
    const medicationId = item.id;
    PatientService.deleteMedications(patientId, medicationId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
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
      {data.map((item) => (
        <Grid key={`${item.start_dt}_${item.name}`} container>
          <Grid item className={classes.block}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              {moment(item.start_dt).format("MMM D YYYY")}
            </Typography>
          </Grid>
          <Grid item className={classes.block}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              {item.descr}
            </Typography>
          </Grid>
          <Grid item className={classes.fullWidth}>
            <Typography
              component="span"
              className={classes.text12}
              color="textPrimary"
            >
              {item.name}
            </Typography>
          </Grid>
          <Grid item className={classes.blockAction}>
            <IconButton
              onClick={() => editItemHandler(item)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => openDeleteDialog(item)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
};

MedicationsContent.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default MedicationsContent;
