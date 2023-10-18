
import React, { useState, useCallback, useEffect } from "react";

import {
  Box,
  Grid,
  Typography,
  makeStyles,
  Button,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  MenuItem,
} from "@material-ui/core";
import { mdiOpenInNew } from "@mdi/js";
import Icon from "@mdi/react";
import { useSnackbar } from "notistack";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import useAuth from "../../../../hooks/useAuth";
import MessageToUserService from "../../../../services/message-to-user.service";
import { messageStatusType, dateFormat } from "../../../../utils/helpers";
import MessageToUser from "../MessageToUser";

const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: theme.spacing(2),
  },
  gutterBottom: {
    marginBottom: theme.spacing(1),
  },
  text12: {
    fontSize: 14,
    fontWeight: 500,
    whiteSpace: "wrap",
  },
  label: {
    marginRight: theme.spacing(1),
    fontWeight: "bold",
  },
  borderSection: {
    position: "relative",
    border: "1px solid #aaa",
    borderRadius: "4px",
    padding: theme.spacing(0.5, 1.5),
    minHeight: 120,
  },
  divider: {
    margin: theme.spacing(3, 0),
    background: "#aaa",
  },
  mr2: {
    marginRight: theme.spacing(2),
  },
  text: {
    lineHeight: "21px",
    fontSize: 12,
  },
  historyHeading: {
    position: "absolute",
    left: 0,
    top: theme.spacing(-3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  patientIconLink: {
    display: "inline-block",
    color: "rgba(0, 0, 0, 0.38)",
  },
  patientIcon: {
    width: "1.1rem !important",
    height: "1.1rem !important",
    marginBottom: "-5px",
    marginLeft: "4px",
  },
}));

const StatusSelectionFields = [
  {
    label: "Open",
    value: "O",
  },
  {
    label: "Closed",
    value: "C",
  },
];

