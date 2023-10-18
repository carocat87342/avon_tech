import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";

import usePatientContext from "../../../../hooks/usePatientContext";

const useStyles = makeStyles(() => ({
  tableContainer: {
    minWidth: 650,
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

const BasicInfoHistory = () => {
  const { state } = usePatientContext();
  const classes = useStyles();
  const data = state.patientInfo.history;

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Medical Note</StyledTableCell>
            <StyledTableCell>Admin Note</StyledTableCell>
            <StyledTableCell>Created User</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data
            && Boolean(data.length)
            && data.map((row) => (
              <StyledTableRow key={`${row.created}_${row.name}`}>
                <TableCell component="th" scope="row">
                  {moment(row.created).format("MMM D YYYY")}
                </TableCell>
                <TableCell>{row.name || ""}</TableCell>
                <TableCell>{row.medical_note || ""}</TableCell>
                <TableCell>{row.admin_note || ""}</TableCell>
                <TableCell>{row.created_user || ""}</TableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicInfoHistory;
