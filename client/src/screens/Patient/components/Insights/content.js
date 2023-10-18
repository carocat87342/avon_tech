import React, {
  useState, useEffect, useCallback, useMemo,
} from "react";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import moment from "moment";

import Popover from "../../../../components/common/Popover";
import usePatientContext from "../../../../hooks/usePatientContext";
import { InsightsTests, MissingTests } from "../../../../static/insightsTests";
import { calculateFunctionalRange, calculatePercentage } from "../../../../utils/FunctionalRange";
import { calculateAge, hasValue } from "../../../../utils/helpers";
import { getMarkerDefinition } from "../../../../utils/markerDefinition";
import { getMarkerInterpretation } from "../../../../utils/markerInterpretation";
import MarkerDefinition from "../MarkerDefinition";

const useStyles = makeStyles((theme) => ({
  button: {
    padding: theme.spacing(1),
  },
  actions: {
    display: "flex",
    justifyContent: "center",
    border: "none",
    "& button": {
      fontSize: "12px",
    },
  },
  noRecordsMessage: {
    lineHeight: "21px",
    fontSize: 12,
  },
  mr: {
    marginRight: theme.spacing(0.5),
  },
  status: {
    marginLeft: theme.spacing(0.5),
    color: "orange",
  },
}));

const StyledTableCell = withStyles(() => ({
  head: {
    fontSize: "12px",
    whiteSpace: "nowrap",
    fontWeight: 700,
    padding: "0px 6px 2px 2px",
    verticalAlign: "baseline",
    lineHeight: 1.25,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles(() => ({
  root: {
    fontSize: 12,
    border: "unset",
    "& th": {
      fontSize: 12,
      whiteSpace: "nowrap",
      padding: "2px 8px 0px 2px",
      border: "unset",
    },
    "& td": {
      fontSize: 12,
      lineHeight: "13px",
      whiteSpace: "nowrap",
      padding: "2px 18px 0px 2px",
      border: "unset",
      "& svg": {
        fontSize: "1rem",
        position: "relative",
        zIndex: 1,
        top: 3,
        left: -3,
      },
    },
  },
}))(TableRow);

const InsightsContent = () => {
  const classes = useStyles();
  const { state } = usePatientContext();
  const { data } = state.tests;
  const { gender, dob } = state.patientInfo.data;
  const patientAge = Number(calculateAge(dob).split(" ")[0]);

  const [tests, setTests] = useState([]);
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

  const filterRequiredTests = useCallback(() => {
    if (!!data && data.length) {
      const tempArray = [];
      InsightsTests.forEach((test) => {
        data.forEach((allTest) => {
          if (test.id === allTest.marker_id) {
            tempArray.push({
              ...allTest,
              ...test,
            });
          }
        });
      });
      setTests([...tempArray, ...MissingTests]);
    } else {
      setTests([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    filterRequiredTests();
  }, [filterRequiredTests]);

  const getFlag = (val, functionalRange) => {
    const result = {};
    if (hasValue(functionalRange.low) && hasValue(functionalRange.high)) {
      const { value, flag } = calculatePercentage(functionalRange.low, functionalRange.high, val.value);
      result.number = value;
      result.icon = flag;
    } else if (hasValue(val.range_low) && hasValue(val.range_high)) {
      const { value, flag } = calculatePercentage(val.range_low, val.range_high, val.value);
      result.number = value;
      result.icon = flag;
    }
    return result;
  };

  const getRange = (value, functionalRange) => {
    const range = {};
    if (hasValue(functionalRange.low) && hasValue(functionalRange.high)) {
      range.value = `${functionalRange.low} - ${functionalRange.high}`;
    } else if (hasValue(value.range_low) && hasValue(value.range_high)) {
      range.value = `${value.range_low} - ${value.range_high}`;
    }
    return range;
  };

  const renderIcon = (value) => {
    switch (value) {
      case 0:
        return <ArrowDownwardIcon />;
      case 1:
        return <ArrowUpwardIcon />;
      default:
        return null;
    }
  };

  const calculateStatus = (flag, icon, value) => {
    if ((flag === "Low" && icon === 0) || (flag === "High" && icon === 1)) {
      return (
        <span className={classes.status}>
          {value}
          %
        </span>
      );
    }
    return null;
  };

  // eslint-disable-next-line max-len
  const showPopover = useMemo(() => Boolean(selectedMarker && (getMarkerDefinition(selectedMarker.marker_id).length || (getMarkerInterpretation(selectedMarker.marker_id).low.length && getMarkerInterpretation(selectedMarker.marker_id).high.length))), [selectedMarker]);

  return (
    <>
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
      {!!tests && tests.length
        ? (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Marker</StyledTableCell>
                  <StyledTableCell>Date</StyledTableCell>
                  <StyledTableCell>Value</StyledTableCell>
                  <StyledTableCell>Range</StyledTableCell>
                  <StyledTableCell>Flag</StyledTableCell>
                  <StyledTableCell>Iron Deficiency</StyledTableCell>
                  <StyledTableCell>Blood Loss</StyledTableCell>
                  <StyledTableCell>
                    Anemia of
                    <br />
                    Inflammation
                  </StyledTableCell>
                  <StyledTableCell>
                    Hemolytic
                    <br />
                    Anemia
                  </StyledTableCell>
                  <StyledTableCell>
                    Hemochromatosis /
                    <br />
                    Hemosiderosis
                  </StyledTableCell>
                  <StyledTableCell>
                    Sideroblastic
                    <br />
                    Anemia
                  </StyledTableCell>
                  <StyledTableCell>Iron Poisoning</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tests.map((row) => {
                  const functionalRange = calculateFunctionalRange(row.marker_id, gender, patientAge);
                  const flag = getFlag(row, functionalRange);
                  const range = getRange(row, functionalRange);
                  return (
                    <StyledTableRow key={row.name}>
                      <TableCell
                        onMouseEnter={(e) => handlePopoverOpen(e, row)}
                        onMouseLeave={handlePopoverClose}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>
                        {row.lab_dt ? moment(row.lab_dt).format("MMM D YYYY") : ""}
                      </TableCell>
                      <TableCell>{row.value}</TableCell>
                      <TableCell>{range.value}</TableCell>
                      <TableCell>
                        {flag.number > 0 ? `${flag.icon} ${flag.number}%` : ""}
                      </TableCell>
                      <TableCell>
                        {row.ironNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.iron)}
                        {calculateStatus(flag.icon, row.iron, flag.number)}
                      </TableCell>
                      <TableCell>
                        {row.bloodNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.blood)}
                        {calculateStatus(flag.icon, row.blood, flag.number)}
                      </TableCell>
                      <TableCell>
                        {row.inflammationNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.inflammation)}
                        {calculateStatus(flag.icon, row.inflammation, flag.number)}
                      </TableCell>
                      <TableCell>
                        {row.hemolyticNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.hemolytic)}
                        {calculateStatus(flag.icon, row.hemolytic, flag.number)}
                      </TableCell>
                      <TableCell>
                        {row.hemochromatosisNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.hemochromatosis)}
                        {calculateStatus(flag.icon, row.hemochromatosis, flag.number)}
                      </TableCell>
                      <TableCell>
                        {row.sideroblasticNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.sideroblastic)}
                        {calculateStatus(flag.icon, row.sideroblastic, flag.number)}
                      </TableCell>
                      <TableCell>
                        {row.ironPoisoningNormal ? <span className={classes.mr}>N</span> : ""}
                        {renderIcon(row.ironPoisoning)}
                        {calculateStatus(flag.icon, row.ironPoisoning, flag.number)}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )
        : null}
    </>
  );
};

InsightsContent.propTypes = {
};

export default InsightsContent;
