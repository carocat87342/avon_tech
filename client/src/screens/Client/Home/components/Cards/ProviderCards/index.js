import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";

import Colors from "../../../../../../theme/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
  },
  title: {
    fontWeight: "600",
    fontSize: "1em",
    "& h2": {
      color: "#fff",
    },
  },
  titleContainer: {
    padding: "0 0 0 1em",
    borderBottom: `1px solid ${Colors.border}`,
    minHeight: 47,
  },
  providers: {
    display: "block",
    listStyle: "none",
    width: "100%",
    "& li": {
      fontSize: "13px",
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: "3px 0px",
      cursor: "pointer",
      "&:hover": {
        background: "#fafafa",
      },
      "& div": {
        flex: 2,
      },
    },
    "& a": {
      fontSize: "13px",
      display: "flex",
      justifyContent: "space-between",
      listStyle: "none",
      padding: "0px 0px",
      cursor: "pointer",
      textDecoration: "none",
      width: "100%",
      color: theme.palette.text.primary,
      "&:hover": {
        background: "#fafafa",
      },
      "& div": {
        flex: 2,
      },
    },
  },
  provider: {
    paddingLeft: "5px !important",
  },
  activeProvider: {
    background: "#e6e6e6",
    "&:hover": {
      background: "#e6e6e6 !important",
    },
  },
  providersLabel: {
    fontWeight: 600,
    marginBottom: theme.spacing(1),
  },
  count: {
    width: "30px",
    flex: "1 !important",
  },
  timezone: {
    marginLeft: theme.spacing(2),
  },
}));

const ProviderCards = ({ providers, selectedProvider, handleProviderClick }) => {
  const classes = useStyles();

  const dateValidation = (date, jsx) => {
    if (!moment(date).isValid()) return null;
    return jsx;
  };

  return (
    <Card className={classes.root} variant="outlined">
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.titleContainer}
      >
        <Typography className={classes.title}>Users</Typography>
      </Grid>

      <CardContent>
        <ul className={classes.providers}>
          <li className={classes.providersLabel}>
            <div>Name</div>
            <div className={classes.count}>Count</div>
            <div>Since</div>
          </li>
          {providers
            && providers.map((provider) => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
              <li
                key={provider.id}
                className={clsx({
                  [classes.provider]: true,
                  [classes.activeProvider]: selectedProvider.id === provider.id,
                })}
                onClick={() => handleProviderClick(provider)} // TODO:: Refactor and remove the eslint disable comment
                onKeyDown={() => handleProviderClick(provider)}
              >
                <div>
                  {provider.name}
                  <span className={classes.timezone}>
                    {/*
                    {provider?.timezone}
                    */}
                  </span>
                </div>
                <div className={classes.count}>{provider.count || 0}</div>
                <div>
                  {dateValidation(provider.dt, `${moment(provider.dt).format("ll")} (${moment(
                    provider.dt,
                  )
                    .startOf("day")
                    .fromNow()})`)}
                </div>
              </li>
            ))}
        </ul>
      </CardContent>
    </Card>
  );
};

ProviderCards.propTypes = {
  providers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      count: PropTypes.number,
      dt: PropTypes.string,
    }),
  ).isRequired,
  selectedProvider: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  handleProviderClick: PropTypes.func.isRequired,
};
export default ProviderCards;
