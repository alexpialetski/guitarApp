import React from "react";
import { ThemeProvider } from "@mui/material";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import { theme } from "constants/theme";
import { Dashboard } from "components/Dashboard";
import { Constructor, Lesson, Lessons, Games } from "pages";

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
          <Route exact path="/lesson/:id">
            <Lesson />
          </Route>
          <Route exact path="/games">
            <Games />
          </Route>
          <Redirect to="/games" />
        </Switch>
      </Dashboard>
    </BrowserRouter>
  </ThemeProvider>
);
