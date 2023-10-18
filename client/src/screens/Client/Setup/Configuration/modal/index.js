import React from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalAction: {
    borderTop: `1px solid ${theme.palette.background.default}`,
    display: "flex",
    justifyContent: "space-between",
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
      whiteSpace: "nowrap",
    },
    "& td": {
      fontSize: 12,
      whiteSpace: "nowrap",
    },
  },
}))(TableRow);

export default function ConfigModal({ modal }) {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Created</StyledTableCell>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Code</StyledTableCell>
            <StyledTableCell>Address</StyledTableCell>
            <StyledTableCell>AddressLineTwo</StyledTableCell>
            <StyledTableCell>City</StyledTableCell>
            <StyledTableCell>State</StyledTableCell>
            <StyledTableCell>Postal</StyledTableCell>
            <StyledTableCell>Country</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Fax</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Website</StyledTableCell>
            <StyledTableCell>CalendarStartTime</StyledTableCell>
            <StyledTableCell>CalendarEndTime</StyledTableCell>
            <StyledTableCell>FunctionalRange</StyledTableCell>
            <StyledTableCell>EIN</StyledTableCell>
            <StyledTableCell>NPI</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modal.data.map((result, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <StyledTableRow key={index}>
              <TableCell component="th" scope="row">
                {moment(result.dt).format("lll")}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.code}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.address}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.address2}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.city}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.state}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.postal}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.country}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.phone}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.fax}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.email}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.website}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.calendar_start_time}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.calendar_end_time}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.functional_range}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.ein}
              </TableCell>
              <TableCell component="th" scope="row">
                {result.npi}
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

ConfigModal.propTypes = {
  modal: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
      }),
    ),
  }).isRequired,
};
