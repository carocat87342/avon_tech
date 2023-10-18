import React from "react";

import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
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
  button: {
    padding: 9,
  },
  overflowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
}));
const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0,0,0,0.87)",
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
      height: "50px",
    },
  },
}))(TableRow);

const Appointments = ({ appointments, onEdit, onDelete }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table size="small" className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Appointment Type</StyledTableCell>
            <StyledTableCell align="center">Description</StyledTableCell>
            <StyledTableCell>Minutes</StyledTableCell>
            <StyledTableCell>Fee</StyledTableCell>
            <StyledTableCell>Patient Schedule</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Created By</StyledTableCell>
            <StyledTableCell>Updated</StyledTableCell>
            <StyledTableCell>Updated By</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <StyledTableRow key={appointment.id}>
              <TableCell component="th" scope="row">
                {appointment.appointment_type}
              </TableCell>
              {appointment.descr && appointment.descr.length > 0 ? (
                <LightTooltip title={appointment.descr}>
                  <TableCell className={classes.overflowControl} align="center">
                    {appointment.descr}
                  </TableCell>
                </LightTooltip>
              ) : (
                <TableCell className={classes.overflowControl} align="center">
                  {appointment.descr || ""}
                </TableCell>
              )}
              <TableCell>{appointment.length}</TableCell>
              <TableCell>{`$${Number(appointment.fee)?.toFixed(2)}`}</TableCell>
              <TableCell>{appointment.allow_patients_schedule ? "Yes" : "No"}</TableCell>
              {/*
              {appointment.note && appointment.note.length > 0 ? (
                <LightTooltip title={appointment.note}>
                  <TableCell className={classes.overflowControl} align="center">
                    {appointment.note}
                  </TableCell>
                </LightTooltip>
              ) : (
                <TableCell className={classes.overflowControl} align="center">
                  {appointment.note || ""}
                </TableCell>
              )}
              */ }
              <TableCell>{appointment.active ? "Active" : "-"}</TableCell>
              <TableCell>{moment(appointment.created).format("lll")}</TableCell>
              <TableCell>{appointment.created_user}</TableCell>
              <TableCell>
                {appointment.updated ? moment(appointment.updated).format("lll") : "-"}
              </TableCell>
              <TableCell>{appointment.updated_user || "-"}</TableCell>
              <TableCell className={classes.actions}>
                <IconButton
                  aria-label="edit"
                  onClick={() => onEdit(appointment.id)}
                  className={classes.button}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => onDelete(appointment.id)}
                  className={classes.button}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

Appointments.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      appointment_type: PropTypes.string,
      appointment_name_portal: PropTypes.string,
      length: PropTypes.number,
      allow_patients_schedule: PropTypes.number,
      sort_order: PropTypes.number,
      note: PropTypes.string,
      created: PropTypes.string,
      created_user: PropTypes.string,
      updated: PropTypes.string,
      updated_user: PropTypes.string,
    }),
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Appointments;
