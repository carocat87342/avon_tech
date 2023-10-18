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
  Tooltip,
  withStyles,
} from "@material-ui/core";
import moment from "moment";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    minWidth: 450,
    marginTop: theme.spacing(2),
  },
  detailLink: {
    color: theme.palette.text.link,
    cursor: "pointer",
  },
  overFlowControl: {
    maxWidth: "130px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
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

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
}))(Tooltip);

const FinanceDetailTable = ({ financeDetail }) => {
  const classes = useStyles();
  const history = useHistory();

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
              <StyledTableCell padding="checkbox">Date</StyledTableCell>
              <StyledTableCell padding="checkbox">Billing Type</StyledTableCell>
              <StyledTableCell padding="checkbox">Amount</StyledTableCell>
              <StyledTableCell padding="checkbox">Encounter Tile</StyledTableCell>
              <StyledTableCell padding="checkbox">Note</StyledTableCell>
              <StyledTableCell padding="checkbox">Patient</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {financeDetail.map((detail) => (
              <StyledTableRow key={detail.id}>
                <TableCell padding="checkbox">
                  {detail.dt ? moment(detail.dt).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox" component="th" scope="row">
                  {detail.name}
                </TableCell>
                <TableCell padding="checkbox">
                  <NumberFormat
                    value={Number(detail.amount)?.toFixed(2)}
                    displayType="text"
                    thousandSeparator
                    prefix="$"
                  />
                </TableCell>
                <TableCell padding="checkbox">
                  {detail.encounter_title}
                </TableCell>
                {detail.note && detail.note.length > 40 ? (
                  <LightTooltip title={detail.note}>
                    <TableCell
                      padding="checkbox"
                      className={classes.overFlowControl}
                    >
                      {detail.note || ""}
                    </TableCell>
                  </LightTooltip>
                ) : (
                  <TableCell
                    padding="checkbox"
                    className={classes.overFlowControl}
                  >
                    {detail.note || ""}
                  </TableCell>
                )}
                <TableCell
                  padding="checkbox"
                  className={classes.detailLink}
                  onClick={() => history.push(`/patients/${detail.hyperlink}`)}
                >
                  {detail.patient_name}
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

FinanceDetailTable.propTypes = {
  financeDetail: PropTypes.arrayOf(
    PropTypes.arrayOf({
      name: PropTypes.string,
      encounter_title: PropTypes.string,
      dt: PropTypes.string,
      note: PropTypes.string,
      amount: PropTypes.number,
      created: PropTypes.string,
      hyperlink: PropTypes.string,
      patient_name: PropTypes.string,
    }),
  ).isRequired,
};

export default FinanceDetailTable;
