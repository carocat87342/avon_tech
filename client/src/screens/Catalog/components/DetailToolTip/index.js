import React, { useMemo } from "react";

import {
  Typography, TableContainer, Table, TableRow, TableBody, TableHead, Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { chunk } from "lodash";
import PropTypes from "prop-types";

import { StyledTableRowSm, StyledTableCellSm } from "../../../../components/common/StyledTable";
import { APP_LOGIN_LINK } from "../../../../static/catalog";

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: "600",
  },
  text: {
    marginLeft: theme.spacing(1),
  },
  tableContainer: {
    marginTop: theme.spacing(1),
  },
}));

const DetailToolTip = (props) => {
  const classes = useStyles();
  const { data } = props;
  const {
    lab_name, proc_name, price, lab_id, detail,
  } = data;

  const details = useMemo(() => {
    const detailString = detail && detail.split(`",`);
    const detailsChunk = chunk(detailString, 2);

    const detailsArray = !!detailsChunk && detailsChunk.length && detailsChunk.map((detailElem) => (
      detailElem.map((elem) => {
        elem.trim();
        return elem.replace(/["]/g, ``);
      })
    ));

    return detailsArray;
  }, [detail]);

  return (
    <Box minWidth={300}>
      <Typography gutterBottom>
        <span className={classes.label}>Lab Company:</span>
        <span className={classes.text}>{lab_name}</span>
      </Typography>
      <Typography gutterBottom>
        <span className={classes.label}>Test Name:</span>
        <span className={classes.text}>{proc_name}</span>
      </Typography>
      <Typography gutterBottom>
        <span className={classes.label}>Price:</span>
        <span className={classes.text}>
          {lab_name === null || lab_id === 2 // Quest
            ? `$${Number(price).toFixed(2)}`
            : (
              <a className={classes.link} href={APP_LOGIN_LINK}>
                Login to see price
              </a>
            )}
        </span>
      </Typography>
      <TableContainer className={classes.tableContainer}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <StyledTableCellSm>Quest ID</StyledTableCellSm>
              <StyledTableCellSm>Test Name</StyledTableCellSm>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.length
              ? details.map((item) => (
                <StyledTableRowSm
                  key={item[0]}
                  className={classes.pointer}
                >
                  <StyledTableCellSm>{item[0]}</StyledTableCellSm>
                  <StyledTableCellSm>{item[1] || ""}</StyledTableCellSm>
                </StyledTableRowSm>
              ))
              : (
                <StyledTableRowSm>
                  <StyledTableCellSm colSpan={3}>
                    <Typography align="center" variant="body1">
                      No Records Found...
                    </Typography>
                  </StyledTableCellSm>
                </StyledTableRowSm>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

DetailToolTip.propTypes = {
  data: PropTypes.shape({
    lab_name: PropTypes.string,
    proc_name: PropTypes.string,
    price: PropTypes.number,
    lab_id: PropTypes.number,
    detail: PropTypes.string,
  }).isRequired,
};

export default DetailToolTip;
