import React, { useMemo, useState } from "react";

import {
  Grid, Typography, Divider, Menu, MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";

import Alert from "../../../components/Alert";
import useAuth from "../../../hooks/useAuth";
import usePatientContext from "../../../hooks/usePatientContext";
import {
  setSelectedMessage, resetSelectedMessage, toggleMessageDialog, toggleMessageDialogPage, setMessageType,
} from "../../../providers/Patient/actions";
import PatientService from "../../../services/patient.service";
import { urlify } from "../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  inputRow: {
    marginBottom: theme.spacing(0.5),
  },
  text12: {
    fontSize: 12,
    fontWeight: 500,
    whiteSpace: "wrap",
  },
  label: {
    marginRight: theme.spacing(1 / 2),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
  dateText: {
    minWidth: 80,
  },
  icon: {
    cursor: "pointer",
    marginTop: 5,
  },
}));

const MessagesContent = (props) => {
  const { reloadData } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuth();
  const { state, dispatch } = usePatientContext();
  const patientData = state.patientInfo.data;
  const patientName = `${patientData.firstname} ${patientData.lastname}`;
  const { data, selectedMessage } = state.messages;
  const { patientId } = state;

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const openDeleteDialog = () => {
    setShowDeleteDialog((prevstate) => !prevstate);
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog((prevstate) => !prevstate);
    dispatch(resetSelectedMessage());
  };

  const openMenu = (event, item) => {
    setAnchorEl(event.currentTarget);
    dispatch(setSelectedMessage(item));
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const deleteItemHandler = (item) => {
    const messageId = item.id;
    PatientService.deleteMessages(patientId, messageId)
      .then((response) => {
        enqueueSnackbar(`${response.data.message}`, { variant: "success" });
        closeDeleteDialog();
        reloadData();
      });
  };

  const isDeletDisabled = useMemo(() => {
    if (selectedMessage && selectedMessage.user_id_from === user.id) {
      return false;
    }
    return true;
  }, [selectedMessage, user.id]);

  // commented out edit disable as per CLIN-54 comments
  // const isEditDisabled = useMemo(() => {
  //   if (selectedMessage && selectedMessage.user_id_from === user.id) {
  //     return false;
  //   }
  //   return true;
  // }, [selectedMessage, user.id]);

  const isReplyDisabled = useMemo(() => {
    if (selectedMessage && selectedMessage.user_id_from === null) {
      return false;
    }
    return true;
  }, [selectedMessage]);

  // if patient_id_from is not null and user_id_to is not null then message is to user
  // if user_id_from is not null and patient_id_to is not null then message is to patient

  const messageIsToUser = useMemo(() => {
    if (selectedMessage && !!selectedMessage.patient_id_from && !!selectedMessage.user_id_to) {
      return true;
    }
    return false;
  }, [selectedMessage]);

  return (
    <>
      <Alert
        open={showDeleteDialog}
        title="Confirm Delete"
        message="Are you sure you want to delete this message?"
        applyButtonText="Delete"
        cancelButtonText="Cancel"
        applyForm={() => deleteItemHandler(selectedMessage)}
        cancelForm={closeDeleteDialog}
      />
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={isMenuOpen}
        onClose={closeMenu}
      >
        <MenuItem
          disabled={isDeletDisabled}
          onClick={() => {
            openDeleteDialog();
            closeMenu();
          }}
        >
          Delete
        </MenuItem>
        <MenuItem
          // disabled={isEditDisabled}
          onClick={() => {
            if (messageIsToUser) {
              dispatch(toggleMessageDialogPage());
            } else {
              dispatch(toggleMessageDialog());
            }
            closeMenu();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          disabled={isReplyDisabled}
          onClick={() => {
            dispatch(setMessageType("Reply To"));
            dispatch(toggleMessageDialog());
            closeMenu();
          }}
        >
          Reply
        </MenuItem>
      </Menu>
      {data.map((item, index) => (
        <Grid key={item.id}>
          <Grid container spacing={1} className={classes.inputRow}>
            <Grid item className={classes.dateText}>
              {/* <Typography
                component="span"
                variant="body1"
                className={`${classes.text12} ${classes.label}`}
                color="textPrimary"
              >
                Date:
              </Typography> */}
              <Typography
                component="span"
                variant="body1"
                className={classes.text12}
                color="textPrimary"
              >
                {moment(item.created).format("MMM D YYYY")}
              </Typography>
            </Grid>

            <Grid item xs>
              <Grid container>
                <Grid item xs={6}>
                  <Typography
                    component="span"
                    variant="body1"
                    className={`${classes.text12} ${classes.label}`}
                    color="textPrimary"
                  >
                    From:
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.text12}
                    color="textPrimary"
                  >
                    {item.user_to_from || patientName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    component="span"
                    variant="body1"
                    className={`${classes.text12} ${classes.label}`}
                    color="textPrimary"
                  >
                    To:
                  </Typography>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.text12}
                    color="textPrimary"
                  >
                    {item.user_to_name || patientName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <MoreVertIcon
              fontSize="small"
              className={classes.icon}
              onClick={(e) => openMenu(e, item)}
            />
          </Grid>
          <Grid key={item.id}>
            <Typography
              variant="body1"
              className={classes.text12}
              color="textPrimary"
              dangerouslySetInnerHTML={{ __html: urlify(item.message) }}
            />
          </Grid>
          {data.length !== index + 1 && <Divider className={classes.divider} />}
        </Grid>
      ))}
    </>
  );
};

MessagesContent.defaultProps = {
  reloadData: () => { },
};

MessagesContent.propTypes = {
  reloadData: PropTypes.func,
};

export default MessagesContent;
