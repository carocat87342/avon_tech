import React, { useCallback, useEffect, useState } from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import { useSnackbar } from "notistack";

import EmailPatient from "../../../../services/manage/emailPatient.service";
import ConfirmEmail from "./Dialog/ConfirmEmail";
import EditEmail from "./Dialog/EditEmail";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  statusWrapper: {
    display: "flex",
    alignItems: "center",
    "& p": {
      marginRight: theme.spacing(2),
    },
  },
  emailStatus: {
    display: "inline",
  },

  status: {
    display: "flex",
    alignItems: "center",
  },
  subject: {
    width: "50%",
  },
  fields: {
    display: "flex",
    flexDirection: "column",
  },
  texArea: {
    width: "75%",
  },
  next: {
    margin: theme.spacing(3, 0, 2),
    maxWidth: "100px",
  },
  historyTop: {
    marginTop: "15px",
  },
  tableContainer: {
    borderRadius: 0,
    marginTop: "5px",
    display: "flex",
    border: "black solid 1px",
    padding: "5px",
    height: "300px",
    flexDirection: "row",
  },
  noRecords: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  marginRight: {
    marginRight: theme.spacing(1),
  },
}));

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}))(Tooltip);


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
    },
  },
}))(TableRow);

const isLessThan30Minutes = (createdTime) => (
  moment()
    .subtract(30, "minutes")
    .format()
  < moment(createdTime)
    .format()
);


export default function EmailPatients() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  // const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailHistory, setEmailHistory] = useState([]);
  const [emailStatus, setEmailStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState({});

  const fetchEmailHistory = useCallback(() => {
    EmailPatient.getEmailHistory().then((response) => {
      setEmailHistory(response.data.data);
    });
  }, []);

  useEffect(() => {
    fetchEmailHistory();
  }, [fetchEmailHistory]);

  const handleEmailHistoryDeletion = (createdDate) => {
    EmailPatient.deleteEmailHistory(moment(createdDate).format("YYYY-MM-DD HH:mm:ss")).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      fetchEmailHistory();
    });
  };

  const handleSave = (data) => {
    EmailPatient.createEmailHistory(data).then((response) => {
      enqueueSnackbar(`${response.data.message}`, {
        variant: "success",
      });
      fetchEmailHistory();
      setIsModalOpen();
    });
  };

  const handleNextClick = () => {
    setIsModalOpen(true);
  };

  const handleOnEdit = (data) => {
    setIsEditModalOpen(true);
    setSelectedEmail(data);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h2"
        color="textPrimary"
        className={classes.title}
      >
        Email Patients
      </Typography>
      <Typography component="p" variant="body2" color="textPrimary">
        This pages send a message to all patients
      </Typography>
      <div className={classes.statusWrapper}>
        <Typography component="p" variant="body2" color="textPrimary">
          Patient Status:
        </Typography>
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="status"
            name="status"
            value={emailStatus}
            onChange={(e) => setEmailStatus(e.target.value)}
            className={classes.emailStatus}
          >
            <FormControlLabel value="U" control={<Radio />} label="Active" />
            <FormControlLabel value="R" control={<Radio />} label="Inactive" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className={classes.fields}>
        {/* Commented out as per CLIN-114 */}
        {/* <TextField
          className={classes.subject}
          value={subject}
          variant="outlined"
          margin="normal"
          id="subject"
          label="Subject"
          name="subject"
          autoComplete="subject"
          autoFocus
          onChange={(event) => setSubject(event.target.value)}
          size="small"
        /> */}
        <TextField
          autoFocus
          fullWidth
          variant="outlined"
          label="Message"
          className={classes.texArea}
          InputProps={{
            classes: classes.normalOutline,
            inputComponent: TextareaAutosize,
            rows: 8,
          }}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          size="small"
        />
        <Button
          disabled={!message}
          variant="contained"
          color="primary"
          className={classes.next}
          onClick={() => handleNextClick()}
        >
          Next
        </Button>
      </div>
      <div className={classes.historyTop}>
        <Typography component="p" variant="body2" color="textPrimary">
          History
        </Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table
            size="small"
            className={classes.table}
          >
            <TableHead>
              <TableRow>
                <StyledTableCell padding="checkbox">Date</StyledTableCell>
                <StyledTableCell padding="checkbox">Subject</StyledTableCell>
                <StyledTableCell padding="checkbox">Message</StyledTableCell>
                <StyledTableCell padding="checkbox">Status</StyledTableCell>
                <StyledTableCell padding="checkbox">Sent By</StyledTableCell>
                <StyledTableCell padding="checkbox">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emailHistory.length
                ? emailHistory.map((history) => (
                  <StyledTableRow key={history.created}>
                    <TableCell
                      style={{ whiteSpace: "nowrap" }}
                      padding="checkbox"
                      component="th"
                      scope="row"
                    >
                      {moment(history.created).format("lll")}
                    </TableCell>
                    <TableCell padding="checkbox" component="th" scope="row">
                      {history.subject}
                    </TableCell>
                    {history.message && history.message.length > 25 ? (
                      <LightTooltip title={history.message}>
                        <TableCell
                          padding="checkbox"
                          className={classes.overFlowControl}
                        >
                          {`${history.message.substring(0, 25)}...`}
                        </TableCell>
                      </LightTooltip>
                    ) : (
                      <TableCell
                        padding="checkbox"
                        className={classes.overFlowControl}
                      >
                        {history.message || ""}
                      </TableCell>
                    )}

                    <TableCell padding="checkbox" component="th" scope="row">
                      {history.status
                        ? history.status === "U" ? "Active" : "InActive"
                        : ""}
                    </TableCell>
                    <TableCell padding="checkbox">
                      {history.created_user}
                    </TableCell>
                    <TableCell padding="checkbox" className={classes.actions}>
                      {isLessThan30Minutes(history.created)
                        ? (
                          <>
                            <IconButton
                              aria-label="edit"
                              className={classes.marginRight}
                              onClick={() => handleOnEdit(history)}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => handleEmailHistoryDeletion(history.created)}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </>
                        )
                        : ""}

                    </TableCell>
                  </StyledTableRow>
                ))
                : (
                  <StyledTableRow>
                    <TableCell colSpan={6}>
                      <Typography align="center" variant="body1">
                        No Records Found...
                      </Typography>
                    </TableCell>
                  </StyledTableRow>
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {isModalOpen
        && (
          <ConfirmEmail
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(data) => handleSave(data)}
            emailData={{
              // subject,
              emailStatus,
              message,
            }}
          />
        )}
      {isEditModalOpen
        && (
          <EditEmail
            isOpen={isEditModalOpen}
            onUpdate={() => fetchEmailHistory()}
            onClose={() => setIsEditModalOpen(false)}
            selectedEmail={selectedEmail}
          />
        )}
    </div>
  );
}
