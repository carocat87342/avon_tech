import React, { useState } from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import Tooltip from "../../../../components/common/CustomTooltip";
import usePatientContext from "../../../../hooks/usePatientContext";
import PatientService from "../../../../services/patient.service";

const useStyles = makeStyles((theme) => ({
  text12: {
    fontSize: 12,
  },
  inputRow: {
    flexWrap: "nowrap",
  },
  block: {
    width: 90,
    minWidth: 90,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  fullWidth: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
  },
  blockAction: {
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


const DiagnosesContent = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = usePatientContext();
  const { data, activeData, status } = state.diagnoses;
  const { patientId } = state;

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
    const icdId = item.icd_id;
    PatientService.deleteDiagnoses(patientId, icdId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
  };

  const cardData = status ? activeData : data;

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
      {
        cardData.map((item) => (
          <Grid key={item.icd_id} container className={classes.inputRow} alignItems="center">
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {item.icd_id}
            </Typography>
            {
              !!item.name && item.name.length > 40
                ? (
                  <Tooltip title={item.name}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {`${item.name} ${item.active ? "" : "(Inactive)"}`}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {`${item.name} ${item.active ? "" : "(Inactive)"}`}
                  </Typography>
                )
            }
            <Grid item className={classes.blockAction}>
              <IconButton
                onClick={() => openDeleteDialog(item)}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))
      }
    </>
  );
};

DiagnosesContent.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default DiagnosesContent;
