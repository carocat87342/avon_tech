import React, { useState } from "react";

import {
  Grid, Divider, Typography, IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../components/Alert";
import usePatientContext from "../../../hooks/usePatientContext";
import { toggleEncountersDialog, setEncounter } from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import { urlify } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  block: {
    width: "22%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontWeight: "normal",
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  text12: {
    fontSize: 12,
  },
  label: {
    fontWeight: 600,
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

const EncountersContent = (props) => {
  const classes = useStyles();
  const { reloadData } = props;
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = usePatientContext();
  const { patientId } = state;
  const { data } = state.encounters;

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

  const editItemHandler = (encounter) => {
    dispatch(setEncounter(encounter));
    dispatch(toggleEncountersDialog());
  };

  const deleteItemHandler = (item) => {
    const encounterId = item.id;
    PatientService.deleteEncounter(patientId, encounterId)
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
        message="Are you sure you want to delete this encounter?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedItem)}
        cancelForm={closeDeleteDialog}
      />
      {
        data.map((item, index) => (
          <Grid key={item.id}>
            <Grid className={classes.inputRow} container>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {moment(item.dt).format("MMM D YYYY")}
              </Typography>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {item.encounter_type}
              </Typography>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {item.title}
              </Typography>
              <Typography
                component="span"
                className={`${classes.text12} ${classes.block}`}
                color="textPrimary"
              >
                {item.name}
              </Typography>
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

            <Grid className={classes.inputRow}>
              <Typography className={`${classes.text12}`} color="textPrimary">
                Internal Notes:
              </Typography>
              <Typography
                className={classes.text12}
                color="textPrimary"
                dangerouslySetInnerHTML={{ __html: urlify(item.notes) }}
              />
            </Grid>

            <Grid className={classes.inputRow}>
              <Typography className={`${classes.text12}`} color="textPrimary">
                Treatment Plan:
              </Typography>
              <Typography
                className={classes.text12}
                color="textPrimary"
                dangerouslySetInnerHTML={{ __html: urlify(item.treatment) }}
              />
            </Grid>

            {index + 1 !== data.length && <Divider className={classes.divider} />}
          </Grid>
        ))
      }
    </>
  );
};

EncountersContent.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default EncountersContent;
