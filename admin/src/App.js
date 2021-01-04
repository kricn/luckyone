import { Component, Fragment, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import { Spin } from 'antd';

//自定义组件
import PrivateRouter from './components/praviteRouter'
import router from '@/router/index'

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
            {
              router.map((route, index) => {
                return <PrivateRouter
                  key={index}
                  {...route}
                />
              })
            }
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }
}

export default App;
