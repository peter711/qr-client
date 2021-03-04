import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Homepage from "./features/homepage";
import Success from "./features/success";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/success">
          <Success />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