const MessageSection = (props) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const {
    message, showDivider, fetchMessages, onChangeHandler, index, isEdit,
  } = props;
  const {
    id, created, user_to_name, patient_from_name, subject, message: messageString,
    status, note_assign, user_id_to, patient_id_from,
  } = message;

  const [statusSelection, setStatusSelection] = useState(status);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageHistory, setMessageHistory] = useState(false);
  const [messageAssignees, setMessageAssignees] = useState(false);
  const [assignTo, setAssignTo] = useState(user_id_to || user.id);
  const [assignmentNotes, setAssignmentNotes] = useState(note_assign);

  const fetchMessageHistory = useCallback(() => {
    MessageToUserService.getMessageHistory(id).then((res) => {
      setMessageHistory(res.data);
    });
  }, [id]);

  const fetchAssignees = useCallback(() => {
    MessageToUserService.getMessageAssignees().then((res) => {
      setMessageAssignees(res.data);
    });
  }, []);

  useEffect(() => {
    fetchMessageHistory();
    fetchAssignees();
  }, [fetchMessageHistory, fetchAssignees]);

  const handleStatusSelection = (e) => {
    const { value } = e.target;
    setStatusSelection(value);
    if (!isEdit) {
      onChangeHandler("statusSelection", value, index);
    }
  };

  const toggleMessageDialog = () => {
    setShowMessageDialog((prevState) => !prevState);
  };

  const messageUpdateHandler = () => {
    const reqBody = {
      data: {
        user_id_to: assignTo,
        message_status: statusSelection,
        note_assign: assignmentNotes,
      },
    };
    MessageToUserService.updateMessage(id, reqBody).then((res) => {
      enqueueSnackbar(`${res.message}`, { variant: "success" });
      fetchMessages();
    });
  };

  return (
    <>
      {!!showMessageDialog && (
        <MessageToUser
          isOpen={showMessageDialog}
          onClose={toggleMessageDialog}
          reloadData={fetchMessages}
          message={message}
        />
      )}
      <Grid item lg={6} xs={12}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              Date:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              {dateFormat(created)}
            </Typography>
          </Grid>

          <Grid item xs alignItems="center">
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
              {patient_from_name}

              <Link
                to={`/patients/${patient_id_from}`}
                className={classes.patientIconLink}
                target="_blank"
              >
                <Icon
                  className={classes.patientIcon}
                  path={mdiOpenInNew}
                  size={1}
                  horizontal
                  vertical
                  rotate={180}
                />
              </Link>
            </Typography>
          </Grid>
          <Grid item xs>
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
              {user_to_name}
            </Typography>
          </Grid>
          <Grid item xs>
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              Status:
            </Typography>
            <Typography
              component="span"
              variant="body1"
              className={classes.text12}
              color="textPrimary"
            >
              {messageStatusType(status)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs>
          <Typography
            component="span"
            variant="body1"
            className={`${classes.text12} ${classes.label}`}
            color="textPrimary"
          >
            Subject:
          </Typography>
          <Typography
            component="span"
            variant="body1"
            className={classes.text12}
            color="textPrimary"
          >
            {subject}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.gutterBottom}>
        <Grid item xs>
          <Typography
            component="span"
            variant="body1"
            className={`${classes.text12} ${classes.label}`}
            color="textPrimary"
          >
            Message:
          </Typography>
          <Typography
            component="span"
            variant="body1"
            className={classes.text12}
            color="textPrimary"
          >
            {messageString}
          </Typography>
        </Grid>
      </Grid>

      <Grid container spacing={1} className={classes.gutterBottom}>
        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            className={classes.mr2}
            onClick={() => toggleMessageDialog()}
          >
            Send Message to Patient
          </Button>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Typography
              component="span"
              variant="body1"
              className={`${classes.text12} ${classes.label}`}
              color="textPrimary"
            >
              Status:
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={statusSelection}
                onChange={handleStatusSelection}
              >
                {StatusSelectionFields.map((radioOption) => (
                  <FormControlLabel
                    key={`${radioOption.label}_${radioOption.value}`}
                    value={radioOption.value}
                    label={radioOption.label}
                    control={<Radio color="primary" />}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Box width={200} mb={1}>
        <TextField
          select
          size="small"
          variant="outlined"
          name="assignTo"
          label="Assign To"
          fullWidth
          value={assignTo}
          className={classes.gutterBottom}
          onChange={(e) => {
            const { value } = e.target;
            setAssignTo(value);
            if (!isEdit) {
              onChangeHandler("assignTo", value, index);
            }
          }}
        >
          {messageAssignees.length ? messageAssignees.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {`${option.firstname} ${option.lastname}`}
            </MenuItem>
          ))
          : (
            <MenuItem value="">
              No Assignee Available
            </MenuItem>
          )}
        </TextField>
      </Box>

      <Grid container justify="space-between" spacing={1}>
        <Grid item lg={7} xs={12}>
          <TextField
            variant="outlined"
            name="notes"
            label="Assignment Note"
            type="text"
            fullWidth
            multiline
            rows={5}
            value={assignmentNotes}
            onChange={(e) => {
              const { value } = e.target;
              setAssignmentNotes(value);
              if (!isEdit) {
                onChangeHandler("assignmentNotes", value, index);
              }
            }}
          />
        </Grid>
        <Grid item lg={4} xs={12}>
          <Grid className={classes.borderSection}>
            <Typography className={classes.historyHeading}>Message History</Typography>
            <TableContainer>
              <Table size="small" aria-label="prescriptions-table">
                <TableHead>
                  <TableRow>
                    <StyledTableCellSm>Assigned To</StyledTableCellSm>
                    <StyledTableCellSm>Status</StyledTableCellSm>
                    <StyledTableCellSm>Updated</StyledTableCellSm>
                    <StyledTableCellSm>Updated By</StyledTableCellSm>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {messageHistory.length
                    ? messageHistory.map((row) => (
                      <StyledTableRowSm key={`${row.assigned_to}_${row.updated}_${row.updated_by}`}>
                        <StyledTableCellSm>{row.assigned_to}</StyledTableCellSm>
                        <StyledTableCellSm>{messageStatusType(row.status)}</StyledTableCellSm>
                        <StyledTableCellSm>{dateFormat(row.updated)}</StyledTableCellSm>
                        <StyledTableCellSm>{row.updated_by}</StyledTableCellSm>
                      </StyledTableRowSm>
                    ))
                    : (
                      <StyledTableRowSm>
                        <StyledTableCellSm colSpan={10}>
                          <Typography className={classes.text} align="center" variant="body1">
                            No History Found...
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
      {isEdit && (
        <Box mt={1.5}>
          <Button
            variant="outlined"
            onClick={() => messageUpdateHandler()}
          >
            Save
          </Button>
        </Box>
      )}
      {
        showDivider && (
          <Divider className={classes.divider} />
        )
      }
    </>
  );
};

MessageSection.propTypes = {
  index: PropTypes.number.isRequired,
  showDivider: PropTypes.bool.isRequired,
  fetchMessages: PropTypes.func.isRequired,
  onChangeHandler: PropTypes.func.isRequired,
  isEdit: PropTypes.bool.isRequired,
  message: PropTypes.shape({
    id: PropTypes.number,
    created: PropTypes.string,
    status: PropTypes.string,
    note_assign: PropTypes.string,
    user_id_to: PropTypes.number,
    user_to_name: PropTypes.string,
    patient_from_name: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    patient_id_from: PropTypes.number,
  }).isRequired,
};

export default MessageSection;
