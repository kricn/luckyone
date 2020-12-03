import { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './views/login/index'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return  (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <h1>this this home page.</h1>
            </Route>
            <Route component={Login} path="/login"></Route>
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App;
