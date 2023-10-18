import React, { useEffect, useState } from "react";

import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CloseIcon from "@material-ui/icons/CloseOutlined";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";

import Appointments from "../../../../../../services/appointments.service";
import { mapAppointmentStatus } from "../../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: "1px solid #ddd",
    textAlign: "center",
    "& h2": {
      fontSize: "16px",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    padding: theme.spacing(1),
  },
  tableContainer: {
    minWidth: 850,
  },
  content: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    fontSize: "18px",
    minWidth: "800px",
  },
  modalConentBelow: { opacity: "1" },
  contentWithLoading: {
    opacity: "0.5",
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

const MessageHistory = ({
  isOpen,
  onClose,
  isLoading,
  isNewMessage,
  onSubmit,
  errors,
  ...props
}) => {
  const classes = useStyles();
  const { onModalEnter } = props;
  const [history, setHistory] = useState([]);

  async function fetchAppointmentHistory() {
    const { data } = await Appointments.getHistory();
    setHistory(data);
  }

  /* eslint-disable */
  useEffect(() => {
    fetchAppointmentHistory()
  }, []);
  /* eslint-enable */

  return (
    <Dialog
      open={isOpen}
      maxWidth="md"
      onClose={onClose}
      onEnter={onModalEnter}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" className={classes.title}>
        Appointment History
        {onClose ? (
          <IconButton
            aria-label="Close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
      <DialogContent className={classes.content}>
        {isLoading && (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <div
          className={clsx({
            [classes.modalConentBelow]: true, // always apply
            [classes.contentWithLoading]: isLoading, // only when isLoading === true
          })}
        >
          <DialogContentText id="alert-dialog-description">
            <TableContainer className={classes.tableContainer}>
              <Table size="small" className={classes.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Patient</StyledTableCell>
                    <StyledTableCell>Provider</StyledTableCell>
                    <StyledTableCell>Appointment Start</StyledTableCell>
                    <StyledTableCell>Appointment End</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                    <StyledTableCell>Updated</StyledTableCell>
                    <StyledTableCell>Updated by</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!!history
                    && Boolean(history.length)
                    && history.map((row) => (
                      <StyledTableRow key={row.id}>
                        <TableCell component="th" scope="row">
                          {row.patient || ""}
                        </TableCell>
                        <TableCell>{row.provider || ""}</TableCell>
                        <TableCell>{moment(row.start_dt).format("MMM D YYYY")}</TableCell>
                        <TableCell>{moment(row.end_dt).format("MMM D YYYY")}</TableCell>
                        <TableCell>{mapAppointmentStatus(row.status) || ""}</TableCell>
                        <TableCell>{moment(row.updated).format("MMM D YYYY") || ""}</TableCell>
                        <TableCell>{row.updated_by || ""}</TableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContentText>

        </div>
      </DialogContent>
    </Dialog>
  );
};

MessageHistory.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isNewMessage: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onModalEnter: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(
    PropTypes.shape({
      msg: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default MessageHistory;
