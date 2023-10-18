import React from "react";

import PropTypes from "prop-types";

export default function ReferenceLabel(props) {
  const {
    fill, value,
    fontSize, viewBox,
  } = props;
  const x = viewBox.x + 2;
  const y = viewBox.y - 3;
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={fontSize || 9}
    >
      {value}
    </text>
  );
}

ReferenceLabel.defaultProps = {
  fontSize: 9,
};

ReferenceLabel.propTypes = {
  fill: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  fontSize: PropTypes.number,
  viewBox: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
};
