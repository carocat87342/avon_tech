import React, { useEffect, useState } from "react";

import moment from "moment";
import PropTypes from "prop-types";
import {
  LineChart,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ResponsiveContainer,
} from "recharts";

import Colors from "../../../../theme/colors";
import { round1 } from "../../../../utils/helpers";
import CustomTooltip from "../Tooltip";

const countDecimals = (value) => {
  if (Math.floor(value) === value) return 0;
  return value.toString().split(".")[1].length || 0;
};
function roundNumber(num, scale) {
  if (!`${num}`.includes("e")) {
    return +`${Math.round(`${num}e+${scale}`)}e-${scale}`;
  }
  const arr = `${num}`.split("e");
  let sig = "";
  if (+arr[1] + scale > 0) {
    sig = "+";
  }
  return +`${Math.round(`${+arr[0]}e${sig}${+arr[1] + scale}`)}e-${scale}`;
}

const Graph = ({ data, functionalRange, conventionalRange }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [graphData, setGraphData] = useState([]);
  const [low, setLow] = useState(0);
  const [high, setHigh] = useState(0);

  /* eslint-disable */
  useEffect(() => {
    const middle = (conventionalRange?.high + conventionalRange?.low) / 2;
    if (conventionalRange?.high > functionalRange?.high) {
      if (
        Math.round(conventionalRange?.high + middle * 0.12) <
        conventionalRange?.high
      ) {
        const newHigh = conventionalRange?.high + middle * 0.12;
        if (countDecimals(newHigh) > 2) {
          setHigh(roundNumber(newHigh.toFixed(2), 1));
        } else {
          setHigh(newHigh);
        }
      } else {
        setHigh(Math.round(conventionalRange?.high + middle * 0.12));
      }
    } else if (!!functionalRange) {
      if (Math.round(functionalRange?.high + middle * 0.12) < functionalRange?.high) {
        const newHigh = functionalRange?.high + middle * 0.12;
        if (countDecimals(newHigh) > 2) {
          setHigh(roundNumber(newHigh.toFixed(2), 1));
        } else {
          setHigh(newHigh);
        }
      } else {
        setHigh(Math.round(functionalRange?.high + middle * 0.12));
      }
    } else if (
      Math.round(conventionalRange?.high + middle * 0.12) <
      conventionalRange?.high
    ) {
      const newHigh = conventionalRange?.high + middle * 0.12;
      if (countDecimals(newHigh) > 2) {
        setHigh(roundNumber(newHigh.toFixed(2), 1));
      } else {
        setHigh(newHigh);
      }
    } else {
      setHigh(Math.round(conventionalRange?.high + middle * 0.12));
    }

    if (!!functionalRange) {
      if (conventionalRange?.low < functionalRange?.low) {
        if (conventionalRange?.low < 1) {
          setLow(0);
        } else {
          setLow(Math.round(conventionalRange?.low - middle * 0.12));
        }
      } else if (functionalRange?.low < 1) {
        setLow(0);
      } else {
        setLow(Math.round(functionalRange?.low - middle * 0.12));
      }
    } else if (conventionalRange?.low < 1) {
      setLow(0);
    } else {
      setLow(Math.round(conventionalRange?.low - middle * 0.12));
    }

    if (functionalRange.low === conventionalRange.low) {
      setLow(functionalRange.low);
    }
    if (functionalRange.high === conventionalRange.high) {
      setHigh(functionalRange.high);
    }
  }, [conventionalRange]);

  /* eslint-disable */
  useEffect(() => {
    if (data) {
      const hash = Object.create(null);
      const result = data.map((d) => {
        if (
          !moment(d.lab_dt).format("YYYY") ||
          hash[moment(d.lab_dt).format("YYYY")]
        ) {
          return null;
        }
        hash[moment(d.lab_dt).format("YYYY")] = true;
        return moment(d.lab_dt).format("YYYY");
      });
      const tempData = data.map((d, index) => ({
        id: d.id,
        lab_dt: d.lab_dt,
        filename: d.filename,
        value: d.value,
        year: moment(d.lab_dt).format("MMM YYYY"),
      }));
      setGraphData(tempData);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <ResponsiveContainer width="100%" height={600}>
      {isLoading ? <> </> : (
        <LineChart
          width={1100}
          height={600}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 10,
          }}
        >
          <XAxis
            dataKey="year"
            interval={0}
            style={{
              fontSize: "0.8rem",
              margin: "2px",
            }}
          />
          <YAxis
            type="number"
            domain={[low, high]}
            interval={0}
            tickCount={8}
            style={{
              fontSize: "0.8rem",
              margin: "2px",
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            y={conventionalRange?.high}
            label={{
              position: "insideTopLeft",
              value: `Conventional range ${round1(conventionalRange?.high)}`,
              fontSize: "0.6rem",
              fill: "#477fc9",
            }}
            stroke="#477fc9"
          />
          {!!functionalRange?.high && (
            <ReferenceLine
              y={functionalRange?.high}
              label={{
                position: "insideTopLeft",
                value: `Functional range ${round1(functionalRange?.high)}`,
                fontSize: "0.6rem",
                fill: "#477fc9",
              }}
              stroke="#477fc9"
            />
          )}
          {!!functionalRange?.low && (
            <ReferenceLine
              y={functionalRange?.low}
              label={{
                position: "insideBottomLeft",
                value: `Functional range ${round1(functionalRange?.low)}`,
                fontSize: "0.6rem",
                fill: "#477fc9",
              }}
              stroke="#477fc9"
            />
          )}
          <ReferenceLine
            y={conventionalRange?.low}
            label={{
              position: "insideBottomLeft",
              value: `Conventional range ${round1(conventionalRange?.low)}`,
              fontSize: "0.6rem",
              fill: "#477fc9",
            }}
            stroke="#477fc9"
          />
          <Line
            animationDuration={0}
            strokeWidth={2}
            type="monotone"
            dataKey="value"
            fill="#477fc9"
            stroke={Colors.graphInRange}
          />
        </LineChart>
      )}
    </ResponsiveContainer>
  );
};

Graph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      lab_dt: PropTypes.string,
      filename: PropTypes.string,
      value: PropTypes.number,
    })
  ).isRequired,
  functionalRange: PropTypes.shape({
    high: PropTypes.number,
    low: PropTypes.number,
  }).isRequired,
  conventionalRange: PropTypes.shape({
    high: PropTypes.number,
    low: PropTypes.number,
  }).isRequired,
};

export default Graph;