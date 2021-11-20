import React from "react";
import { ThemeProvider } from "@mui/material";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import { theme } from "constants/theme";
import { Dashboard } from "components/Dashboard";
import { Constructor } from "pages/Constructor";
import { Lessons } from "pages/Lessons";
import { Home } from "pages/Home";

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter basename="/guitarapp">
      <Dashboard>
        <Switch>
          <Route exact path="/constructor">
            <Constructor />
          </Route>
          <Route exact path="/lessons">
            <Lessons />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Dashboard>
    </BrowserRouter>
  </ThemeProvider>
);
