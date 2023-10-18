import React from "react";

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Proptypes from "prop-types";

import Dialog from "../../../../../../components/Dialog";

const useStyles = makeStyles((theme) => ({
  title: {
    backgroundColor: theme.palette.primary.light,
    "& h2": {
      color: "#fff",
    },
  },
  content: {
    minHeight: "450px",
  },
  tableContainer: {
    minWidth: 450,
    marginTop: theme.spacing(2),
  },
  modalAction: {
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

const ProcedureGroupMembersModal = ({ isOpen, hendleOnClose, groups }) => {
  const classes = useStyles();
  return (
    <Dialog
      size="lg"
      open={isOpen}
      cancelForm={hendleOnClose}
      title="Procedure Group Members"
      message={(
        <>
          <Grid className={classes.content}>
            <TableContainer component={Paper} className={classes.tableContainer}>
              <Table className={classes.table} aria-label="a dense table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Code</StyledTableCell>
                    <StyledTableCell align="left">Description</StyledTableCell>
                    <StyledTableCell>Lab Company</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groups.map((item) => (
                    <StyledTableRow key={item.id}>
                      <TableCell component="th" scope="row">
                        {item.id}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.leb}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid className={classes.modalAction}>
            <Button
              variant="outlined"
              onClick={hendleOnClose}
            >
              Cancel
            </Button>
          </Grid>
        </>
      )}
    />
  );
};

ProcedureGroupMembersModal.propTypes = {
  isOpen: Proptypes.bool.isRequired,
  hendleOnClose: Proptypes.func.isRequired,
  groups: Proptypes.arrayOf(
    Proptypes.shape({
      id: Proptypes.string,
      description: Proptypes.string,
      leb: Proptypes.string,
    }),
  ).isRequired,
};

export default ProcedureGroupMembersModal;
