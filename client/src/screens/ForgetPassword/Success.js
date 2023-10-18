import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Proptypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    fontSize: "15px",
    lineHeight: "24px",
  },
}));

const Success = ({ header, loginText }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <p>
          {header}
          {" "}
          <Link href="/login_client">{loginText}</Link>
        </p>
      </CardContent>
    </Card>
  );
};

Success.defaultProps = {
  header: null,
  loginText: null,
};

Success.propTypes = {
  header: Proptypes.string,
  loginText: Proptypes.string,
};
export default Success;
