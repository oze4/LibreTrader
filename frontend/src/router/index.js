import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Planner, NotFound } from "../pages";

function AppRouter() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/planner" component={Planner} />
      <Route component={NotFound} />
    </Switch>
  );
}
