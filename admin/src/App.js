import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';

import Home from './views/home'
import About from './views/about'

class App extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return  (
      <div>
        <h1>this this title</h1>
        <BrowserRouter>
          <Switch>
            <Route exact component={Home} path="/"></Route>
            <Route component={About} path="/about"></Route>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
