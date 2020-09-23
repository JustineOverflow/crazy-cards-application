import React from 'react';
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Welcome from "./Welcome/Welcome";
import Form from "./Form/Form";

function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route exact path='/' component={Welcome}/>
                  <Route exact path='/form' component={Form}/>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
