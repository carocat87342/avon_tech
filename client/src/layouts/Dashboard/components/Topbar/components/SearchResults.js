import React from "react";

import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    position: "absolute",
    top: "48px",
    background: "#f7f7f7",
    zIndex: 9999,
    minWidth: 350,
    right: 0,
  },
  CardContent: {
    padding: 0,
    backgroundColor: theme.palette.white,
    textAlign: "center",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  list: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listItem: {
    cursor: "pointer",
  },
}));

const SearchResults = ({ results, noContent, handleClose }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent className={classes.CardContent}>
        <p
          style={{
            paddingTop: "20px",
          }}
        >
          {!noContent && results.length < 1 && <CircularProgress size={20} />}
          {noContent}
        </p>
        <List className={classes.list}>
          {results
            && results.map((result) => (
              <>
                <ListItem
                  component={RouterLink}
                  to={`/patients/${result.id}`}
                  button
                  key={result.id}
                  className={classes.listItem}
                  onClick={() => !!handleClose && handleClose()}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={`${result.firstname} ${result.lastname}`}
                      className={classes.avatar}
                      component={RouterLink}
                      src={(result && result.avatar) || ""}
                      to={`/patients/${result.id}`}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${result.firstname} ${result.lastname}`}
                  />
                </ListItem>
                <Divider component="li" />
              </>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

SearchResults.defaultProps = {
  results: null,
  noContent: null,
  handleClose: () => {},
};

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.object),
  noContent: PropTypes.string,
  handleClose: PropTypes.func,
};
export default SearchResults;
