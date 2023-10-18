import React from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import moment from "moment";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {},
  paper: {
    padding: "5px",
  },
  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
  },
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  patientLink: {
    color: theme.palette.text.link,
    cursor: "pointer",
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

export default function PatientSearchResults(props) {
  const classes = useStyles();
  const history = useHistory();
  const { results } = props;
  return (
    <div className={classes.root}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          size="small"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" align="center">
                Patient ID
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                First Name
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Middle Name
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Last Name
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                City
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                State
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Postal Code
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Country
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Phone
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Phone Home
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Email
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Gender
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Created
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledTableRow key={index}>
                <TableCell
                  padding="checkbox"
                  className={classes.patientLink}
                  onClick={() => history.push(`/patients/${result.id}`)}
                  align="center"
                  component="th"
                  scope="row"
                >
                  {result.id}
                </TableCell>
                <TableCell
                  padding="checkbox"
                  className={classes.patientLink}
                  align="center"
                  onClick={() => history.push(`/patients/${result.id}`)}
                  component="th"
                  scope="row"
                >
                  {result.firstname}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  className={classes.patientLink}
                  align="center"
                  onClick={() => history.push(`/patients/${result.id}`)}
                >
                  {result.middlename}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  className={classes.patientLink}
                  align="center"
                  onClick={() => history.push(`/patients/${result.id}`)}
                >
                  {result.lastname}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.city}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.state}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.postal}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.country}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.phone_cell}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.phone_home}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.email}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {result.gender}
                </TableCell>
                <TableCell
                  component="th"
                  scope="row"
                  padding="checkbox"
                  align="center"
                >
                  {moment(result.created).format("lll")}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

PatientSearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      firstname: PropTypes.string.isRequired,
      lastname: PropTypes.string.isRequired,
      middlename: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      postal: PropTypes.string.isRequired,
      country: PropTypes.string.isRequired,
      phone_cell: PropTypes.string.isRequired,
      phone_home: PropTypes.email,
      email: PropTypes.string.isRequired,
      gender: PropTypes.string.isRequired,
      created: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
