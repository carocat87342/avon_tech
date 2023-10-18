import React, { useEffect, useState } from "react";

import { Grid } from "@material-ui/core";
import { orderBy } from "lodash";
import PropTypes from "prop-types";

import { calculateFunctionalRange, calculatePercentage } from "../../../../utils/FunctionalRange";
import { hasValue } from "../../../../utils/helpers";
import MarkerDefinition from "../../../Patient/components/MarkerDefinition";

const Interpretation = (props) => {
  const { labValues, patientData } = props;
  const { gender, age, functionalRange } = patientData;
  const patientAge = Number(age.split(" ")[0]);

  const [labData, setLabData] = useState([]);

  useEffect(() => {
    if (labValues.length) {
      let tempData = [];
      labValues.forEach((item) => {
        const {
          id, value, range_low, range_high,
        } = item;
        let output;
        if (functionalRange) {
          const funcRange = calculateFunctionalRange(id, gender, patientAge);
          if (hasValue(funcRange.low) && hasValue(funcRange?.high)) {
            output = calculatePercentage(funcRange.low, funcRange.high, value);
          } else if (hasValue(range_low) && hasValue(range_high)) {
            output = calculatePercentage(range_low, range_high, value);
          }
        } else if (hasValue(range_low) && hasValue(range_high)) {
          output = calculatePercentage(range_low, range_high, value);
        }
        if (output?.flag.length) {
          output.id = id;
          output.name = item.name;
          tempData.push(output);
        }
      });
      tempData = orderBy(tempData, ["value"], ["desc"]);
      setLabData([...tempData]);
    }
  }, [labValues, functionalRange, gender, patientAge]);

  return (
    <>
      {Boolean(labData.length) && labData.map((item) => (
        <Grid key={item.id}>
          <MarkerDefinition
            data={item}
            showHigh={item.flag === "High"}
            showLow={item.flag === "Low"}
          />
        </Grid>
      ))}
    </>
  );
};

Interpretation.propTypes = {
  patientData: PropTypes.shape({
    gender: PropTypes.string,
    age: PropTypes.string,
    functionalRange: PropTypes.number,
  }).isRequired,
  labValues: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.number,
    }),
  ).isRequired,
};

export default Interpretation;
