import React, { useState } from "react";

import { CssBaseline, makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import icdcodesService from "../../../../services/icdcodes.service";
import ICDcodesform from "./components/ICDcodesform";
import ICDcodestable from "./components/ICDcodestable";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "25px 0px",
  },
  card: {
    minHeight: 300,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingBottom: theme.spacing(0.5),
  },
}));

const ICDcodes = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const payload = {
    searchTerm,
    checkBox: favorite,
  };
  const fetchSearchIcdCodes = () => {
    icdcodesService.search(payload).then((res) => {
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
        <div className={classes.root}>
          <Typography
            component="h1"
            variant="h2"
            color="textPrimary"
            className={classes.title}
          >
            ICD Codes
          </Typography>
          <Typography component="p" variant="body2" color="textPrimary">
            This page is used to manage ICD codes.
          </Typography>
          <Grid container spacing={2}>
            <Grid item md={12} xs={12}>
              <ICDcodesform
                fetchSearchIcdCodes={fetchSearchIcdCodes}
                textChangeHandler={textChangeHandler}
                checkBoxChangeHandler={checkBoxChangeHandler}
              />
              {searchResult.length > 0 && (
                <ICDcodestable
                  result={searchResult}
                  fetchSearchIcdCodes={fetchSearchIcdCodes}
                />
              )}
            </Grid>
          </Grid>
        </div>
      </CssBaseline>
    </>
  );
};

export default ICDcodes;
