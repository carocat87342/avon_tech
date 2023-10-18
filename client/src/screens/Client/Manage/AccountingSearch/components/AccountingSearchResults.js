import React from "react";

import { makeStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { dateTimeFormat } from "../../../../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "0",
  },
  paper: {
    padding: "5px",
  },
  tableContainer: {
    minWidth: 650,
    marginTop: theme.spacing(2),
  },
  patientLink: {
    color: theme.palette.text.link,
    cursor: "pointer",
  },
  placeholderText: {
    textAlign: "center",
    padding: "100px",
    fontWeight: "500",
    fontSize: "30px",
    opacity: "20%",
  },
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
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

const TotalTableRow = withStyles((theme) => ({
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
      fontWeight: "bold",
    },
  },
}))(TableRow);

export default function AccountingSearchResults(props) {
  const classes = useStyles();
  const history = useHistory();
  const { results } = props;
  const amount = results.reduce((a, b) => a + b.amount, 0);
  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer}>
        <Table
          size="small"
          className={classes.table}
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">Date</StyledTableCell>
              <StyledTableCell padding="checkbox">Type</StyledTableCell>
              <StyledTableCell padding="checkbox">Amount</StyledTableCell>
              <StyledTableCell padding="checkbox">Encounter</StyledTableCell>
              <StyledTableCell padding="checkbox">Note</StyledTableCell>
              <StyledTableCell padding="checkbox">Patient</StyledTableCell>
              <StyledTableCell padding="checkbox">Created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledTableRow key={index}>
                <TableCell
                  style={{ whiteSpace: "nowrap" }}
                  padding="checkbox"
                  component="th"
                  scope="row"
                >
                  {dateTimeFormat(result.dt)}
                </TableCell>
                <TableCell padding="checkbox" component="th" scope="row">
                  {result.name}
                </TableCell>
                <TableCell padding="checkbox">{`$${result.amount}`}</TableCell>
                {result.encounter_title?.length > 40 ? (
                  <LightTooltip title={result.encounter_title}>
                    <TableCell
                      padding="checkbox"
                      className={classes.overFlowControl}
                    >
                      {result.encounter_title}
                    </TableCell>
                  </LightTooltip>
                ) : (
                  <TableCell
                    padding="checkbox"
                    className={classes.overFlowControl}
                  >
                    {result.encounter_title}
                  </TableCell>
                )}
                {result.note && result.note.length > 40 ? (
                  <LightTooltip title={result.note}>
                    <TableCell
                      padding="checkbox"
                      className={classes.overFlowControl}
                    >
                      {result.note || ""}
                    </TableCell>
                  </LightTooltip>
                ) : (
                  <TableCell
                    padding="checkbox"
                    className={classes.overFlowControl}
                  >
                    {result.note || ""}
                  </TableCell>
                )}
                <TableCell
                  padding="checkbox"
                  onClick={() => history.push(`/patients/${result.patient_id}`)}
                  className={classes.patientLink}
                >
                  {result.patient_name}
                </TableCell>
                <TableCell padding="checkbox">
                  {dateTimeFormat(result.created)}
                </TableCell>
              </StyledTableRow>
            ))}
            <TotalTableRow>
              <TableCell colSpan={2} align="right">
                Total
              </TableCell>
              <TableCell>
                <div>{`$${amount}`}</div>
              </TableCell>
            </TotalTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

AccountingSearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.number.isRequired,
      client_id: PropTypes.number.isRequired,
      created: PropTypes.string.isRequired,
      encounter_title: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      note: PropTypes.string,
      patient_id: PropTypes.number.isRequired,
      patient_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
