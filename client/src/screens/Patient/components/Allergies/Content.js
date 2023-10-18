import React, { useState } from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import usePatientContext from "../../../../hooks/usePatientContext";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles(() => ({
  text12: {
    fontSize: 12,
  },
  noWrap: {
    whiteSpace: "nowrap",
  },
  blockAction: {
    marginLeft: 5,
    textAlign: "right",
    "& button": {
      padding: 2,
    },
    "& svg": {
      fontSize: "1rem",
      cursor: "pointer",
    },
  },
}));

const AllergiesContent = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = usePatientContext();
  const { patientId } = state;
  const { data } = state.allergies;

  const { reloadData } = props;

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
    const allergyId = item.drug_id;
    PatientService.deleteAllergy(patientId, allergyId)
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
        message="Are you sure you want to delete this allergy?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedItem)}
        cancelForm={closeDeleteDialog}
      />
      {data.map((item) => (
        <Grid container key={item.drug_id} alignItems="center">
          <Grid item xs={3}>
            <Typography className={classes.text12}>
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={`${classes.text12} ${classes.noWrap}`}>
              {item.name}
            </Typography>
          </Grid>
          <Grid item className={classes.blockAction}>
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

AllergiesContent.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default AllergiesContent;
