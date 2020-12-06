import { Component, Fragment } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

//自定义组件
import Login from './views/login/index'
import Index from './views/index/index'
import PrivateRouter from './components/praviteRouter'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return  (
      <Fragment>
        <BrowserRouter>
          <Switch>
            <Redirect path="/" exact to='/admin/statistic' />
            <Redirect path='/admin' exact to='/admin/statistic' />
            <Route exact path="/login" component={Login}></Route>
            <PrivateRouter component={Index} path="/admin" />
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App;
