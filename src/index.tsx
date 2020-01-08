import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { render } from 'react-dom'

import StartPage from "./pages/startPage";

render(
  <Router>
    <Switch>
      <Route exact path="/">
        <StartPage />
      </Route>
      <Route>{'Incorrect URL'}</Route>
    </Switch>
  </Router>,
  document.getElementById('app')
);