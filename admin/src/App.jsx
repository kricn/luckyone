import { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

//自定义组件
import PrivateRouter from './components/praviteRouter'
import router from '@/router/index'
import store from '@/store'
import { getAuth } from './utils/session';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: getAuth('isAuth') || '0'
    }
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        isAuth: store.getState().appReducer.isAuth
      })
    })
  }
  componentWillUnmount() {
    this.setState = () => null
  }

  render() {
    return  (
      <>
        <BrowserRouter>
          <Switch>
            {
              router.map((route, index) => {
                return <PrivateRouter
                  isAuth={this.state.isAuth}
                  key={index}
                  {...route}
                />
              })
            }
          </Switch>
        </BrowserRouter>
      </>
    )
  }
}

export default App;
