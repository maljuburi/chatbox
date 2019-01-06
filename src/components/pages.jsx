import React, { Component } from "react";
import Chat from "./chat";
import Login from "./login";
import { Route, Switch } from "react-router-dom";

class Pages extends Component {
  render() {
    return (
      <Switch>
        <Route path="/chat" component={Chat} />
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default Pages;
