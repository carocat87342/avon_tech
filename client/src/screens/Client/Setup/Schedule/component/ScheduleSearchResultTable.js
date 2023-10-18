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
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/DeleteOutline";
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
      paddingLeft: 20,
      paddingRight: 20,
    },
    "& td": {
      padding: "6px 20px",
      fontSize: 12,
      height: "50px",
    },
  },
}))(TableRow);

const ScheduleSearchResultTable = ({
  handleOnEditClick,
  searchResult,
  handleDeleteSchedule,
}) => {
  const classes = useStyles();
  return (
    <Grid item xs={12}>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table className={classes.table} aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox" align="center">
                User
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Timezone
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Date Start
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Date End
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Time Start
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Time End
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Mon
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Tues
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Wed
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Thu
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Fri
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Active
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Status
              </StyledTableCell>
              {/*
              <StyledTableCell padding="checkbox" align="center">
                Created
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Created By
              </StyledTableCell>
              */}
              <StyledTableCell padding="checkbox" align="center">
                Updated
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Updated By
              </StyledTableCell>
              <StyledTableCell padding="checkbox" align="center">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult.map((result) => (
              <StyledTableRow key={result.id}>
                <TableCell padding="checkbox" component="th" scope="row">
                  {result.user_name}
                </TableCell>
                <TableCell padding="checkbox" component="th" scope="row">
                  {result?.timezone}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.start_date_time ? moment(result.start_date_time).format("ll") : ""}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.end_date_time ? moment(result.end_date_time).format("ll") : ""}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.start_date_time ? moment(result.start_date_time).format("LT") : ""}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.end_date_time ? moment(result.end_date_time).format("LT") : ""}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result?.monday ? "Yes" : "No"}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result?.tuesday ? "Yes" : "No"}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result?.wednesday ? "Yes" : "No"}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result?.thursday ? "Yes" : "No"}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result?.friday ? "Yes" : "No"}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.active ? "Yes" : "No"}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {moment(result.start_date_time) > moment()
                    ? "Future"
                    : moment(result.end_date_time) < moment()
                      ? "Past"
                      : "Current"}
                </TableCell>
                {/*
                <TableCell padding="checkbox" align="center">
                  {result.created ? moment(result.created).format("lll") : ""}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.created_name}
                </TableCell>
                */}
                <TableCell padding="checkbox" align="center">
                  {result.updated ? moment(result.updated).format("MMM DD YYYY") : ""}
                </TableCell>
                <TableCell padding="checkbox" align="center">
                  {result.updated_name}
                </TableCell>
                <TableCell padding="checkbox" align="center" style={{ minWidth: "100px" }}>
                  <IconButton aria-label="edit" onClick={() => handleOnEditClick(result.id)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={() => handleDeleteSchedule(result.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
};

ScheduleSearchResultTable.propTypes = {
  handleOnEditClick: PropTypes.func.isRequired,
  handleDeleteSchedule: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(PropTypes.arrayOf({})).isRequired,
};

export default ScheduleSearchResultTable;
