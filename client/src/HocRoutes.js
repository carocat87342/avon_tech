import React from "react";

import useAuth from "./hooks/useAuth";
import routes, { renderRoutes } from "./routes";
import { getAllowedRoutes } from "./utils/helpers";

const HocRoutes = () => {
  const { user } = useAuth();
  const allowedRoutes = getAllowedRoutes(routes, (user && user.permissions) || []);

  return (
    <>
      {renderRoutes(allowedRoutes || [])}
    </>
  );
};


export default HocRoutes;
