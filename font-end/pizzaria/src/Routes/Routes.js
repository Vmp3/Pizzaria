import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CriarConta from './Pages/criar-conta';
import Menu from "../Components/Menu/Menu";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/criar-conta">
          <CriarConta />
        </Route>
        <Route path="/">
          <Menu />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
