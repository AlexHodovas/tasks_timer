import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import ErrorModalWindow from "./components/ErrorModalWindow";
import TaskInfo from "./components/TaskInfo";

const App = () => (
  <Switch>
    <Route path="/home" component={HomePage} />
    <Route path="/tasks/:taskId?" exact component={TaskInfo} />
    <Route component={ErrorModalWindow} />
  </Switch>
);

export default App;
