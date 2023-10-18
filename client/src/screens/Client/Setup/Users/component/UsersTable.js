import React from "react";

import {
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/EditOutlined";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 450,
    marginTop: theme.spacing(2),
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
      padding: "6px 16px",
      fontSize: 12,
      height: "50px",
    },
  },
}))(TableRow);

const UsersTable = ({ users, handleOnEditClick }) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Firstname</StyledTableCell>
              <StyledTableCell>Lastname</StyledTableCell>
              <StyledTableCell>Title</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Timezone</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Type</StyledTableCell>
              <StyledTableCell>Schedule</StyledTableCell>
              <StyledTableCell>Appt</StyledTableCell>
              <StyledTableCell>Admin</StyledTableCell>
              <StyledTableCell>Note</StyledTableCell>
              <StyledTableCell>Forward</StyledTableCell>
              <StyledTableCell>Created</StyledTableCell>
              <StyledTableCell>Created By</StyledTableCell>
              <StyledTableCell>Updated</StyledTableCell>
              <StyledTableCell>Updated By</StyledTableCell>
              <StyledTableCell>Edit</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <StyledTableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {user.firstname}
                </TableCell>
                <TableCell>{user.lastname}</TableCell>
                <TableCell>{user.title}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.timezone}</TableCell>
                <TableCell>
                  {user.status === "A"
                    ? "Active"
                    : user.status === "I"
                      ? "Inactive"
                      : "Deleted"}
                </TableCell>
                <TableCell>
                  {user.type === "PP"
                    ? "Primary Provider"
                    : user.type === "SP"
                      ? "Secondary Provider"
                      : user.type === "A"
                        ? "Administrative"
                        : user.type === "L"
                          ? "Limited"
                          : ""}
                </TableCell>
                <TableCell>
                  {user.schedule === "F"
                    ? "Full"
                    : user.schedule === "H"
                      ? "Half"
                      : "Quarter"}
                </TableCell>
                <TableCell>{user.appointments ? "Yes" : "No"}</TableCell>
                <TableCell>{user.admin ? "Yes" : "No"}</TableCell>
                <TableCell>{user.note}</TableCell>
                <TableCell>{user.forward_user}</TableCell>
                <TableCell>
                  {user.created ? moment(user.created).format("lll") : ""}
                </TableCell>
                <TableCell>{user.created_user}</TableCell>
                <TableCell>
                  {user.updated ? moment(user.updated).format("lll") : ""}
                </TableCell>
                <TableCell>{user.updated_user}</TableCell>
                <TableCell>
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleOnEditClick(user.id)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

UsersTable.propTypes = {
  handleOnEditClick: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default UsersTable;
