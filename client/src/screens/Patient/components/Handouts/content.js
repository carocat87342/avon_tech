import React, { useMemo, useState } from "react";

import { Grid, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import { mdiTextBoxOutline } from "@mdi/js";
import Icon from "@mdi/react";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../../components/Alert";
import Tooltip from "../../../../components/common/CustomTooltip";
import Dialog from "../../../../components/Dialog";
import useAuth from "../../../../hooks/useAuth";
import usePatientContext from "../../../../hooks/usePatientContext";
import PatientService from "../../../../services/patient.service";
import SampleDocViewer from "../../Encounters/components/SampleDocViewer";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    flexWrap: "nowrap",
  },
  block: {
    minWidth: 90,
    maxWidth: 120,
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
  fullWidth: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    padding: theme.spacing(0, 0.5, 0, 0),
    minWidth: "fit-content",
  },
  text12: {
    fontSize: 12,
  },
}));

const HandoutsContent = (props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = usePatientContext();
  const { user } = useAuth();
  const { patientId } = state;
  const { data } = state.handouts;

  const { reloadData } = props;

  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
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

  const openPreviewDialog = (item) => {
    setSelectedItem(item);
    setShowPreviewDialog((prevstate) => !prevstate);
  };

  const closePreviewDialog = () => {
    setSelectedItem(null);
    setShowPreviewDialog((prevstate) => !prevstate);
  };

  const deleteItemHandler = (item) => {
    const handoutId = item.handout_id;
    PatientService.deleteHandout(patientId, handoutId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
  };

  // eslint-disable-next-line max-len
  const filePath = useMemo(() => `${process.env.REACT_APP_API_URL}static/handouts/c${user.client_id}_${selectedItem?.filename}`, [user, selectedItem]);

  return (
    <>
      {showPreviewDialog && (
        <Dialog
          open={showPreviewDialog}
          title="Handout Detail"
          message={<SampleDocViewer filePath={filePath} />}
          cancelForm={closePreviewDialog}
          hideActions
          size="md"
        />
      )}
      <Alert
        open={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this handout?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedItem)}
        cancelForm={closeDeleteDialog}
      />
      {
        data.map((item) => (
          <Grid
            key={`${item.created}_${item.filename}`}
            container
            alignItems="center"
            className={classes.inputRow}
          >
            <Typography
              component="span"
              className={`${classes.text12} ${classes.block}`}
              color="textPrimary"
            >
              {moment(item.created).format("MMM D YYYY")}
            </Typography>
            {
              !!item.filename && item.filename.length > 40
                ? (
                  <Tooltip title={item.filename}>
                    <Typography
                      component="span"
                      className={`${classes.text12} ${classes.fullWidth}`}
                      color="textPrimary"
                    >
                      {item.filename}
                    </Typography>
                  </Tooltip>
                )
                : (
                  <Typography
                    component="span"
                    className={`${classes.text12} ${classes.fullWidth}`}
                    color="textPrimary"
                  >
                    {item.filename}
                  </Typography>
                )
            }
            <Grid item className={classes.blockAction}>
              <IconButton
                onClick={() => openPreviewDialog(item)}
              >
                <Icon
                  path={mdiTextBoxOutline}
                  size={0.7}
                />
              </IconButton>
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

HandoutsContent.propTypes = {
  reloadData: PropTypes.func.isRequired,
};

export default HandoutsContent;
