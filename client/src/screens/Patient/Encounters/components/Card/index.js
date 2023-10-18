import React, { useState } from "react";

import {
  Card,
  Typography,
  Grid,
  Popover,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import PropTypes from "prop-types";

import Colors from "../../../../../theme/colors";
import { noOp } from "../../../../../utils/helpers";
import BillingHover from "../BillingHover";
import DiagnoseHover from "../DiagnoseHover";
import PlanHover from "../PlanHover";

const useStyles = makeStyles((theme) => ({
  root: {
    overflowY: "auto",
    background: Colors.white,
    border: "1px solid rgba(38, 38, 38, 0.12)",
    borderRadius: 4,
    marginBottom: 6,
  },
  titleContainer: {
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 34,
    background: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  title: {
    fontWeight: "600",
    fontSize: 13,
  },
  cardContent: {
    padding: theme.spacing(1),
    minHeight: 100,
    maxHeight: 250,
    overflowY: "scroll",
  },
  icon: {
    cursor: "pointer",
  },
  popover: {
  },
  paper: {
    padding: theme.spacing(1, 2),
  },
}));

const PatientCard = (props) => {
  const classes = useStyles();
  const {
    data,
    title,
    icon,
  } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handlePopoverOpen = (event, cardName) => {
    setHoveredCard(cardName);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setHoveredCard(null);
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  const renderPopOverContent = () => {
    switch (hoveredCard) {
      case "Diagnose":
        return <DiagnoseHover />;
      case "Plan":
        return <PlanHover closePopover={handlePopoverClose} />;
      case "Billing":
        return <BillingHover closePopover={handlePopoverClose} />;
      default:
        return "";
    }
  };

  return (
    <>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {renderPopOverContent()}
      </Popover>
      <Card
        className={classes.root}
        variant="outlined"
      >
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.titleContainer}
          onMouseEnter={(e) => (icon ? handlePopoverOpen(e, title) : noOp)}
        // onMouseLeave={() => icon ? handlePopoverClose() : noOp}
        >
          <Typography className={classes.title}>
            {title}
            {" "}
          </Typography>
          {!!icon && (
            <AddIcon
              className={classes.icon}
              fontSize="small"
            />
          )}
        </Grid>
        <Grid className={classes.cardContent}>{data || ""}</Grid>
      </Card>
    </>
  );
};

PatientCard.defaultProps = {
  title: "Title",
  icon: false,
};

PatientCard.propTypes = {
  title: PropTypes.string,
  data: PropTypes.node.isRequired,
  icon: PropTypes.bool,
};

export default PatientCard;
