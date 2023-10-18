import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { createBrowserHistory } from "history";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import { Router } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import HocRoutes from "./HocRoutes";
import Notifier from "./Notifier";
import theme from "./theme";

const history = createBrowserHistory();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <SnackbarProvider
            dense
            maxSnack={3}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <Notifier />
            <Router history={history}>
              <AuthProvider>
                <HocRoutes />
              </AuthProvider>
            </Router>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;
