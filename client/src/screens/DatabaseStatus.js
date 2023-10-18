import React, { useEffect, useState } from "react";

import { Redirect } from "react-router-dom";

import databaseStatusService from "../services/database-status.service";
import { dateTimeFormat } from "../utils/helpers";

const DatabaseStatus = () => {
  const [status, setStatus] = useState();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    databaseStatusService
      .getDatabaseStatus()
      .then((res) => setStatus(res))
      .catch(() => setRedirect(true));
  }, []);

  if (redirect) {
    return <Redirect to="/404" />;
  }

  return (
    <div>
      Date/Time:
      {dateTimeFormat(status)}
    </div>
  );
};

export default DatabaseStatus;
