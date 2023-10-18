import { Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CustomTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 13,
  },
  tooltipPlacementBottom: {
    margin: "4px 0",
  },
}))(Tooltip);


export default CustomTooltip;
