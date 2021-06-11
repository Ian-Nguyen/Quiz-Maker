import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";

import App from "./App";
import NotFoundPage from "./views/404";
import Student from "./views/student";
import TakeQuiz from "./views/TakeQuiz";
import MakeQuiz from "./views/teacher";
import "bootstrap/dist/css/bootstrap.css";
const routing = (
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/student" component={Student} />
      <Route exact path="/takequiz" component={TakeQuiz} />
      <Route exact path="/makequiz" component={MakeQuiz} />
      <Route exact path="/404" component={NotFoundPage} />

      <Redirect to="404" />
    </Switch>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));
