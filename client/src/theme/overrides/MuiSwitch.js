import { green, grey } from "@material-ui/core/colors";

export default {
  colorPrimary: {
    color: grey[400],
    "&$checked + $track": {
      backgroundColor: green[600],
    },
    "&$checked": {
      color: green[600],
    },
  },
};
