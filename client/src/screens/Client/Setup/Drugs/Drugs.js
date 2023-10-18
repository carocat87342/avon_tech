import React, { useState } from "react";

import { makeStyles, Container, CssBaseline } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import DrugsService from "../../../../services/drugs.service";
import Drugsform from "./components/Drugsform";
import Drugstable from "./components/Drugstable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
  action: {
    textTransform: "none",
    marginTop: theme.spacing(2),
  },

  card: {
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Drugs() {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const payload = {
    data: {
      searchTerm,
      checkBox: favorite,
    },
  };

  const fetchSearchDrugs = () => {
    DrugsService.search(payload).then((res) => {
      setSearchResult(res.data.data);
    });
  };

  const textChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };
  const checkBoxChangeHandler = (e) => {
    setFavorite(e.target.checked);
  };

  return (
    <>
      <CssBaseline>
        <Container maxWidth={false} className={classes.root}>
          <Grid container justify="center" spacing={2}>
            <Grid item md={12} xs={12}>
              <Typography
                component="h1"
                variant="h2"
                color="textPrimary"
                className={classes.title}
              >
                Drugs
              </Typography>
              <Typography component="p" variant="body2" color="textPrimary">
                This page is used to manage drugs information.
              </Typography>
              <Drugsform
                fetchSearchDrugs={fetchSearchDrugs}
                textChangeHandler={textChangeHandler}
                checkBoxChangeHandler={checkBoxChangeHandler}
              />
              {searchResult.length > 0 && (
                <Drugstable
                  result={searchResult}
                  fetchSearchDrugs={fetchSearchDrugs}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </CssBaseline>
    </>
  );
}
