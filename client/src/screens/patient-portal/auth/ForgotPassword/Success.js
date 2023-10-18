import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
    textAlign: "center",
    fontSize: "15px",
    lineHeight: "24px",
  },
}));

const Success = ({ header, loginText, client }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <p>
          {header}
          {" "}
          <Link href={`/login/${client.code}`}>{loginText}</Link>
        </p>
      </CardContent>
    </Card>
  );
};

Success.defaultProps = {
  client: null,
};

Success.propTypes = {
  loginText: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  client: PropTypes.arrayOf(
    PropTypes.shape({
      client_id: PropTypes.string,
      name: PropTypes.string,
      code: PropTypes.string.isRequired,
    }),
  ),
};

export default Success;
