import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";

const getRegions = (country) => {
  if (!country) {
    return [];
  }
  return country[2].split("|").map((regionPair) => {
    const [regionName = null, regionInShort] = regionPair.split("~");
    return [regionName, regionInShort];
  });
};

function RegionMUISelectors(props) {
  const {
    size, label, region, handleChange, outlined, country, margin,
  } = props;
  return (
    <TextField
      size={size}
      id="state"
      label={label}
      value={region}
      select
      onChange={(e) => handleChange("region", e.target.value)}
      fullWidth
      variant={outlined ? "outlined" : "standard"}
      margin={margin || "none"}
    >
      {getRegions(country).map((option) => (
        <MenuItem key={option[0]} value={option[1]}>
          {option[0]}
        </MenuItem>
      ))}
    </TextField>
  );
}

RegionMUISelectors.defaultProps = {
  size: "medium",
  outlined: true,
  margin: "none",
};

RegionMUISelectors.propTypes = {
  size: PropTypes.string,
  outlined: PropTypes.bool,
  label: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  country: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
  margin: PropTypes.string,
};

export default RegionMUISelectors;
