import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CriarConta from './Pages/criar-conta';
import Login from './Pages/Login/Login';
import Menu from "../Components/Menu/Menu";
import LayoutLogin from './Layout/LayoutLogin';
import Layout from './Layout/Layout';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <LayoutLogin>
            <Login />
          </LayoutLogin>
        </Route>
        <Route path="/criar-conta">
          <Layout>
            <CriarConta />
          </Layout>
        </Route>
        <Route path="/">
          <Layout>
            <Menu />
          </Layout>
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;
