import React from "react";

import {
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
import moment from "moment";
import PropTypes from "prop-types";
// import NumberFormat from "react-number-format";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 650,
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
      fontSize: 12,
    },
  },
}))(TableRow);

const AccountingTypesTable = ({ result }) => {
  const classes = useStyles();
  return (
    <div>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          size="small"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">Type</StyledTableCell>
              <StyledTableCell padding="checkbox">Status</StyledTableCell>
              <StyledTableCell padding="checkbox">Note</StyledTableCell>
              <StyledTableCell padding="checkbox">Client</StyledTableCell>
              <StyledTableCell padding="checkbox">Created</StyledTableCell>
              <StyledTableCell padding="checkbox">Created By</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated</StyledTableCell>
              <StyledTableCell padding="checkbox">Updated By</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result.map((type) => (
              <StyledTableRow key={type.id}>
                <TableCell padding="checkbox" component="th" scope="row">
                  {type.name}
                </TableCell>
                {/*
                <TableCell padding="checkbox">
                  <NumberFormat
                    decimalScale={2}
                    value={type.amount}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                  />
                </TableCell>
                */}
                <TableCell padding="checkbox">
                  {type.status === "A"
                    ? "Active"
                    : type.status === "I"
                      ? "Inactive"
                      : type.status === "D"
                        ? "Deleted"
                        : ""}
                </TableCell>
                <TableCell padding="checkbox">{type.note || ""}</TableCell>
                <TableCell>
                  {type.client_name === null ? "All" : type.client_name}
                </TableCell>
                <TableCell padding="checkbox">
                  {type.created ? moment(type.created).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox">{type.created_user}</TableCell>
                <TableCell padding="checkbox">
                  {type.updated ? moment(type.updated).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox">{type.updated_user}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

AccountingTypesTable.propTypes = {
  result: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      amount: PropTypes.number,
      status: PropTypes.string,
      note: PropTypes.string,
      client_name: PropTypes.string,
      created: PropTypes.string,
      created_user: PropTypes.string,
      updated: PropTypes.string,
      updated_user: PropTypes.string,
    }),
  ).isRequired,
};

export default AccountingTypesTable;
