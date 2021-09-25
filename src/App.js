import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import Menu from "./Menu";
import Login from "./Login";
import NewPassword from "./NewPassword";
import RestLink from "./ResetLink";
import Signup from "./Signup";
import "./styles.css";
import Url from "./Url";
import Dashboard from "./Dashboard";
import Activation from "./Activation";
import PageNotFound from "./PageNotFound";

export default function App() {
  const history = useHistory();
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Signup />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/url">
            <Menu />
            <Url />
          </Route>
          <Route path="/activation/:token">
            <Activation />
          </Route>
          <Route path="/dashboard">
            <Menu />
            <Dashboard />
          </Route>
          <Route path="/reset">
            <RestLink />
          </Route>
          <Route path="/new-password/:restToken">
            <NewPassword />
          </Route>
          <Route exact path="/*">
            <PageNotFound />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
