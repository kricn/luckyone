import { Component } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';

//自定义组件
import PrivateRouter from './components/praviteRouter'
import router from '@/router/index'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
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
