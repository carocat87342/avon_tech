import React, { useMemo } from "react";

import {
  Typography, makeStyles, Grid, Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import PropTypes from "prop-types";

import { stringWithoutComments, urlify } from "../../../../utils/helpers";
import { getMarkerDefinition } from "../../../../utils/markerDefinition";
import { getMarkerInterpretation } from "../../../../utils/markerInterpretation";

const useStyles = makeStyles((theme) => ({
  mb2: {
    marginBottom: theme.spacing(2),
  },
  main: {
    "& table, th, td": {
      border: "1px solid #37474f",
      borderCollapse: "collapse",
    },
    "& th": {
      whiteSpace: "noWrap",
      fontWeight: 600,
    },
    "& td": {
      verticalAlign: "top",
    },
  },
  tableCell: {
    maxWidth: "12.85vw",
  },
  tableCellSm: {
    maxWidth: "6vw",
    wordWrap: "break-word",
  },
}));

const MarkerDefinition = ({
  data, showTitle, showHigh, showLow,
}) => {
  const classes = useStyles();
  const markerId = data?.marker_id || data?.id;
  const markerExplanation = getMarkerDefinition(markerId);
  const markerInterpretation = getMarkerInterpretation(markerId);

  // eslint-disable-next-line max-len
  const hasHighData = useMemo(() => Boolean(markerInterpretation?.high.filter((x) => x?.comment.length).length), [markerInterpretation?.high]);
  // eslint-disable-next-line max-len
  const hasLowData = useMemo(() => Boolean(markerInterpretation?.low.filter((x) => x?.comment.length).length), [markerInterpretation?.low]);

  return (
    <Box maxWidth={900}>
      <Grid className={classes.main}>
        {showTitle && (
          <Typography variant="h4" gutterBottom>
            {data.name}
          </Typography>
        )}
        <Typography className={classes.mb2}>
          {stringWithoutComments(markerExplanation)}
        </Typography>
        {(showHigh && hasHighData) && (
          <TableContainer>
            <Table size="small" aria-label="elevated-table" className={classes.mb2}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>Elevated</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Condition</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Evidence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {markerInterpretation?.high.filter((x) => x?.comment.length).map((item) => (
                  <TableRow key={item.condition}>
                    <TableCell className={classes.tableCellSm}>{item.condition}</TableCell>
                    <TableCell
                      className={classes.tableCell}
                      dangerouslySetInnerHTML={{ __html: urlify(item.comment) }}
                    />
                    <TableCell>{item.evidence}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {(showLow && hasLowData) && (
          <TableContainer>
            <Table size="small" aria-label="decreased-table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={3}>Decreased</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Condition</TableCell>
                  <TableCell>Comment</TableCell>
                  <TableCell>Evidence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {markerInterpretation?.low.filter((x) => x?.comment.length).map((item) => (
                  <TableRow key={item.condition}>
                    <TableCell className={classes.tableCellSm}>{item.condition}</TableCell>
                    <TableCell
                      className={classes.tableCell}
                      dangerouslySetInnerHTML={{ __html: urlify(item.comment) }}
                    />
                    <TableCell>{item.evidence}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Grid>
    </Box>
  );
};

MarkerDefinition.defaultProps = {
  showTitle: true,
  showHigh: true,
  showLow: true,
};

MarkerDefinition.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    marker_id: PropTypes.number,
  }).isRequired,
  showTitle: PropTypes.bool,
  showHigh: PropTypes.bool,
  showLow: PropTypes.bool,
};

export default MarkerDefinition;
