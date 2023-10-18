import React from "react";

import {
  Grid, Typography, Table, TableBody,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import PropTypes from "prop-types";

import { StyledTableRowSm, StyledTableCellSm } from "../../../../../../../components/common/StyledTable";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: 14,
  },
  root: {
    "& td": {
      color: theme.palette.text.primary,
    },
  },
}));

const BillingPayments = (props) => {
  const classes = useStyles();
  const { data: billingPayments, isLoading } = props;

  return (
    <Grid item lg={4} className={classes.root}>
      <Table size="small">
        <TableBody>
          {!!billingPayments && billingPayments.length
            ? billingPayments.map((item) => (
              <StyledTableRowSm key={item.dt}>
                <StyledTableCellSm>{moment(item.dt).format("MMM D YYYY hh:mm A")}</StyledTableCellSm>
                <StyledTableCellSm>
                  $
                  {item.amount}
                </StyledTableCellSm>
                <StyledTableCellSm>{item.type}</StyledTableCellSm>
                <StyledTableCellSm>{item.card_num}</StyledTableCellSm>
              </StyledTableRowSm>
            ))
            : (
              <StyledTableRowSm>
                <StyledTableCellSm colSpan={4}>
                  <Typography align="center" variant="body1" className={classes.text}>
                    {isLoading ? "Loading..." : "No Records found..."}
                  </Typography>
                </StyledTableCellSm>
              </StyledTableRowSm>
            )}
        </TableBody>
      </Table>
    </Grid>
  );
};

BillingPayments.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.string,
      type: PropTypes.string,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};


export default BillingPayments;
