import React, { useState } from "react";

import {
  Grid,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { mdiInformationOutline } from "@mdi/js";
import Icon from "@mdi/react";
import PropTypes from "prop-types";

import Popover from "../../../../components/common/Popover";
import { StyledTableCellSm, StyledTableRowSm } from "../../../../components/common/StyledTable";
import { calculateFunctionalRange, calculatePercentageFlag } from "../../../../utils/FunctionalRange";
import { hasValue } from "../../../../utils/helpers";
import { getMarkerDefinition } from "../../../../utils/markerDefinition";
import { getMarkerInterpretation } from "../../../../utils/markerInterpretation";
import MarkerDefinition from "../../../Patient/components/MarkerDefinition";
import GraphDialog from "./component/GraphDialog";

const useStyles = makeStyles(() => ({
  cursorPointer: {
    cursor: "pointer",
  },
  iconContainer: {
    "& svg": {
      cursor: "pointer",
      position: "relative",
      top: 3,
    },
  },
}));

const LabValues = (props) => {
  const classes = useStyles();
  const { labValues, patientData } = props;
  const patientAge = patientData.age;
  const { gender } = patientData;

  const [selectedGraph, setSelectedGraph] = useState(null);
  const [showGraphDialog, setShowGraphDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handlePopoverOpen = (event, marker) => {
    setAnchorEl(event.currentTarget);
    setSelectedMarker(marker);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setSelectedMarker(null);
  };

  const toggleGraphDialog = () => {
    setShowGraphDialog((prevState) => !prevState);
  };

  const rowClickHandler = (row) => {
    setSelectedGraph(row);
    // toggleGraphDialog();
  };

  const showPopoverIcon = (marker) => (
    // eslint-disable-next-line max-len
    Boolean(getMarkerDefinition(marker.id).length || (getMarkerInterpretation(marker.id).low.length && getMarkerInterpretation(marker.id).high.length))
  );

  const showPopover = Boolean(selectedMarker);

  return (
    <>
      {!!showGraphDialog && (
        <GraphDialog
          fileName={selectedGraph?.name}
          isOpen={showGraphDialog}
          onClose={toggleGraphDialog}
        />
      )}
      {
        showPopover && (
          <Popover
            open={showPopover}
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
          >
            <MarkerDefinition data={selectedMarker} />
          </Popover>
        )
      }
      <TableContainer>
        <Table size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCellSm colSpan={2}>Marker</StyledTableCellSm>
              <StyledTableCellSm>Result</StyledTableCellSm>
              <StyledTableCellSm>Conventional Range</StyledTableCellSm>
              <StyledTableCellSm>Conventional Flag</StyledTableCellSm>
              <StyledTableCellSm>Functional Range</StyledTableCellSm>
              <StyledTableCellSm>Functional Flag</StyledTableCellSm>
              <StyledTableCellSm>Units</StyledTableCellSm>
            </TableRow>
          </TableHead>
          <TableBody>
            {!!labValues && labValues.length
              ? labValues.map((row) => {
                const functionalRange = calculateFunctionalRange(row.id, gender, patientAge);
                return (
                  <StyledTableRowSm
                    key={row.id}
                    className={classes.cursorPointer}
                    onClick={() => rowClickHandler(row)}
                  >
                    <StyledTableCellSm>
                      {row.name}
                    </StyledTableCellSm>
                    <StyledTableCellSm className={classes.iconContainer}>
                      {showPopoverIcon(row) && (
                        <Grid
                          onMouseEnter={(e) => handlePopoverOpen(e, row)}
                          onMouseLeave={handlePopoverClose}
                        >
                          <Icon
                            path={mdiInformationOutline}
                            size={0.85}
                          />
                        </Grid>
                      )}
                    </StyledTableCellSm>
                    <StyledTableCellSm>{row.value}</StyledTableCellSm>
                    <StyledTableCellSm>
                      {hasValue(row.range_low) && hasValue(row.range_high) && (
                        `${row.range_low} - ${row.range_high}`
                      )}
                    </StyledTableCellSm>
                    <StyledTableCellSm>
                      {
                        hasValue(row.range_low)
                        && hasValue(row.range_high)
                        && hasValue(row.value) && (
                          `${calculatePercentageFlag(row.range_low, row.range_high, row.value)}`
                        )
                      }
                    </StyledTableCellSm>
                    <StyledTableCellSm>
                      {hasValue(functionalRange.low) && hasValue(functionalRange.high)
                        ? `${functionalRange.low} - ${functionalRange.high}`
                        : ""}
                    </StyledTableCellSm>
                    <StyledTableCellSm>
                      {
                        hasValue(functionalRange.low)
                        && hasValue(functionalRange.high) && (
                          `${calculatePercentageFlag(
                            functionalRange.low,
                            functionalRange.high,
                            row.value,
                          )
                          }`
                        )
                      }
                    </StyledTableCellSm>
                    <StyledTableCellSm>{row.unit}</StyledTableCellSm>
                  </StyledTableRowSm>
                );
              })
              : (
                <StyledTableRowSm>
                  <StyledTableCellSm colSpan={7}>
                    <Typography align="center" variant="body1">
                      No Records Found...
                    </Typography>
                  </StyledTableCellSm>
                </StyledTableRowSm>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

LabValues.propTypes = {
  patientData: PropTypes.shape({
    gender: PropTypes.string,
    age: PropTypes.string,
  }).isRequired,
  labValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ).isRequired,
};

export default LabValues;
