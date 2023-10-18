import React from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import moment from "moment";

import usePatientContext from "../../../hooks/usePatientContext";

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

const FormsDetails = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.forms;

  return (
    <TableContainer className={classes.tableContainer}>
      <Table size="small" className={classes.table}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Title</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!!data
            && data.length
            ? data.map((row) => (
              <StyledTableRow key={row.form_id}>
                <TableCell component="th" scope="row">
                  {moment(row.created).format("MMM D YYYY")}
                </TableCell>
                <TableCell>{row.form_id || ""}</TableCell>
                <TableCell>{row.title || ""}</TableCell>
              </StyledTableRow>
            ))
            : (
              <StyledTableRow>
                <TableCell colSpan={3}>
                  <Typography align="center" variant="body1">
                    No Records Found...
                  </Typography>
                </TableCell>
              </StyledTableRow>
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FormsDetails;
