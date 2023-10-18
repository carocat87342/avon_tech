
import React, { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/AddOutlined";
import SubtractIcon from "@material-ui/icons/RemoveOutlined";

const Counter = () => {
  const [counterValue, setCounterValue] = useState(1);

  const handleIncrementChange = () => {
    setCounterValue((prevState) => prevState + 1);
  };

  const handleDecrementChange = () => {
    setCounterValue((prevState) => prevState - 1);
  };

  return (
    <Grid container alignItems="center">
      <Button
        onClick={handleDecrementChange}
        disabled={counterValue === 0}
        disableRipple
      >
        <SubtractIcon fontSize="small" />
      </Button>
      <Box minWidth={16} textAlign="center">
        <Typography>{counterValue}</Typography>
      </Box>
      <Button
        onClick={handleIncrementChange}
        disableRipple
      >
        <AddIcon fontSize="small" />
      </Button>
    </Grid>
  );
};

export default Counter;
